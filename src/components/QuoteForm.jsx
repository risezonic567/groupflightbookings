"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Loader2,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Plus,
  Minus,
  X,
  Mail,
  Phone
} from "lucide-react";
import AirportInput from "@/components/AirportInput";
import { submitQuote } from "@/lib/api";

export const FORM_FIELDS = [
  { name: "origin", label: "Origin", type: "airport", required: true },
  { name: "destination", label: "Destination", type: "airport", required: true },
  { name: "departureDate", label: "Departure Date", type: "date", required: true },
  { name: "returnDate", label: "Return Date", type: "date", required: true },
  { name: "travellers", label: "Passengers", type: "number", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: true }
];

const TRIP_TYPES = [
  { value: "oneway", label: "One Way" },
  { value: "roundtrip", label: "Round Trip" },
  { value: "multicity", label: "Multi City" }
];

const MAX_LEGS = 5;
const emptyLeg = () => ({ origin: "", destination: "", date: "" });

/* "YYYY-MM-DD" string <-> Date object (component ke bahar, taaki pehle define ho) */
const toDate = (str) => (str ? new Date(str + "T00:00:00") : null);
const toStr = (d) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/* Small helper: label + input + error */
function Field({ label, htmlFor, required, error, labelCls, children, className = "" }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${labelCls}`}
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] font-semibold text-white bg-neutral-900 border border-primary px-2 py-0.5 rounded-md inline-block">
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuoteForm({
  variant = "card", // "bar" = hero (dark), "card" = inner pages (white)
  title = "Get a Guaranteed Group Flight Quote",
  subtitle = "Exclusive group flight solutions for your next journey.",
  airlineContext = "",
  className = ""
}) {
  const router = useRouter();
  const isBar = variant === "bar";

  const [tripType, setTripType] = useState("roundtrip");
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travellers: 1,
    email: "",
    phone: ""
  });
  const [legs, setLegs] = useState([emptyLeg(), emptyLeg()]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const today = toStr(new Date());

  /* ---------- Styles (variant ke hisaab se) ---------- */
  const labelCls = isBar ? "text-neutral-300" : "text-neutral-700";
  const inputCls =
    "w-full h-12 text-sm font-medium bg-white border border-neutral-300 rounded-xl text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200";
  const airportCls =
    "h-12 rounded-xl !border-neutral-300 !bg-white text-slate-900 text-sm font-medium shadow-sm focus:ring-2 focus:ring-primary";

  /* ---------- Handlers ---------- */
  const clearError = (key) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (serverError) setServerError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSwapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handlePassengerChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      travellers: Math.max(1, (Number(prev.travellers) || 1) + delta)
    }));
    clearError("travellers");
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setErrors({});
    setServerError("");
  };

  const handleLegChange = (index, field, value) => {
    setLegs((prev) => prev.map((leg, i) => (i === index ? { ...leg, [field]: value } : leg)));
    clearError(`leg-${index}-${field}`);
  };

  const addLeg = () => {
    if (legs.length >= MAX_LEGS) return;
    setLegs((prev) => [...prev, emptyLeg()]);
  };

  const removeLeg = (index) => {
    if (legs.length <= 2) return;
    setLegs((prev) => prev.filter((_, i) => i !== index));
    setErrors({});
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    const e = {};

    if (tripType === "multicity") {
      legs.forEach((leg, i) => {
        if (!leg.origin.trim()) e[`leg-${i}-origin`] = "Required.";
        if (!leg.destination.trim()) e[`leg-${i}-destination`] = "Required.";
        if (!leg.date) {
          e[`leg-${i}-date`] = "Required.";
        } else if (i > 0 && legs[i - 1].date && new Date(leg.date) < new Date(legs[i - 1].date)) {
          e[`leg-${i}-date`] = "Cannot be before previous flight.";
        }
      });
    } else {
      if (!formData.origin.trim()) e.origin = "Origin is required.";
      if (!formData.destination.trim()) e.destination = "Destination is required.";
      if (!formData.departureDate) e.departureDate = "Departure date is required.";

      if (tripType === "roundtrip") {
        if (!formData.returnDate) {
          e.returnDate = "Return date is required.";
        } else if (
          formData.departureDate &&
          new Date(formData.returnDate) < new Date(formData.departureDate)
        ) {
          e.returnDate = "Return cannot be before departure.";
        }
      }
    }

    const pax = parseInt(formData.travellers, 10);
    if (!formData.travellers || isNaN(pax) || pax < 1) {
      e.travellers = "Enter at least 1 passenger.";
    }

    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      e.email = "Enter a valid email.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (
      !/^[0-9+\-()\s]+$/.test(formData.phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      e.phone = "Enter a valid phone number.";
    }

    return e;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const base = {
      tripType,
      travellers: parseInt(formData.travellers, 10),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      airlineContext,
      submittedAt: new Date().toISOString()
    };

    let payload;
    if (tripType === "multicity") {
      payload = {
        ...base,
        legs,
        origin: legs[0].origin,
        destination: legs[legs.length - 1].destination,
        departureDate: legs[0].date
      };
    } else {
      payload = {
        ...base,
        origin: formData.origin,
        destination: formData.destination,
        departureDate: formData.departureDate,
        returnDate: tripType === "roundtrip" ? formData.returnDate : ""
      };
    }

    const res = await submitQuote(payload);
    setIsSubmitting(false);

    if (res && res.success) {
      try {
        sessionStorage.setItem("lastGroupQuote", JSON.stringify(payload));
      } catch (err) {
        console.error("sessionStorage error:", err);
      }
      router.push("/quote-confirmation");
    } else {
      setServerError(
        res?.error || "We could not process your request at this moment. Please call our 24/7 air desk."
      );
    }
  };

  /* ---------- Reusable UI pieces ---------- */
  const tabs = (
    <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Trip type">
      {TRIP_TYPES.map((t) => {
        const active = tripType === t.value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => handleTripTypeChange(t.value)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              active
                ? "bg-primary text-white shadow-md"
                : isBar
                ? "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white border border-white/10"
                : "bg-soft text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );

  /* Custom calendar (react-datepicker) */
  const dateInput = ({ id, name, value, onChange, min }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
        <Calendar className="w-4 h-4 text-primary" />
      </div>
      <DatePicker
        id={id}
        selected={toDate(value)}
        onChange={(d) => onChange({ target: { name, value: toStr(d) } })}
        minDate={min ? toDate(min) : null}
        placeholderText="Select date"
        dateFormat="dd MMM yyyy"
        autoComplete="off"
        wrapperClassName="w-full"
        popperPlacement="bottom-start"
        className={`${inputCls} pl-10 pr-3 cursor-pointer placeholder:text-neutral-400`}
      />
    </div>
  );

  const passengersField = (
    <Field
      label="Passengers"
      htmlFor="qf-travellers"
      required
      error={errors.travellers}
      labelCls={labelCls}
    >
      <div className="flex items-center justify-between bg-white rounded-xl border border-neutral-300 h-12 px-1.5 shadow-sm text-slate-900">
        <button
          type="button"
          onClick={() => handlePassengerChange(-1)}
          disabled={Number(formData.travellers) <= 1}
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-colors shrink-0"
          aria-label="Decrease passenger count"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="flex flex-col items-center justify-center flex-1 px-1">
          <input
            type="number"
            id="qf-travellers"
            name="travellers"
            min="1"
            value={formData.travellers}
            onChange={handleChange}
            className="w-full text-center font-black text-sm text-slate-900 bg-transparent focus:outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label="Passenger count"
          />
          <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold leading-none">
            Guests
          </span>
        </div>
        <button
          type="button"
          onClick={() => handlePassengerChange(1)}
          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer active:scale-95"
          aria-label="Increase passenger count"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </Field>
  );

  const emailField = (
    <Field label="Email" htmlFor="qf-email" required error={errors.email} labelCls={labelCls}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
          <Mail className="w-4 h-4 text-primary" />
        </div>
        <input
          type="email"
          id="qf-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="email"
          className={`${inputCls} pl-10 pr-3 placeholder:text-neutral-400`}
        />
      </div>
    </Field>
  );

  const phoneField = (
    <Field label="Phone Number" htmlFor="qf-phone" required error={errors.phone} labelCls={labelCls}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
          <Phone className="w-4 h-4 text-primary" />
        </div>
        <input
          type="tel"
          id="qf-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 555 234 5678"
          autoComplete="tel"
          className={`${inputCls} pl-10 pr-3 placeholder:text-neutral-400`}
        />
      </div>
    </Field>
  );

  const submitButton = (
    <div className="flex flex-col justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Get Group Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </div>
  );

  /* ---------- Itinerary section (trip type ke hisaab se) ---------- */
  const itinerary =
    tripType === "multicity" ? (
      <div className="space-y-3">
        {legs.map((leg, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3.5 items-end"
          >
            <Field
              label={`Flight ${i + 1} · From`}
              htmlFor={`qf-leg-${i}-origin`}
              required
              error={errors[`leg-${i}-origin`]}
              labelCls={labelCls}
            >
              <AirportInput
                id={`qf-leg-${i}-origin`}
                name={`leg-${i}-origin`}
                value={leg.origin}
                onChange={(e) => handleLegChange(i, "origin", e.target.value)}
                placeholder="City or airport"
                className={airportCls}
              />
            </Field>

            <Field
              label="To"
              htmlFor={`qf-leg-${i}-destination`}
              required
              error={errors[`leg-${i}-destination`]}
              labelCls={labelCls}
            >
              <AirportInput
                id={`qf-leg-${i}-destination`}
                name={`leg-${i}-destination`}
                value={leg.destination}
                onChange={(e) => handleLegChange(i, "destination", e.target.value)}
                placeholder="City or airport"
                className={airportCls}
              />
            </Field>

            <Field
              label="Date"
              htmlFor={`qf-leg-${i}-date`}
              required
              error={errors[`leg-${i}-date`]}
              labelCls={labelCls}
            >
              {dateInput({
                id: `qf-leg-${i}-date`,
                name: `leg-${i}-date`,
                value: leg.date,
                min: (i > 0 && legs[i - 1].date) || today,
                onChange: (e) => handleLegChange(i, "date", e.target.value)
              })}
            </Field>

            <div className="h-12 flex items-center">
              {legs.length > 2 ? (
                <button
                  type="button"
                  onClick={() => removeLeg(i)}
                  aria-label={`Remove flight ${i + 1}`}
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-primary border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="w-10 h-10" aria-hidden="true" />
              )}
            </div>
          </div>
        ))}

        {legs.length < MAX_LEGS && (
          <button
            type="button"
            onClick={addLeg}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/15 hover:bg-primary text-primary hover:text-white border border-primary/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add another flight</span>
          </button>
        )}
      </div>
    ) : (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end ${
          tripType === "roundtrip" ? "lg:grid-cols-5" : "lg:grid-cols-4"
        }`}
      >
        {/* Origin + swap */}
        <div className="relative">
          <Field
            label="Origin"
            htmlFor="qf-origin"
            required
            error={errors.origin}
            labelCls={labelCls}
          >
            <AirportInput
              id="qf-origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="City or airport"
              className={airportCls}
            />
          </Field>
          <button
            type="button"
            onClick={handleSwapAirports}
            title="Swap Origin and Destination"
            aria-label="Swap airports"
            className="hidden lg:flex absolute -right-3.5 top-[39px] -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-900 hover:bg-primary border border-white/20 text-neutral-300 hover:text-white items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        </div>

        <Field
          label="Destination"
          htmlFor="qf-destination"
          required
          error={errors.destination}
          labelCls={labelCls}
        >
          <AirportInput
            id="qf-destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="City or airport"
            className={airportCls}
          />
        </Field>

        <Field
          label="Departure"
          htmlFor="qf-departureDate"
          required
          error={errors.departureDate}
          labelCls={labelCls}
        >
          {dateInput({
            id: "qf-departureDate",
            name: "departureDate",
            value: formData.departureDate,
            min: today,
            onChange: handleChange
          })}
        </Field>

        {tripType === "roundtrip" && (
          <Field
            label="Return"
            htmlFor="qf-returnDate"
            required
            error={errors.returnDate}
            labelCls={labelCls}
          >
            {dateInput({
              id: "qf-returnDate",
              name: "returnDate",
              value: formData.returnDate,
              min: formData.departureDate || today,
              onChange: handleChange
            })}
          </Field>
        )}

        {passengersField}
      </div>
    );

  /* ---------- Contact row ---------- */
  const contactRow =
    tripType === "multicity" ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
        {passengersField}
        {emailField}
        {phoneField}
        {submitButton}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 items-end">
        {emailField}
        {phoneField}
        {submitButton}
      </div>
    );

  const form = (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {tabs}
      {itinerary}
      {contactRow}

      {serverError && (
        <div className="p-3 rounded-xl bg-neutral-900 border border-primary text-white text-xs font-medium">
          {serverError}
        </div>
      )}

      <div
        className={`flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 mt-2 border-t text-xs font-semibold ${
          isBar ? "border-white/10 text-white" : "border-neutral-200 text-neutral-700"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Minimum 10 travellers
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Free name changes
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 24/7 Air Desk Support
        </span>
      </div>
    </form>
  );

  /* ---------- VARIANT A: bar (hero) ---------- */
  if (isBar) {
    return (
      <div id="quote" className={`w-full max-w-7xl mx-auto ${className}`}>
        <div className="relative bg-[#0F172A]/95 backdrop-blur-xl text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 ring-1 ring-white/5">
          <div
            className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent"
            aria-hidden="true"
          />
          {form}
        </div>
      </div>
    );
  }

  /* ---------- VARIANT B: card (inner pages) ---------- */
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-8 text-ink ${className}`}
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-soft border border-neutral-200 text-xs font-semibold text-primary mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Locked Price Guarantee</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">{subtitle}</p>
      </div>
      {form}
    </div>
  );
}