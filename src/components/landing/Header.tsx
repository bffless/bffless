import { trackConversion } from '../../hooks/useAnalytics';
import { useScrollSpy } from '../../hooks/useScrollSpy';

// In-page section anchors the nav scroll-spies, in document order.
const navLinks = [
  { href: '#workflow', label: 'Workflow' },
  { href: '#platform', label: 'Platform' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#compare', label: 'Compare' },
];

const sectionIds = navLinks.map(({ href }) => href.slice(1));

export default function Header() {
  const activeId = useScrollSpy(sectionIds);

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b rule">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <a href="/" className="flex items-center gap-3 group">
          <img src="/images/logo.svg" alt="" className="h-7 w-7" />
          <span className="font-semibold tracking-tight text-ink text-[15px]">BFFless</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map(({ href, label }) => {
            const isActive = href.slice(1) === activeId;
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-[13px] font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-sm bg-terracotta transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/bffless/ce"
            onClick={() => trackConversion('github_clicked', { source: 'header' })}
            className="pill-cta"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            Self-host
          </a>
        </div>
      </div>
    </header>
  );
}
