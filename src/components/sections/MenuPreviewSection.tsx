import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { menuCategories } from "@/data/menuCategories";
import { fadeUp } from "@/lib/animations";

const menuViewport = {
  once: true,
  amount: "some" as const,
};

const menuStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const menuCardItem: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function MenuPreviewSection() {
  return (
    <section
      id="collections"
      className="relative z-10 bg-background px-5 py-16 md:px-8 md:py-28 lg:px-10 xl:px-14"
    >
      <div className="w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={menuViewport}
          variants={fadeUp}
          className="mb-14 text-center md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
            Our Menu
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-dark sm:text-4xl md:text-5xl">
            Curated Collections
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={menuViewport}
          variants={menuStaggerContainer}
          className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3"
        >
          {menuCategories.map((category) => (
            <motion.article
              key={category.id}
              variants={menuCardItem}
              className="group overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent transition-opacity duration-500 group-hover:from-dark/80" />

                <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl italic text-white">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
                        {category.description}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
