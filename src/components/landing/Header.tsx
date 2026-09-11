import { useEffect, useState } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { LINKS } from '../../content/site';

// In-page anchors the nav scroll-spies, in document order.
const navLinks = [
  { href: '#what', label: 'What it is' },
  { href: '#host', label: 'Host' },
  { href: '#platform', label: 'Platform' },
  { href: '#apps', label: 'Apps' },
  { href: '#security', label: 'Security' },
  { href: '#compare', label: 'Compare' },
];

const sectionIds = navLinks.map(({ href }) => href.slice(1));

interface HeaderProps {
  onEnquire: () => void;
}

export default function Header({ onEnquire }: HeaderProps) {
  const activeId = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b rule">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <a href="/" className="flex items-center gap-2.5" aria-label="BFFless home">
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta" aria-hidden="true" />
          <span className="font-bold tracking-tight text-ink text-[16px]">BFFless</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navLinks.map(({ href, label }) => {
            const isActive = href.slice(1) === activeId;
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-[13px] transition-colors ${
                  isActive ? 'text-ink font-medium' : 'text-ink-label hover:text-ink'
                }`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-[7px] left-0 h-px bg-coffee transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={LINKS.quickstart}
            onClick={() => trackConversion('get_started_clicked', { source: 'header' })}
            className="text-[13px] px-4 py-2 rounded-full border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Self-host
          </a>
          <button
            type="button"
            onClick={onEnquire}
            className="text-[13px] px-4 py-2 rounded-full bg-ink text-paper font-semibold hover:bg-ink-soft transition-colors"
          >
            Hire me to install it
          </button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper-edge text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t rule bg-paper">
          <nav className="container-page py-4 flex flex-col gap-1" aria-label="Primary mobile">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-ink border-b rule last:border-b-0"
              >
                {label}
              </a>
            ))}
            <div className="flex gap-2.5 pt-4">
              <a href={LINKS.quickstart} className="pill-ghost flex-1 !py-2.5 text-[14px]">
                Self-host
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onEnquire();
                }}
                className="pill-ink flex-1 !py-2.5 text-[14px]"
              >
                Hire me
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
