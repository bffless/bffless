// BFFless auth helpers for the landing site.
//
// bffless.dev is a cross-origin custom domain attached to the workspace, so
// the SuperTokens `sAccessToken` cookie does NOT reach it.
// Session state is read from the built-in `/_bffless/auth/*` surface (which
// recognizes the relay-minted `bffless_access` cookie), and login bounces
// through the admin host using the customDomainRelay flow. We still try the
// `/api/auth/*` path first so this lib also works unchanged on a workspace
// subdomain during local dev.
//
// See the bffless `authentication` skill for the full flow.

const ADMIN_LOGIN_URL = 'https://admin.bffless.dev/login';

export interface SessionUser {
  id: string;
  email: string;
  role: string;
}

export interface Session {
  authenticated: boolean;
  user: SessionUser | null;
}

type SessionWindow = Window & { __bfflessSession?: Promise<Session | null> };

/**
 * Resolve the current session, with one automatic refresh on a 401.
 * Cached on `window` so multiple components don't duplicate the request.
 *
 * IMPORTANT: a 200 response can still be a guest — the body's `authenticated`
 * field is the source of truth, never `res.ok` alone.
 */
export function checkSession(): Promise<Session | null> {
  const w = window as SessionWindow;
  if (!w.__bfflessSession) {
    w.__bfflessSession = (async (): Promise<Session | null> => {
      const readBody = (data: any): Session | null => {
        if (data?.authenticated === false || data?.user == null) return null;
        return { authenticated: true, user: data.user ?? data };
      };

      // Workspace-subdomain / local-dev path (SuperTokens). 404s on bffless.app.
      try {
        const apiRes = await fetch('/api/auth/session', { credentials: 'include' });
        if (apiRes.ok) {
          const parsed = readBody(await apiRes.json());
          if (parsed) return parsed;
        }
      } catch {
        // fall through to the custom-domain endpoint
      }

      // Custom-domain path (bffless.app). Built into BFFless nginx.
      const get = () => fetch('/_bffless/auth/session', { credentials: 'include' });
      let res = await get();
      if (res.status === 401) {
        const refresh = await fetch('/_bffless/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        if (refresh.ok) res = await get();
      }
      if (!res.ok) return null;
      return readBody(await res.json());
    })().catch(() => null);
  }
  return w.__bfflessSession;
}

/** Build the admin login URL, choosing relay vs. direct based on hostname. */
export function getLoginUrl(redirectPath: string): string {
  const host = window.location.hostname;
  const underWorkspace = host.endsWith('.bffless.app');

  if (underWorkspace) {
    // Workspace subdomain — shared cookie, no relay. Absolute return URL.
    const params = new URLSearchParams({
      redirect: `${window.location.origin}${redirectPath}`,
      tryRefresh: 'true',
    });
    return `${ADMIN_LOGIN_URL}?${params.toString()}`;
  }

  // Cross-origin custom domain — relay through the admin, callback on this host.
  const params = new URLSearchParams({
    customDomainRelay: 'true',
    targetDomain: window.location.host,
    redirect: redirectPath, // a PATH — the callback is served on targetDomain
  });
  return `${ADMIN_LOGIN_URL}?${params.toString()}`;
}

/** Send the browser to the admin login, returning to `redirectPath` after. */
export function redirectToLogin(redirectPath: string): void {
  window.location.href = getLoginUrl(redirectPath);
}

/** Clear local cookies then bounce through the admin to revoke the session. */
export function logout(): void {
  delete (window as SessionWindow).__bfflessSession;
  const back = window.location.origin + window.location.pathname;
  // Best-effort clear of the relay cookies on this domain, then admin bounce.
  fetch('/_bffless/auth/logout', { method: 'POST', credentials: 'include' })
    .catch(() => {})
    .finally(() => {
      window.location.href =
        ADMIN_LOGIN_URL.replace('/login', '/logout') + '?redirect=' + encodeURIComponent(back);
    });
}
