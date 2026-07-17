import { revealDelay } from '../../hooks/useReveal';

const rows = [
  { layer: 'Backend', value: 'NestJS · TypeScript' },
  { layer: 'Frontend', value: 'React · Vite · RTK Query' },
  { layer: 'Database', value: 'PostgreSQL · Drizzle ORM' },
  { layer: 'Auth', value: 'SuperTokens · JWT · OAuth' },
  { layer: 'Storage', value: 'Local · MinIO · S3 · GCS · Azure' },
  { layer: 'Edge', value: "nginx · TLS · Let's Encrypt" },
  { layer: 'Orchestration', value: 'Docker Compose · single host' },
  { layer: 'Observability', value: 'Vector · TimescaleDB · Grafana · opt' },
];

export default function StackReadout() {
  return (
    <section id="stack" className="border-b rule">
      <div className="container-page py-20 md:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4" data-reveal>
          <h2 className="font-serif text-3xl md:text-[42px] leading-[1.05] tracking-[-0.01em] text-ink">
            <span className="font-sans font-bold">A stack you can</span>{' '}
            <em className="not-italic italic font-medium">read</em>.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed">
            Boring on purpose. Production-tested choices, with the seams visible. Clone the source, run it locally, ship it to your VPS.
          </p>
        </div>

        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-paper-line border border-paper-line">
          {rows.map((row, i) => (
            <div
              key={row.layer}
              className="bg-paper px-6 py-5 flex items-baseline justify-between gap-4"
              data-reveal
              style={revealDelay(i * 45)}
            >
              <span className="meta-label">{row.layer}</span>
              <span className="font-mono text-[12.5px] text-ink tracking-tight text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
