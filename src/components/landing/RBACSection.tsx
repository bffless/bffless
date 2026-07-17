import RBACDiagram from './RBACDiagram';

export default function RBACSection() {
  return (
    <section id="rbac" className="border-b rule bg-paper-deep/30">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-[44px] leading-[1.05] tracking-[-0.01em] text-ink">
              <span className="font-sans font-bold">What your compliance team</span>{' '}
              <em className="not-italic italic font-medium">will</em>{' '}
              <span className="font-sans font-bold">ask about.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
            <p>
              Public-by-default is fine for marketing pages. Everything else needs a permission model. BFFless ships two-tier RBAC: system-wide global roles for tenancy, and per-project roles for the actual deploy. Membership is explicit; visitors without a membership get a 403. API keys are scoped per project for CI/CD; share-links handle one-off external review.
            </p>
            <p>
              Every deployment is an immutable, SHA-keyed object. Audit trails come for free — you can't rewrite a deploy, only point an alias somewhere new.
            </p>
          </div>
        </div>

        <div data-reveal>
          <RBACDiagram />
        </div>
      </div>
    </section>
  );
}
