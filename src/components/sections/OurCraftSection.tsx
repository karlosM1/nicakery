import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PastryCard } from "@/components/pastry/PastryCard";
import { pastries } from "@/data/pastries";
import {
  defaultViewport,
  fadeIn,
  fadeUp,
  staggerContainer,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { prepareScrollForNavigation } from "@/lib/scroll";

export function OurCraftSection() {
  const featuredPastries = pastries.slice(0, 4);

  return (
    <section id="menu" className="bg-background px-5 py-16 md:px-8 md:py-28 lg:px-10 xl:px-14">
      <div className="w-full min-w-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
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
              className="mt-3 font-serif text-3xl italic leading-tight text-dark sm:text-4xl md:text-5xl lg:text-6xl"
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
            <Link
              to="/menu"
              onClick={prepareScrollForNavigation}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "min-h-11 gap-2 font-medium sm:w-auto",
              )}
            >
              See More
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
        >
          {featuredPastries.map((pastry) => (
            <PastryCard key={pastry.id} pastry={pastry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
