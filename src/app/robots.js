export default function robots() {
  const baseUrl = "https://groupflightbookings.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}

