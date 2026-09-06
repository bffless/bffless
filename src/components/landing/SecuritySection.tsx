import { security } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';
import SectionHead from './SectionHead';

export default function SecuritySection() {
  return (
    <section id="security" className="scroll-mt-20">
      <div className="container-page pb-16 md:pb-20">
        <div className="border-t border-ink pt-12 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
          <SectionHead eyebrow="Security" title="What your compliance team will ask about." size="sm" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-6 text-[14px] leading-[1.5] text-ink-soft">
            {security.map((s, i) => (
              <li key={s.lead} data-reveal style={revealDelay(i * 60)}>
                <b className="text-ink font-semibold">{s.lead}</b>
                <br />
                {s.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
