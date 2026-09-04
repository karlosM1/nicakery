import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollToElement } from "@/lib/scroll";

const EXPERIENCE_IMAGE =
  "https://images.unsplash.com/photo-1737049282378-4bbf3f8ed360?w=1920&h=900&fit=crop&q=85";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(image, { scale: 1.08, yPercent: 0 });

      gsap.fromTo(
        image,
        { scale: 1.08, yPercent: 0 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      gsap.fromTo(
        content,
        { y: 40, opacity: 0.7 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-px flex min-h-[70vh] items-center overflow-hidden bg-dark md:min-h-[80vh]"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img
          src={EXPERIENCE_IMAGE}
          alt="Golden chocolate chip cookies at Nicakery"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-dark/55" />
      </div>

      <div className="relative z-10 w-full px-5 py-24 md:px-8 lg:px-10 xl:px-14">
        <div ref={contentRef} className="max-w-2xl will-change-transform">
          <h2 className="font-serif text-4xl italic leading-tight text-white md:text-6xl lg:text-7xl">
            Every Layer
            <br />
            Tells A Story
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            From delicate layers of buttery dough to carefully chosen seasonal
            ingredients, every creation at Nicakery is made to be remembered.
          </p>
          <motion.a
            href="#menu"
            onClick={(event) => {
              event.preventDefault();
              scrollToElement("menu");
            }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            whileHover={{ scale: 1.02 }}
          >
            Discover Our Menu
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
