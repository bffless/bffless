import { ledger } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';

// The table of contents, set as a ledger: four numbered stops, each a link into
// the section it summarises. This is the "high level → drill down" spine.
export default function LedgerRail() {
  return (
    <nav aria-label="Page outline" className="container-page pb-8 md:pb-10">
      <ol className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink border-b rule">
        {ledger.map((item, i) => (
          <li
            key={item.n}
            className={[
              'group',
              i < ledger.length - 1 ? 'lg:border-r rule' : '',
              i % 2 === 0 ? 'border-r rule lg:border-r' : '',
              i < 2 ? 'border-b rule lg:border-b-0' : '',
            ].join(' ')}
            data-reveal
            style={revealDelay(i * 70)}
          >
            <a
              href={`#${item.id}`}
              className="block h-full py-5 md:py-6 px-4 lg:px-5 first:lg:pl-0 transition-colors hover:bg-paper-deep/60"
            >
              <span className="block meta-label mb-2.5 !text-coffee">{item.n}</span>
              <span className="block font-semibold text-[15px] text-ink leading-tight">
                {item.title}
                <span
                  aria-hidden="true"
                  className="inline-block ml-1.5 translate-x-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 text-coffee"
                >
                  →
                </span>
              </span>
              <span className="block text-[13px] text-ink-mute mt-1">{item.sub}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
