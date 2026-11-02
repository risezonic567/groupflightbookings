import Link from "next/link";
import { Plane, ArrowLeft, Headphones } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Page Not Found | Group Flight Bookings",
  description: "The page you are looking for does not exist. Contact our 24/7 air desk for group flight booking support."
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-soft px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-soft border border-neutral-200 flex items-center justify-center text-primary mx-auto mb-6">
          <Plane className="w-8 h-8 rotate-45" />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Error 404
        </p>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-3">
          Flight Path Not Found
        </h1>

        <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
          The requested page or route could not be located. You can return to our homepage or contact our group flight specialists directly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-ink hover:bg-neutral-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
          >
            <Headphones className="w-4 h-4" />
            <span>Air Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

