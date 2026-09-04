import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  defaultViewport,
  fadeLeft,
  fadeRight,
  fadeUp,
  imageReveal,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STORY_HERO_IMAGE =
  "https://images.unsplash.com/photo-1737049282378-4bbf3f8ed360?w=1200&h=1400&fit=crop&q=80";

const STORY_WORKSHOP_IMAGE =
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&h=900&fit=crop&q=80";

const milestones = [
  {
    year: "Begin",
    title: "A Love For Baking",
    description:
      "It started with a simple want to bake a cookie. Late nights in the kitchen, testing recipes until every batch felt warm, soft, and worth sharing.",
  },
  {
    year: "The Idea",
    title: "What If We Sold Them?",
    description:
      "Friends kept asking for more, and one question changed everything. What if we sold our cookies and brought that same joy to our community?",
  },
  {
    year: "The Start",
    title: "Building Nicakery",
    description:
      "We turned the idea into action and started our business in Valenzuela and Manila City, baking fresh cookies with real ingredients and honest care.",
  },
  {
    year: "Today",
    title: "Still Baking With Heart",
    description:
      "Every day we scoop, bake, and serve cookies made the same way we started. Small batches, real flavor, and the same passion in every tin.",
  },
] as const;

const values = [
  {
    title: "Real Ingredients",
    description: "European butter, seasonal fruit, and flour milled for delicate layers.",
  },
  {
    title: "Slow Process",
    description: "Dough rested overnight so every pastry rises with depth and texture.",
  },
  {
    title: "Made With Care",
    description: "Each piece is finished by hand, from the first fold to the final glaze.",
  },
] as const;

export function StoryPage() {
  const pinSectionRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const pinImageRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const pinSection = pinSectionRef.current;
    const pinContent = pinContentRef.current;
    const pinImage = pinImageRef.current;
    const values = valuesRef.current;
    const words = headlineWordsRef.current.filter(Boolean);

    if (prefersReducedMotion()) {
      if (words.length > 0) {
        gsap.set(words, { opacity: 1, y: 0, rotateX: 0 });
      }

      return;
    }

    const ctx = gsap.context(() => {
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }

      if (pinSection && pinContent && pinImage) {
        gsap.fromTo(
          pinImage,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: pinSection,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );

        gsap.fromTo(
          pinContent,
          { y: 60, opacity: 0.6 },
          {
            y: -30,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pinSection,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          },
        );
      }

      if (values) {
        const cards = gsap.utils.toArray<HTMLElement>(".story-value-card", values);
        gsap.fromTo(
          cards,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: values,
              start: "top 85%",
            },
          },
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const headlineWords = ["Our", "Story", "Of", "Heart", "And", "Heat"];

  return (
    <>
      <Navbar variant="solid" />
      <main className="w-full">
        <section className="bg-background px-5 pb-16 pt-[max(8rem,calc(env(safe-area-inset-top)+6rem))] md:px-8 md:pb-24 md:pt-36 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-dark/60 transition-colors hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50"
              >
                Discover Our Story
              </motion.p>

              <h1
                className="mt-4 font-serif text-3xl italic leading-[1.05] text-dark min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ perspective: "800px" }}
              >
                {headlineWords.map((word, index) => (
                  <span
                    key={word}
                    ref={(element) => {
                      if (element) headlineWordsRef.current[index] = element;
                    }}
                    className="mr-[0.25em] inline-block opacity-0 motion-reduce:opacity-100"
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.5 }}
                className="mt-8 max-w-md text-sm leading-relaxed text-dark/65 md:text-base"
              >
                Nicakery was built on the belief that great pastries come from
                patience, quality ingredients, and the kind of care you can taste
                in every bite.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageReveal}
              transition={{ delay: 0.2 }}
              className="overflow-hidden"
            >
              <img
                src={STORY_HERO_IMAGE}
                alt="Pastry chef shaping dough at Nicakery"
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section
          ref={pinSectionRef}
          className="relative flex min-h-[85dvh] items-center overflow-hidden bg-dark"
        >
          <div ref={pinImageRef} className="absolute inset-0 will-change-transform">
            <img
              src={STORY_WORKSHOP_IMAGE}
              alt="Warm pastries cooling in the Nicakery workshop"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-dark/60" />
          </div>

          <div
            ref={pinContentRef}
            className="relative z-10 w-full px-5 py-24 will-change-transform md:px-8 lg:px-10 xl:px-14"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.p
                variants={staggerItem}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50"
              >
                Our Philosophy
              </motion.p>
              <motion.blockquote
                variants={staggerItem}
                className="mt-6 font-serif text-2xl italic leading-snug text-white sm:text-3xl md:text-5xl lg:text-6xl"
              >
                &ldquo;We do not rush the dough. We respect the process, and the
                pastry tells that story in every layer.&rdquo;
              </motion.blockquote>
              <motion.p
                variants={staggerItem}
                className="mt-8 text-sm leading-relaxed text-white/70 md:text-base"
              >
                From resting butter blocks to the final golden bake, each step is
                intentional. That is how we keep every visit feeling warm,
                familiar, and worth remembering.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="bg-background px-5 py-20 md:px-8 md:py-28 lg:px-10 xl:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-16 max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
              Milestones
            </p>
            <h2 className="mt-3 font-serif text-4xl italic leading-tight text-dark md:text-5xl">
              How We Got Here
            </h2>
          </motion.div>

          <div className="space-y-0">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={index % 2 === 0 ? fadeLeft : fadeRight}
                className="grid gap-6 border-t border-dark/10 py-10 md:grid-cols-[140px_1fr] md:gap-12 md:py-14"
              >
                <p className="font-serif text-3xl italic text-gold md:text-4xl">
                  {milestone.year}
                </p>
                <div>
                  <h3 className="text-lg font-medium text-dark md:text-xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dark/65 md:text-base">
                    {milestone.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-cream/40 px-5 py-20 md:px-8 md:py-28 lg:px-10 xl:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-14 max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
              What We Stand For
            </p>
            <h2 className="mt-3 font-serif text-4xl italic leading-tight text-dark md:text-5xl">
              Values In Every Batch
            </h2>
          </motion.div>

          <div ref={valuesRef} className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="story-value-card rounded-2xl border border-dark/10 bg-background p-8"
              >
                <h3 className="font-serif text-2xl italic text-dark">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-dark/65">
                  {value.description}
                </p>
              </article>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <Link
              to="/menu#menu"
              className="group inline-flex items-center gap-3 rounded-full border border-dark/20 px-6 py-3 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              Explore Our Menu
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
