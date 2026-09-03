import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultViewport, fadeUp } from "@/lib/animations";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <section className="bg-cream px-5 py-20 md:px-8 md:py-24 lg:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-serif text-3xl italic text-dark md:text-4xl lg:text-5xl">
          A Little Something Sweet
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-dark/60 md:text-base">
          Subscribe to receive seasonal pastry updates, new creations, and
          special offers from Nicakery.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            aria-label="Email address"
            className="sm:max-w-xs"
          />
          <Button type="submit" variant="newsletter" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
