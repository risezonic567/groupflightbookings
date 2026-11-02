import Link from "next/link";
import { Briefcase, CalendarCheck, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import { tailoredSolutions } from "@/data/stats";

export default function TailoredSolutions() {
  const iconMap = {
    corporate: Briefcase,
    events: CalendarCheck,
    education: GraduationCap
  };

  return (
    <section className="py-20 lg:py-24 bg-white text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <span>Specialized Flight Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
            Tailored Air Travel Solutions For Every Organization
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Different group travel categories require distinct ticketing rules, baggage provisions, and invoicing structures. Explore our purpose-built air programs.
          </p>
        </div>

        {/* 3 Tailored Solution Cards (Equal Height, Button Pinned to Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tailoredSolutions.map((solution) => {
            const Icon = iconMap[solution.id] || Briefcase;

            return (
              <div
                key={solution.id}
                className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Icon on Top */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary mb-6 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {solution.subtitle}
                  </span>

                  <h3 className="text-2xl font-bold text-ink mt-1.5 mb-3">
                    {solution.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {solution.desc}
                  </p>

                  {/* Key Program Features with Blue Check Icons */}
                  <div className="space-y-3 pt-4 border-t border-neutral-100">
                    <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2">
                      Key Program Features:
                    </p>
                    {solution.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Pinned to the Bottom */}
                <div className="pt-8 mt-6">
                  <Link
                    href={solution.href}
                    className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all text-center"
                  >
                    <span>{solution.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
