// CE-tuned two-paths CTA: run it yourself (this is what you came for) /
// let us run it (link out to bffless.com for the managed K8s offering).

import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

export default function TwoPathsCE() {
  return (
    <section id="paths">
      <div className="container-page py-20 md:py-28">
        <div className="relative border border-ink p-10 md:p-16 bg-paper">
          <span className="absolute -top-3 left-8 bg-paper px-3 meta-label">N°-10 · Two paths</span>
          <span className="absolute -top-3 right-8 bg-paper px-3 meta-label">Same platform · same code</span>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div data-reveal>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-widest text-terracotta">01 · CE</span>
                <span className="h-px flex-1 bg-paper-line" />
                <span className="meta-label">Self-host · free</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[52px] leading-[1.0] tracking-[-0.015em] text-ink">
                <span className="font-sans font-bold">Run it</span>{' '}
                <em className="not-italic italic font-medium">yourself.</em>{' '}
                <span className="font-sans font-bold">A $6 droplet or an enterprise cluster.</span>
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
                One <code className="font-mono text-ink">docker compose up</code> and you're hosting. Source-available, no telemetry, no usage cap, no per-seat pricing. The whole platform — auth, RBAC, reverse proxy, pipelines, immutable deploys, custom domains with auto-SSL — runs on a single host. Bring your IdP, swap your storage, ship.
              </p>
              <ul className="mt-6 space-y-2 text-[13px] font-mono text-ink">
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Source-available · MIT-ish
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Single docker-compose stack
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> No phone-home · no usage cap
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://docs.bffless.app/getting-started/quickstart/"
                  onClick={() => trackConversion('get_started_clicked', { source: 'two_paths' })}
                  className="pill-cta"
                >
                  Quickstart
                </a>
                <a
                  href="https://github.com/bffless/ce"
                  onClick={() => trackConversion('github_clicked', { source: 'two_paths' })}
                  className="pill-ghost"
                >
                  Source on GitHub
                </a>
              </div>
            </div>

            <div className="md:border-l md:border-paper-line md:pl-12" data-reveal style={revealDelay(120)}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-widest text-terracotta">02 · Managed</span>
                <span className="h-px flex-1 bg-paper-line" />
                <span className="meta-label">Don't want to run infra?</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[52px] leading-[1.0] tracking-[-0.015em] text-ink">
                <span className="font-sans font-bold">Or let us</span>{' '}
                <em className="not-italic italic font-medium">run it</em>{' '}
                <span className="font-sans font-bold">for you.</span>
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
                The same platform, multi-tenant on Kubernetes, installed in your cloud by our engineers — or fully managed by us. Per-workspace isolation, per-tenant Postgres, edge routing, observability, a control plane. SLAs and enterprise contracts available.
              </p>
              <ul className="mt-6 space-y-2 text-[13px] font-mono text-ink">
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Multi-tenant on K8s · per-workspace isolation
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> COTS install in your VPC, or fully managed
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Migrate from CE later — code &amp; data are yours
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://bffless.com/"
                  onClick={() => trackConversion('contact_clicked', { source: 'two_paths' })}
                  className="pill-cta"
                >
                  See bffless.com
                </a>
                <a href="https://bffless.com/#paths" className="pill-ghost">
                  COTS or SaaS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
