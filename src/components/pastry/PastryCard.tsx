import { motion } from "framer-motion";
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
      className="group min-w-0"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={pastry.image}
          alt={pastry.name}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-1 sm:mt-5">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug tracking-tight text-dark sm:text-base">
          {pastry.name}
        </h3>
        {pastry.description && (
          <p className="line-clamp-3 text-xs leading-relaxed text-dark/60 sm:text-sm">
            {pastry.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}
