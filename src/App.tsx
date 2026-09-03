import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { OurCraftSection } from "@/components/sections/OurCraftSection";
import { FeaturedPastriesSection } from "@/components/sections/FeaturedPastriesSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { MenuPreviewSection } from "@/components/sections/MenuPreviewSection";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <OurCraftSection />
        <FeaturedPastriesSection />
        <OurStorySection />
        <ExperienceSection />
        <MenuPreviewSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
