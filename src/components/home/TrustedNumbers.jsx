import { Building2, Landmark, GraduationCap, Calendar, HeartHandshake, Compass, Users2 } from "lucide-react";
import { trustedNumbers, clientSectors } from "@/data/stats";

export default function TrustedNumbers() {
  const sectorIcons = [
    Building2,
    Landmark,
    GraduationCap,
    Calendar,
    HeartHandshake,
    Compass
  ];

  return (
    <section className="py-20 bg-soft text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-300 text-xs font-semibold text-primary mb-3">
            <Users2 className="w-3.5 h-3.5" />
            <span>Scale & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Trusted in Numbers Across Global Aviation
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600">
            From Fortune 500 summits to humanitarian emergency deployments, our air desk delivers seamless logistics for groups of any scale.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {trustedNumbers.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm text-center flex flex-col justify-center items-center"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Who We Serve Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
            Who We Proudly Serve
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientSectors.map((sector, idx) => {
              const Icon = sectorIcons[idx % sectorIcons.length];

              return (
                <div
                  key={sector.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-soft transition-colors border border-transparent hover:border-neutral-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-soft border border-neutral-200 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-ink mb-1">
                      {sector.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

