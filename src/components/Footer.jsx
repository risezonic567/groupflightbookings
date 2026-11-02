import Link from "next/link";
import { Plane, Phone, Mail, MapPin, ShieldCheck, Clock, Award, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-ink text-neutral-300 border-t border-neutral-800">
        {/* Trust & Guarantee Highlights Bar */}
        <div className="border-b border-neutral-800 py-10 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Guaranteed Group Rates</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Fixed per-passenger pricing protected from public airline fare hikes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Flexible Name Deadlines</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Hold seat allocations now and finalize traveler manifests before flight day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">24/7 Dedicated Air Desk</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Direct phone access to senior flight brokers for live support and contingency planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links (Enhanced Spacing & 14-15px Typography) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-14">
            {/* Brand & Contact Column */}
            <div className="lg:col-span-1 space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                  <Plane className="w-5 h-5 text-white rotate-45" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Group Flight <span className="text-primary">Bookings</span>
                </span>
              </Link>

              <p className="text-sm sm:text-[15px] text-neutral-400 leading-relaxed">
                Specialized group air travel contracting and management for corporate summits, university cohorts, tour operators, and delegations worldwide.
              </p>

              <div className="space-y-3 pt-2 text-sm sm:text-[15px] text-neutral-300">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span>{siteConfig.address}</span>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                Destinations
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-[15px]">
                {siteConfig.footerLinks.destinations.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Airlines */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                Top Airlines
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-[15px]">
                {siteConfig.footerLinks.topAirlines.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group Travel Solutions */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                Group Travel
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-[15px]">
                {siteConfig.footerLinks.groupTravel.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                Company
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-[15px]">
                {siteConfig.footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="border-t border-neutral-800 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>
              &copy; {currentYear} {siteConfig.name}. All rights reserved. Registered group aviation service provider.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-neutral-400">
              <span>Locked Fares Guaranteed</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
              <span>24/7 Global Air Dispatch</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Air Desk
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating 24/7 Air Desk Chat / WhatsApp Button */}
      {/* Positioned fixed bottom-6 lg:bottom-20 right-6 so it NEVER covers desktop footer links */}
      <aside aria-label="Quick Support" className="fixed bottom-6 lg:bottom-20 right-6 z-40 group">
        <a
          href={`https://wa.me/18004567890?text=${encodeURIComponent("Hello Group Flight Bookings, I would like to inquire about group rates for 10+ passengers.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-primary hover:bg-primary-dark text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Chat with 24/7 Air Desk on WhatsApp"
        >
          {/* Active Online Pulse Dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-75" />
            <span className="absolute w-2 h-2 rounded-full bg-primary" />
          </span>

          <MessageCircle className="w-7 h-7 text-white" />

          {/* Tooltip on Hover */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 border border-neutral-800">
            24/7 Air Desk WhatsApp
          </span>
        </a>
      </aside>
    </>
  );
}
