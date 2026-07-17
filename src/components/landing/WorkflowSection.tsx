import WorkflowDiagram from './WorkflowDiagram';

const ghaSnippet = `name: Deploy to BFFless
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci && npm run build
      - uses: bffless/upload-artifact@v1
        with:
          path: dist
          api-url: \${{ vars.BFFLESS_URL }}
          api-key: \${{ secrets.BFFLESS_API_KEY }}
          alias: production`;

export default function WorkflowSection() {
  return (
    <section id="workflow" className="border-b rule bg-paper-deep/40">
      <div className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end" data-reveal>
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
              <span className="font-sans font-bold">Same deploy flow.</span>{' '}
              <em className="not-italic italic font-medium">Different</em>{' '}
              <span className="font-sans font-bold">ceiling.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Whatever your team builds — Vite app, Docusaurus site, Storybook, Redoc — the flow is the one you already know. Build in CI, upload as an immutable artifact keyed by commit SHA, alias to{' '}
              <code className="font-mono text-ink">production</code>. The next push doesn't replace it; it stacks beside it.{' '}
              <em className="not-italic font-serif italic text-ink">Then put auth and a proxy in front of it.</em>
            </p>
          </div>
        </div>

        <div className="mt-6 mb-10" data-reveal>
          <WorkflowDiagram />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mt-12" data-reveal>
          <div className="lg:col-span-5">
            <p className="meta-label mb-4">Fig. 03b · .github/workflows/deploy.yml</p>
            <h3 className="font-serif text-2xl md:text-[28px] leading-[1.15] tracking-[-0.005em] text-ink mb-4">
              <span className="font-sans font-bold">14 lines.</span>{' '}
              <em className="not-italic italic font-medium">That's the integration.</em>
            </h3>
            <p className="text-[15px] text-ink-soft leading-relaxed">
              Add the action, set <code className="font-mono">BFFLESS_URL</code> and{' '}
              <code className="font-mono">BFFLESS_API_KEY</code> in repo settings, push. Every commit gets a permanent, addressable URL. Alias it to{' '}
              <code className="font-mono text-terracotta">production</code> when it's ready.
            </p>
          </div>
          <div className="lg:col-span-7 min-w-0">
            <pre className="border border-ink bg-ink text-paper p-6 md:p-7 overflow-x-auto text-[13px] leading-[1.7] font-mono">
              <code>{ghaSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
