import { CheckCircle2, Percent, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { saveBenefits } from "@/data/stats";

export default function SaveSection() {
  return (
    <section className="py-20 lg:py-24 bg-ink text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Benefits & Value Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-primary">
              <Percent className="w-3.5 h-3.5" />
              <span>Direct Group Tariff Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Save Up to <span className="text-primary">30%</span> on Group Flight Contracts
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed">
              When booking 10 or more passengers, retail travel algorithms automatically escalate seat prices with every ticket purchased. Our air desk operates outside consumer pricing channels to secure volume-contracted tariffs.
            </p>

            {/* 6 Bullet Points Converted into a 2x3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {saveBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Large Blue Highlighted Stat Callout */}
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-6 mt-8 shadow-lg">
              <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight shrink-0">
                $320+
              </div>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Average savings achieved per passenger on long-haul international group itineraries compared to retail online pricing.
              </div>
            </div>
          </div>

          {/* Right Column: White Quote Request Form Card */}
          <div className="lg:col-span-6">
            <QuoteForm
              variant="card"
              title="Request a Group Flight Proposal"
              subtitle="Submit your group route details to lock direct airline tariffs within 60 minutes."
              className="border-neutral-200/90 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
