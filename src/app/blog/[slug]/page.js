import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { blogs } from "@/data/blogs";
import { siteConfig } from "@/data/site";

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Group Flight Bookings"
    };
  }

  return {
    title: `${post.title} | Group Flight Bookings`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogs.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-white text-ink">
      {/* Article Header Banner */}
      <section className="bg-ink text-white py-14 lg:py-16 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span>Back to Knowledge Base</span>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {post.date}
              </span>
              <span>•</span>
              <span>Group Flight Operations Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-16 bg-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-neutral-200 shadow-sm space-y-8">
            {/* Feature Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Post Content */}
            <div
              className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Callout Card */}
            <div className="mt-10 p-8 rounded-2xl bg-ink text-white border border-neutral-800 space-y-4">
              <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Ready to Lock in Group Flight Rates?</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Speak With an Aviation Contract Broker
              </h3>
              <p className="text-sm text-neutral-300">
                Whether you need 10 seats for a business conference or 200 seats for a global summit, our air desk negotiates guaranteed locked pricing and flexible deposit terms.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  <span>Request Group Flight Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-6 py-3 rounded-xl border border-neutral-700 transition-all"
                >
                  <span>Call {siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="mt-16 pt-12 border-t border-neutral-300">
            <h2 className="text-2xl font-bold text-ink mb-8">
              Related Group Flight Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-xs text-neutral-500 mb-2">
                      {related.date}
                    </div>
                    <h3 className="text-base font-bold text-ink group-hover:text-primary transition-colors leading-snug mb-2">
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>
                  </div>

                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors pt-4 mt-2 border-t border-neutral-100"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

