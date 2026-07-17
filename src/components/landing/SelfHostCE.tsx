// CE closing CTA: run it yourself — self-hosted, source-available, free.

import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

export default function SelfHostCE() {
  return (
    <section id="paths">
      <div className="container-page py-20 md:py-28">
        <div className="relative border border-ink p-10 md:p-16 bg-paper">
          <span className="absolute -top-3 left-8 bg-paper px-3 meta-label">N°-10 · Self-host</span>
          <span className="absolute -top-3 right-8 bg-paper px-3 meta-label">Free · source-available</span>

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
                <span className="font-sans font-bold">A $6 droplet is all it takes.</span>
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
                One <code className="font-mono text-ink">docker compose up</code> and you're hosting. Source-available, no telemetry, no usage cap, no per-seat pricing. The whole platform — auth, RBAC, reverse proxy, pipelines, immutable deploys, custom domains with auto-SSL — runs on a single host. Bring your IdP, swap your storage, ship.
              </p>
            </div>

            <div className="md:border-l md:border-paper-line md:pl-12 md:pt-10" data-reveal style={revealDelay(120)}>
              <ul className="space-y-2 text-[13px] font-mono text-ink">
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Source-available · MIT-ish
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Single docker-compose stack
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> No phone-home · no usage cap
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-terracotta">●</span> Your box, your data — take it anywhere
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://docs.bffless.app/getting-started/quickstart/"
                  onClick={() => trackConversion('get_started_clicked', { source: 'self_host_cta' })}
                  className="pill-cta"
                >
                  Quickstart
                </a>
                <a
                  href="https://github.com/bffless/ce"
                  onClick={() => trackConversion('github_clicked', { source: 'self_host_cta' })}
                  className="pill-ghost"
                >
                  Source on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
