import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { blogs } from "@/data/blogs";

export const metadata = {
  title: "Group Flight Booking Guides & Airline Policy Insights",
  description: "Comprehensive guides on negotiating group air contracts, managing deposit schedules, avoiding fare surges, and orchestrating conference flights for 10+ passengers."
};

export default function BlogListPage() {
  return (
    <div className="bg-white text-ink">
      {/* Page Header */}
      <section className="bg-ink text-white py-16 lg:py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-semibold text-primary">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aviation Group Desk Knowledge Base</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Group Flight Booking Guides & Insights
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Expert advice from senior flight brokers. Learn how to protect your organization from fare volatility, negotiate milestone deposit terms, and coordinate complex multi-city delegations.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-video bg-neutral-900 overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{post.date}</span>
                    </div>

                    <h2 className="text-xl font-bold text-ink group-hover:text-primary transition-colors leading-snug mb-3">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink group-hover:text-primary transition-colors"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

