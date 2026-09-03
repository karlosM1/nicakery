import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Pastry } from "@/types/pastry";

interface PastryCardProps {
  pastry: Pastry;
}

export function PastryCard({ pastry }: PastryCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="overflow-hidden bg-cream/60">
        <div className="aspect-square overflow-hidden">
          <img
            src={pastry.image}
            alt={pastry.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-5 space-y-1">
        <h3 className="text-base font-medium tracking-tight text-dark">
          {pastry.name}
        </h3>
        <p className="text-sm font-semibold text-dark">{formatPrice(pastry.price)}</p>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-between rounded-full border border-dark/15 px-5 py-3 text-sm font-medium text-dark transition-all duration-300 group-hover:border-dark group-hover:bg-dark group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label={`Add ${pastry.name} to cart`}
      >
        <span>Add to Cart</span>
        <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      </button>
    </motion.article>
  );
}
