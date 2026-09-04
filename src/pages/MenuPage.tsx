import { useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PastryCard } from "@/components/pastry/PastryCard";
import { menuCategories } from "@/data/menuCategories";
import { pastries } from "@/data/pastries";
import {
  defaultViewport,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { Pastry } from "@/types/pastry";
import heroImage from "@/assets/cookies.jfif";

function groupPastriesByCategory(items: Pastry[]): Map<string, Pastry[]> {
  const grouped = new Map<string, Pastry[]>();

  for (const pastry of items) {
    const existing = grouped.get(pastry.category) ?? [];
    grouped.set(pastry.category, [...existing, pastry]);
  }

  return grouped;
}

export function MenuPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const groupedPastries = useMemo(() => groupPastriesByCategory(pastries), []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const heroImageEl = heroImageRef.current;
    const heroContent = heroContentRef.current;
    const categories = categoriesRef.current;

    if (!hero || !heroImageEl || !heroContent || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageEl,
        { yPercent: 0, scale: 1 },
        {
          yPercent: 18,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        heroContent,
        { y: 0, opacity: 1 },
        {
          y: -48,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      if (categories) {
        const cards = gsap.utils.toArray<HTMLElement>(".menu-category-card", categories);
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: categories,
              start: "top 85%",
            },
          },
        );
      }

      const sections = gsap.utils.toArray<HTMLElement>(".menu-pastry-section");
      sections.forEach((section) => {
        const label = section.querySelector(".menu-section-label");
        if (!label) return;

        gsap.fromTo(
          label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          },
        );
      });
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Navbar variant="solid" />
      <main className="w-full">
        <section
          ref={heroRef}
          className="relative flex min-h-[70vh] items-end overflow-hidden bg-dark md:min-h-[80vh]"
        >
          <div ref={heroImageRef} className="absolute inset-0 will-change-transform">
            <img
              src={heroImage}
              alt="Fresh cookies at Nicakery"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/30" />
          </div>

          <div
            ref={heroContentRef}
            className="relative z-10 w-full px-5 pb-16 pt-[max(8rem,calc(env(safe-area-inset-top)+6rem))] will-change-transform md:px-8 md:pb-20 md:pt-32 lg:px-10 xl:px-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
            >
              Full Menu
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-3xl font-serif text-4xl italic leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
            >
              Every Creation,
              <br />
              Crafted Daily
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base"
            >
              Browse our complete collection of cookies, banana bread, and
              special treats baked fresh each day.
            </motion.p>
          </div>
        </section>

        <section
          id="menu"
          className="bg-background px-5 py-16 md:px-8 md:py-28 lg:px-10 xl:px-14"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-14 max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
              Collections
            </p>
            <h2 className="mt-3 font-serif text-3xl italic leading-tight text-dark sm:text-4xl md:text-5xl">
              Curated Categories
            </h2>
          </motion.div>

          <div
            ref={categoriesRef}
            className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3"
          >
            {menuCategories.map((category) => (
              <article
                key={category.id}
                className="menu-category-card group overflow-hidden motion-reduce:opacity-100"
              >
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-2xl italic text-white">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      {category.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-cream/40 px-5 py-16 md:px-8 md:py-28 lg:px-10 xl:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-16 max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
              All Pastries
            </p>
            <h2 className="mt-3 font-serif text-3xl italic leading-tight text-dark sm:text-4xl md:text-5xl">
              The Complete Selection
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {menuCategories.map((category) => {
              const categoryPastries = groupedPastries.get(category.name) ?? [];
              if (categoryPastries.length === 0) return null;

              return (
                <div key={category.id} className="menu-pastry-section">
                  <p className="menu-section-label text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                    {category.name}
                  </p>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    variants={staggerContainer}
                    className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
                  >
                    {categoryPastries.map((pastry) => (
                      <motion.div key={pastry.id} variants={staggerItem}>
                        <PastryCard pastry={pastry} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
