"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Users,
  Plus,
  Minus,
  X,
  Plane,
  Briefcase
} from "lucide-react";
import AirportInput from "@/components/AirportInput";
import { submitQuote } from "@/lib/api";

/**
 * All form fields managed in ONE single constant array.
 * Adding, removing, or re-ordering any field is a simple one-line modification.
 */
export const FORM_FIELDS = [
  // Step 1: Trip Itinerary Fields
  {
    name: "origin",
    label: "Origin",
    type: "airport",
    placeholder: "City or airport",
    required: true,
    step: 1
  },
  {
    name: "destination",
    label: "Destination",
    type: "airport",
    placeholder: "City or airport",
    required: true,
    step: 1
  },
  {
    name: "departureDate",
    label: "Departure Date",
    type: "date",
    placeholder: "Depart date",
    required: true,
    step: 1
  },
  {
    name: "returnDate",
    label: "Return Date",
    type: "date",
    placeholder: "Return date",
    required: true,
    step: 1
  },
  {
    name: "travellers",
    label: "Passengers",
    type: "number",
    placeholder: "1",
    min: 1,
    required: true,
    step: 1
  },
  {
    name: "flightClass",
    label: "Class",
    type: "select",
    options: ["Economy", "Premium Economy", "Business", "First"],
    required: false,
    step: 1
  },
  {
    name: "directPreferred",
    label: "Direct flights",
    type: "checkbox",
    required: false,
    step: 1
  },

  // Step 2: Contact Details Fields
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "e.g. Sarah Jenkins",
    required: true,
    step: 2
  },
  {
    name: "email",
    label: "Work / Primary Email",
    type: "email",
    placeholder: "e.g. sarah@company.com",
    required: true,
    step: 2
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +1 (555) 234-5678",
    required: true,
    step: 2
  },
  {
    name: "notes",
    label: "Special Requests / Group Notes",
    type: "textarea",
    placeholder: "Baggage pooling, multi-city departures, flight flexibility...",
    required: false,
    step: 2
  }
];

