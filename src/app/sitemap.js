import { airlines } from "@/data/airlines";
import { blogs } from "@/data/blogs";

export default function sitemap() {
  const baseUrl = "https://groupflightbookings.com";

  // Core static pages
  const staticRoutes = [
    "",
    "/airlines",
    "/blog",
    "/contact",
    "/quote-confirmation"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  // Dynamic airline slug pages
  const airlineRoutes = airlines.map((airline) => ({
    url: `${baseUrl}/airlines/${airline.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.85
  }));

  // Dynamic blog slug pages
  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...airlineRoutes, ...blogRoutes];
}

