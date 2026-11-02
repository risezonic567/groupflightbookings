"use client";

import { PlaneTakeoff, PlaneLanding } from "lucide-react";

/**
 * Reusable AirportInput component.
 * Currently renders a formatted text input with icons.
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
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
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
        className={`w-full pl-10 pr-4 text-sm bg-white border border-neutral-300 text-ink placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${className}`}
      />

      {/* Autocomplete dropdown anchor slot for future API plugging */}
      <div id={`${name}-autocomplete-results`} className="hidden absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden">
        {/* Autocomplete items will render here */}
      </div>
    </div>
  );
}
