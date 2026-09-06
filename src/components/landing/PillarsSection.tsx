import { useState } from 'react';
import { revealDelay } from '../../hooks/useReveal';

type Pillar = {
  key: string;
  label: string;
  title: string;
  body: string;
  rows: { dot: string; text: string }[];
};

const pillars: Pillar[] = [
  {
    key: 'host',
    label: 'Host',
    title: 'Same deploy flow as GitHub Pages. Different ceiling.',
    body: 'Build in CI, upload an immutable artifact keyed by commit SHA, alias it to production. Then put auth and a proxy in front of it.',
    rows: [
      { dot: 'bg-ink', text: 'AI apps & internal tools' },
      { dot: 'bg-coffee', text: 'Docs, Storybooks, API references' },
      { dot: 'bg-terracotta', text: 'Coverage, traces, runbooks' },
    ],
  },
  {
    key: 'auth',
    label: 'Auth',
    title: 'SSO-gated URLs. Out of the box.',
    body: 'Google, Okta, Azure AD or your own OIDC. Two-tier RBAC: global roles and per-project Owner → Guest. Anyone else gets a 403.',
    rows: [
      { dot: 'bg-ink', text: 'Global roles · Admin, User, Member' },
      { dot: 'bg-coffee', text: 'Project roles · Owner → Guest' },
      { dot: 'bg-terracotta', text: 'Share links · token-gated, one-off' },
    ],
  },
  {
    key: 'proxy',
    label: 'Proxy',
    title: 'Call any backend without a backend.',
    body: 'Rules in your repo forward routes to internal services, same-origin. The browser never sees a second host, so CORS never comes up.',
    rows: [
      { dot: 'bg-ink', text: '/api/* → your internal service' },
      { dot: 'bg-coffee', text: 'Headers, secrets, rewrites per rule' },
      { dot: 'bg-terracotta', text: 'Versioned in git, synced by CI' },
    ],
  },
  {
    key: 'pipelines',
    label: 'Pipelines',
    title: 'Forms, uploads, DB writes, email, AI — no server code.',
    body: 'Chain handlers in YAML. A form post becomes a validated record and an email in three steps you can read in a PR.',
    rows: [
      { dot: 'bg-ink', text: 'form_handler → data_create → email_handler' },
      { dot: 'bg-coffee', text: '12 handlers · schemas · schedules' },
      { dot: 'bg-terracotta', text: 'Every run recorded, replayable' },
    ],
  },
  {
    key: 'apps',
    label: 'Apps',
    title: 'Five apps. One click. All on your instance.',
    body: 'Handoff, Studio, Rivulet, Recall, Workflow — each a static frontend plus a pipeline rule set, installed from the catalog.',
    rows: [
      { dot: 'bg-ink', text: 'Files · video · feeds · search · workflows' },
      { dot: 'bg-coffee', text: 'Subdomain, RBAC and schedules set up for you' },
      { dot: 'bg-terracotta', text: 'Source on GitHub, fork it' },
    ],
  },
  {
    key: 'mcp',
    label: 'MCP',
    title: 'Your agents get the same handlers as tools.',
    body: 'MCP servers expose deploys, data queries, and pipeline runs on your instance to Claude, Cursor, or whatever you run.',
    rows: [
      { dot: 'bg-ink', text: 'Deploy, alias, roll back' },
      { dot: 'bg-coffee', text: 'Query and write pipeline data' },
      { dot: 'bg-terracotta', text: 'Scoped API keys per project' },
    ],
  },
];

// The six pillars as a tab strip. The white card shows the selected pillar; the
// dark card previews the next one, so the section reads as a tour with a
// "next" affordance rather than six identical tiles.
export default function PillarsSection() {
  const [active, setActive] = useState(0);
  const current = pillars[active];
  const next = pillars[(active + 1) % pillars.length];

  return (
    <section id="platform" className="scroll-mt-20 bg-paper-deep">
      <div className="container-page py-20 md:py-24 text-center">
        <h2 className="statement text-[34px] md:text-[44px] text-ink max-w-[760px] mx-auto" data-reveal>
          Everything GitHub Pages leaves out.{' '}
          <span className="display-em">Nothing that leaves your network.</span>
        </h2>
        <p className="mt-4 text-[16px] md:text-[17px] text-ink-soft max-w-[560px] mx-auto leading-[1.5]" data-reveal style={revealDelay(80)}>
          Not one feature. A whole stack for internal software, with every key in your hands.
        </p>

        <div className="mt-9 mb-9 flex justify-center gap-2 flex-wrap" role="tablist" aria-label="Platform pillars" data-reveal style={revealDelay(140)}>
          {pillars.map((p, i) => (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="pillar-panel"
              onClick={() => setActive(i)}
              className={`text-[13px] font-semibold px-[18px] py-2.5 rounded-full transition-colors ${
                i === active ? 'bg-ink text-white' : 'bg-paper text-ink-soft hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 text-left" data-reveal style={revealDelay(200)}>
          <div
            id="pillar-panel"
            role="tabpanel"
            key={current.key}
            className="bg-paper rounded-card p-7 md:p-10 grid md:grid-cols-2 gap-8 min-h-[320px] animate-in"
          >
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="meta-label mb-3">{current.label}</p>
                <h3 className="font-bold text-[24px] md:text-[26px] leading-[1.15] tracking-[-0.02em] text-ink text-balance">
                  {current.title}
                </h3>
              </div>
              <p className="text-[14px] leading-[1.55] text-ink-soft text-pretty">{renderCode(current.body)}</p>
            </div>
            <ul className="flex flex-col gap-2 justify-center">
              {current.rows.map((r) => (
                <li key={r.text} className="flex items-center gap-3 bg-paper-deep rounded-[10px] px-3.5 py-3 text-[13px] text-ink">
                  <span className={`h-5 w-5 rounded-md flex-none ${r.dot}`} aria-hidden="true" />
                  <span>{renderCode(r.text)}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setActive((active + 1) % pillars.length)}
            className="group text-left bg-ink text-white rounded-card p-7 md:p-10 flex flex-col justify-between gap-6 min-h-[320px] transition-colors hover:bg-[#2A2522]"
            aria-label={`Next: ${next.label}`}
          >
            <div>
              <p className="meta-label !text-coffee-soft mb-3">Next · {next.label}</p>
              <h3 className="font-bold text-[24px] md:text-[26px] leading-[1.15] tracking-[-0.02em] text-balance">
                {next.title}
              </h3>
            </div>
            <div className="flex items-end justify-between gap-4">
              <p className="text-[14px] leading-[1.55] text-paper-edge">{next.body}</p>
              <span className="flex-none inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-label group-hover:bg-white group-hover:text-ink transition-colors" aria-hidden="true">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

// Anything that looks like a handler chain or route is set in mono.
function renderCode(text: string) {
  const m = text.match(/(form_handler → data_create → email_handler|\/api\/\*)/);
  if (!m || m.index === undefined) return text;
  return (
    <>
      {text.slice(0, m.index)}
      <code className="font-mono text-[12px]">{m[0]}</code>
      {text.slice(m.index + m[0].length)}
    </>
  );
}
