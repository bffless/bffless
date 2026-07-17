import { revealDelay } from '../../hooks/useReveal';

const useCases = [
  {
    n: '01',
    tag: 'AI apps & internal tools',
    title: 'AI-generated apps & internal tools',
    body: 'The HTML apps and dashboards your AI agents produce, plus your own admin panels — any SPA build, behind SSO, on a subdomain inside your network.',
    glyph: 'panel',
  },
  {
    n: '02',
    tag: 'Documentation',
    title: 'Engineering docs',
    body: 'Docusaurus, VitePress, MkDocs, mdBook. Versioned per branch, instant rollback on a typo.',
    glyph: 'docs',
  },
  {
    n: '03',
    tag: 'Component libs',
    title: 'Storybook & design system',
    body: 'Publish every PR — designers and PMs browse the component library before merge.',
    glyph: 'storybook',
  },
  {
    n: '04',
    tag: 'API contracts',
    title: 'API reference sites',
    body: 'Redoc, Scalar, Stoplight, hand-rolled OpenAPI HTML. Shareable URLs, gated to staff.',
    glyph: 'api',
  },
  {
    n: '05',
    tag: 'CI artefacts',
    title: 'Coverage & test reports',
    body: 'Every PR gets a coverage URL, a Lighthouse report, a Playwright trace — linked in the PR check.',
    glyph: 'coverage',
  },
  {
    n: '06',
    tag: 'Ops',
    title: 'Runbooks & onboarding',
    body: 'Markdown-built ops content, RBAC-gated. New-hire wiki without the SaaS-of-the-month.',
    glyph: 'runbook',
  },
];

