import { useEffect, useRef, useState } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';
import { LINKS } from '../../content/site';
import AdminMock from './AdminMock';

// Optional generated ambience behind the device frame. If the file is absent
// the hero simply sits on white, which is also fine.
const HERO_BG = '/images/hero-tour-bg.jpg';
// The product visual: a generated picture of the admin. Falls back to the coded
// AdminMock if the file is missing.
const HERO_SHOT = '/images/admin-tour.jpg';

interface HeroProps {
  onEnquire: () => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const deviceRef = useRef<HTMLDivElement>(null);
  const [bgOk, setBgOk] = useState(true);
  const [shotOk, setShotOk] = useState(true);

  // Gentle scroll-linked drift on the device (max ~20px) for motion-ok users.
  useEffect(() => {
    const el = deviceRef.current;
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
      {bgOk && (
        <img
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          onError={() => setBgOk(false)}
          className="pointer-events-none absolute inset-x-0 top-[38%] w-full h-[70%] object-cover object-top opacity-90"
          style={{ maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)' }}
        />
      )}
      <div className="container-page relative pt-14 md:pt-20 text-center flex flex-col items-center gap-6">
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

        <div ref={deviceRef} data-hero-device data-reveal className="w-full max-w-[1040px] mt-6 md:mt-8">
          <div className="rounded-t-2xl border border-b-0 border-paper-edge bg-paper shadow-[0_-12px_60px_rgba(28,25,23,0.08)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b rule bg-paper-deep/50">
              <span className="h-2.5 w-2.5 rounded-full bg-terracotta/80" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-coffee-soft" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-coffee-soft" aria-hidden="true" />
              <span className="ml-3 flex-1 max-w-[360px] rounded-full bg-paper border rule px-3 py-[3px] text-left font-mono text-[10.5px] text-ink-mute">
                admin.acme.internal/projects
              </span>
            </div>
            {shotOk ? (
              <img
                src={HERO_SHOT}
                alt="The BFFless admin: a list of projects with live URLs and roles, and a pipeline run in progress"
                width={1376}
                height={768}
                onError={() => setShotOk(false)}
                className="block w-full h-auto"
                {...({ fetchpriority: 'high' } as Record<string, string>)}
              />
            ) : (
              <AdminMock />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
