import { Building2, Landmark, GraduationCap, Calendar, HeartHandshake, Compass, Users } from "lucide-react";
import { clientSectors } from "@/data/stats";

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
    <section className="py-20 lg:py-24 bg-[#F3F7FF] text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Dedicated Group Sectors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
            Who We Proudly Serve
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            From Fortune 500 corporate summits to university delegations and humanitarian relief missions, our air desk customizes contracts for every travel mandate.
          </p>
        </div>

        {/* 6 Neat Cards in 2 Rows x 3 Columns (Global Card System) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {clientSectors.map((sector, idx) => {
            const Icon = sectorIcons[idx % sectorIcons.length];

            return (
              <div
                key={sector.title}
                className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Larger Icon in Blue-Tinted Square */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-5 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-ink mb-2.5">
                    {sector.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
