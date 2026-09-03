import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { menuCategories } from "@/data/menuCategories";
import {
  defaultViewport,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export function MenuPreviewSection() {
  return (
    <section className="bg-background px-5 py-20 md:px-8 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-14 text-center md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
            Our Menu
          </p>
          <h2 className="mt-3 font-serif text-4xl italic text-dark md:text-5xl">
            Curated Collections
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {menuCategories.map((category) => (
            <motion.article
              key={category.id}
              variants={staggerItem}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent transition-opacity duration-500 group-hover:from-dark/80" />
              </div>

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
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
