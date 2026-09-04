import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { prepareScrollForNavigation } from "@/lib/scroll";
import type { NavLink } from "@/types/pastry";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "Menu", href: "/menu#menu", hasChevron: true },
];

function getLinkPath(href: string): string {
  return href.split("#")[0] || "/";
}

function handleNavClick(href: string): void {
  if (!href.includes("#")) {
    prepareScrollForNavigation();
  }
}

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export function Navbar({ variant = "transparent" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = useScrolledPast(60);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const useSolidStyle = variant === "solid" || !isHome || isScrolled;

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-500",
          "pt-[env(safe-area-inset-top)]",
          useSolidStyle
            ? "border-b border-dark/10 bg-background/95 py-3 backdrop-blur-md"
            : "bg-transparent py-4 md:py-6",
        )}
      >
        <nav
          className="flex w-full items-center justify-between px-5 md:px-8 lg:px-10 xl:px-14"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className={cn(
              "font-serif text-xl italic tracking-wide transition-opacity hover:opacity-80 md:text-2xl",
              useSolidStyle ? "text-dark" : "text-white",
            )}
          >
            Nicakery
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "group flex items-center gap-1 text-sm font-medium tracking-wide transition-colors",
                    useSolidStyle
                      ? "text-dark/80 hover:text-dark"
                      : "text-white/90 hover:text-white",
                    location.pathname === getLinkPath(link.href) && "font-semibold",
                  )}
                >
                  {link.label}
                  {link.hasChevron && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 md:hidden",
              useSolidStyle
                ? "text-dark hover:bg-dark/5 focus-visible:ring-gold/40"
                : "text-white hover:bg-white/10 focus-visible:ring-white/50",
            )}
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
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl italic text-dark"
            >
              Nicakery
            </Link>

            <ul className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => {
                      handleNavClick(link.href);
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-lg font-medium text-dark transition-colors hover:text-gold"
                  >
                    {link.label}
                    {link.hasChevron && <ChevronDown className="h-4 w-4" />}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
