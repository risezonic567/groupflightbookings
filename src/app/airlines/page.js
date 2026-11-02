import Image from "next/image";
import Link from "next/link";
import { Plane, ShieldCheck, ArrowRight, CheckCircle2, Globe2 } from "lucide-react";
import { airlines } from "@/data/airlines";

export const metadata = {
  title: "Partner Airlines & Group Travel Desks",
  description: "Browse discounted group airfare policies, baggage allowances, and contract terms across our 450+ global airline partners including British Airways, Emirates, Lufthansa, and Delta."
};

export default function AirlinesPage() {
  return (
    <div className="bg-white text-ink">
      {/* Page Header Banner */}
      <section className="bg-ink text-white py-16 lg:py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-semibold text-primary">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Commercial Carrier Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Partner Airlines & Group Air Desks
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              We hold direct GDS group allocations and bilateral contracting authority with the world&apos;s leading commercial airlines. Explore dedicated group ticketing rules, deposit schedules, and baggage pooling terms below.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Star Alliance Partners
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> OneWorld Alliances
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> SkyTeam Network
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Airlines Grid Section */}
      <section className="py-16 lg:py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {airlines.map((airline) => (
              <div
                key={airline.slug}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                    <Image
                      src={airline.image}
                      alt={`${airline.name} Group Bookings`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Direct Group Desk</span>
                    </div>

                    <h2 className="text-xl font-bold text-ink group-hover:text-primary transition-colors mb-3">
                      <Link href={`/airlines/${airline.slug}`}>
                        {airline.name}
                      </Link>
                    </h2>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {airline.shortText}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/airlines/${airline.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-soft hover:bg-primary text-ink hover:text-white font-semibold text-xs py-3 px-4 rounded-xl border border-neutral-200 hover:border-primary transition-all text-center"
                  >
                    <span>View Group Policy & Rates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

