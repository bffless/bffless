import { revealDelay } from '../../hooks/useReveal';

const cards = [
  { title: 'Your VPC', body: 'Single docker-compose stack. No phone-home. A $6 droplet will do.' },
  { title: 'Explicit RBAC', body: 'System-wide global roles plus per-project roles. API keys scoped per project.' },
  { title: 'Immutable deploys', body: 'SHA-keyed objects. Rollback is an alias change; audit trails come free.' },
  { title: 'Source-available', body: 'CE build is free and open. Read every line before you run it.' },
];

export default function SecuritySection() {
  return (
    <section id="security" className="scroll-mt-20 bg-paper-deep">
      <div className="container-page py-20 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-5" data-reveal>
          <p className="meta-label">Enterprise-ready</p>
          <h2 className="statement text-[34px] md:text-[44px] text-ink">
            Private by default. <span className="display-em">Auditable by design.</span>
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[1.55] text-ink-soft text-pretty">
            Public-by-default is fine for marketing pages. Everything else needs a permission model — and a
            compliance team that can read it.
          </p>
          <a
            href="#compare"
            className="self-start text-[14px] font-semibold px-5 py-3 rounded-full border border-ink text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Compare with GitHub Pages, Vercel, Cloudflare →
          </a>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3.5">
          {cards.map((c, i) => (
            <li key={c.title} className="bg-paper rounded-[14px] p-5 md:p-6" data-reveal style={revealDelay(i * 60)}>
              <p className="font-bold text-[15px] text-ink">{c.title}</p>
              <p className="text-[13px] text-ink-soft mt-1.5 leading-[1.5]">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
