// BFFless · CE / GitHub Pages / Vercel · Netlify / Cloudflare Pages.
// Note column only renders against the rightmost (Cloudflare) cell.

type Mark = 'yes' | 'half' | 'no';
type Row = { row: string; cells: [Mark, Mark, Mark, Mark]; note?: string };

const cols: { label: string; sub: string; emphasis?: boolean }[] = [
  { label: 'BFFless · CE', sub: 'self-host · docker compose', emphasis: true },
  { label: 'GitHub Pages', sub: 'static-only · public' },
  { label: 'Vercel · Netlify', sub: 'managed PaaS' },
  { label: 'Cloudflare Pages', sub: 'edge static + workers' },
];

const rows: Row[] = [
  { row: 'SSO / RBAC in front of the site', cells: ['yes', 'no', 'half', 'half'], note: 'workers code' },
  { row: 'Reverse proxy to any backend (no CORS)', cells: ['yes', 'no', 'half', 'half'], note: 'via workers' },
  { row: 'Custom domain + auto SSL', cells: ['yes', 'no', 'yes', 'yes'] },
  { row: 'Server-side pipelines (BFF, no code)', cells: ['yes', 'no', 'no', 'no'] },
  { row: 'Self-host in your VPC / on-prem', cells: ['yes', 'yes', 'no', 'no'], note: 'managed only' },
  { row: 'Immutable, SHA-keyed deploys', cells: ['yes', 'no', 'yes', 'yes'] },
  { row: 'Preview deployment per PR', cells: ['yes', 'half', 'yes', 'yes'] },
  { row: 'Instant rollback by alias pointer', cells: ['yes', 'no', 'half', 'half'], note: 'rolling redeploy' },
  { row: 'GitHub Action · push to deploy', cells: ['yes', 'yes', 'yes', 'yes'] },
  { row: 'Free forever, no usage cap', cells: ['yes', 'yes', 'half', 'half'], note: 'free tier limits' },
];

const markGlyph: Record<Mark, { ch: string; cls: string; aria: string }> = {
  yes: { ch: '●', cls: 'text-terracotta', aria: 'yes' },
  half: { ch: '◐', cls: 'text-ink/60', aria: 'limited' },
  no: { ch: '—', cls: 'text-ink-faint', aria: 'no' },
};

export default function ComparisonTable() {
  return (
    <section id="compare" className="border-b rule">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-10 md:mb-14 items-end" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
              <span className="font-sans font-bold">Self-hostable static hosting.</span>{' '}
              <em className="not-italic italic font-medium">With auth,</em>{' '}
              <span className="font-sans font-bold">a proxy, and pipelines.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              GitHub Pages, Vercel and Cloudflare Pages each solve a slice; none of them gives you SSO, a reverse proxy to your private API, and self-host in your VPC in the same product. BFFless does — and the CE build is free and source-available.
            </p>
            <p className="meta-label mt-5">Fig. 06 · Posture</p>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide" data-reveal>
          <div className="border border-paper-line bg-paper min-w-[680px]">
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b border-paper-line">
            <div className="px-5 py-5">
              <span className="meta-label">Capability</span>
            </div>
            {cols.map((c) => (
              <div key={c.label} className={`px-5 py-5 border-l border-paper-line ${c.emphasis ? 'bg-paper-deep/30' : ''}`}>
                <p className={`font-serif text-[15px] md:text-[16px] leading-[1.15] ${c.emphasis ? 'text-ink' : 'text-ink-soft'}`}>
                  {c.label}
                </p>
                <p className="meta-label mt-2">{c.sub}</p>
              </div>
            ))}
          </div>

          {rows.map((r, i) => (
            <div
              key={r.row}
              className={`grid grid-cols-[1.4fr_repeat(4,1fr)] ${i < rows.length - 1 ? 'border-b border-paper-line' : ''}`}
            >
              <div className="px-5 py-4 flex items-center">
                <span className="text-[14.5px] text-ink leading-snug">{r.row}</span>
              </div>
              {r.cells.map((cell, ci) => (
                <div
                  key={ci}
                  className={`px-5 py-4 border-l border-paper-line flex items-center justify-between gap-3 ${cols[ci].emphasis ? 'bg-paper-deep/15' : ''}`}
                >
                  <span className={`font-mono text-[18px] leading-none ${markGlyph[cell].cls}`} aria-label={markGlyph[cell].aria}>
                    {markGlyph[cell].ch}
                  </span>
                  {ci === 3 && r.note && (
                    <span className="font-mono text-[10px] text-ink-label uppercase tracking-widest text-right max-w-[110px] leading-tight">
                      {r.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
        <p className="md:hidden mt-3 meta-label">← swipe to compare all four →</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] font-mono text-ink-label uppercase tracking-widest">
          <span>
            <span className="text-terracotta">●</span> Built in
          </span>
          <span>
            <span className="text-ink/60">◐</span> Limited · depends on plan
          </span>
          <span>
            <span className="text-ink-faint">—</span> Not in scope · or manual
          </span>
        </div>
      </div>
    </section>
  );
}
