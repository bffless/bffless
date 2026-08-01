// The app catalog: ready-made apps that install in one click onto a self-hosted
// instance. Card data is static on purpose — apps.bffless.dev/registry.json serves
// no Access-Control-Allow-Origin, so a runtime fetch from this origin would fail.
// Adding an app here is a one-entry edit once it ships to the catalog.

import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

const STORE_URL = 'https://apps.bffless.dev/';

type CatalogApp = {
  n: string;
  id: string;
  name: string;
  tag: string;
  status: string;
  available: boolean;
  summary: string;
  href?: string;
  thumbnail?: string;
  glyph?: 'studio' | 'reader';
};

const apps: CatalogApp[] = [
  {
    n: '01',
    id: 'handoff',
    name: 'Handoff',
    tag: 'Files',
    status: 'Available · v1.0',
    available: true,
    summary:
      'An internal file server with per-folder access control, share links for people outside the team, margin comments, and uploaded static bundles served back as live Sites.',
    href: 'https://apps.bffless.dev/apps/handoff/',
    thumbnail: '/images/apps/handoff.png',
  },
  {
    n: '02',
    id: 'studio',
    name: 'Studio',
    tag: 'Video',
    status: 'In development',
    available: false,
    summary:
      'Turns one long, rambly screen recording into a short video in your own recorded voice — an AI director proposes the cuts, you tune them scene by scene, and the kept footage is stitched into a final cut.',
    glyph: 'studio',
  },
  {
    n: '03',
    id: 'reader',
    name: 'Reader',
    tag: 'Feeds',
    status: 'In development',
    available: false,
    summary:
      'A Google-Reader-style RSS reader — folders, a unified river of unread items, stars, and OPML import — refreshed in the background by a scheduled pipeline on your own instance.',
    glyph: 'reader',
  },
];

