import { useEffect } from 'react';
import type { CSSProperties } from 'react';

/** Typed `--reveal-delay` style for staggering an entrance. */
export const revealDelay = (ms: number): CSSProperties =>
  ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

const SELECTOR = '[data-reveal], [data-reveal-rule]';

/**
 * Page-wide entrance choreography.
 *
 * Safe by construction: every `[data-reveal]` / `[data-reveal-rule]` element is
 * fully visible unless JS runs AND the user allows motion. The hidden initial
 * state lives behind `.motion-ready` (added before first paint in index.html,
 * inside a `prefers-reduced-motion: no-preference` block in CSS), so no-JS,
 * reduced-motion, and headless renders always see the real content.
 *
 * Targets are revealed as they scroll into view. Elements that mount later
 * (anything rendered after a fetch) are picked up by a MutationObserver, and a
 * per-element failsafe unhides anything that never intersected so content can
 * never get stuck hidden.
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

    const reveal = (el: Element) => el.classList.add('is-in');
    const timers = new Set<number>();

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
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

    const track = (el: Element) => {
      if (el.classList.contains('is-in')) return;
      io.observe(el);
      // Failsafe: reveal anything still hidden a beat after it appeared.
      const t = window.setTimeout(() => {
        reveal(el);
        io.unobserve(el);
        timers.delete(t);
      }, 2500);
      timers.add(t);
    };

    document.querySelectorAll(SELECTOR).forEach(track);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches(SELECTOR)) track(n);
          n.querySelectorAll(SELECTOR).forEach(track);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);
}
