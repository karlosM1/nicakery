import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeIn, fadeLeft, fadeRight, fadeUp, lineExpand } from "@/lib/animations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=1080&fit=crop&crop=entropy&q=85";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={HERO_IMAGE}
          alt="Artisan cookies cooling on a wooden rack in warm light"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/45 via-dark/15 to-dark/65" />
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32 lg:px-10 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="mb-8 hidden text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60 md:block"
          >
            Nicakery
            <span className="mx-3 text-white/30">·</span>
            Artisan Pastries
          </motion.div>

          <div className="flex flex-col items-start gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              transition={{ delay: 0.4 }}
              className="font-sans text-4xl font-semibold tracking-tight text-white xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Purely
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={lineExpand}
              className="h-px w-16 origin-left bg-white/50 sm:w-24 md:hidden"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={lineExpand}
              className="hidden h-px flex-1 origin-left bg-white/50 md:block"
              style={{ maxWidth: "40%" }}
            />

            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeRight}
              transition={{ delay: 0.5 }}
              className="font-serif text-4xl italic tracking-tight text-white xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Handcrafted
            </motion.span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60 md:hidden"
          >
            Nicakery · Artisan Pastries
          </motion.div>
        </div>

        <div className="mx-auto mt-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="max-w-md text-sm leading-relaxed text-white/80 md:text-base"
          >
            Freshly baked pastries with golden, flaky textures and buttery
            flavors crafted to make every moment feel special.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-sm font-medium text-dark transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Menu
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
