import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollTrigger } from "@/lib/gsap";
import { HeroSection } from "@/components/sections/HeroSection";
import { OurCraftSection } from "@/components/sections/OurCraftSection";
import { FeaturedPastriesSection } from "@/components/sections/FeaturedPastriesSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { TextParallaxSection } from "@/components/sections/TextParallaxSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { MenuPreviewSection } from "@/components/sections/MenuPreviewSection";

export function HomePage() {
  useEffect(() => {
    const refresh = (): void => {
      ScrollTrigger.refresh();
    };

    const timer = window.setTimeout(refresh, 100);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <OurCraftSection />
        <FeaturedPastriesSection />
        <OurStorySection />
        <TextParallaxSection />
        <ExperienceSection />
        <MenuPreviewSection />
      </main>
      <Footer />
    </>
  );
}