export default function QuoteForm({
  variant = "card", // "bar" for hero horizontal search bar, "card" for inner pages
  title = "Get a Guaranteed Group Flight Quote",
  subtitle = "Exclusive group flight solutions for your next journey.",
  airlineContext = "",
  className = ""
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travellers: 1,
    flightClass: "Economy",
    directPreferred: false,
    fullName: "",
    email: "",
    phone: "",
    notes: "",
    airlineContext: airlineContext
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  // Swap Origin and Destination
  const handleSwapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  // Passenger Count +/- Steppers
  const handlePassengerChange = (delta) => {
    setFormData((prev) => {
      const current = parseInt(prev.travellers, 10) || 1;
      const nextVal = Math.max(1, current + delta);
      return { ...prev, travellers: nextVal };
    });
    if (errors.travellers) {
      setErrors((prev) => ({ ...prev, travellers: "" }));
    }
  };

  // Validate Step 1 (Flight criteria)
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin airport/city is required.";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination airport/city is required.";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required.";
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required.";
    } else if (formData.departureDate && new Date(formData.returnDate) < new Date(formData.departureDate)) {
      newErrors.returnDate = "Return date cannot be earlier than departure.";
    }

    const travellersCount = parseInt(formData.travellers, 10);
    if (!formData.travellers || isNaN(travellersCount) || travellersCount < 1) {
      newErrors.travellers = "Please enter at least 1 passenger.";
    }

    return newErrors;
  };

  // Validate Step 2 (Contact details)
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    return newErrors;
  };

  // Handle clicking "Next" in Bar Variant
  const handleNextStep = (e) => {
    e.preventDefault();
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    setErrors({});
    setIsModalOpen(true);
  };

  // Final submission of all fields
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate both steps
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = { ...step1Errors, ...step2Errors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const payload = {
      ...formData,
      travellers: parseInt(formData.travellers, 10),
      submittedAt: new Date().toISOString()
    };

    const res = await submitQuote(payload);

    setIsSubmitting(false);

    if (res && res.success) {
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("lastGroupQuote", JSON.stringify(payload));
        } catch (err) {
          console.error("sessionStorage error:", err);
        }
      }
      setIsModalOpen(false);
      router.push("/quote-confirmation");
    } else {
      setServerError(
        res?.error || "We could not process your request at this moment. Please call our 24/7 air desk."
      );
    }
  };

  if (variant === "bar") {
    return (
      <div id="quote" className={`w-full max-w-7xl mx-auto ${className}`}>
        <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-800">
          {/* Header Title */}
          <div className="pb-5 mb-6 border-b border-neutral-800/80">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Search Group Flights
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Exclusive group flight solutions for your next journey.
            </p>
          </div>

          {/* Step 1 Bar Form */}
          <form onSubmit={handleNextStep} noValidate className="space-y-4">
            {/* Grid of Fields: ONE ROW on desktop (xl), wrapping on tablet, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-3 xl:gap-2.5 items-end">
              {/* 1. Origin */}
              <div className="xl:col-span-2">
                <label
                  htmlFor="hero-origin"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Origin <span className="text-primary">*</span>
                </label>
                <AirportInput
                  id="hero-origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="City or airport"
                  required
                  className="h-11 rounded-lg !border-neutral-300 !bg-white text-neutral-900 text-sm shadow-sm"
                />
                {errors.origin && (
                  <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
                    {errors.origin}
                  </p>
                )}
              </div>

              {/* Swap Button (between origin & destination) */}
              <div className="hidden xl:flex xl:col-span-auto items-center justify-center pb-1.5">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  title="Swap Origin and Destination"
                  aria-label="Swap airports"
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-primary border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2. Destination */}
              <div className="xl:col-span-2">
                <label
                  htmlFor="hero-destination"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Destination <span className="text-primary">*</span>
                </label>
                <AirportInput
                  id="hero-destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="City or airport"
                  required
                  className="h-11 rounded-lg !border-neutral-300 !bg-white text-neutral-900 text-sm shadow-sm"
                />
                {errors.destination && (
                  <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
                    {errors.destination}
                  </p>
                )}
              </div>

              {/* 3. Departure Date */}
              <div className="xl:col-span-2">
                <label
                  htmlFor="hero-departureDate"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Departure <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <input
                    type="date"
                    id="hero-departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-3 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  />
                </div>
                {errors.departureDate && (
                  <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
                    {errors.departureDate}
                  </p>
                )}
              </div>

              {/* 4. Return Date */}
              <div className="xl:col-span-2">
                <label
                  htmlFor="hero-returnDate"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Return <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <input
                    type="date"
                    id="hero-returnDate"
                    name="returnDate"
                    min={formData.departureDate || undefined}
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-3 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  />
                </div>
                {errors.returnDate && (
                  <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
                    {errors.returnDate}
                  </p>
                )}
              </div>

              {/* 5. Passengers with +/- steppers */}
              <div className="xl:col-span-1">
                <label
                  htmlFor="hero-travellers"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Passengers <span className="text-primary">*</span>
                </label>
                <div className="relative flex items-center bg-white rounded-lg border border-neutral-300 h-11 px-1.5 shadow-sm text-neutral-900 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                  <button
                    type="button"
                    onClick={() => handlePassengerChange(-1)}
                    disabled={parseInt(formData.travellers, 10) <= 1}
                    className="w-7 h-7 rounded-md bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-xs transition-colors shrink-0 cursor-pointer"
                    aria-label="Decrease passenger count"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    id="hero-travellers"
                    name="travellers"
                    min="1"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="w-full text-center font-bold text-sm bg-transparent focus:outline-none text-neutral-900 px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Number of passengers"
                  />
                  <button
                    type="button"
                    onClick={() => handlePassengerChange(1)}
                    className="w-7 h-7 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-xs transition-colors shrink-0 cursor-pointer"
                    aria-label="Increase passenger count"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {errors.travellers && (
                  <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
                    {errors.travellers}
                  </p>
                )}
              </div>

              {/* 6. Class select */}
              <div className="xl:col-span-1">
                <label
                  htmlFor="hero-flightClass"
                  className="block text-xs font-semibold text-neutral-300 mb-1.5"
                >
                  Class
                </label>
                <select
                  id="hero-flightClass"
                  name="flightClass"
                  value={formData.flightClass}
                  onChange={handleChange}
                  className="w-full h-11 px-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm cursor-pointer"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Prem. Econ</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>

              {/* 7. Next button */}
              <div className="xl:col-span-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Direct Flights Checkbox + Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 gap-3 text-xs text-neutral-400">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  name="directPreferred"
                  checked={formData.directPreferred}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-900 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  Direct flights only
                </span>
              </label>

              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Dedicated group specialist
                </span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center gap-1 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Flexible payment options
                </span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center gap-1 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Free name changes
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* STEP 2 MODAL DIALOG */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              ref={modalRef}
              className="relative w-full max-w-xl bg-white text-ink rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-slideUp"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-ink hover:bg-soft transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-5 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft border border-neutral-200 text-xs font-semibold text-primary mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Step 2 of 2: Contract Contact Details</span>
                </div>
                <h3 id="modal-title" className="text-2xl font-extrabold text-ink">
                  Where Should We Send Your Group Quote?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Our airline group specialists will calculate block allocations and dispatch your rate proposal.
                </p>
              </div>

              {/* Trip Summary Badge Line */}
              <div className="bg-soft p-3.5 rounded-2xl border border-neutral-200 mb-5 flex items-center gap-2.5 text-xs font-medium text-neutral-700">
                <Plane className="w-4 h-4 text-primary shrink-0 rotate-45" />
                <span className="line-clamp-1">
                  <strong>{formData.origin}</strong> &rarr; <strong>{formData.destination}</strong> • {formData.departureDate} to {formData.returnDate} • <strong>{formData.travellers} Pax</strong> • {formData.flightClass}
                </span>
              </div>

              {serverError && (
                <div className="mb-4 p-3 rounded-xl bg-soft border border-ink text-ink text-xs font-medium">
                  {serverError}
                </div>
              )}

              {/* Step 2 Form */}
              <form onSubmit={handleFinalSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="modal-fullName"
                      className="block text-xs font-semibold text-neutral-700 mb-1"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="modal-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.fullName ? "border-primary" : "border-neutral-300"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-primary font-semibold">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-xs font-semibold text-neutral-700 mb-1"
                    >
                      Work / Primary Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@company.com"
                      required
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.email ? "border-primary" : "border-neutral-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-primary font-semibold">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="modal-phone"
                      className="block text-xs font-semibold text-neutral-700 mb-1"
                    >
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 234-5678"
                      required
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.phone ? "border-primary" : "border-neutral-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-primary font-semibold">{errors.phone}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="modal-notes"
                      className="block text-xs font-semibold text-neutral-700 mb-1"
                    >
                      Special Requests / Notes <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="modal-notes"
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Baggage pooling, multi-city departures, flight flexibility..."
                      className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-300 rounded-xl text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-3 flex items-center justify-between gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-soft text-ink font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-neutral-400 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Securing Group Rates...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Group Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* VARIANT B: "card" (Used in Contact, Airlines Detail, and Home Section 6)   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className={`bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-8 text-ink ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-soft border border-neutral-200 text-xs font-semibold text-primary mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Locked Price Guarantee</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          {subtitle}
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-soft border border-ink text-ink text-sm font-medium">
          <p className="font-bold">Notice:</p>
          <p>{serverError}</p>
        </div>
      )}

      {/* Card Form */}
      <form onSubmit={handleFinalSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {/* Origin */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-origin" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Origin <span className="text-primary">*</span>
            </label>
            <AirportInput
              id="card-origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="City or airport"
              required
              className={errors.origin ? "border-primary ring-1 ring-primary" : ""}
            />
            {errors.origin && <p className="mt-1 text-xs text-primary font-semibold">{errors.origin}</p>}
          </div>

          {/* Destination */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-destination" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Destination <span className="text-primary">*</span>
            </label>
            <AirportInput
              id="card-destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="City or airport"
              required
              className={errors.destination ? "border-primary ring-1 ring-primary" : ""}
            />
            {errors.destination && <p className="mt-1 text-xs text-primary font-semibold">{errors.destination}</p>}
          </div>

          {/* Departure Date */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-departureDate" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Departure Date <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              id="card-departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.departureDate ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.departureDate && <p className="mt-1 text-xs text-primary font-semibold">{errors.departureDate}</p>}
          </div>

          {/* Return Date */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-returnDate" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Return Date <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              id="card-returnDate"
              name="returnDate"
              min={formData.departureDate || undefined}
              value={formData.returnDate}
              onChange={handleChange}
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.returnDate ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.returnDate && <p className="mt-1 text-xs text-primary font-semibold">{errors.returnDate}</p>}
          </div>

          {/* Passengers */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-travellers" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Passengers <span className="text-primary">*</span>
            </label>
            <input
              type="number"
              id="card-travellers"
              name="travellers"
              min="1"
              value={formData.travellers}
              onChange={handleChange}
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.travellers ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.travellers && <p className="mt-1 text-xs text-primary font-semibold">{errors.travellers}</p>}
          </div>

          {/* Class */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-flightClass" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Class
            </label>
            <select
              id="card-flightClass"
              name="flightClass"
              value={formData.flightClass}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-fullName" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="card-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.fullName ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.fullName && <p className="mt-1 text-xs text-primary font-semibold">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-email" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Work / Primary Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="card-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sarah@company.com"
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-primary font-semibold">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="card-phone" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="card-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 234-5678"
              required
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.phone ? "border-primary ring-1 ring-primary" : "border-neutral-300"
              }`}
            />
            {errors.phone && <p className="mt-1 text-xs text-primary font-semibold">{errors.phone}</p>}
          </div>

          {/* Direct Flights Checkbox */}
          <div className="col-span-12 sm:col-span-6 pt-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="directPreferred"
                checked={formData.directPreferred}
                onChange={handleChange}
                className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
              />
              <span className="text-xs text-neutral-700 font-medium">
                Direct flights preferred (non-stop)
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-neutral-400 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Checking Airline Allocations...</span>
              </>
            ) : (
              <>
                <span>Get Group Quote</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No obligation
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Free name changes
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 24/7 Air Desk
          </span>
        </div>
      </form>
    </div>
  );
}
