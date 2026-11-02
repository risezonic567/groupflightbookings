"use client";

import { useSyncExternalStore, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, Plane, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("lastGroupQuote");
}

function getServerSnapshot() {
  return null;
}

export default function QuoteConfirmationPage() {
  const rawQuoteData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const quoteData = useMemo(() => {
    if (!rawQuoteData) return null;
    try {
      return JSON.parse(rawQuoteData);
    } catch (e) {
      console.error("Error parsing quote data:", e);
      return null;
    }
  }, [rawQuoteData]);

  return (
    <div className="bg-soft min-h-[80vh] py-16 lg:py-24 text-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!quoteData ? (
          /* Empty State if user lands directly without submitting */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-soft border border-neutral-200 flex items-center justify-center text-primary mx-auto">
              <Plane className="w-8 h-8 rotate-45" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
              No Active Quote Request Found
            </h1>

            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              It looks like you haven&apos;t submitted a group flight quote inquiry yet, or your session has expired. You can submit a new group request in less than 2 minutes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/#quote-form"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
              >
                <span>Request Group Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-soft hover:bg-neutral-200 text-ink font-semibold text-sm px-6 py-3.5 rounded-xl border border-neutral-300 transition-all"
              >
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Submitted Quote Confirmation Card */
          <div className="space-y-8 animate-fadeIn">
            {/* Top Success Badge */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Inquiry Successfully Received
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
                    Group Flight Quote Confirmation
                  </h1>
                </div>
              </div>

              <div className="bg-soft p-4 rounded-xl border border-neutral-200 flex items-center gap-3 text-xs sm:text-sm text-neutral-700">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Our 24/7 Group Air Desk is reviewing airline block inventory for your itinerary. A contracted proposal will be sent to <strong>{quoteData.email}</strong> within 60 minutes.
                </span>
              </div>

              {/* Submitted Details Grid */}
              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <h2 className="text-base font-bold text-ink uppercase tracking-wider text-xs">
                  Submitted Itinerary & Passenger Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-soft/50 p-6 rounded-2xl border border-neutral-200">
                  <div>
                    <span className="text-xs text-neutral-500 block">Primary Contact</span>
                    <span className="font-bold text-ink">{quoteData.fullName}</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Contact Information</span>
                    <span className="font-semibold text-ink">{quoteData.email}</span>
                    <span className="text-xs text-neutral-600 block">{quoteData.phone}</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Routing</span>
                    <span className="font-bold text-ink">
                      {quoteData.origin} &rarr; {quoteData.destination}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Group Size</span>
                    <span className="font-bold text-primary">
                      {quoteData.travellers} Passengers
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Departure Date</span>
                    <span className="font-semibold text-ink">{quoteData.departureDate}</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Return Date</span>
                    <span className="font-semibold text-ink">
                      {quoteData.returnDate || "One-Way Flight"}
                    </span>
                  </div>

                  {quoteData.airlineContext && (
                    <div className="sm:col-span-2">
                      <span className="text-xs text-neutral-500 block">Preferred Carrier Desk</span>
                      <span className="font-semibold text-primary">{quoteData.airlineContext}</span>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <span className="text-xs text-neutral-500 block">Routing Preference</span>
                    <span className="font-medium text-ink">
                      {quoteData.directPreferred ? "Direct flights requested where available" : "Connecting or direct acceptable for best rate"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thank You Note & Next Steps */}
              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <h3 className="text-lg font-bold text-ink">
                  Thank You for Choosing {siteConfig.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Your dedicated flight broker will analyze group tariff allocations across competing airline alliances to deliver optimal per-seat pricing, flexible deposit terms, and generous baggage allowances.
                </p>
                <p className="text-xs text-neutral-500">
                  If you need immediate adjustments or have urgent deadline constraints, feel free to call our direct dispatch line at <strong>{siteConfig.phone}</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-neutral-200">
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Homepage</span>
                </Link>

                <Link
                  href="/airlines"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-ink hover:bg-neutral-800 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-sm transition-all"
                >
                  <span>Explore Partner Airlines</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
