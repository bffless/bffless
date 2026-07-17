interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterProps {
  onFeedback: () => void;
  onReview: () => void;
}

export default function Footer({ onFeedback, onReview }: FooterProps) {
  const year = new Date().getFullYear();

  const cols: { label: string; links: FooterLink[] }[] = [
    {
      label: 'Platform',
      links: [
        { href: '#workflow', label: 'Workflow' },
        { href: '#platform', label: 'Pillars' },
        { href: '#architecture', label: 'Architecture' },
        { href: '#rbac', label: 'RBAC' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { href: 'https://docs.bffless.app/', label: 'Documentation' },
        { href: 'https://github.com/bffless/ce', label: 'GitHub · CE' },
        { href: 'https://docs.bffless.app/getting-started/quickstart/', label: 'Quickstart' },
        { href: 'https://bffless.dev/discord', label: 'Discord' },
      ],
    },
    {
      label: 'Company',
      links: [
        { onClick: onReview, label: 'Leave a review' },
        { onClick: onFeedback, label: 'Feedback' },
        { href: '/terms.html', label: 'Terms' },
        { href: '/privacy.html', label: 'Privacy' },
      ],
    },
  ];

  return (
    <footer className="border-t rule mt-32">
      <div className="container-page py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-ink text-ink font-serif italic text-[17px] leading-none">
              b
            </span>
            <span className="font-semibold tracking-tight text-ink">BFFless</span>
          </div>
          <p className="text-sm text-ink-soft max-w-sm leading-relaxed">
            The open-source static-hosting platform with a BFF server in front of it. Self-host with one <code className="font-mono text-ink">docker compose up</code>. Same git push → live URL flow as GitHub Pages — with the auth, proxy and pipelines GH Pages doesn't ship.
          </p>
          <p className="meta-label mt-8">N°-01 · Community Edition · Source-available</p>
        </div>

        {cols.map((col) => (
          <div key={col.label}>
            <p className="meta-label mb-4">{col.label}</p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href} className="text-[13px] text-ink-soft hover:text-ink transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-[13px] text-ink-soft hover:text-ink transition-colors text-left"
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
        <div className="container-page py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="meta-label">© {year} BFFless · Atlanta, GA</p>
          <p className="meta-label">Built with the platform · self-hosted · v1</p>
        </div>
      </div>
    </footer>
  );
}
