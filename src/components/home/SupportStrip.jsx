import { PhoneCall, Mail, Headphones, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function SupportStrip() {
  return (
    <section className="bg-primary text-white py-20 lg:py-24 border-b border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: Message */}
          <div className="text-center lg:text-left space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
              <Headphones className="w-3.5 h-3.5" />
              <span>Dedicated Air Travel Brokers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Need Immediate Group Flight Assistance?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
              Our 24/7 aviation operations desk is on standby to negotiate seat blocks, handle last-minute name additions, or provide emergency flight re-routing.
            </p>
          </div>

          {/* Right: Contact buttons (Primary Call, Secondary Outline Email) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            {/* Primary Button */}
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 bg-ink hover:bg-black text-white font-bold text-sm px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-center"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Call {siteConfig.phone}</span>
            </a>

            {/* Secondary Outline Button */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-sm px-8 rounded-lg transition-all text-center"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        {/* 3 Small Feature Items Below */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-4 text-xs sm:text-sm font-semibold text-blue-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Direct GDS Airline Desks</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>Dedicated Dispatch Agent</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white shrink-0" />
            <span>24/7 Operations Oversight</span>
          </div>
        </div>
      </div>
    </section>
  );
}
