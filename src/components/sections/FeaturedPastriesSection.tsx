import { motion } from "framer-motion";
import { PastryCard } from "@/components/pastry/PastryCard";
import { pastries } from "@/data/pastries";
import { defaultViewport, fadeUp, staggerContainer } from "@/lib/animations";

export function FeaturedPastriesSection() {
  const remainingPastries = pastries.slice(4);

  return (
    <section className="bg-cream/40 px-5 py-16 md:px-8 md:py-28 lg:px-10 xl:px-14">
      <div className="w-full min-w-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-14 max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">
            Featured Pastries
          </p>
          <h2 className="mt-3 font-serif text-3xl italic leading-tight text-dark sm:text-4xl md:text-5xl">
            More To Savor
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-dark/60 md:text-base">
            Discover our extended collection of handcrafted cookies and treats,
            each baked fresh daily with premium ingredients.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
        >
          {remainingPastries.map((pastry) => (
            <PastryCard key={pastry.id} pastry={pastry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
