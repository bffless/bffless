import { useEffect } from 'react';
import type { CSSProperties } from 'react';

/** Typed `--reveal-delay` style for staggering an entrance. */
export const revealDelay = (ms: number): CSSProperties =>
  ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/**
 * Page-wide entrance choreography.
 *
 * Safe by construction: every `[data-reveal]` / `[data-reveal-rule]` element is
 * fully visible unless JS runs AND the user allows motion. The hidden initial
 * state lives behind `.motion-ready` (added before first paint in index.html,
 * inside a `prefers-reduced-motion: no-preference` block in CSS), so no-JS,
 * reduced-motion, and headless renders always see the real content.
 *
 * We observe targets and reveal each as it scrolls into view, with a failsafe
 * that unhides anything that never intersected (e.g. tall viewports, odd
 * layouts) so content can never get stuck hidden.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const allowsMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (!allowsMotion) {
      root.classList.remove('motion-ready');
      return;
    }

    // Ensure the flag is set even if the pre-paint inline script didn't run.
    root.classList.add('motion-ready');

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-rule]'),
    );

    const reveal = (el: Element) => el.classList.add('is-in');

    if (!('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));

    // Failsafe: reveal anything still hidden shortly after load.
    const failsafe = window.setTimeout(() => targets.forEach(reveal), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
}
