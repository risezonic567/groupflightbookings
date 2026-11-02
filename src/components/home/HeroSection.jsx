import { CheckCircle2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] pt-12 sm:pt-16 lg:pt-20 pb-14 lg:pb-20 border-b border-neutral-200">
      <Image
        src="/banner/BEACH.jpg.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* ---------- Background (sirf decoration, content ko disturb nahi karta) ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Soft primary glow */}
        <div className="absolute left-1/2 top-[-180px] h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        {/* Dotted grid, neeche fade ho jata hai */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: "radial-gradient(#cfd4dc 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
          }}
        />

        {/* Flight-path curves */}
        <svg
          className="absolute inset-x-0 top-6 hidden h-[360px] w-full sm:block"
          viewBox="0 0 1200 360"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-20 300 C 260 40, 700 20, 1220 230"
            stroke="#c5ccd8"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M-20 340 C 320 120, 760 100, 1220 300"
            stroke="#dde2ea"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <circle cx="60" cy="238" r="5" className="fill-primary" />
          <circle cx="1140" cy="206" r="5" className="fill-primary" />
        </svg>
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header text */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-300 text-xs font-bold text-ink shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Commercial Airline Group Allocations (10+ Passengers)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight text-balance">
            Your Global Group Travel Specialists
          </h1>

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-neutral-800 text-balance">
            Exclusively Group Travel. Expertly Done.
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            You bring the travellers. We&apos;ll bring the strategy, structure, and savings.
          </p>
        </div>

        {/* Search form (aapka existing QuoteForm, bilkul same) */}
        <QuoteForm variant="bar" />

        {/* Chhoti si trust line form ke neeche */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-700">
          {["450+ airlines worldwide", "Groups of 10+ passengers", "Free, no-obligation quote"].map((t) => (
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