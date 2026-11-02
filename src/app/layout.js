import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  metadataBase: new URL("https://groupflightbookings.com"),
  title: {
    default: "Group Flight Bookings | Discounted Airline Tickets for 10+ Passengers",
    template: "%s | Group Flight Bookings"
  },
  description: siteConfig.description,
  keywords: [
    "group flight bookings",
    "airline tickets for groups",
    "corporate flight booking",
    "cheap group flights",
    "student flight delegations",
    "event flights",
    "MICE air travel",
    "group airline rates"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://groupflightbookings.com",
    title: "Group Flight Bookings | Special Airline Rates for 10+ Passengers",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero.svg",
        width: 800,
        height: 600,
        alt: "Group Flight Bookings - Global Air Travel Desk"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Flight Bookings | Special Airline Rates for 10+ Passengers",
    description: siteConfig.description,
    images: ["/images/hero.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-full flex flex-col antialiased text-ink bg-white overflow-x-clip`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
