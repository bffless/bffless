import { useEffect, useState } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { LINKS } from '../../content/site';

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#platform', label: 'Platform' },
  { href: '#apps', label: 'Apps' },
  { href: '#security', label: 'Security' },
  { href: LINKS.docs, label: 'Docs', external: true },
];

const sectionIds = navLinks.filter((l) => !l.external).map(({ href }) => href.slice(1));

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
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <a href="/" className="flex items-center gap-2.5" aria-label="BFFless home">
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta" aria-hidden="true" />
          <span className="font-extrabold tracking-[-0.01em] text-ink text-[17px]">BFFless</span>
        </a>

        <nav
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-paper-deep text-[13px]"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label, external }) => {
            const isActive = !external && href.slice(1) === activeId;
            return (
              <a
                key={href}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3.5 py-[7px] rounded-full transition-colors ${
                  isActive ? 'bg-paper text-ink font-semibold shadow-sm' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={LINKS.github}
            onClick={() => trackConversion('github_clicked', { source: 'header' })}
            className="text-[13px] text-ink-soft hover:text-ink px-3.5 py-2 transition-colors"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={onEnquire}
            className="text-[13px] px-[18px] py-2.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-hover transition-colors"
          >
            Hire me
          </button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {open ? <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" /> : <path d="M2 5h14M2 9h14M2 13h14" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden bg-paper border-b rule">
          <nav className="container-page py-4 flex flex-col gap-1" aria-label="Primary mobile">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="py-2.5 text-[15px] text-ink font-medium">
                {label}
              </a>
            ))}
            <div className="flex gap-2.5 pt-3">
              <a href={LINKS.github} className="pill-ghost flex-1 !py-2.5 text-[14px]">
                GitHub
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onEnquire();
                }}
                className="pill-cta flex-1 !py-2.5 text-[14px]"
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
