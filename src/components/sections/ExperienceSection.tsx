import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { defaultViewport, fadeUp } from "@/lib/animations";

const EXPERIENCE_IMAGE =
  "https://images.unsplash.com/photo-1737049282378-4bbf3f8ed360?w=1920&h=900&fit=crop&q=85";

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[70vh] items-center overflow-hidden md:min-h-[80vh]"
    >
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <img
          src={EXPERIENCE_IMAGE}
          alt="Golden chocolate chip cookies at Nicakery"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-dark/55" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="max-w-2xl"
        >
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
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            whileHover={{ scale: 1.02 }}
          >
            Discover Our Menu
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
