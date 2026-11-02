import { CheckCircle2, TrendingDown, Percent, Sparkles } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { saveBenefits } from "@/data/stats";

export default function SaveSection() {
  return (
    <section className="py-20 lg:py-24 bg-ink text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Benefits & Value Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-semibold text-primary">
              <Percent className="w-3.5 h-3.5" />
              <span>Direct Group Tariff Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Save Up to <span className="text-primary">30%</span> on Group Flight Contracts
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed">
              When booking 10 or more passengers, retail travel algorithms automatically escalate seat prices with every ticket purchased. Our air desk operates outside consumer pricing channels to secure volume-contracted tariffs.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 pt-2">
              {saveBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-neutral-200 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stat Callout */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-5 mt-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary shrink-0">
                \$320+
              </div>
              <div className="text-xs sm:text-sm text-neutral-300">
                Average savings achieved per passenger on long-haul international group itineraries compared to retail pricing.
              </div>
            </div>
          </div>

          {/* Right Column: Second QuoteForm instance */}
          <div className="lg:col-span-6">
            <QuoteForm
              title="Compare Group Contract Tariffs"
              subtitle="Submit your travel criteria to lock your per-seat group rate."
              className="border-neutral-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

