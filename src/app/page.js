import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutSection from "@/components/home/AboutSection";
import SaveSection from "@/components/home/SaveSection";
import TailoredSolutions from "@/components/home/TailoredSolutions";
import TrustedNumbers from "@/components/home/TrustedNumbers";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import SupportStrip from "@/components/home/SupportStrip";

export default function HomePage() {
  return (
    <>
      {/* 3. Hero Section with Headline & QuoteForm */}
      <HeroSection />

      {/* 4. Why Choose Us with 4 Features & 2 Big Stats */}
      <WhyChooseUs />

      {/* 5. About Company with Image & Link */}
      <AboutSection />

      {/* 6. Save up to 30% on Group Flights with Benefits & Second QuoteForm */}
      <SaveSection />

      {/* 7. Tailored Solutions: Corporate, Events/MICE, Education */}
      <TailoredSolutions />

      {/* 8. Trusted in Numbers & Who We Serve */}
      <TrustedNumbers />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Blog Preview (Latest 3 Posts) */}
      <BlogPreview />

      {/* 11. Support Strip (24/7 Phone & Email) */}
      <SupportStrip />
    </>
  );
}
