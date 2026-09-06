import { apps, LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));
const wide = [byId.workflow, byId.recall, byId.handoff];
const compact = [byId.studio, byId.reader];

export default function AppsSection() {
  return (
    <section id="apps" className="scroll-mt-20">
      <div className="container-page pb-20 md:pb-24 text-center">
        <p className="meta-label mb-3.5" data-reveal>
          App store
        </p>
        <h2 className="statement text-[34px] md:text-[44px] text-ink max-w-[700px] mx-auto" data-reveal style={revealDelay(60)}>
          Five apps. One instance. All yours.
        </h2>
        <p className="mt-4 text-[16px] md:text-[17px] text-ink-soft max-w-[560px] mx-auto leading-[1.5]" data-reveal style={revealDelay(120)}>
          Open-source tools that install in one click. Each is a static frontend plus a pipeline rule set — proof of
          what you can build on the same primitives.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-12 text-left" aria-label="Apps in the catalog">
          {wide.map((app, i) => (
            <li key={app.id} className="md:col-span-2" data-reveal style={revealDelay(i * 60)}>
              <a
                href={app.href}
                onClick={() => trackConversion('app_card_clicked', { app: app.id, source: 'apps_bento' })}
                className="group block h-full bg-paper-deep rounded-tile p-5 flex flex-col gap-4 transition-colors hover:bg-coffee-wash"
              >
                <span className="block aspect-[16/10] rounded-[10px] overflow-hidden border border-paper-edge bg-paper">
                  <img
                    src={app.image}
                    alt={`${app.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span>
                  <span className="flex items-center gap-2 font-bold text-[16px] text-ink">
                    {app.name}
                    {app.isNew && (
                      <span className="text-[10px] bg-terracotta text-white px-[7px] py-[2px] rounded-full font-semibold tracking-wide">
                        NEW
                      </span>
                    )}
                  </span>
                  <span className="block text-[13px] text-ink-soft mt-1 leading-[1.5]">{app.summary}</span>
                </span>
              </a>
            </li>
          ))}
          {compact.map((app, i) => (
            <li key={app.id} className="md:col-span-3" data-reveal style={revealDelay(180 + i * 60)}>
              <a
                href={app.href}
                onClick={() => trackConversion('app_card_clicked', { app: app.id, source: 'apps_bento' })}
                className="group block h-full bg-paper-deep rounded-tile p-5 grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-4 items-center transition-colors hover:bg-coffee-wash"
              >
                <span className="block aspect-square rounded-[10px] overflow-hidden border border-paper-edge bg-paper">
                  <img
                    src={app.image}
                    alt={`${app.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span>
                  <span className="block font-bold text-[16px] text-ink">{app.name}</span>
                  <span className="block text-[13px] text-ink-soft mt-1 leading-[1.5]">{app.summary}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div
          className="mt-5 bg-ink text-white rounded-tile px-6 py-6 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left"
          data-reveal
        >
          <p className="text-[15px] leading-[1.5]">
            <b>Plus MCP servers.</b>{' '}
            <span className="text-paper-edge">
              Your agents deploy, query data, and run pipelines on your instance, through the same handlers exposed
              as tools.
            </span>
          </p>
          <a
            href={LINKS.store}
            onClick={() => trackConversion('app_store_clicked', { source: 'apps_bento' })}
            className="flex-none text-[13px] font-medium px-[18px] py-2.5 rounded-full border border-ink-label hover:bg-white hover:text-ink transition-colors whitespace-nowrap"
          >
            Browse the app store
          </a>
        </div>
      </div>
    </section>
  );
}
