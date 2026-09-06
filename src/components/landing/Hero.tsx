import { useEffect, useRef } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';
import { LINKS } from '../../content/site';
import HeroIllustration from './HeroIllustration';

const proofs = ['SSO + RBAC', 'Reverse proxy', 'No-code pipelines', 'MCP servers', '5 apps'];

interface HeroProps {
  onEnquire: () => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const figureRef = useRef<HTMLDivElement>(null);

  // A restrained scroll-linked drift on the figure (max ~28px), only for users
  // who allow motion. Written as a CSS variable so the entrance transition and
  // the drift compose instead of fighting.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 600);
      el.style.setProperty('--drift', `${(y * 0.045).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const settle = () => el.classList.add('is-settled');
    el.addEventListener('transitionend', settle, { once: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('transitionend', settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="what" className="scroll-mt-20">
      <div className="container-page pt-14 pb-12 md:pt-24 md:pb-16 lg:pt-24">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col gap-7">
            <p className="meta-label" data-reveal>
              00 · Open source · Self-hosted
            </p>
            <h1
              className="font-sans font-bold text-[42px] sm:text-[52px] lg:text-[60px] leading-[1.02] tracking-[-0.025em] text-ink text-balance"
              data-reveal
              style={revealDelay(60)}
            >
              Your AI-built apps need <span className="display-em">somewhere to live.</span>
            </h1>
            <p
              className="text-[17px] md:text-[19px] leading-[1.5] text-ink-soft max-w-[520px] text-pretty"
              data-reveal
              style={revealDelay(140)}
            >
              BFFless hosts the HTML your agents and your team produce, and gives every static build the things
              it's missing: login, a backend, and a path to your internal services. One{' '}
              <code className="code-chip">docker compose up</code>.
            </p>
            <div className="flex flex-wrap gap-3 items-center" data-reveal style={revealDelay(220)}>
              <button
                type="button"
                onClick={() => {
                  trackConversion('consulting_cta_clicked', { source: 'hero' });
                  onEnquire();
                }}
                className="pill-cta"
              >
                Get it installed for your team
                <Arrow />
              </button>
              <a
                href={LINKS.quickstart}
                onClick={() => trackConversion('get_started_clicked', { source: 'hero' })}
                className="pill-ghost"
              >
                Read the quickstart
              </a>
            </div>
            <ul
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.04em] text-ink-mute"
              data-reveal
              style={revealDelay(300)}
              aria-label="What's included"
            >
              {proofs.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div ref={figureRef} data-hero-figure data-reveal className="lg:pl-2">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
