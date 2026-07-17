import ArchitectureDiagram from './ArchitectureDiagram';

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b rule">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-[44px] leading-[1.05] tracking-[-0.01em] text-ink">
              <span className="font-sans font-bold">Edge.</span>{' '}
              <em className="not-italic italic font-medium">Auth.</em>{' '}
              <span className="font-sans font-bold">Pipelines. Proxy. Storage.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
            <p>
              Every request flows through the same five layers — edge routing, auth checkpoint, pipeline runtime, BFF proxy, storage. The static artefact at the bottom is the GitHub-Pages-equivalent half; the four layers above it are the BFF server.
            </p>
            <p>
              Ships as a single docker-compose stack. Nothing in the request path leaves your network. Swap storage by env var. Plug your IdP via the auth layer. Add Redis. Run it on a $6 droplet or any VPS — your box, your call.
            </p>
          </div>
        </div>

        <div data-reveal>
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
