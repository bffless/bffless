import { compareCols, compareRows, stack, type Mark } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';
import SectionHead from './SectionHead';

const marks: Record<Mark, { glyph: string; cls: string; label: string }> = {
  yes: { glyph: '●', cls: 'text-terracotta', label: 'yes' },
  half: { glyph: '◐', cls: 'text-ink/55', label: 'limited' },
  no: { glyph: '—', cls: 'text-ink-faint', label: 'no' },
};

// Posture table, kept to the rows that decide a self-host conversation, plus the
// stack readout so a technical reader can see the seams before they clone it.
export default function CompareSection() {
  return (
    <section id="compare" className="scroll-mt-20 bg-paper-deep overflow-hidden">
      <div className="container-page py-16 md:py-20 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 min-w-0">
        <SectionHead
          eyebrow="Compare"
          title={
            <>
              Everything GitHub Pages leaves out. <span className="display-em">Nothing that leaves your network.</span>
            </>
          }
        >
          <p className="mt-5 text-[15px] leading-[1.55] text-ink-label">
            GitHub Pages, Vercel and Cloudflare Pages each solve a slice. None gives you SSO, a proxy to your
            private API, and self-host in the same product.
          </p>
          <div className="mt-8 hidden lg:block" data-reveal>
            <p className="meta-label !text-ink-mute mb-3">Stack</p>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[12px] font-mono leading-[1.5]">
              {stack.map((s) => (
                <div key={s.layer} className="contents">
                  <dt className="text-ink">{s.layer}</dt>
                  <dd className="text-ink-label">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </SectionHead>

        <div data-reveal className="min-w-0">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] bg-paper border rule text-left">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="px-4 py-4 meta-label !text-ink-mute font-normal">
                    Capability
                  </th>
                  {compareCols.map((c) => (
                    <th
                      key={c.label}
                      scope="col"
                      className={`px-4 py-4 border-l rule font-normal align-bottom ${c.emphasis ? 'bg-coffee-wash/60' : ''}`}
                    >
                      <span className={`block text-[14px] leading-tight ${c.emphasis ? 'text-ink font-semibold' : 'text-ink-label'}`}>
                        {c.label}
                      </span>
                      <span className="block meta-label !text-ink-mute mt-1.5">{c.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={r.row} className="border-b rule last:border-b-0" data-reveal style={revealDelay(i * 35)}>
                    <th scope="row" className="px-4 py-3 text-[14px] text-ink font-normal leading-snug">
                      {r.row}
                    </th>
                    {r.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 border-l rule ${compareCols[ci].emphasis ? 'bg-coffee-wash/30' : ''}`}
                      >
                        <span className={`font-mono text-[17px] leading-none ${marks[cell].cls}`} aria-hidden="true">
                          {marks[cell].glyph}
                        </span>
                        <span className="sr-only">{marks[cell].label}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="md:hidden mt-3 meta-label !text-ink-mute">← swipe to compare all four →</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.06em] uppercase text-ink-mute">
            <li>
              <span className="text-terracotta">●</span> Built in
            </li>
            <li>
              <span className="text-ink/55">◐</span> Limited · depends on plan
            </li>
            <li>
              <span className="text-ink-faint">—</span> Not in scope · or manual
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
