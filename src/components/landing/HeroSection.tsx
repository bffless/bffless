import HeroVisual from './HeroVisual';
import { trackConversion } from '../../hooks/useAnalytics';

export default function HeroSection() {
  return (
    <section className="border-b rule">
      <div className="container-page py-16 md:py-24">
        <div className="flex items-center justify-between mb-12 md:mb-20">
          <span className="meta-label">N°-01 · Community Edition · One docker compose up</span>
          <span className="hidden md:inline meta-label">Atlanta · GA · Source-available</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-7 relative">
            <p className="meta-label mb-6">— Open-source · self-host · N°-01</p>

            <h1 className="font-serif text-[44px] md:text-[68px] lg:text-[80px] leading-[0.98] tracking-[-0.015em] text-ink">
              <span className="font-sans font-bold">GitHub Pages</span>
              <span className="text-terracotta">.</span>{' '}
              <em className="not-italic font-serif italic font-medium">With auth,</em>
              <br />
              <em className="not-italic font-serif italic font-medium">a reverse proxy,</em>{' '}
              <span className="font-sans font-bold">and a BFF.</span>
            </h1>

            <p className="mt-10 text-[17px] md:text-[18px] leading-relaxed text-ink-soft max-w-xl">
              The home for your{' '}
              <em className="not-italic font-serif italic text-ink">AI-generated apps, internal tools, and HTML docs</em>
              {' '}— with a backend, auth, and a path to your internal services. Point any static build at BFFless and get the{' '}
              <em className="not-italic font-serif italic text-ink">same git push → live URL flow as GitHub Pages</em>
              {' '}— plus everything GH Pages is missing: SSO, RBAC, a reverse proxy to any backend, server-side pipelines, immutable SHA-keyed deploys. Self-host on a $6 droplet or a Kubernetes cluster with one{' '}
              <code className="font-mono text-[15px] md:text-[16px] text-ink">docker compose up</code>. Source-available. Free.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://docs.bffless.app/getting-started/quickstart/"
                onClick={() => trackConversion('get_started_clicked', { source: 'hero' })}
                className="pill-cta"
              >
                Quickstart
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://github.com/bffless/ce"
                onClick={() => trackConversion('github_clicked', { source: 'hero' })}
                className="pill-ghost"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                Source on GitHub
              </a>
              <a href="#architecture" className="pill-ghost">
                Read the architecture
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 max-w-md">
              <a href="#platform" className="block group">
                <p className="font-serif text-2xl text-ink leading-none group-hover:text-terracotta transition-colors">Auth</p>
                <p className="meta-label mt-2">SSO · JWT · RBAC</p>
              </a>
              <a href="#platform" className="block group">
                <p className="font-serif text-2xl text-ink leading-none group-hover:text-terracotta transition-colors">Proxy</p>
                <p className="meta-label mt-2">Any backend · no CORS</p>
              </a>
              <a href="#workflow" className="block group">
                <p className="font-serif text-2xl text-ink leading-none group-hover:text-terracotta transition-colors">Pipelines</p>
                <p className="meta-label mt-2">BFF · without a backend</p>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
