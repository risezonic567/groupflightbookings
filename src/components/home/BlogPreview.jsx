import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { blogs } from "@/data/blogs";

export default function BlogPreview() {
  const latestPosts = blogs.slice(0, 3);

  return (
    <section className="py-20 bg-soft text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-300 text-xs font-semibold text-primary mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aviation & Group Travel Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
              Latest Group Flight Articles
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Contract negotiation tips, airline group policies, and risk mitigation strategies.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors self-start sm:self-auto"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-neutral-900">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-primary transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

