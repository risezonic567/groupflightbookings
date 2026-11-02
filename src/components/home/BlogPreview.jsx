import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, Tag } from "lucide-react";
import { blogs } from "@/data/blogs";

export default function BlogPreview() {
  const latestPosts = blogs.slice(0, 3);

  const getCategory = (slug) => {
    if (slug.includes("deposit") || slug.includes("schedule")) return "Contract Policies";
    if (slug.includes("corporate") || slug.includes("mice")) return "Corporate Travel";
    return "Aviation Strategy";
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F3F7FF] text-ink border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold uppercase tracking-wider text-primary mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aviation & Group Travel Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
              Latest Group Flight Articles
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600">
              Contract negotiation tips, airline group policies, and risk mitigation strategies.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors self-start sm:self-auto bg-white px-5 py-2.5 rounded-lg border border-blue-200 shadow-2xs hover:shadow-xs"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Post Cards (Global Card System, 16:9 aspect-video) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* 16:9 Thumbnail Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-900">
                {/* TODO: Replace with live airline photography when ready */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Badge Overlaid on Image */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    <Tag className="w-3 h-3 text-primary" />
                    <span>{getCategory(post.slug)}</span>
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 border-t border-neutral-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-primary-dark transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
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
