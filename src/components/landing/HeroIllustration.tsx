import { useState } from 'react';

// The hero figure. Prefers the generated illustration at /images/hero-ledger.jpg
// (an agent-made HTML app sitting behind a login screen, wired out to Postgres,
// Slack, and your API); if that file is absent, draws the same scene as a vector
// so the layout never shows a hole.

export const HERO_IMAGE = '/images/hero-ledger.jpg';

export default function HeroIllustration() {
  const [useImage, setUseImage] = useState(true);

  return (
    <figure className="relative m-0">
      <div className="relative overflow-hidden rounded-md border border-paper-edge bg-paper-deep aspect-[4/3.4]">
        {useImage ? (
          <img
            src={HERO_IMAGE}
            alt="An agent-generated HTML app sitting behind a BFFless login screen, wired to Postgres, Slack, and an internal API"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setUseImage(false)}
            // React 18 only knows the lowercase DOM attribute; the spread keeps TS quiet.
            {...({ fetchpriority: 'high' } as Record<string, string>)}
          />
        ) : (
          <VectorScene />
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 meta-label whitespace-nowrap">
        <span>Fig. 00 · Your app, behind a login</span>
        <span className="hidden xl:inline">Postgres · Slack · your API</span>
      </figcaption>
    </figure>
  );
}

function VectorScene() {
  return (
    <svg
      viewBox="0 0 480 408"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Diagram: an agent-made HTML app behind a login screen, with arrows out to Postgres, Slack, and your API"
    >
      <defs>
        <pattern id="hl-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#1C1917" strokeWidth="0.35" opacity="0.18" />
        </pattern>
        <marker id="hl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#6B4F3A" />
        </marker>
      </defs>
      <rect width="480" height="408" fill="url(#hl-grid)" />

      {/* Browser window: the agent-made app */}
      <g transform="translate(40 48)">
        <rect x="0" y="0" width="256" height="196" rx="6" fill="#FCFBF8" stroke="#1C1917" strokeWidth="1.2" />
        <rect x="0" y="0" width="256" height="26" rx="6" fill="#F5F1E8" stroke="#1C1917" strokeWidth="1.2" />
        <rect x="0" y="20" width="256" height="6" fill="#F5F1E8" />
        <line x1="0" y1="26" x2="256" y2="26" stroke="#1C1917" strokeWidth="1.2" />
        <circle cx="14" cy="13" r="3.5" fill="#D63B2F" />
        <circle cx="26" cy="13" r="3.5" fill="#C9B8A6" />
        <circle cx="38" cy="13" r="3.5" fill="#C9B8A6" />
        <rect x="60" y="8" width="150" height="10" rx="5" fill="#FCFBF8" stroke="#D6CFC2" strokeWidth="1" />
        <text x="68" y="16" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6B4F3A">app.yourteam.dev</text>
        {/* app chrome */}
        <rect x="14" y="42" width="70" height="8" rx="2" fill="#1C1917" />
        <rect x="14" y="60" width="228" height="1" fill="#E6E0D4" />
        <rect x="14" y="72" width="104" height="52" rx="3" fill="#F5F1E8" stroke="#E6E0D4" />
        <rect x="126" y="72" width="116" height="52" rx="3" fill="#F5F1E8" stroke="#E6E0D4" />
        <rect x="22" y="80" width="40" height="5" rx="2" fill="#78716C" />
        <rect x="22" y="92" width="80" height="20" rx="2" fill="#D63B2F" opacity="0.9" />
        <rect x="134" y="80" width="60" height="5" rx="2" fill="#78716C" />
        <polyline points="134,110 150,100 166,104 182,90 198,96 214,84 230,88" fill="none" stroke="#6B4F3A" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="14" y="136" width="228" height="8" rx="2" fill="#E6E0D4" />
        <rect x="14" y="150" width="180" height="8" rx="2" fill="#E6E0D4" />
        <rect x="14" y="164" width="204" height="8" rx="2" fill="#E6E0D4" />
        {/* login veil */}
        <rect x="0" y="26" width="256" height="170" fill="#FCFBF8" opacity="0.72" />
        <g transform="translate(78 78)">
          <rect x="0" y="0" width="100" height="72" rx="4" fill="#FCFBF8" stroke="#1C1917" strokeWidth="1.2" />
          <rect x="41" y="10" width="18" height="14" rx="2" fill="none" stroke="#1C1917" strokeWidth="1.2" />
          <path d="M45 10 v-4 a5 5 0 0 1 10 0 v4" fill="none" stroke="#1C1917" strokeWidth="1.2" />
          <rect x="12" y="34" width="76" height="9" rx="2" fill="#F5F1E8" stroke="#D6CFC2" />
          <rect x="12" y="49" width="76" height="12" rx="6" fill="#1C1917" />
          <text x="50" y="57.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#FCFBF8" letterSpacing="0.6">SIGN IN · SSO</text>
        </g>
        <text x="0" y="214" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#6B4F3A" letterSpacing="1.2">AGENT-MADE HTML · STATIC BUILD</text>
      </g>

      {/* BFFless box */}
      <g transform="translate(120 290)">
        <rect x="0" y="0" width="96" height="40" rx="4" fill="#1C1917" />
        <circle cx="16" cy="20" r="4" fill="#D63B2F" />
        <text x="28" y="24" fontFamily="Schibsted Grotesk, sans-serif" fontSize="11" fontWeight="700" fill="#FCFBF8">BFFless</text>
      </g>
      <line x1="168" y1="244" x2="168" y2="288" stroke="#1C1917" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="176" y="270" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#78716C">auth · proxy · pipelines</text>

      {/* Targets */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#1C1917">
        <g transform="translate(340 60)">
          <rect x="0" y="0" width="100" height="40" rx="4" fill="#FCFBF8" stroke="#6B4F3A" strokeWidth="1" />
          <ellipse cx="18" cy="14" rx="7" ry="3" fill="none" stroke="#6B4F3A" />
          <path d="M11 14 v10 a7 3 0 0 0 14 0 v-10" fill="none" stroke="#6B4F3A" />
          <text x="34" y="24">Postgres</text>
        </g>
        <g transform="translate(340 168)">
          <rect x="0" y="0" width="100" height="40" rx="4" fill="#FCFBF8" stroke="#6B4F3A" strokeWidth="1" />
          <rect x="11" y="11" width="6" height="18" rx="3" fill="#6B4F3A" />
          <rect x="21" y="16" width="6" height="13" rx="3" fill="#6B4F3A" opacity="0.6" />
          <text x="34" y="24">Slack</text>
        </g>
        <g transform="translate(340 276)">
          <rect x="0" y="0" width="100" height="40" rx="4" fill="#FCFBF8" stroke="#6B4F3A" strokeWidth="1" />
          <text x="10" y="24" fill="#6B4F3A">{'{ }'}</text>
          <text x="34" y="24">your API</text>
        </g>
      </g>

      {/* Arrows out from BFFless */}
      <g fill="none" stroke="#6B4F3A" strokeWidth="1.2" markerEnd="url(#hl-arrow)">
        <path d="M216 310 C 280 310, 280 80, 338 80" />
        <path d="M216 310 C 280 310, 280 188, 338 188" />
        <path d="M216 310 C 280 310, 280 296, 338 296" />
      </g>
      <text x="300" y="360" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#78716C" letterSpacing="1">SAME-ORIGIN · NO CORS</text>
    </svg>
  );
}
