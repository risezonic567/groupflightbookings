import Image from "next/image";
import { Star, Quote, MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft border border-neutral-300 text-xs font-semibold text-primary mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Verified Client Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            What Group Travel Organizers Say About Us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600">
            Read direct feedback from event planners, corporate travel managers, professors, and athletic directors who rely on our group flight contracts.
          </p>
        </div>

        {/* Testimonials Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Group Size Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-soft border border-neutral-200 text-xs font-semibold text-neutral-700">
                    {t.groupSize}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-neutral-200 shrink-0 bg-soft">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">
                    {t.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {t.role}, <span className="text-ink font-medium">{t.company}</span>
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

