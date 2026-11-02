"use client";

import { PlaneTakeoff, PlaneLanding } from "lucide-react";

/**
 * Reusable AirportInput component.
 * Premium formatted input with airport/flight icons, consistent h-12 height,
 * clear placeholder styling, and autocomplete dropdown anchor.
 *
 * TODO: Integrate live airport autocomplete API (e.g. Amadeus, AviationStack, or FlightAware)
 * here. When plugged in, this component will manage its own autocomplete dropdown state,
 * debounced API fetch, and trigger onChange with the selected IATA airport code/city name.
 * The parent QuoteForm requires NO changes when autocomplete is connected.
 */
export default function AirportInput({
  name,
  value,
  onChange,
  placeholder,
  id,
  required = false,
  className = "",
  ariaLabel
}) {
  const isOrigin = name === "origin";

  return (
    <div className="relative w-full">
      {/* Flight Takeoff/Landing Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary z-10">
        {isOrigin ? (
          <PlaneTakeoff className="w-4 h-4 text-primary" />
        ) : (
          <PlaneLanding className="w-4 h-4 text-primary" />
        )}
      </div>

      <input
        type="text"
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        aria-label={ariaLabel || placeholder}
        className={`w-full h-12 pl-10 pr-3.5 text-sm bg-white text-slate-900 placeholder:text-neutral-400 font-medium rounded-xl border border-neutral-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${className}`}
      />

      {/* Autocomplete dropdown anchor slot for future API plugging */}
      <div
        id={`${name}-autocomplete-results`}
        className="hidden absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden"
      >
        {/* Autocomplete items will render here */}
      </div>
    </div>
  );
}
