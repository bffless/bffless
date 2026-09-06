import { LINKS } from '../../content/site';

interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

interface FooterProps {
  onFeedback: () => void;
  onReview: () => void;
  onEnquire: () => void;
}

export default function Footer({ onFeedback, onReview, onEnquire }: FooterProps) {
  const year = new Date().getFullYear();

  const cols: { label: string; links: FooterLink[] }[] = [
    {
      label: 'On this page',
      links: [
        { href: '#host', label: '01 · Host' },
        { href: '#platform', label: '02 · Platform' },
        { href: '#apps', label: '03 · Apps' },
        { href: '#security', label: 'Security' },
        { href: '#compare', label: 'Compare' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { href: LINKS.docs, label: 'Documentation', external: true },
        { href: LINKS.quickstart, label: 'Quickstart', external: true },
        { href: LINKS.store, label: 'App store', external: true },
        { href: LINKS.github, label: 'GitHub · CE', external: true },
        { href: LINKS.youtube, label: 'YouTube', external: true },
        { href: LINKS.discord, label: 'Discord' },
      ],
    },
    {
      label: 'Company',
      links: [
        { onClick: onEnquire, label: 'Hire me to install it' },
        { onClick: onReview, label: 'Leave a review' },
        { onClick: onFeedback, label: 'Feedback' },
        { href: '/terms.html', label: 'Terms' },
        { href: '/privacy.html', label: 'Privacy' },
      ],
    },
  ];

  return (
    <footer className="border-t border-ink">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta" aria-hidden="true" />
            <span className="font-bold tracking-tight text-ink">BFFless</span>
          </div>
          <p className="text-[14px] text-ink-soft max-w-sm leading-[1.55]">
            The self-hosted home for AI-generated apps, internal tools, and HTML docs — with login, a backend, and
            a path to your internal services in front of every static build.
          </p>
          <p className="meta-label mt-7">Community Edition · Source-available</p>
        </div>

        {cols.map((col) => (
          <div key={col.label}>
            <p className="meta-label mb-4">{col.label}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[13px] text-ink-label hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={link.onClick}
                      className="text-[13px] text-ink-label hover:text-ink transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t rule">
        <div className="container-page py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="meta-label !text-ink-mute">© {year} BFFless, LLC</p>
          <p className="meta-label !text-ink-mute">Built on the platform · self-hosted · docker compose up</p>
        </div>
      </div>
    </footer>
  );
}
