import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieParallaxScene } from "@/components/three/CookieParallaxScene";
import { ScrollTrigger } from "@/lib/gsap";

const SECTIONS = [
  {
    id: "intro",
    eyebrow: "Scroll Experiment",
    title: "A Cookie In Motion",
    body:
      "Scroll to guide our signature crust through space — drifting, flipping, and zooming as you move through each chapter of the bake.",
    theme: "light" as const,
    align: "left" as const,
  },
  {
    id: "drift",
    eyebrow: "Chapter One",
    title: "Golden Drift",
    body:
      "Watch the cookie sweep across the frame as warm light catches every ridge. Like dough resting on the bench, it moves with quiet confidence.",
    theme: "cream" as const,
    align: "right" as const,
  },
  {
    id: "flip",
    eyebrow: "Chapter Two",
    title: "Mid-Air Flip",
    body:
      "A slow tumble reveals texture from every angle — crisp edges, soft center, and that unmistakable Nicakery glow baked right in.",
    theme: "dark" as const,
    align: "left" as const,
  },
  {
    id: "zoom",
    eyebrow: "Chapter Three",
    title: "Close Enough To Taste",
    body:
      "The camera pulls in until you can almost feel the warmth. Then it eases back, leaving room for one last look at the craft.",
    theme: "light" as const,
    align: "right" as const,
  },
  {
    id: "finale",
    eyebrow: "Finale",
    title: "Purely Handcrafted",
    body:
      "Every rotation, every glide, every golden surface is a reminder: great cookies come from patience, heat, and heart.",
    theme: "cream" as const,
    align: "left" as const,
  },
] as const;

const themeClasses = {
  light: "bg-background text-dark",
  cream: "bg-cream/50 text-dark",
  dark: "bg-dark text-white",
} as const;

const eyebrowClasses = {
  light: "text-dark/50",
  cream: "text-dark/50",
  dark: "text-white/50",
} as const;

const bodyClasses = {
  light: "text-dark/65",
  cream: "text-dark/65",
  dark: "text-white/70",
} as const;

export function TestPage() {
  const scrollRootRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refresh = (): void => {
      ScrollTrigger.refresh();
    };

    const timer = window.setTimeout(refresh, 150);
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
      <Navbar variant="solid" />
      <CookieParallaxScene scrollRootRef={scrollRootRef} footerRef={footerRef} />

      <main ref={scrollRootRef} className="relative z-[2] w-full pointer-events-none">
        {SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`relative flex min-h-[100dvh] flex-col justify-start px-5 pb-16 pt-28 md:flex-row md:items-center md:justify-center md:py-32 md:pb-32 md:pt-32 lg:px-10 xl:px-14 ${themeClasses[section.theme]}`}
            style={{
              backgroundColor:
                section.theme === "light"
                  ? "color-mix(in srgb, var(--color-background) 55%, transparent)"
                  : section.theme === "cream"
                    ? "color-mix(in srgb, var(--color-cream) 42%, transparent)"
                    : "color-mix(in srgb, var(--color-dark) 70%, transparent)",
            }}
          >
            <div
              className={`pointer-events-auto relative z-20 w-full max-w-[min(100%,20rem)] sm:max-w-xs md:max-w-sm lg:max-w-md ${
                section.align === "left"
                  ? "mr-auto md:mr-[52%] md:max-w-[38%] lg:max-w-[36%]"
                  : "ml-auto text-right md:ml-[52%] md:max-w-[38%] lg:max-w-[36%]"
              }`}
            >
              {index === 0 && (
                <Link
                  to="/"
                  className={`mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 md:mb-10 ${
                    section.theme === "dark"
                      ? "text-white/60 hover:text-white"
                      : "text-dark/60 hover:text-dark"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              )}

              <p
                className={`text-xs font-semibold uppercase tracking-[0.25em] ${eyebrowClasses[section.theme]}`}
              >
                {section.eyebrow}
              </p>

              <h2
                className={`mt-4 font-serif text-4xl italic leading-[1.05] md:text-5xl lg:text-6xl ${
                  section.theme === "dark" ? "text-white" : "text-dark"
                }`}
              >
                {section.title}
              </h2>

              <p className={`mt-6 text-sm leading-relaxed md:text-base ${bodyClasses[section.theme]}`}>
                {section.body}
              </p>

              {index === 0 && (
                <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                  Scroll to animate
                </p>
              )}
            </div>

            <div className="min-h-[42dvh] flex-1 md:hidden" aria-hidden="true" />
          </section>
        ))}
      </main>

      <div
        ref={footerRef}
        className="relative z-30 isolate bg-footer pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto"
      >
        <Footer />
      </div>
    </>
  );
}
