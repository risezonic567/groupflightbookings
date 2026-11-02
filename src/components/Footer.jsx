import Link from "next/link";
import { Plane, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-neutral-300 border-t border-neutral-800">
      {/* Trust & Guarantee Highlights Bar */}
      <div className="border-b border-neutral-800 py-8 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Guaranteed Group Rates</h4>
                <p className="text-sm text-neutral-400">
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
                <p className="text-sm text-neutral-400">
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
                <p className="text-sm text-neutral-400">
                  Direct phone access to senior flight brokers for live support and contingency planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
                <Plane className="w-5 h-5 text-white rotate-45" />
              </div>
              <span className="font-bold text-lg text-white">
                Group Flight <span className="text-primary">Bookings</span>
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Specialized group air travel contracting and management for corporate summits, university cohorts, tour operators, and delegations worldwide.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-neutral-300">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Top Airlines
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.topAirlines.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Group Travel Solutions */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Group Travel
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.groupTravel.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved. Registered group aviation service provider.
          </p>
          <div className="flex items-center gap-6">
            <span>Locked Fares Guaranteed</span>
            <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
            <span>24/7 Global Air Dispatch</span>
            <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Air Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

