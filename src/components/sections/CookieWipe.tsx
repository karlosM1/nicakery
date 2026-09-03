import type { RefObject } from "react";

/**
 * Bite-cookie silhouette on a 200x200 canvas: a circle (center 100,100 r85)
 * drawn for 270deg from the right edge round to the top, then closed by three
 * semicircular tooth scallops that curve back inward toward the center.
 */
const BITE_COOKIE_PATH = [
  "M 185 100",
  "A 85 85 0 1 1 100 15",
  "A 20.5 20.5 0 0 0 128.3 43.3",
  "A 20.5 20.5 0 0 0 156.7 71.7",
  "A 20.5 20.5 0 0 0 185 100",
  "Z",
].join(" ");

interface CookieWipeProps {
  cookieRef: RefObject<HTMLDivElement | null>;
}

/** Purely decorative shape used as a scroll transition between scenes. */
export function CookieWipe({ cookieRef }: CookieWipeProps) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden"
      aria-hidden="true"
    >
      <div ref={cookieRef} className="origin-center will-change-transform">
        <svg
          viewBox="0 0 200 200"
          className="h-[min(90vw,560px)] w-[min(90vw,560px)]"
        >
          <path fill="#FFFFFF" d={BITE_COOKIE_PATH} />
        </svg>
      </div>
    </div>
  );
}
