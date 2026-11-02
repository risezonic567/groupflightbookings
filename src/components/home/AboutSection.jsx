import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCheck, PlaneTakeoff, ShieldAlert, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-soft">
              <Image
                src="/images/about.svg"
                alt="About Group Flight Bookings - Global Air Desk Operations"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 bg-white p-5 rounded-2xl shadow-xl border border-neutral-200">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                <PlaneTakeoff className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-ink">15+ Years</p>
                <p className="text-xs text-neutral-500 font-medium">Bespoke Aviation Brokering</p>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft border border-neutral-300 text-xs font-semibold text-primary">
              <span>About Group Flight Bookings</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight">
              A Dedicated Air Desk Built Exclusively for Parties of 10 or More
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed">
              Standard consumer booking engines are programmed to penalize multiple bookings, artificially inflating prices as available seats in a fare bucket diminish. Group Flight Bookings was established to eliminate this friction.
            </p>

            <p className="text-sm text-neutral-600 leading-relaxed">
              By working directly with airline group revenue desks across OneWorld, Star Alliance, SkyTeam, and independent global carriers, we negotiate bespoke contracts that fix seat prices, defer passenger manifest submission, and provide flexible payment milestones.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>Direct Airline GDS Access:</strong> Official commercial ticketing authority with over 450 international airlines.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>Centralized Invoicing:</strong> Consolidated master receipts, institutional purchase orders, and multi-currency billing.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">
                  <strong>24/7 Operations Duty Officers:</strong> Real-time proactive re-routing during hub disruptions and weather delays.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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

