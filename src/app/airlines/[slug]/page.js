import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Plane, HelpCircle, PhoneCall } from "lucide-react";
import { airlines } from "@/data/airlines";
import { siteConfig } from "@/data/site";
import QuoteForm from "@/components/QuoteForm";

export async function generateStaticParams() {
  return airlines.map((airline) => ({
    slug: airline.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const airline = airlines.find((a) => a.slug === slug);

  if (!airline) {
    return {
      title: "Airline Not Found | Group Flight Bookings"
    };
  }

  return {
    title: `${airline.name} Group Bookings | Discounted Group Flight Rates (10+ Pax)`,
    description: `Official group booking desk for ${airline.name}. ${airline.shortText} Contracted tariffs, deferred name manifests, and 24/7 flight management.`,
    openGraph: {
      title: `${airline.name} Group Flight Bookings`,
      description: airline.shortText,
      images: [airline.image]
    }
  };
}

export default async function AirlineDetailPage({ params }) {
  const { slug } = await params;
  const airline = airlines.find((a) => a.slug === slug);

  if (!airline) {
    notFound();
  }

  return (
    <div className="bg-white text-ink">
      {/* Header Banner */}
      <section className="bg-ink text-white py-14 lg:py-16 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/airlines"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span>Back to All Partner Airlines</span>
            </Link>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-semibold text-primary">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Group Desk Contract Authority</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {airline.name} Group Flight Bookings
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {airline.shortText}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Quote Form Split Layout */}
      <section className="py-16 lg:py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Column: Airline Details & Policies */}
            <div className="lg:col-span-7 space-y-8">
              {/* Airline Visual Hero Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900">
                  <Image
                    src={airline.image}
                    alt={`${airline.name} Group Air Travel Desk`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 border-b border-neutral-100 pb-4">
                  <span className="flex items-center gap-1 text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> 10+ Passenger Minimum
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Locked Fares Guaranteed
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Flexible Name Deadlines
                  </span>
                </div>

                {/* HTML Content Body from data */}
                <div
                  className="prose max-w-none text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: airline.content }}
                />
              </div>

              {/* Group Booking FAQ callout */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-ink flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>Frequently Asked Questions for {airline.name} Groups</span>
                </h3>

                <div className="space-y-4 text-sm text-neutral-600">
                  <div>
                    <h4 className="font-bold text-ink">Can we hold seats on {airline.name} before knowing everyone&apos;s name?</h4>
                    <p className="mt-1">Yes. Group contracts require only an estimated headcount and a small deposit. Full passenger names are submitted 7 to 14 days before takeoff.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Are checked bags included in group fares?</h4>
                    <p className="mt-1">Yes, standard contracted group fares on {airline.name} include checked baggage allowances with optional group weight pooling.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Can passengers depart from different cities?</h4>
                    <p className="mt-1">Our air desk specializes in split-origin itineraries, consolidating arrivals at your destination on identical schedules.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quote Form for this specific airline */}
            <div className="lg:col-span-5 sticky top-28">
              <QuoteForm
                title={`Request ${airline.name} Group Quote`}
                subtitle={`Direct group rates for 10+ travelers on ${airline.name}. Response in 60 mins.`}
                airlineContext={airline.name}
                className="border-neutral-300"
              />

              {/* Direct Air Desk Phone Assistance */}
              <div className="mt-6 p-6 rounded-2xl bg-ink text-white border border-neutral-800 text-center space-y-3">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">
                  Prefer to speak with an aviation broker?
                </p>
                <p className="text-xl font-extrabold text-white">
                  {siteConfig.phone}
                </p>
                <p className="text-xs text-neutral-400">
                  Direct line to our senior airline contracting specialists. Available 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

