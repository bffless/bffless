import { useEffect, useRef, useState } from 'react';

// A faithful-but-simplified picture of the BFFless admin, drawn in HTML so it
// stays crisp at any size and can show a little life (the running pipeline
// step pulses). Laid out at a fixed 1040px design width and scaled to fit its
// container, so type and spacing hold their proportions on every screen.

const DESIGN_W = 1040;
const DESIGN_H = 520;

const projects = [
  { name: 'ops/dashboard', alias: 'production', url: 'ops.acme.internal', role: 'Owner', vis: 'Private · SSO', sha: 'a91f2c0', when: '2 min ago', live: true },
  { name: 'platform/docs', alias: 'production', url: 'docs.acme.dev', role: 'Admin', vis: 'Public', sha: 'e07d41b', when: '1 h ago', live: true },
  { name: 'design/storybook', alias: 'pr-214', url: 'storybook.acme.internal', role: 'Member', vis: 'Private · staff', sha: '5c8a9de', when: '3 h ago', live: false },
  { name: 'agents/weekly-report', alias: 'production', url: 'reports.acme.internal', role: 'Owner', vis: 'Private · SSO', sha: '2b7e6f1', when: 'yesterday', live: true },
];

const steps = [
  { name: 'form_handler', ms: '12 ms', state: 'done' },
  { name: 'data_create', ms: '41 ms', state: 'done' },
  { name: 'ai_handler', ms: '…', state: 'running' },
  { name: 'email_handler', ms: '', state: 'queued' },
];

export default function AdminMock() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Below ~570px the mock would be unreadable at true scale, so it holds at 0.55
    // and the container clips its right edge instead (sidebar + projects stay visible).
    const ro = new ResizeObserver(([entry]) => setScale(Math.max(entry.contentRect.width / DESIGN_W, 0.55)));
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative w-full overflow-hidden"
      style={{ height: DESIGN_H * scale }}
      role="img"
      aria-label="The BFFless admin: a list of projects with live URLs and roles, and a pipeline run in progress"
    >
      <div
        className="absolute left-0 top-0 origin-top-left flex bg-paper text-ink font-sans"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
        aria-hidden="true"
      >
        {/* Sidebar */}
        <aside className="w-[200px] flex-none border-r rule bg-paper-deep/60 px-4 py-4 flex flex-col gap-1 text-[12.5px]">
          <div className="flex items-center gap-2 px-2 pb-4 pt-1">
            <span className="h-2 w-2 rounded-full bg-terracotta" />
            <span className="font-extrabold text-[13px]">BFFless</span>
            <span className="ml-auto font-mono text-[10px] text-ink-mute">admin</span>
          </div>
          {['Projects', 'Deployments', 'Aliases', 'Pipelines', 'Proxy rules', 'Members', 'Apps', 'Settings'].map((item, i) => (
            <div
              key={item}
              className={`px-2.5 py-[6px] rounded-md ${i === 0 ? 'bg-paper font-semibold shadow-sm' : 'text-ink-soft'}`}
            >
              {item}
            </div>
          ))}
          <div className="mt-auto px-2 font-mono text-[10px] text-ink-mute leading-relaxed">
            acme.internal
            <br />
            ce v0.4 · self-hosted
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center justify-between px-6 py-3.5 border-b rule">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[14px]">Projects</span>
              <span className="font-mono text-[10.5px] text-ink-mute">4 live · 12 deployments this week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full border border-paper-edge text-ink-soft">Invite</span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-ink text-white font-semibold">New project</span>
            </div>
          </div>

          <div className="px-6 pt-4">
            <div className="grid grid-cols-[1.45fr_1.05fr_.55fr_.85fr_.95fr] text-[10px] font-mono uppercase tracking-[0.08em] text-ink-mute px-3 pb-2">
              <span>Project</span>
              <span>Live URL</span>
              <span>Your role</span>
              <span>Visibility</span>
              <span className="text-right">Deployed</span>
            </div>
            <div className="rounded-lg border rule overflow-hidden text-[12px]">
              {projects.map((p, i) => (
                <div
                  key={p.name}
                  className={`grid grid-cols-[1.45fr_1.05fr_.55fr_.85fr_.95fr] items-center px-3 py-[9px] ${i > 0 ? 'border-t rule' : ''} ${i === 0 ? 'bg-paper-deep/40' : ''}`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className={`h-1.5 w-1.5 rounded-full flex-none ${p.live ? 'bg-terracotta' : 'bg-coffee-soft'}`} />
                    <span className="font-semibold truncate">{p.name}</span>
                    <span className="font-mono text-[9.5px] text-ink-mute border rule rounded px-1">{p.alias}</span>
                  </span>
                  <span className="font-mono text-[11px] text-coffee truncate">{p.url}</span>
                  <span className="text-ink-soft">{p.role}</span>
                  <span className="text-ink-soft">{p.vis}</span>
                  <span className="text-right font-mono text-[10.5px] text-ink-mute">
                    {p.sha} · {p.when}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 pt-4 pb-5 grid grid-cols-[1.35fr_1fr] gap-4 min-h-0">
            <div className="rounded-lg border rule p-4 text-[12px]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Pipeline run · /api/feedback-form</span>
                <span className="font-mono text-[10px] text-terracotta">● running</span>
              </div>
              <ol className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <li key={s.name} className="flex items-center gap-2 min-w-0">
                    <span
                      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[10.5px] ${
                        s.state === 'done'
                          ? 'border-paper-edge bg-paper-deep/50 text-ink'
                          : s.state === 'running'
                            ? 'border-terracotta text-ink'
                            : 'border-paper-line text-ink-mute'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          s.state === 'done' ? 'bg-coffee' : s.state === 'running' ? 'bg-terracotta pulse-dot' : 'bg-paper-edge'
                        }`}
                      />
                      {s.name}
                      {s.ms && <span className="text-ink-mute">{s.ms}</span>}
                    </span>
                    {i < steps.length - 1 && <span className="h-px w-3 bg-paper-edge flex-none" />}
                  </li>
                ))}
              </ol>
              <p className="mt-3 font-mono text-[10px] text-ink-mute">
                POST 201 · record feedback/8f3a · reviewed in PR #212 · synced by CI
              </p>
            </div>
            <div className="rounded-lg border rule p-4 text-[12px]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Members · ops-dashboard</span>
                <span className="font-mono text-[10px] text-ink-mute">SSO · Okta</span>
              </div>
              <ul className="space-y-1.5">
                {[
                  ['Owner', 'james@acme.dev', 'bg-ink'],
                  ['Admin', 'priya@acme.dev', 'bg-coffee'],
                  ['Member', 'devs@acme.dev', 'bg-coffee-soft'],
                  ['Guest', 'auditor@partner.co', 'bg-paper-edge'],
                ].map(([role, who, dot]) => (
                  <li key={who} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-sm ${dot}`} />
                    <span className="w-[52px] font-semibold">{role}</span>
                    <span className="font-mono text-[11px] text-ink-soft truncate">{who}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10px] text-ink-mute">Anyone else → 403</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
