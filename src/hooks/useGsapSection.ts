import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function useGsapSection(
  setup: (section: HTMLElement) => void | (() => void),
  deps: readonly unknown[] = [],
): RefObject<HTMLElement | null> {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    let cleanup: void | (() => void);

    const ctx = gsap.context(() => {
      cleanup = setup(section);
    }, section);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, deps);

  return sectionRef;
}
