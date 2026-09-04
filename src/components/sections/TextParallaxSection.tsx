import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { CookieWipe } from "@/components/sections/CookieWipe";

const ZOOM_WORD = "Handcrafted";

const STATS = [
  { value: "12hr", label: "Dough rested" },
  { value: "100%", label: "Real butter" },
  { value: "0", label: "Shortcuts taken" },
] as const;

const HEADING_LINES = [
  "Baked slow.",
  "Served warm.",
  "Remembered always.",
] as const;

export function TextParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const purelyRef = useRef<HTMLParagraphElement>(null);
  const zoomWrapRef = useRef<HTMLDivElement>(null);
  const zoomGlowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLParagraphElement>(null);
  const cookieRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const orbOne = orbOneRef.current;
    const orbTwo = orbTwoRef.current;
    const ring = ringRef.current;
    const purely = purelyRef.current;
    const zoomWrap = zoomWrapRef.current;
    const zoomGlow = zoomGlowRef.current;
    const flash = flashRef.current;
    const cookie = cookieRef.current;
    const panel = panelRef.current;
    const scrollHint = scrollHintRef.current;

    if (
      !section ||
      !pin ||
      !orbOne ||
      !orbTwo ||
      !ring ||
      !purely ||
      !zoomWrap ||
      !zoomGlow ||
      !flash ||
      !cookie ||
      !panel ||
      prefersReducedMotion()
    ) {
      return;
    }

    const revealItems = gsap.utils.toArray<HTMLElement>(
      ".parallax-reveal-item",
      panel,
    );
    const statItems = gsap.utils.toArray<HTMLElement>(".parallax-stat", panel);
    const headingLines = gsap.utils.toArray<HTMLElement>(
      ".parallax-heading-line",
      panel,
    );

    const ctx = gsap.context(() => {
      gsap.set(
        [orbOne, orbTwo, ring, purely, zoomWrap, zoomGlow, flash, cookie, scrollHint],
        { force3D: true },
      );
      gsap.set(zoomWrap, { opacity: 0, scale: 0.94 });
      gsap.set(flash, { opacity: 0, scale: 0.96 });
      gsap.set(cookie, { scale: 0, rotation: -12, opacity: 1 });
      gsap.set(panel, { opacity: 0 });
      gsap.set(revealItems, { y: 32, opacity: 0 });
      gsap.set(statItems, { y: 20, opacity: 0 });
      gsap.set(headingLines, { yPercent: 110 });
      gsap.set(ring, { scale: 0.65, opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: pin,
          pinSpacing: true,
          scrub: 1.1,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          scrollHint,
          { opacity: 0, y: 8 },
          { opacity: 0.55, y: 0, duration: 0.1, ease: "none" },
          0,
        )
        .fromTo(
          purely,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.14, ease: "none" },
          0.04,
        )
        .fromTo(
          orbOne,
          { xPercent: -6, yPercent: 4 },
          { xPercent: 4, yPercent: -3, duration: 0.45, ease: "none" },
          0,
        )
        .fromTo(
          orbTwo,
          { xPercent: 5, yPercent: -3 },
          { xPercent: -4, yPercent: 4, duration: 0.45, ease: "none" },
          0,
        )
        .to(scrollHint, { opacity: 0, duration: 0.08, ease: "none" }, 0.12)
        .to(purely, { opacity: 0, y: -28, duration: 0.1, ease: "none" }, 0.16)
        .fromTo(
          zoomWrap,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "none" },
          0.2,
        )
        .fromTo(
          ring,
          { scale: 0.65, opacity: 0 },
          { scale: 1, opacity: 0.28, duration: 0.16, ease: "none" },
          0.22,
        )
        .to(flash, { opacity: 0.65, scale: 1.04, duration: 0.1, ease: "none" }, 0.34)
        .to(flash, { opacity: 0, scale: 1.15, duration: 0.1, ease: "none" }, 0.44)
        .to(ring, { scale: 1.6, opacity: 0, duration: 0.2, ease: "none" }, 0.38)
        .to(zoomWrap, { scale: 2.6, opacity: 0, duration: 0.24, ease: "none" }, 0.38)
        .to(zoomGlow, { scale: 2.2, opacity: 0, duration: 0.24, ease: "none" }, 0.38)
        .to(cookie, { scale: 7, rotation: 0, duration: 0.18, ease: "none" }, 0.46)
        .to(panel, { opacity: 1, duration: 0.05, ease: "none" }, 0.58)
        .to(cookie, { opacity: 0, duration: 0.04, ease: "none" }, 0.64)
        .to(revealItems, { y: 0, opacity: 1, stagger: 0.025, duration: 0.12, ease: "none" }, 0.64)
        .to(headingLines, { yPercent: 0, stagger: 0.035, duration: 0.14, ease: "none" }, 0.68)
        .to(statItems, { y: 0, opacity: 1, stagger: 0.025, duration: 0.1, ease: "none" }, 0.76);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Nicakery scroll story"
      className="relative bg-dark"
    >
      <div
        ref={pinRef}
        className="parallax-stage relative z-20 flex h-dvh min-h-dvh items-center justify-center overflow-hidden bg-dark motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:bg-white motion-reduce:py-24"
      >
        <div
          ref={orbOneRef}
          className="pointer-events-none absolute -left-[8%] top-[18%] h-[min(48vw,380px)] w-[min(48vw,380px)] rounded-full opacity-40 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(circle, rgb(169 107 53 / 0.55) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          ref={orbTwoRef}
          className="pointer-events-none absolute -right-[6%] bottom-[12%] h-[min(42vw,320px)] w-[min(42vw,320px)] rounded-full opacity-35 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(circle, rgb(59 36 22 / 0.65) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={ringRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(68vw,480px)] w-[min(68vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 motion-reduce:hidden"
          aria-hidden="true"
        />

        <div
          ref={zoomGlowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(44vw,340px)] w-[min(44vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(circle, rgb(169 107 53 / 0.5) 0%, transparent 68%)",
          }}
          aria-hidden="true"
        />

        <p
          ref={purelyRef}
          className="absolute z-20 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 motion-reduce:hidden"
        >
          Purely
        </p>

        <div
          ref={zoomWrapRef}
          className="absolute z-20 flex items-center justify-center px-6 motion-reduce:hidden"
        >
          <h2 className="text-center font-serif text-[clamp(3rem,11vw,8.5rem)] leading-[0.92] tracking-tight text-white italic">
            {ZOOM_WORD}
          </h2>
        </div>

        <p
          ref={flashRef}
          className="pointer-events-none absolute z-30 font-serif text-[clamp(2rem,7vw,5rem)] italic text-gold/75 motion-reduce:hidden"
          aria-hidden="true"
        >
          golden · warm · fresh
        </p>

        <CookieWipe cookieRef={cookieRef} />

        <div
          ref={panelRef}
          className="absolute inset-0 z-50 flex min-h-dvh items-center justify-center bg-white px-6 opacity-0 motion-reduce:static motion-reduce:min-h-0 motion-reduce:opacity-100 md:px-10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="parallax-reveal-item text-[11px] font-semibold uppercase tracking-[0.35em] text-dark/45 motion-reduce:opacity-100">
              The Nicakery Way
            </p>

            <div
              className="parallax-reveal-item mx-auto mt-6 h-px w-12 bg-dark/15 motion-reduce:opacity-100"
              aria-hidden="true"
            />

            <h3 className="mt-8 overflow-hidden font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-dark italic">
              {HEADING_LINES.map((line) => (
                <span
                  key={line}
                  className="block overflow-hidden py-0.5 motion-reduce:overflow-visible"
                >
                  <span className="parallax-heading-line inline-block motion-reduce:translate-y-0">
                    {line}
                  </span>
                </span>
              ))}
            </h3>

            <p className="parallax-reveal-item mx-auto mt-8 max-w-md text-sm leading-relaxed text-dark/60 motion-reduce:opacity-100 md:text-base">
              At Nicakery, patience is an ingredient. Every cookie is shaped by
              hand, rested with care, and baked until the edges whisper golden
              and the center stays impossibly soft.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="parallax-stat motion-reduce:opacity-100"
                >
                  <p className="font-serif text-2xl italic text-brown md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-dark/45 md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 motion-reduce:hidden"
          aria-hidden="true"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
