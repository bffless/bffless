import { LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

interface FinalCtaProps {
  onEnquire: () => void;
}

export default function FinalCta({ onEnquire }: FinalCtaProps) {
  return (
    <section id="install" className="scroll-mt-20 bg-gradient-to-b from-paper to-paper-deep">
      <div className="container-page py-24 md:py-28 text-center flex flex-col items-center gap-6">
        <h2 className="statement text-[38px] md:text-[52px] text-ink max-w-[820px]" data-reveal>
          Simple enough to self‑host. <span className="display-em">Or let me set it up.</span>
        </h2>
        <p className="text-[16px] md:text-[17px] text-ink-soft max-w-[560px] leading-[1.5] text-pretty" data-reveal style={revealDelay(80)}>
          I install BFFless on your infrastructure, wire SSO and storage, ship the first pipelines, and hand over a
          runbook. Your team keeps every key.
        </p>
        <div className="flex flex-wrap justify-center gap-3" data-reveal style={revealDelay(160)}>
          <button
            type="button"
            onClick={() => {
              trackConversion('consulting_cta_clicked', { source: 'final_cta' });
              onEnquire();
            }}
            className="pill-cta !px-[26px] !py-4"
          >
            Tell me what you need →
          </button>
          <a
            href={LINKS.quickstart}
            onClick={() => trackConversion('get_started_clicked', { source: 'final_cta' })}
            className="pill-ghost !px-[26px] !py-4"
          >
            <code className="font-mono text-[14px]">docker compose up</code>
          </a>
        </div>
        <p className="font-mono text-[11px] text-ink-mute" data-reveal style={revealDelay(220)}>
          No obligation, no sales pitch. I reply within a day.
        </p>
      </div>
    </section>
  );
}
