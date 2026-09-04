import { ScrollTrigger } from "@/lib/gsap";

export function resetScrollPosition(): void {
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previousBehavior;
}

export function prepareScrollForNavigation(): void {
  ScrollTrigger.clearScrollMemory();
  resetScrollPosition();
}

export function finalizeScrollAfterNavigation(): void {
  resetScrollPosition();
  ScrollTrigger.refresh();
  resetScrollPosition();
}

function getElementDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function scrollToElement(
  id: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const element = document.getElementById(id);
  if (!element) return;

  const scroll = (scrollBehavior: ScrollBehavior): void => {
    const top = getElementDocumentTop(element);
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: scrollBehavior });
  };

  scroll(behavior);

  if (behavior === "smooth") {
    window.setTimeout(() => {
      ScrollTrigger.refresh();
      scroll("auto");
    }, 450);
  } else {
    ScrollTrigger.refresh();
  }
}

export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  scrollToElement(id, behavior);
}
