import { PhoneCall, Mail, Headphones, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function SupportStrip() {
  return (
    <section className="bg-primary text-white py-12 border-b border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Message */}
          <div className="text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white">
              <Headphones className="w-3.5 h-3.5" />
              <span>Dedicated Air Travel Brokers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need Immediate Group Flight Assistance?
            </h2>
            <p className="text-sm text-white/90 max-w-xl">
              Our 24/7 aviation operations desk is on standby to negotiate seat blocks, handle last-minute name additions, or provide emergency flight re-routing.
            </p>
          </div>

          {/* Right: Contact buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2.5 bg-ink hover:bg-black text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Call {siteConfig.phone}</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-soft text-ink font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

