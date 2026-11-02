import { Star, MessageSquareQuote, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const featured = testimonials[0];
  const remaining = testimonials.slice(1);

  return (
    <section className="py-20 lg:py-24 bg-white text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Verified Client Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
            What Group Travel Organizers Say About Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Read direct feedback from event planners, corporate travel managers, professors, and athletic directors who rely on our group flight contracts.
          </p>
        </div>

        {/* Testimonials Grid with Larger Featured First Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* 1. Larger Featured Card (Spans 2 Columns on Desktop) */}
          {featured && (
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-gradient-to-br from-white via-blue-50/30 to-white border border-blue-200/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Stars in Royal Blue */}
                  <div className="flex items-center gap-1">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-bold text-primary shadow-2xs">
                    {featured.groupSize}
                  </span>
                </div>

                <div className="relative mb-8">
                  <Quote className="w-10 h-10 text-primary/15 absolute -top-3 -left-2 -z-0" />
                  <p className="relative z-10 text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
                    &ldquo;{featured.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author with Initials Avatar */}
              <div className="pt-6 border-t border-blue-100 flex items-center gap-4">
                <div className="w-13 h-13 rounded-full bg-primary text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                  {getInitials(featured.name)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink">
                    {featured.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {featured.role}, <span className="text-ink font-semibold">{featured.company}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Testimonials Cards */}
          {remaining.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Group Size Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#F3F7FF] border border-blue-100 text-xs font-bold text-neutral-700">
                    {t.groupSize}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with Initials Avatar */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {getInitials(t.name)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">
                    {t.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {t.role}, <span className="text-ink font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
