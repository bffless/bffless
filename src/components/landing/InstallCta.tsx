import { LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { Arrow } from './Hero';

interface InstallCtaProps {
  onEnquire: () => void;
}

// 04 · Who runs it. The dark panel at the end of the ledger: the one place the
// page asks for something. Both routes are on it — hire me, or self-host.
export default function InstallCta({ onEnquire }: InstallCtaProps) {
  return (
    <section id="install" className="scroll-mt-20">
      <div className="container-page pb-14 md:pb-16">
        <div
          className="relative overflow-hidden bg-ink text-paper px-7 py-12 md:p-16 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-center"
          data-reveal
        >
          {/* Generated grain-and-glow texture; the CSS gradients underneath keep the
              panel warm if the image is missing or still loading. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(60% 80% at 100% 0%, rgba(107,79,58,0.55) 0%, rgba(28,25,23,0) 60%), radial-gradient(40% 60% at 0% 100%, rgba(214,59,47,0.25) 0%, rgba(28,25,23,0) 60%)',
            }}
          />
          <img
            src="/images/cta-dark.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="relative">
            <p className="meta-label !text-coffee-soft mb-4">04 · Who runs it</p>
            <h2 className="font-bold text-[32px] md:text-[40px] leading-[1.08] tracking-[-0.025em] text-balance">
              I'll install BFFless for your team.{' '}
              <span className="display-em !text-coffee-soft">You keep the keys.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.55] text-paper-edge max-w-[520px] text-pretty">
              Your server, your IdP, your domain. I wire up SSO, storage, the first pipelines, and the CI flow —
              then hand it over with a runbook. Or take the $6-droplet route yourself; the docs cover it.
            </p>
          </div>
          <div className="relative flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                trackConversion('consulting_cta_clicked', { source: 'install_cta' });
                onEnquire();
              }}
              className="pill-cta !py-4"
            >
              Tell me what you need
              <Arrow />
            </button>
            <a
              href={LINKS.quickstart}
              onClick={() => trackConversion('get_started_clicked', { source: 'install_cta' })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-label px-6 py-4 text-[15px] text-paper hover:bg-paper hover:text-ink hover:border-paper transition-colors"
            >
              Self-host: <code className="font-mono text-[13.5px]">docker compose up</code>
            </a>
            <p className="font-mono text-[11px] text-ink-faint text-center mt-1">
              No obligation, no sales pitch. I reply within a day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
