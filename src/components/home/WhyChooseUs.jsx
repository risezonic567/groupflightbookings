import { Shield, Layers, UserCheck, Headphones, CheckCircle2 } from "lucide-react";
import { whyChooseFeatures } from "@/data/stats";

export default function WhyChooseUs() {
  const icons = [Shield, Layers, UserCheck, Headphones];

  const mergedStats = [
    { value: "125,000+", label: "Group Travelers Booked", sub: "Global flights managed" },
    { value: "2,400+", label: "Corporate & MICE Delegations", sub: "Executive & summit travel" },
    { value: "85+", label: "Countries Served Worldwide", sub: "Contracted routes" },
    { value: "98.7%", label: "Group On-Time Departure Rate", sub: "Audited flight performance" }
  ];

  return (
    <>
      {/* 3. Why Experienced Organizers Choose Our Air Desk (Background: #F3F7FF) */}
      <section id="how-it-works" className="pt-28 sm:pt-36 pb-20 sm:pb-24 bg-[#F3F7FF] text-ink border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold text-primary uppercase tracking-wider mb-3">
              <span>Specialized Air Brokerage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
              Why Experienced Organizers Choose Our Air Desk
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Booking group airfare directly through public airline websites triggers algorithmic price spikes. We secure offline commercial contracts that guarantee low rates, flexible terms, and full passenger protection.
            </p>
          </div>

          {/* 4 Feature Cards (Global Card System) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseFeatures.map((feat, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Blue-tinted rounded icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-5 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Single Standard in Every Contract Note */}
          <div className="mt-12 text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 bg-white px-4 py-2 rounded-full border border-neutral-200/80 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Standard in every commercial airline group contract</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Merged Stats Strip: 4 big numbers in one row on Black Background */}
      <section className="bg-ink text-white py-16 sm:py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            {mergedStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center px-4 ${
                  idx > 0 ? "pt-6 lg:pt-0" : ""
                }`}
              >
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-bold text-white mb-1 uppercase tracking-wide">
                  {stat.label}
                </span>
                <span className="text-xs text-neutral-400">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