export default function UseCaseGrid() {
  return (
    <section id="usecases" className="border-b rule">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em] font-sans font-bold">
              Static sites your team needs behind login.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              The HTML apps your AI agents generate, SPAs, docs, Storybooks, coverage reports — the static builds every team already produces, except they need to sit behind SSO or call your API. One platform, every static target.
            </p>
            <p className="meta-label mt-5">Fig. 02 · Targets · 6 common shapes</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-paper-line">
          {useCases.map((u, i) => (
            <article
              key={u.n}
              className="border-r border-b border-paper-line p-7 md:p-8 bg-paper"
              data-reveal
              style={revealDelay(i * 60)}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="meta-label">N°-{u.n}</span>
                <span className="meta-label">{u.tag}</span>
              </div>

              <div className="relative h-20 mb-6 border border-paper-line bg-paper-deep/30">
                <svg viewBox="0 0 200 80" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <pattern id={`uc-mg-${u.n}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="200" height="80" fill={`url(#uc-mg-${u.n})`} />
                  <rect x="0" y="0" width="8" height="8" fill="#171513" />
                  <rect x="192" y="72" width="8" height="8" fill="#171513" />

                  {u.glyph === 'panel' && (
                    <g>
                      <rect x="50" y="20" width="100" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
                      <line x1="50" y1="28" x2="150" y2="28" stroke="#171513" strokeWidth="0.6" />
                      <circle cx="55" cy="24" r="1.4" fill="#171513" />
                      <circle cx="60" cy="24" r="1.4" fill="#171513" />
                      <circle cx="65" cy="24" r="1.4" fill="#D85A3D" />
                      <rect x="50" y="28" width="22" height="36" fill="#171513" opacity="0.78" />
                      <rect x="76" y="34" width="40" height="3" fill="#171513" />
                      <rect x="76" y="42" width="60" height="3" fill="#171513" opacity="0.6" />
                      <rect x="76" y="50" width="48" height="3" fill="#171513" opacity="0.6" />
                      <rect x="76" y="58" width="34" height="3" fill="#D85A3D" />
                    </g>
                  )}

                  {u.glyph === 'docs' && (
                    <g>
                      <rect x="68" y="20" width="64" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
                      <rect x="74" y="14" width="64" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
                      <line x1="80" y1="22" x2="124" y2="22" stroke="#171513" strokeWidth="0.5" />
                      <line x1="80" y1="28" x2="132" y2="28" stroke="#171513" strokeWidth="0.5" />
                      <line x1="80" y1="34" x2="120" y2="34" stroke="#171513" strokeWidth="0.5" />
                      <line x1="80" y1="40" x2="128" y2="40" stroke="#171513" strokeWidth="0.5" />
                      <line x1="80" y1="46" x2="116" y2="46" stroke="#171513" strokeWidth="0.5" />
                      <rect x="130" y="14" width="8" height="8" fill="#D85A3D" />
                    </g>
                  )}

                  {u.glyph === 'storybook' && (
                    <g>
                      <rect x="56" y="20" width="22" height="22" fill="#171513" />
                      <rect x="82" y="20" width="22" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
                      <rect x="108" y="20" width="22" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
                      <rect x="134" y="20" width="22" height="22" fill="#D85A3D" />
                      <rect x="56" y="46" width="22" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
                      <rect x="82" y="46" width="22" height="22" fill="#171513" opacity="0.78" />
                      <rect x="108" y="46" width="22" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
                      <rect x="134" y="46" width="22" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
                    </g>
                  )}

                  {u.glyph === 'api' && (
                    <g>
                      <rect x="50" y="20" width="22" height="6" fill="#D85A3D" />
                      <rect x="76" y="20" width="74" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <text x="80" y="25" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#171513">
                        /users/{'{id}'}
                      </text>
                      <rect x="50" y="30" width="22" height="6" fill="#171513" />
                      <rect x="76" y="30" width="74" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <text x="80" y="35" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#171513">
                        /users
                      </text>
                      <rect x="50" y="40" width="22" height="6" fill="#171513" opacity="0.5" />
                      <rect x="76" y="40" width="74" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <text x="80" y="45" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#171513">
                        /orgs/{'{id}'}/audit
                      </text>
                      <rect x="50" y="50" width="22" height="6" fill="#171513" />
                      <rect x="76" y="50" width="74" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <text x="80" y="55" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#171513">
                        /deployments
                      </text>
                    </g>
                  )}

                  {u.glyph === 'coverage' && (
                    <g>
                      <line x1="40" y1="64" x2="160" y2="64" stroke="#171513" strokeWidth="0.6" />
                      <rect x="48" y="44" width="12" height="20" fill="#171513" opacity="0.6" />
                      <rect x="64" y="32" width="12" height="32" fill="#171513" />
                      <rect x="80" y="22" width="12" height="42" fill="#D85A3D" />
                      <rect x="96" y="38" width="12" height="26" fill="#171513" opacity="0.7" />
                      <rect x="112" y="28" width="12" height="36" fill="#171513" />
                      <rect x="128" y="46" width="12" height="18" fill="#171513" opacity="0.5" />
                      <rect x="144" y="34" width="12" height="30" fill="#171513" opacity="0.8" />
                      <line x1="40" y1="30" x2="160" y2="30" stroke="#D85A3D" strokeWidth="0.7" strokeDasharray="2,2" />
                    </g>
                  )}

                  {u.glyph === 'runbook' && (
                    <g>
                      <rect x="60" y="20" width="6" height="6" fill="#171513" />
                      <path d="M 60.5 23 l 2 2 l 4 -4" fill="none" stroke="#ECE3D2" strokeWidth="0.9" />
                      <rect x="70" y="22" width="60" height="2" fill="#171513" opacity="0.65" />
                      <rect x="60" y="32" width="6" height="6" fill="#171513" />
                      <path d="M 60.5 35 l 2 2 l 4 -4" fill="none" stroke="#ECE3D2" strokeWidth="0.9" />
                      <rect x="70" y="34" width="74" height="2" fill="#171513" opacity="0.65" />
                      <rect x="60" y="44" width="6" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <rect x="70" y="46" width="50" height="2" fill="#171513" opacity="0.5" />
                      <rect x="60" y="56" width="6" height="6" fill="#ECE3D2" stroke="#171513" strokeWidth="0.7" />
                      <rect x="70" y="58" width="66" height="2" fill="#171513" opacity="0.5" />
                      <circle cx="140" cy="22" r="3" fill="#D85A3D" />
                    </g>
                  )}
                </svg>
              </div>

              <h3 className="font-serif text-[22px] md:text-[23px] leading-[1.15] tracking-[-0.005em] text-ink mb-3">
                {u.title}
              </h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed">{u.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
