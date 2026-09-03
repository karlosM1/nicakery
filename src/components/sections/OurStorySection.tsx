import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  defaultViewport,
  imageReveal,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1737049282378-4bbf3f8ed360?w=900&h=1100&fit=crop&q=80";

export function OurStorySection() {
  return (
    <section id="our-story" className="bg-background px-5 py-20 md:px-8 md:py-28 lg:px-10 xl:px-14">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={imageReveal}
          className="overflow-hidden"
        >
          <img
            src={STORY_IMAGE}
            alt="Handcrafted cookies being prepared at Nicakery"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="flex flex-col justify-center"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50"
          >
            Our Story
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="mt-4 font-serif text-4xl italic leading-tight text-dark md:text-5xl lg:text-[3.25rem]"
          >
            Baked With Passion,
            <br />
            Served With Love
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-md text-sm leading-relaxed text-dark/65 md:text-base"
          >
            At Nicakery, every pastry begins with carefully selected
            ingredients and a passion for traditional craftsmanship. From the
            first fold of the dough to the final touch of decoration, every
            detail is made with care.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-8">
            <Button variant="outline" className="gap-2 font-medium">
              Discover Our Story
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
