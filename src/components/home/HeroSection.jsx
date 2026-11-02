import Image from "next/image";
import { ShieldCheck, CheckCircle2, Clock, Headphones } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-32 border-b border-neutral-900 bg-[#0A1628]">
      {/* Background Image with Dark Navy-to-Black Gradient Overlay (60-75% to 90% opacity) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner/BEACH.jpg.jpeg"
          alt="Group Flight Bookings - Global Commercial Aviation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy to deep black gradient overlay for high contrast readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/30 via-[#0A1628]/35 to-[#0A0A0A]/45"
          aria-hidden="true"
        />
      </div>

      {/* Decorative Subtle Flight Vectors */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          }}
        />
        <svg
          className="absolute inset-x-0 top-12 hidden h-[380px] w-full sm:block opacity-30"
          viewBox="0 0 1200 380"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-20 300 C 260 40, 700 20, 1220 230"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M-20 340 C 320 120, 760 100, 1220 300"
            stroke="#60A5FA"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Centered Heading Block */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="tracking-wide uppercase text-[11px] sm:text-xs">
              Commercial Airline Group Allocations (10+ Passengers)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] text-balance">
            Your Global Group Travel Specialists
          </h1>

          <p className="text-lg sm:text-2xl font-semibold text-blue-200/95 text-balance">
            Exclusively Group Travel. Expertly Done.
          </p>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            You bring the travellers. We&apos;ll bring the strategy, structure, and savings.
          </p>
        </div>

        {/* Large Flight Search Card overlapping bottom of Hero */}
        <div className="relative z-10 -mb-16 sm:-mb-24">
          <QuoteForm variant="bar" />

          {/* Trust Strip Directly Below Form */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span>No obligation</span>
            </li>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-600" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span>Free name changes</span>
            </li>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-600" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </span>
              <span>24/7 air desk</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
