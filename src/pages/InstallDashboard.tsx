import { useEffect, useState } from 'react';
import { checkSession, redirectToLogin, logout, type SessionUser } from '../lib/bfflessAuth';

const REDIRECT_PATH = '/dashboard.html';
const STATS_ENDPOINT = '/api/telemetry/stats';

/** Shape returned by the telemetry stats endpoint. Every field is optional so
 *  the UI degrades gracefully before the endpoint (or PR #344 data) lands. */
interface Stats {
  installs?: {
    distinct?: number; // distinct install_id = real installs
    heartbeats?: number; // total heartbeat events
    active7d?: number;
    active30d?: number;
  };
  downloads?: { total?: number };
  views?: { total?: number };
  byVersion?: Array<{ key: string; count: number }>;
  byOs?: Array<{ key: string; count: number }>;
  byDeploymentMode?: Array<{ key: string; count: number }>;
  byStorage?: Array<{ key: string; count: number }>;
  recent?: Array<{
    install_id: string;
    version?: string;
    os?: string;
    deployment_mode?: string;
    storage_provider?: string;
    created_at?: string;
  }>;
}

type Gate =
  | { status: 'loading' }
  | { status: 'denied'; user: SessionUser }
  | { status: 'ok'; user: SessionUser };

export default function InstallDashboard() {
  const [gate, setGate] = useState<Gate>({ status: 'loading' });

  useEffect(() => {
    (async () => {
      const session = await checkSession();
      if (!session?.authenticated || !session.user) {
        redirectToLogin(REDIRECT_PATH);
        return;
      }
      if (session.user.role !== 'admin') {
        setGate({ status: 'denied', user: session.user });
        return;
      }
      setGate({ status: 'ok', user: session.user });
    })();
  }, []);

  if (gate.status === 'loading') {
    return (
      <Shell>
        <div className="flex items-center justify-center py-32">
          <div className="w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
        </div>
      </Shell>
    );
  }

  if (gate.status === 'denied') {
    return (
      <Shell user={gate.user}>
        <div className="max-w-md mx-auto mt-24 text-center bg-white rounded border border-paper-line p-10">
          <h1 className="font-serif text-2xl text-ink mb-2">Admins only</h1>
          <p className="text-ink-mute text-sm mb-6">
            You're signed in as <span className="font-medium text-ink">{gate.user.email}</span>{' '}
            ({gate.user.role}). This dashboard is restricted to workspace admins.
          </p>
          <button
            onClick={() => logout()}
            className="px-4 py-2 rounded border border-paper-line text-sm font-medium text-ink-soft hover:bg-paper-deep transition-colors"
          >
            Sign out
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell user={gate.user}>
      <DashboardBody />
    </Shell>
  );
}

function Shell({ children, user }: { children: React.ReactNode; user?: SessionUser }) {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <header className="border-b border-paper-line">
        <div className="max-w-page mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="BFFless" className="h-7 w-auto" />
            <span className="font-serif text-lg">Install Dashboard</span>
          </a>
          {user && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-ink-mute hidden sm:inline">{user.email}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 rounded border border-paper-line text-ink-soft hover:bg-paper-deep transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-page mx-auto px-6 py-10">{children}</main>
    </div>
  );
}

function DashboardBody() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(STATS_ENDPOINT, { credentials: 'include' });
      if (res.status === 404) {
        setStats({}); // endpoint not wired yet — show empty state, not an error
        return;
      }
      if (!res.ok) throw new Error(`Stats request failed (${res.status})`);
      setStats(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load telemetry stats');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-terracotta/40 rounded p-6 text-sm text-terracotta-ink">
        <p className="font-medium mb-1">Couldn't load telemetry</p>
        <p className="text-ink-mute">{error}</p>
        <button
          onClick={load}
          className="mt-4 px-3 py-1.5 rounded border border-paper-line text-ink-soft hover:bg-paper-deep transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const s = stats ?? {};
  const i = s.installs ?? {};
  const hasAny =
    (i.distinct ?? 0) > 0 ||
    (i.heartbeats ?? 0) > 0 ||
    (s.downloads?.total ?? 0) > 0 ||
    (s.views?.total ?? 0) > 0;

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Install telemetry</h1>
          <p className="text-ink-mute text-sm mt-1">
            Real running installs (distinct heartbeats), plus install.sh funnel.
          </p>
        </div>
        <button
          onClick={load}
          className="px-3 py-1.5 rounded border border-paper-line text-sm text-ink-soft hover:bg-paper-deep transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric label="Real installs" hint="distinct install_id" value={i.distinct} primary />
        <Metric label="Heartbeats" hint="total events" value={i.heartbeats} />
        <Metric label="install.sh runs" hint="downloads" value={s.downloads?.total} />
        <Metric label="install.sh views" hint="page views" value={s.views?.total} />
      </div>

      {i.active7d != null || i.active30d != null ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric label="Active (7d)" value={i.active7d} />
          <Metric label="Active (30d)" value={i.active30d} />
        </div>
      ) : null}

      {!hasAny && (
        <div className="bg-paper-deep border border-paper-line rounded p-6 text-sm text-ink-soft">
          <p className="font-medium text-ink mb-1">No telemetry yet</p>
          <p className="text-ink-mute">
            The collector is live at <code className="font-mono">bffless.app/api/telemetry</code>,
            but heartbeats only start once CE ships the phone-home (PR #344). install.sh views will
            appear here as they accrue.
          </p>
        </div>
      )}

      {/* Breakdowns */}
      <div className="grid md:grid-cols-2 gap-6">
        <Breakdown title="By version" rows={s.byVersion} />
        <Breakdown title="By OS" rows={s.byOs} />
        <Breakdown title="By deployment mode" rows={s.byDeploymentMode} />
        <Breakdown title="By storage provider" rows={s.byStorage} />
      </div>

      {/* Recent heartbeats */}
      {s.recent && s.recent.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-ink mb-3">Recent heartbeats</h2>
          <div className="bg-white border border-paper-line rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-paper-deep text-ink-mute text-left">
                <tr>
                  <Th>Install</Th>
                  <Th>Version</Th>
                  <Th>OS</Th>
                  <Th>Mode</Th>
                  <Th>Storage</Th>
                  <Th>Seen</Th>
                </tr>
              </thead>
              <tbody>
                {s.recent.map((r, idx) => (
                  <tr key={`${r.install_id}-${idx}`} className="border-t border-paper-line">
                    <Td mono>{r.install_id.slice(0, 8)}…</Td>
                    <Td>{r.version ?? '—'}</Td>
                    <Td>{r.os ?? '—'}</Td>
                    <Td>{r.deployment_mode ?? '—'}</Td>
                    <Td>{r.storage_provider ?? '—'}</Td>
                    <Td>{r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  primary,
}: {
  label: string;
  value?: number | null;
  hint?: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded border p-5 ${
        primary ? 'bg-ink text-paper border-ink' : 'bg-white border-paper-line'
      }`}
    >
      <p className={`text-xs uppercase tracking-widest ${primary ? 'text-paper/70' : 'text-ink-mute'}`}>
        {label}
      </p>
      <p className="font-serif text-3xl mt-2">{value != null ? value.toLocaleString() : '—'}</p>
      {hint && <p className={`text-xs mt-1 ${primary ? 'text-paper/60' : 'text-ink-faint'}`}>{hint}</p>}
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows?: Array<{ key: string; count: number }> }) {
  const total = rows?.reduce((sum, r) => sum + r.count, 0) ?? 0;
  return (
    <div className="bg-white border border-paper-line rounded p-5">
      <h3 className="font-medium text-ink mb-3">{title}</h3>
      {!rows || rows.length === 0 ? (
        <p className="text-sm text-ink-faint">No data</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ink-soft">{r.key || '—'}</span>
                <span className="text-ink-mute tabular-nums">{r.count.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded bg-paper-deep overflow-hidden">
                <div
                  className="h-full bg-terracotta"
                  style={{ width: total ? `${Math.max(4, (r.count / total) * 100)}%` : '0%' }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 font-medium">{children}</th>;
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return <td className={`px-4 py-2.5 text-ink-soft ${mono ? 'font-mono text-xs' : ''}`}>{children}</td>;
}
