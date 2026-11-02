import { Phone, Mail, MapPin, Clock, ShieldCheck, Headphones, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contact 24/7 Group Flight Desk & Air Brokers",
  description: "Connect with dedicated group air travel brokers for immediate quotations on 10+ passengers, flight disruptions, contract terms, and specialized routing."
};

export default function ContactPage() {
  return (
    <div className="bg-white text-ink">
      {/* Header Banner */}
      <section className="bg-ink text-white py-16 lg:py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-semibold text-primary">
              <Headphones className="w-3.5 h-3.5" />
              <span>Direct Flight Desk Access</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contact Our 24/7 Group Flight Desk
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Have an upcoming conference, corporate delegation, university tour, or sports event? Reach our senior aviation brokers directly or submit a group quote request below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Contact Info + QuoteForm Split */}
      <section className="py-16 lg:py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Column: Direct Contact Details & Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-ink">
                  Direct Air Desk Channels
                </h2>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  Our group desk operates around the clock. Every inquiry is assigned to a named aviation specialist who manages contract negotiation through to departure.
                </p>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-soft border border-neutral-200 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold">24/7 Telephone</p>
                      <a
                        href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-lg font-bold text-ink hover:text-primary transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                      <p className="text-xs text-neutral-500">Live human response within 3 rings</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-soft border border-neutral-200 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Email Dispatch</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-base font-bold text-ink hover:text-primary transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                      <p className="text-xs text-neutral-500">Fast quotes within 60 minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-soft border border-neutral-200 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Corporate Headquarters</p>
                      <p className="text-sm font-semibold text-ink">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-soft border border-neutral-200 flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold">Desk Availability</p>
                      <p className="text-sm font-semibold text-ink">
                        {siteConfig.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLA & Commitment Box */}
              <div className="bg-ink rounded-3xl p-8 border border-neutral-800 text-white space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Our Service Level Commitment</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Guaranteed Quote Turnaround
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  We acknowledge all formal group requests within 15 minutes and deliver contracted airline quote options within 60 minutes during standard global operating hours.
                </p>
                <div className="pt-2 flex flex-col gap-2 text-xs text-neutral-400">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Multi-alliance flight comparison
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Transparent milestone payment plans
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Free name changes before ticketing
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Reusable QuoteForm */}
            <div className="lg:col-span-7">
              <QuoteForm
                title="Submit a Group Flight Request"
                subtitle="Fill in your travel specs below to receive custom contracted group airline rates."
                className="border-neutral-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

