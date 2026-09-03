import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PastryCard } from "@/components/pastry/PastryCard";
import { pastries } from "@/data/pastries";
import {
  defaultViewport,
  fadeIn,
  fadeUp,
  staggerContainer,
} from "@/lib/animations";

export function OurCraftSection() {
  const featuredPastries = pastries.slice(0, 4);

  return (
    <section className="bg-background px-5 py-20 md:px-8 md:py-28 lg:px-10 xl:px-14">
      <div className="w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50"
            >
              Our Craft
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="mt-3 font-serif text-4xl italic leading-tight text-dark md:text-5xl lg:text-6xl"
            >
              The Art Of Daily Baking
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" size="sm" className="gap-2 font-medium">
              See More
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          id="menu"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredPastries.map((pastry) => (
            <PastryCard key={pastry.id} pastry={pastry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
