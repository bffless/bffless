import { useEffect, useRef, useState } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';
import { LINKS } from '../../content/site';

// Generated figure in the retro-blueprint house style (the studio app's
// image-prompts skill, with two tutorial thumbnails as style references): a
// hand-drawn schematic on parchment — an agent over MCP into the layered
// platform, a workflow above it, fan-out to Postgres, storage, and an API.
const HERO_FIGURE = '/images/hero-tour.jpg';

interface HeroProps {
  onEnquire: () => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const figureRef = useRef<HTMLDivElement>(null);
  const [figureOk, setFigureOk] = useState(true);

  // Gentle scroll-linked drift on the figure (max ~20px) for motion-ok users.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty('--drift', `${(Math.min(window.scrollY, 700) * -0.03).toFixed(1)}px`);
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
    <section id="overview" className="relative scroll-mt-20 overflow-hidden">
      <div className="container-page relative pt-14 md:pt-20 pb-16 md:pb-24 text-center flex flex-col items-center gap-6">
        <span
          className="inline-flex items-center gap-2 rounded-full bg-paper-deep px-3.5 py-1.5 text-[12px] font-semibold text-coffee"
          data-reveal
        >
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
          Open source · Self-hosted · One docker compose
        </span>
        <h1
          className="statement text-[44px] sm:text-[56px] lg:text-[68px] text-ink max-w-[900px]"
          data-reveal
          style={revealDelay(60)}
        >
          A home for what your <span className="display-em">agents build.</span>
        </h1>
        <p
          className="text-[17px] md:text-[20px] leading-[1.5] text-ink-soft max-w-[640px] text-pretty"
          data-reveal
          style={revealDelay(140)}
        >
          Drop in any static build — hand-written or agent-made — and get login, forms, a database, and a reverse
          proxy to your own services. Without writing a backend.
        </p>
        <div className="flex flex-wrap justify-center gap-3" data-reveal style={revealDelay(220)}>
          <button
            type="button"
            onClick={() => {
              trackConversion('consulting_cta_clicked', { source: 'hero' });
              onEnquire();
            }}
            className="pill-ink"
          >
            Get it installed for your team
          </button>
          <a
            href={LINKS.quickstart}
            onClick={() => trackConversion('get_started_clicked', { source: 'hero' })}
            className="pill-ghost"
          >
            Self-host in 10 minutes
          </a>
        </div>

        {figureOk && (
          <figure ref={figureRef} data-hero-device data-reveal className="w-full max-w-[1040px] mt-6 md:mt-10 m-0">
            <div className="rounded-card border border-paper-edge bg-paper shadow-[0_24px_80px_rgba(28,25,23,0.10)] overflow-hidden">
              <img
                src={HERO_FIGURE}
                alt="Hand-drawn schematic: an agent connects over MCP to the BFFless platform, drawn as a stack of layers (edge, auth, proxy); a workflow runs above it; arrows fan out to Postgres, storage, and an API; a row of boxes reads auth, proxy, pipelines, storage"
                width={1376}
                height={768}
                onError={() => setFigureOk(false)}
                className="block w-full h-auto"
                {...({ fetchpriority: 'high' } as Record<string, string>)}
              />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
