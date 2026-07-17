import { revealDelay } from '../../hooks/useReveal';

const pillars = [
  {
    n: '01',
    label: 'Self-host · your box',
    title: 'A $6 droplet. Or an enterprise cluster.',
    body: 'GitHub Pages runs on GitHub\'s edge. BFFless runs on yours — one docker-compose stack: nginx, NestJS backend, React admin frontend, Postgres, SuperTokens. Five storage adapters (S3, GCS, Azure, MinIO, local FS) swap by env var. No phone-home by default.',
    bullets: ['One docker compose up', 'S3 / GCS / Azure / MinIO / FS', 'No telemetry by default', 'Runs anywhere Docker runs'],
    glyph: 'cloud',
  },
  {
    n: '02',
    label: 'Auth · the missing layer',
    title: 'SSO-gated URLs. Out of the box.',
    body: 'GitHub Pages stops at "public, anyone with the URL." BFFless wraps every deployment in SuperTokens — sessions, JWT, JWKS, Google OAuth in-box, and a pluggable seam for Okta, Azure AD or your own OIDC. Two-tier RBAC underneath. The auth layer is the difference.',
    bullets: ['SuperTokens · JWT · JWKS', 'Google OAuth in-box', 'Bring-your-own IdP', 'Two-tier RBAC'],
    glyph: 'key',
  },
  {
    n: '03',
    label: 'BFF · proxy + pipelines',
    title: 'Call any backend. Without a backend.',
    body: 'GitHub Pages can\'t talk to your API without a separate origin and a CORS fight. BFFless ships proxy rule sets per alias and a server-side pipeline runtime — HTTP, data, email, function and other handlers — chained in JSON. The dynamic glue, without the Node service.',
    bullets: ['Proxy rule sets · per alias', 'Pipelines · chained handlers', 'No CORS · same-origin', 'Cache rules · CDN headers'],
    glyph: 'cicd',
  },
];

export default function ThreePillars() {
  return (
    <section id="platform" className="border-b rule">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em] font-sans font-bold">
              Auth<span className="text-terracotta">.</span> A proxy<span className="text-terracotta">.</span> Pipelines<span className="text-terracotta">.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              The static-hosting half is the easy bit — GitHub Pages, Cloudflare Pages, an S3 bucket, anything will do. The hard bit is everything between the browser and the bucket:{' '}
              <em className="not-italic font-serif italic text-ink">who can see it, what it can talk to, and how it ships</em>. BFFless is the three primitives that sit there.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-l border-paper-line">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              className="border-r border-b border-paper-line p-8 md:p-10 bg-paper"
              data-reveal
              style={revealDelay(i * 90)}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="meta-label">N°-{p.n}</span>
                <span className="meta-label">{p.label}</span>
              </div>

              <div className="relative h-16 mb-6 border border-paper-line bg-paper-deep/30">
                <svg viewBox="0 0 200 64" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <pattern id={`tp-pg-${p.n}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="200" height="64" fill={`url(#tp-pg-${p.n})`} />
                  <rect x="0" y="0" width="6" height="6" fill="#171513" />
                  <rect x="194" y="58" width="6" height="6" fill="#171513" />

                  {p.glyph === 'cloud' && (
                    <g>
                      <rect x="40" y="14" width="120" height="40" fill="none" stroke="#171513" strokeWidth="1" strokeDasharray="4,3" />
                      <text x="46" y="24" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#171513" letterSpacing="1">
                        YOUR-BOX
                      </text>
                      <rect x="50" y="30" width="24" height="18" fill="#171513" />
                      <rect x="78" y="30" width="24" height="18" fill="#ECE3D2" stroke="#171513" strokeWidth="0.8" />
                      <rect x="106" y="30" width="24" height="18" fill="#ECE3D2" stroke="#171513" strokeWidth="0.8" />
                      <rect x="134" y="30" width="20" height="18" fill="#D85A3D" />
                    </g>
                  )}

                  {p.glyph === 'key' && (
                    <g>
                      <line x1="64" y1="20" x2="64" y2="48" stroke="#171513" strokeWidth="1.2" />
                      <line x1="64" y1="20" x2="70" y2="20" stroke="#171513" strokeWidth="1.2" />
                      <line x1="64" y1="48" x2="70" y2="48" stroke="#171513" strokeWidth="1.2" />
                      <line x1="136" y1="20" x2="136" y2="48" stroke="#171513" strokeWidth="1.2" />
                      <line x1="130" y1="20" x2="136" y2="20" stroke="#171513" strokeWidth="1.2" />
                      <line x1="130" y1="48" x2="136" y2="48" stroke="#171513" strokeWidth="1.2" />
                      <circle cx="88" cy="34" r="6" fill="none" stroke="#D85A3D" strokeWidth="1.6" />
                      <line x1="94" y1="34" x2="116" y2="34" stroke="#D85A3D" strokeWidth="1.6" />
                      <line x1="110" y1="34" x2="110" y2="40" stroke="#D85A3D" strokeWidth="1.6" />
                      <line x1="116" y1="34" x2="116" y2="42" stroke="#D85A3D" strokeWidth="1.6" />
                    </g>
                  )}

                  {p.glyph === 'cicd' && (
                    <g>
                      <line x1="40" y1="32" x2="160" y2="32" stroke="#171513" strokeWidth="0.7" />
                      <circle cx="48" cy="32" r="4" fill="#171513" />
                      <circle cx="72" cy="32" r="4" fill="#171513" />
                      <circle cx="96" cy="32" r="4" fill="#171513" />
                      <circle cx="120" cy="32" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
                      <circle cx="148" cy="32" r="4" fill="#171513" />
                      <path d="M 120 37 V 48 H 148" fill="none" stroke="#171513" strokeWidth="0.6" />
                      <circle cx="148" cy="48" r="3" fill="#171513" opacity="0.7" />
                    </g>
                  )}
                </svg>
              </div>

              <h3 className="font-serif text-[24px] md:text-[26px] leading-[1.1] tracking-[-0.005em] text-ink mb-4">
                {p.title}
              </h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed mb-7">{p.body}</p>
              <ul className="space-y-2 border-t border-paper-line pt-4">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center justify-between text-[12.5px] font-mono tracking-wide">
                    <span className="text-ink">{b}</span>
                    <span className="text-terracotta">●</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
