import { revealDelay } from '../../hooks/useReveal';
import PipelineChainDiagram from './PipelineChainDiagram';

// The real feedback rule, authored as YAML in this very repo
// (.bffless/proxy-rules/landing-page-pipeline/rules/api/feedback-form/any.rule.yaml).
// Trimmed to the handler chain; the HTML email body is elided and the private
// notify address genericised. Everything else is verbatim.
const ruleYaml = `# rules/api/feedback-form/any.rule.yaml
pipeline:
  name: Feedback form handler
  steps:
    - name: form_validation
      handler: form_handler
      config:
        fields:
          message: { type: string, required: true }
        honeypotField: website

    - name: create record
      handler: data_create
      config:
        schemaId: $schema:feedback          # resolved by name on push
        fields:
          name:    request.body.name
          email:   request.body.email
          message: request.body.message

    - name: send email
      handler: email_handler
      config:
        to: team@yoursite.dev
        subject: New feedback from {{ request.body.name }}
        body: |-
          <!-- …templated HTML… -->`;

const tree = `.bffless/
  config.json                       # apiUrl · project · ruleSets
  proxy-rules/
    landing-page-pipeline/
      ruleset.yaml
      schemas/
        feedback.schema.yaml        # fields, referenced by name
      rules/
        api/feedback-form/
          any.rule.yaml             ◂ the pipeline, left
        api/chat/any.rule.yaml
        install.sh/get/
          rule.yaml
          classify_ua.fn.js         # real, testable handler code`;

// A real slice of the handler vocabulary (see the pipelines skill for the full set).
const handlers = [
  'form_handler',
  'data_create',
  'data_query',
  'email_handler',
  'http_request',
  'ai_handler',
  'function_handler',
  'file_upload',
  'file_serve',
  'stripe_checkout',
  'signed_url',
  'response_handler',
];

export default function RulesAsCodeSection() {
  return (
    <section id="pipelines" className="border-b rule bg-paper-deep/40">
      <div className="container-page py-20 md:py-28">
        {/* Beat 1 — heading + lede */}
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end" data-reveal>
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
              <span className="font-sans font-bold">The backend is a</span>{' '}
              <em className="not-italic italic font-medium">folder</em>{' '}
              <span className="font-sans font-bold">in your repo.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Forms, uploads, DB writes, outbound APIs, AI — chain handlers into a{' '}
              <em className="not-italic font-serif italic text-ink">pipeline</em> and skip
              the server entirely. And it isn't clicked together in a dashboard: pipelines
              live as YAML and real <code className="font-mono text-ink">.fn.js</code> in{' '}
              <code className="font-mono text-ink">.bffless/proxy-rules/</code> — reviewed in
              a PR, tested, and synced by CI.{' '}
              <em className="not-italic font-serif italic text-ink">Git is the source of truth.</em>
            </p>
          </div>
        </div>

        {/* Beat 2 — the pipeline, as its handler chain */}
        <div className="mt-6 mb-14" data-reveal>
          <PipelineChainDiagram />
        </div>

        {/* Beat 3 — the git side: tree + real YAML */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 min-w-0" data-reveal>
            <p className="meta-label mb-4">Fig. 05a · the rule set, on disk</p>
            <h3 className="font-serif text-2xl md:text-[28px] leading-[1.15] tracking-[-0.005em] text-ink mb-5">
              <span className="font-sans font-bold">One directory.</span>{' '}
              <em className="not-italic italic font-medium">Diffable, reviewable, deployable.</em>
            </h3>
            <pre className="border border-paper-line bg-paper p-5 overflow-x-auto text-[12px] leading-[1.65] font-mono text-ink-soft">
              <code>{tree}</code>
            </pre>
            <p className="mt-5 text-[15px] text-ink-soft leading-relaxed">
              Two commands wire it into CI:{' '}
              <code className="font-mono text-ink">bffless rules diff</code> fails a PR that
              drifts from live, and{' '}
              <code className="font-mono text-terracotta">rules push --prune</code> on merge
              makes the server match the branch — a rule deleted here is deleted in
              production.
            </p>
            <p className="mt-4 text-[15px] text-ink-soft leading-relaxed">
              This isn't a mock-up — it's{' '}
              <a
                href="https://github.com/bffless/bffless/tree/main/.bffless/proxy-rules"
                target="_blank"
                rel="noreferrer"
                className="text-terracotta hover:text-terracotta-hover underline underline-offset-4 decoration-paper-line hover:decoration-terracotta transition-colors"
              >
                this site's own backend, on GitHub
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-7 min-w-0" data-reveal>
            <p className="meta-label mb-4">
              Fig. 05b · a pipeline, in full ·{' '}
              <a
                href="https://github.com/bffless/bffless/blob/main/.bffless/proxy-rules/landing-page-pipeline/rules/api/feedback-form/any.rule.yaml"
                target="_blank"
                rel="noreferrer"
                className="text-terracotta hover:text-terracotta-hover underline underline-offset-4 decoration-paper-line hover:decoration-terracotta transition-colors"
              >
                view on GitHub
              </a>
            </p>
            <pre className="border border-ink bg-ink text-paper p-6 md:p-7 overflow-x-auto text-[12.5px] leading-[1.7] font-mono">
              <code>{ruleYaml}</code>
            </pre>
          </div>
        </div>

        {/* Beat 4 — handler vocabulary */}
        <div className="mt-14 pt-10 border-t rule" data-reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <p className="meta-label">Fig. 05c · the handler vocabulary</p>
            <p className="text-[14px] text-ink-soft">
              Chain any of these. <span className="text-ink font-medium">No server code.</span>
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {handlers.map((h, i) => (
              <li
                key={h}
                className="font-mono text-[12.5px] text-ink border border-paper-line bg-paper px-3 py-1.5"
                data-reveal
                style={revealDelay(i * 35)}
              >
                {h}
              </li>
            ))}
            <li className="font-mono text-[12.5px] text-ink-mute px-3 py-1.5 self-center">
              + more
            </li>
          </ul>
          <p className="mt-6 text-[15px] text-ink-soft leading-relaxed max-w-[68ch]">
            The same handlers back this page's live chat, install script, and telemetry —{' '}
            <a
              href="https://docs.bffless.app/recipes/proxy-rules-as-code/"
              className="text-terracotta hover:text-terracotta-hover underline underline-offset-4 decoration-paper-line hover:decoration-terracotta transition-colors"
            >
              read the rules-as-code recipe
            </a>{' '}
            for the full CLI and CI flow.
          </p>
        </div>
      </div>
    </section>
  );
}
