import { CheckCircle2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 border-b border-neutral-800">
      {/* Authentic travel background photography with sophisticated dark contrast overlay */}
      <Image
        src="/banner/BEACH.jpg.jpeg"
        alt="Group travel destination"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/90"
      />

      {/* ---------- Content ---------- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header text */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Commercial Airline Group Allocations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Your Global Group Travel Specialists
          </h1>

          <h2 className="text-base sm:text-xl font-medium text-neutral-200 text-balance">
            Exclusively Group Travel. Expertly Done.
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            You bring the travellers. We&apos;ll bring the strategy, structure, and savings.
          </p>
        </div>

        {/* Search form */}
        <QuoteForm variant="bar" />

        {/* Clean trust line below search form */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-300">
          {["450+ airlines worldwide", "Dedicated group flight desk", "Free, no-obligation quote"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}