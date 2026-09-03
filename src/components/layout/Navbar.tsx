import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/pastry";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#our-story" },
  { label: "Menu", href: "#menu", hasChevron: true },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = useScrolledPast(60);

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-500",
          isScrolled
            ? "border-b border-white/10 bg-dark/80 py-3 backdrop-blur-md"
            : "bg-transparent py-5 md:py-6",
        )}
      >
        <nav
          className="flex w-full items-center justify-between px-5 md:px-8 lg:px-10 xl:px-14"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="font-serif text-xl italic tracking-wide text-white transition-opacity hover:opacity-80 md:text-2xl"
          >
            Nicakery
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1 text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                  {link.hasChevron && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button
              variant="hero"
              size="sm"
              className="font-medium tracking-wide"
            >
              Order Now
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent onClose={() => setMobileOpen(false)}>
          <div className="mt-8 flex flex-col gap-8">
            <a
              href="#home"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl italic text-dark"
            >
              Nicakery
            </a>

            <ul className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium text-dark transition-colors hover:text-gold"
                  >
                    {link.label}
                    {link.hasChevron && <ChevronDown className="h-4 w-4" />}
                  </a>
                </motion.li>
              ))}
            </ul>

            <Button className="w-full" onClick={() => setMobileOpen(false)}>
              Order Now
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
