import { layers } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';
import SectionHead from './SectionHead';

// The five layers a request passes through, as ledger rows. The red rail marks
// the row under the pointer (or the first one at rest), so the eye has a place
// to start without the whole list shouting.
export default function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-20 bg-paper-deep">
      <div className="container-page py-16 md:py-20 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
        <SectionHead
          eyebrow="02 · Platform"
          title={
            <>
              Static hosting is the easy half. <span className="display-em">This is the hard half.</span>
            </>
          }
        >
          <p className="mt-5 text-[15px] leading-[1.55] text-ink-label">
            Every request flows through five layers. Swap any of them; none of the request path leaves your
            network.
          </p>
          <p className="mt-6 meta-label hidden lg:block">Request → response · top to bottom</p>
        </SectionHead>

        <ol className="flex flex-col gap-0.5 group/rows" aria-label="Platform layers">
          {layers.map((l, i) => (
            <li
              key={l.key}
              className={[
                'grid md:grid-cols-[110px_1fr_190px] gap-x-5 gap-y-2 items-baseline px-5 py-4 md:py-[18px] bg-paper',
                'border-l-[3px] transition-colors',
                i === 0
                  ? 'border-terracotta group-hover/rows:border-transparent hover:!border-terracotta'
                  : 'border-transparent hover:border-terracotta',
              ].join(' ')}
              data-reveal
              style={revealDelay(i * 55)}
            >
              <span className="font-mono text-[12px] text-coffee tracking-[0.06em]">{l.key}</span>
              <p className="text-[15px] leading-[1.5] text-ink-label">
                <b className="text-ink font-semibold">{l.lead}</b> {renderBody(l.body)}
              </p>
              <span className="font-mono text-[11px] text-ink-mute md:text-right">{l.tags}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Sets the one handler chain in mono so it reads as code, not prose.
function renderBody(body: string) {
  const chain = 'form_handler → data_create → email_handler';
  const at = body.indexOf(chain);
  if (at < 0) return body;
  return (
    <>
      {body.slice(0, at)}
      <code className="font-mono text-[13px] text-ink">{chain}</code>
      {body.slice(at + chain.length)}
    </>
  );
}
