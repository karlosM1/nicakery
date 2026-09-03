import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { defaultViewport, fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const supportLinks = [
  { label: "FAQ", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-footer text-cream">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-16 md:px-8 md:pt-20 lg:px-10 lg:pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16"
        >
          <motion.div variants={staggerItem} className="md:col-span-1">
            <h2 className="font-serif text-3xl italic leading-tight text-cream md:text-4xl">
              Join The Pastry Club
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Be the first to know about our weekly specials, seasonal treats,
              and exclusive member-only promotions.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-8 max-w-md">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                required
                className="h-12 w-full rounded-full border border-cream/25 bg-transparent pr-14 pl-5 text-sm text-cream placeholder:text-cream/40 transition-colors focus-visible:border-cream/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/20"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute top-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-footer transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-cream">Address</h3>
            <address className="mt-5 space-y-2 text-sm not-italic leading-relaxed text-cream/60">
              <p>
                <a
                  href="tel:+15551234567"
                  className="transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/30"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@nicakery.com"
                  className="transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/30"
                >
                  hello@nicakery.com
                </a>
              </p>
              <p>
                42 Baker&apos;s Lane
                <br />
                Paris District, NY 10012
              </p>
            </address>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-cream">Support</h3>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/30"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="pointer-events-none mt-16 select-none md:mt-20 lg:mt-24"
          aria-hidden="true"
        >
          <p className="font-serif text-[clamp(4rem,18vw,13rem)] leading-[0.85] tracking-tight text-footer-watermark italic">
            Nicakery
          </p>
        </motion.div>

        <div className="relative z-10 mt-10 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center">
          <p>© 2026 Nicakery. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-cream/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/30"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