export default function AppCatalogSection() {
  return (
    <section id="apps" className="border-b rule bg-paper-deep/30">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-ink">
              <span className="font-sans font-bold">Apps you can install</span>{' '}
              <em className="not-italic italic font-medium">in one click.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Nothing to build first. The catalog ships open-source apps that run entirely on your own
              instance — each one's backend is a reviewable pipeline rule set, not someone else's
              server. Pick one in <span className="font-mono text-ink text-[14px]">Admin → Apps</span>, give it a
              subdomain, and it's live.
            </p>
            <p className="meta-label mt-5">Fig. 07 · Catalog · apps.bffless.dev</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-paper-line">
          {apps.map((app, i) => (
            <article
              key={app.id}
              className="border-r border-b border-paper-line p-7 md:p-8 bg-paper flex flex-col"
              data-reveal
              style={revealDelay(i * 60)}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="meta-label">N°-{app.n} · {app.tag}</span>
                <span
                  className={`meta-label flex items-center gap-2 ${
                    app.available ? 'text-terracotta-ink' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      app.available ? 'bg-terracotta' : 'bg-ink-faint'
                    }`}
                  />
                  {app.status}
                </span>
              </div>

              <div className="relative aspect-[16/9] mb-6 border border-paper-line bg-paper-deep/30 overflow-hidden">
                {app.thumbnail ? (
                  <img
                    src={app.thumbnail}
                    alt={`${app.name} — screenshot of the app running on a BFFless instance`}
                    loading="lazy"
                    width={1200}
                    height={630}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <AppGlyph glyph={app.glyph!} id={app.id} />
                )}
              </div>

              <h3 className="font-serif text-[22px] md:text-[23px] leading-[1.15] tracking-[-0.005em] text-ink mb-3">
                {app.name}
              </h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed mb-6">{app.summary}</p>

              <div className="mt-auto pt-6 border-t border-paper-line">
                {app.href ? (
                  <a
                    href={app.href}
                    onClick={() =>
                      trackConversion('app_store_clicked', { source: 'catalog_card', app: app.id })
                    }
                    className="inline-flex items-center gap-2 font-mono text-[12.5px] text-ink hover:text-terracotta transition-colors"
                  >
                    View in the app store
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span className="font-mono text-[12.5px] text-ink-mute">Coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-12 md:mt-14 border border-ink bg-paper p-8 md:p-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          data-reveal
        >
          <div className="lg:col-span-7">
            <p className="meta-label mb-4">Install · three steps</p>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-3 font-mono text-[13px] text-ink">
              <li className="border border-paper-line bg-paper-deep/40 px-3 py-2">Admin → Apps</li>
              <li aria-hidden="true" className="text-terracotta">
                →
              </li>
              <li className="border border-paper-line bg-paper-deep/40 px-3 py-2">Install</li>
              <li aria-hidden="true" className="text-terracotta">
                →
              </li>
              <li className="border border-paper-line bg-paper-deep/40 px-3 py-2">
                handoff.yourdomain.com
              </li>
            </ol>
            <p className="mt-5 text-[14.5px] text-ink-soft leading-relaxed max-w-xl">
              The frontend and its rule sets deploy together onto an alias of your choosing. Updates
              are one click too, and every app is forkable — eject to your own repo and your first
              deploy lands on the same alias.
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-paper-line lg:pl-12">
            <p className="meta-label mb-4">Requires CE ≥ 0.4.0</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={STORE_URL}
                onClick={() => trackConversion('app_store_clicked', { source: 'catalog_cta' })}
                className="pill-cta"
              >
                Browse the app store
              </a>
              <a
                href="https://docs.bffless.dev/features/app-catalog/"
                onClick={() => trackConversion('docs_clicked', { source: 'catalog_cta' })}
                className="pill-ghost"
              >
                How installs work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Letterpress placeholders for apps that have no catalog screenshot yet, drawn in the
// same framed-figure language as the use-case grid.
function AppGlyph({ glyph, id }: { glyph: 'studio' | 'reader'; id: string }) {
  return (
    <svg viewBox="0 0 200 112" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <pattern id={`app-mg-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="200" height="112" fill={`url(#app-mg-${id})`} />
      <rect x="0" y="0" width="8" height="8" fill="#171513" />
      <rect x="192" y="104" width="8" height="8" fill="#171513" />

      {glyph === 'studio' && (
        <g>
          {/* timeline with kept spans and one dropped cut */}
          <rect x="40" y="26" width="120" height="26" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
          <polygon points="86,34 100,39 86,44" fill="#171513" />
          <rect x="40" y="66" width="34" height="10" fill="#171513" />
          <rect x="78" y="66" width="22" height="10" fill="#ECE3D2" stroke="#D85A3D" strokeWidth="1" strokeDasharray="2,2" />
          <rect x="104" y="66" width="26" height="10" fill="#171513" opacity="0.78" />
          <rect x="134" y="66" width="26" height="10" fill="#171513" />
          <line x1="40" y1="84" x2="160" y2="84" stroke="#171513" strokeWidth="0.5" />
          <rect x="98" y="60" width="1.4" height="30" fill="#D85A3D" />
        </g>
      )}

      {glyph === 'reader' && (
        <g>
          {/* feed list beside a river of unread items */}
          <rect x="40" y="26" width="42" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
          <rect x="46" y="34" width="26" height="2.5" fill="#171513" />
          <rect x="46" y="42" width="30" height="2.5" fill="#171513" opacity="0.6" />
          <rect x="46" y="50" width="22" height="2.5" fill="#171513" opacity="0.6" />
          <rect x="46" y="58" width="28" height="2.5" fill="#171513" opacity="0.6" />
          <circle cx="76" cy="35" r="2.4" fill="#D85A3D" />
          <rect x="88" y="26" width="72" height="17" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
          <rect x="94" y="31" width="40" height="2.5" fill="#171513" />
          <rect x="94" y="37" width="56" height="2" fill="#171513" opacity="0.5" />
          <rect x="88" y="47" width="72" height="17" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
          <rect x="94" y="52" width="34" height="2.5" fill="#171513" />
          <rect x="94" y="58" width="50" height="2" fill="#171513" opacity="0.5" />
          <rect x="88" y="68" width="72" height="17" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
          <rect x="94" y="73" width="46" height="2.5" fill="#171513" opacity="0.6" />
          <rect x="94" y="79" width="30" height="2" fill="#171513" opacity="0.4" />
        </g>
      )}
    </svg>
  );
}
