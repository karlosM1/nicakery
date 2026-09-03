import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.config({ force3D: true, nullTargetWarn: false });
ScrollTrigger.config({ limitCallbacks: true });

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
