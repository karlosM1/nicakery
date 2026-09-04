import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  );
}

interface SheetContentProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function SheetContent({ children, onClose, className }: SheetContentProps) {
  return (
    <motion.aside
      className={cn(
        "fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col bg-background px-6 pb-8 shadow-2xl",
        "pt-[calc(2rem+env(safe-area-inset-top))]",
        className,
      )}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-[calc(1.5rem+env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full text-dark transition-colors hover:bg-dark/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>
      {children}
    </motion.aside>
  );
}
