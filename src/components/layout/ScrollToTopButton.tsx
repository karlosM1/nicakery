import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolledPast } from "@/hooks/useScrollPosition";

export function ScrollToTopButton() {
  const isVisible = useScrolledPast(400);

  const handleClick = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          aria-label="Scroll to top"
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-dark text-white shadow-[0_8px_30px_rgb(21_21_21/0.25)] backdrop-blur-sm transition-colors hover:bg-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 md:bottom-8 md:right-8"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
