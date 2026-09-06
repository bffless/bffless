import { LINKS } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';

const rule = `pipeline:
  name: feedback form handler
  steps:
    - name: form_validation
      handler: form_handler
    - name: create record
      handler: data_create
      config: { schema: feedback }
    - name: send email
      handler: email_handler
      config:
        to: team@yoursite.dev`;

const handlers = [
  'form_handler',
  'data_create',
  'data_query',
  'email_handler',
  'http_request',
  'ai_handler',
  'file_upload',
  'stripe_checkout',
  'signed_url',
  '+3',
];

export default function ProxyPipelinesSection() {
  return (
    <section className="scroll-mt-20">
      <div className="container-page py-20 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div
          className="rounded-card bg-coffee-deep text-paper-deep p-6 md:p-7 flex flex-col justify-between gap-6 aspect-[1/.9] max-h-[520px]"
          data-reveal
        >
          <p className="font-mono text-[11px] text-coffee-soft tracking-[0.1em] truncate">
            .bffless/proxy-rules/feedback-form.rule.yaml
          </p>
          <pre className="font-mono text-[12.5px] md:text-[13px] leading-[1.7] whitespace-pre overflow-x-auto scrollbar-hide">
            {rule}
          </pre>
          <p className="text-[12px] text-coffee-soft">Diffable. Reviewed in a PR. Synced by CI.</p>
        </div>

        <div className="flex flex-col gap-5" data-reveal style={revealDelay(100)}>
          <p className="meta-label">Proxy + Pipelines</p>
          <h2 className="statement text-[34px] md:text-[44px] text-ink">The backend is a folder in your repo.</h2>
          <p className="text-[16px] md:text-[17px] leading-[1.55] text-ink-soft text-pretty">
            Forms, uploads, DB writes, outbound APIs, AI calls — chain handlers into a pipeline and skip the server
            entirely. Need a real service? Proxy any route to it, same-origin, no CORS.
          </p>
          <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-ink-soft" aria-label="Available handlers">
            {handlers.map((h) => (
              <li key={h} className="border border-paper-edge rounded-md px-2.5 py-[5px]">
                {h}
              </li>
            ))}
          </ul>
          <a href={LINKS.rulesRecipe} className="text-[14px] font-semibold text-coffee hover:text-terracotta transition-colors">
            See the rules-as-code recipe →
          </a>
        </div>
      </div>
    </section>
  );
}
