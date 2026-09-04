import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { defaultViewport, fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const supportLinks = [
  { label: "FAQ", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-footer text-footer-watermark">
      <div className="relative z-10 w-full px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-16 md:px-8 md:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16"
        >
          <motion.div variants={staggerItem} className="md:col-span-1">
            <h2 className="font-serif text-3xl italic leading-tight text-cream md:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-footer-watermark/80">
              Have questions about custom orders, delivery, or our menu? Send us
              a message and we will get back to you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex max-w-md items-center rounded-full border border-footer-watermark/30 bg-transparent py-1 pr-1 pl-5 transition-colors focus-within:border-footer-watermark/50 focus-within:ring-2 focus-within:ring-footer-watermark/20"
            >
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
                className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-cream placeholder:text-footer-watermark/50 focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-footer transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-cream">Address</h3>
            <address className="mt-5 space-y-2 text-sm not-italic leading-relaxed text-footer-watermark/80">
              <p>
                <a
                  href="tel:+6391234567890"
                  className="transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/30"
                >
                  +6391234567890
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@nicakery.com"
                  className="transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/30"
                >
                  hello@nicakery.com
                </a>
              </p>
              <p>Valenzuela/Manila City</p>
            </address>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold text-cream">Support</h3>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-watermark/80 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/30"
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
          className="mt-16 py-10 md:mt-20 md:py-14 lg:mt-24 lg:py-16"
        >
          <p className="text-center font-serif text-[clamp(3rem,14vw,12rem)] leading-[0.9] tracking-tight text-footer-watermark italic">
            Nicakery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 px-1 text-xs text-footer-watermark sm:grid-cols-3 sm:items-center">
          <p className="text-center sm:text-left">
            © 2026 Nicakery. All rights reserved.
          </p>
          <a
            href="#"
            className="text-center transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/30"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-center transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-watermark/30 sm:text-right"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
