import { Shield, Layers, UserCheck, Headphones, TrendingUp, CheckCircle } from "lucide-react";
import { whyChooseFeatures, whyChooseStats } from "@/data/stats";

export default function WhyChooseUs() {
  const icons = [Shield, Layers, UserCheck, Headphones];

  return (
    <section id="how-it-works" className="py-20 bg-soft text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-300 text-xs font-semibold text-primary mb-3">
            <span>Specialized Air Brokerage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Why Experienced Organizers Choose Our Air Desk
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600">
            Booking group airfare directly through public airline websites triggers price spikes. We secure offline commercial contracts that guarantee low rates, flexible terms, and full passenger protection.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyChooseFeatures.map((feat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soft border border-neutral-200 flex items-center justify-center text-primary mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Standard in every contract</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Big Stat Numbers */}
        <div className="bg-ink rounded-3xl p-8 sm:p-12 text-white border border-neutral-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {whyChooseStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${idx === 1 ? "pt-8 md:pt-0 md:pl-8" : "pb-8 md:pb-0 md:pr-8"}`}
              >
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-lg font-bold text-white mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-neutral-400 max-w-xs">
                  Audited across scheduled commercial and charter group flights globally.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

