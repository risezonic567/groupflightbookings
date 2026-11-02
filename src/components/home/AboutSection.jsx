import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PlaneTakeoff } from "lucide-react";

export default function AboutSection() {
  const keyPoints = [
    {
      title: "Direct Airline GDS Access",
      desc: "Official commercial ticketing authority with over 450 international scheduled airlines."
    },
    {
      title: "Centralized Invoicing & Net Terms",
      desc: "Consolidated master receipts, institutional purchase orders, and multi-currency billing."
    },
    {
      title: "24/7 Operations Duty Officers",
      desc: "Real-time proactive re-routing during hub disruptions, weather delays, and schedule changes."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Overlapping 15+ Years Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200/80 shadow-lg bg-slate-900 aspect-[4/3] w-full">
              {/* TODO: Replace with official airline desk / photography when high-res assets are provided */}
              <Image
                src="/images/about.svg"
                alt="About Group Flight Bookings - Global Air Desk Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* "15+ Years" Blue Card Overlapping the Image Corner */}
            <div className="absolute -bottom-5 -right-4 sm:bottom-6 sm:-right-6 bg-primary text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-primary-dark/40 flex items-center gap-3.5 z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <PlaneTakeoff className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <p className="text-2xl font-black leading-tight text-white">15+ Years</p>
                <p className="text-xs text-blue-100 font-semibold tracking-wide uppercase">Bespoke Aviation Brokering</p>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-primary">
              <span>About Group Flight Bookings</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              A Dedicated Air Desk Built Exclusively for Parties of 10 or More
            </h2>

            {/* Two Shorter Paragraphs */}
            <p className="text-base text-neutral-600 leading-relaxed">
              Standard consumer booking engines are programmed to penalize multiple bookings, artificially inflating prices as available seats in a fare bucket diminish. Group Flight Bookings was established to eliminate this friction entirely.
            </p>

            <p className="text-base text-neutral-600 leading-relaxed">
              By working directly with airline group revenue desks across OneWorld, Star Alliance, SkyTeam, and independent global carriers, we negotiate bespoke contracts that fix seat prices, defer passenger manifest submission, and provide flexible deposit milestones.
            </p>

            {/* Key Points List with Blue Check Icons */}
            <div className="space-y-3.5 pt-2">
              {keyPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-sm text-neutral-700 leading-normal">
                    <strong className="text-ink font-bold">{point.title}:</strong> {point.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Button */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm h-12 px-6 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <span>Read More About Our Air Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
