import { apps, LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';
import SectionHead from './SectionHead';

export default function ShipsWithSection() {
  return (
    <section id="apps" className="scroll-mt-20">
      <div className="container-page py-16 md:py-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 mb-10">
          <SectionHead
            eyebrow="03 · Ships with it"
            title={
              <>
                Apps built on it, and a set of MCP servers. <span className="display-em">One click each.</span>
              </>
            }
          />
          <p className="text-[16px] leading-[1.55] text-ink-soft max-w-[560px] self-end text-pretty" data-reveal>
            A growing set of apps, each one a worked example of building on BFFless: a static frontend plus a
            reviewable pipeline rule set, the same primitives you'd use for your own tools. Every one runs on your
            instance, not someone else's server.
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8" aria-label="Apps in the catalog">
          {apps.map((app, i) => (
            <li key={app.id} className="flex flex-col gap-3.5" data-reveal style={revealDelay(i * 60)}>
              <a
                href={app.href}
                onClick={() => trackConversion('app_card_clicked', { app: app.id, source: 'ships_with' })}
                className="group block"
              >
                <span
                  className={`block aspect-[4/3] overflow-hidden rounded-[3px] border bg-paper-deep ${
                    app.isNew ? 'border-coffee' : 'border-paper-edge'
                  }`}
                >
                  <img
                    src={app.image}
                    alt={`${app.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-3.5 flex items-center gap-2">
                  <span className="font-semibold text-[15px] text-ink group-hover:text-coffee transition-colors">
                    {app.name}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-[0.08em] uppercase ${
                      app.isNew ? 'text-terracotta font-medium' : 'text-ink-mute'
                    }`}
                  >
                    {app.isNew ? 'New' : app.tag}
                  </span>
                </span>
                <span className="block text-[13px] text-ink-mute mt-1 leading-[1.5]">{app.summary}</span>
              </a>
              {app.liveHref && (
                <a
                  href={app.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackConversion('app_live_demo_clicked', { app: app.id, source: 'ships_with' })}
                  className="-mt-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-mute hover:text-coffee transition-colors self-start"
                >
                  Live example: {app.liveLabel ?? app.liveHref} ↗
                </a>
              )}
            </li>
          ))}
        </ul>

        <div
          className="mt-8 md:mt-10 border rule p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          data-reveal
        >
          <p className="text-[15px] leading-[1.5] text-ink-label">
            <b className="text-ink font-semibold">MCP servers.</b> Let your agents deploy, query data, and run
            pipelines on your instance — the same handlers, exposed as tools.
          </p>
          <a
            href={LINKS.store}
            onClick={() => trackConversion('app_store_clicked', { source: 'ships_with' })}
            className="text-[13px] font-semibold text-coffee whitespace-nowrap hover:text-terracotta transition-colors"
          >
            See the app store →
          </a>
        </div>
      </div>
    </section>
  );
}
