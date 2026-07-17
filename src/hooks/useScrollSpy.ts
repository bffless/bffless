import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view and returns its id.
 *
 * Uses an IntersectionObserver with a rootMargin tuned so a section becomes
 * "active" once its top crosses just below the sticky header, and stays active
 * until the next section takes over. The section closest to the top of the
 * viewport wins when several are intersecting at once.
 */
export function useScrollSpy(sectionIds: string[], offset = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track the latest intersection ratio for every observed section so we can
    // pick the top-most one that is currently on screen.
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Choose the first section in document order that is still visible.
        const current = sectionIds.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      {
        // Shift the top of the root down past the sticky header so a section
        // activates as its heading clears the nav, and deactivates near the
        // bottom so the next one can take over before this one fully leaves.
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
