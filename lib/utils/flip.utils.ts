const FlipEasing = "cubic-bezier(0.16, 1, 0.3, 1)";

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * FLIP-morph `element` from a previously captured on-screen rect (e.g. the
 * clicked thumbnail) to its current laid-out box. Returns the running Animation,
 * or null when motion is disabled or the element has no measurable size.
 */
export const flipFrom = (
  element: HTMLElement,
  origin: DOMRect,
  duration = 620
): Animation | null => {
  const target = element.getBoundingClientRect();

  if (prefersReducedMotion() || target.width === 0 || target.height === 0) {
    return null;
  }

  return element.animate(
    [
      {
        transform: `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})`,
      },
      { transform: "translate(0px, 0px) scale(1, 1)" },
    ],
    { duration, easing: FlipEasing, fill: "both" }
  );
};

/**
 * Reverse FLIP: morph `element` from its current box back down to a destination
 * rect (e.g. the thumbnail it should collapse into on close).
 */
export const flipTo = (
  element: HTMLElement,
  destination: DOMRect,
  duration = 520
): Animation | null => {
  const start = element.getBoundingClientRect();

  if (prefersReducedMotion() || start.width === 0 || start.height === 0) {
    return null;
  }

  return element.animate(
    [
      { transform: "translate(0px, 0px) scale(1, 1)" },
      {
        transform: `translate(${destination.left - start.left}px, ${destination.top - start.top}px) scale(${destination.width / start.width}, ${destination.height / start.height})`,
      },
    ],
    { duration, easing: FlipEasing, fill: "both" }
  );
};
