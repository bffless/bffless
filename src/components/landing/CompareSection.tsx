import { compareCols, compareRows, type Mark } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';

const marks: Record<Mark, { glyph: string; cls: string; label: string }> = {
  yes: { glyph: '●', cls: 'text-terracotta', label: 'yes' },
  half: { glyph: '◐', cls: 'text-ink/50', label: 'limited' },
  no: { glyph: '—', cls: 'text-ink-faint', label: 'no' },
};

export default function CompareSection() {
  return (
    <section id="compare" className="scroll-mt-20 overflow-hidden">
      <div className="container-page py-20 md:py-24 text-center min-w-0">
        <p className="meta-label mb-3.5" data-reveal>
          Compare
        </p>
        <h2 className="statement text-[34px] md:text-[44px] text-ink max-w-[720px] mx-auto" data-reveal style={revealDelay(60)}>
          Each of them solves a slice. <span className="display-em">This is the whole thing.</span>
        </h2>
        <p className="mt-4 text-[16px] md:text-[17px] text-ink-soft max-w-[560px] mx-auto leading-[1.5]" data-reveal style={revealDelay(120)}>
          SSO, a proxy to your private API, and self-host in the same product — and the CE build is free.
        </p>

        <div className="mt-10 min-w-0 text-left" data-reveal style={revealDelay(180)}>
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] rounded-tile border rule overflow-hidden border-separate border-spacing-0">
              <thead>
                <tr className="bg-paper-deep">
                  <th scope="col" className="px-5 py-4 meta-label !text-ink-mute font-semibold text-left rounded-tl-tile">
                    Capability
                  </th>
                  {compareCols.map((c, i) => (
                    <th
                      key={c.label}
                      scope="col"
                      className={`px-4 py-4 text-left align-bottom ${i === compareCols.length - 1 ? 'rounded-tr-tile' : ''}`}
                    >
                      <span className={`block text-[14px] leading-tight ${c.emphasis ? 'text-ink font-bold' : 'text-ink-soft font-medium'}`}>
                        {c.label}
                      </span>
                      <span className="block text-[11px] text-ink-mute mt-1">{c.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.row}>
                    <th scope="row" className="px-5 py-3 text-[14px] text-ink font-medium border-t rule text-left">
                      {r.row}
                    </th>
                    {r.cells.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-3 border-t rule ${compareCols[ci].emphasis ? 'bg-coffee-wash/40' : ''}`}>
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
          <p className="md:hidden mt-3 text-[12px] text-ink-mute">← swipe to compare all four →</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-mute">
            <li>
              <span className="text-terracotta">●</span> Built in
            </li>
            <li>
              <span className="text-ink/50">◐</span> Limited · depends on plan
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
