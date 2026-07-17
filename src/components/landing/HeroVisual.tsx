// Editorial composition: dot grid, architectural stack schematic with per-layer iconography
// and a request-flow trace threading through the layers. Ported from the enterprise site,
// re-tuned for the CE / self-host audience (label changed to YOUR-BOX).

export default function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] md:aspect-[5/6] w-full">
      <div className="absolute inset-0 corner-marks pointer-events-none" />

      <div className="absolute -top-6 left-0 right-0 flex items-center justify-between">
        <span className="meta-label">Fig. 01 · Stack</span>
        <span className="meta-label">Self-hosted · YOUR-BOX</span>
      </div>

      <svg
        viewBox="0 0 600 720"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Architectural schematic of the BFFless platform: a five-layer stack traced by a request flow"
      >
        <defs>
          <pattern id="hv-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="#171513" opacity="0.18" />
          </pattern>
          <pattern id="hv-microgrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
          </pattern>
          <marker id="hv-arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="#D85A3D" />
          </marker>
          <marker id="hv-arrowInk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="#171513" />
          </marker>
        </defs>

        <rect x="0" y="0" width="600" height="720" fill="url(#hv-dots)" />

        <g transform="translate(80, 100)">
          {/* L5 EDGE */}
          <g transform="translate(0, 0)">
            <rect x="20" y="0" width="320" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="28" y="6" width="304" height="48" fill="url(#hv-microgrid)" />
            <rect x="20" y="0" width="10" height="10" fill="#171513" />
            <rect x="330" y="50" width="10" height="10" fill="#171513" />
            <g>
              <rect x="36" y="13" width="46" height="5" fill="#171513" />
              <rect x="36" y="27" width="38" height="5" fill="#171513" />
              <rect x="36" y="41" width="52" height="5" fill="#171513" />
              <line x1="82" y1="15.5" x2="148" y2="30" stroke="#171513" strokeWidth="0.7" />
              <line x1="74" y1="29.5" x2="148" y2="30" stroke="#171513" strokeWidth="0.7" />
              <line x1="88" y1="43.5" x2="148" y2="30" stroke="#171513" strokeWidth="0.7" />
              <rect x="142" y="24" width="12" height="12" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <line x1="142" y1="30" x2="154" y2="30" stroke="#171513" strokeWidth="0.6" />
              <line x1="148" y1="24" x2="148" y2="36" stroke="#171513" strokeWidth="0.6" />
              <line x1="154" y1="30" x2="178" y2="30" stroke="#171513" strokeWidth="0.8" />
            </g>
            <circle cx="190" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
          </g>

          {/* L4 AUTH */}
          <g transform="translate(0, 100)">
            <rect x="20" y="0" width="320" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="28" y="6" width="304" height="48" fill="url(#hv-microgrid)" />
            <rect x="20" y="0" width="10" height="10" fill="#171513" />
            <rect x="330" y="50" width="10" height="10" fill="#171513" />
            <g>
              <rect x="36" y="22" width="72" height="16" fill="#ECE3D2" stroke="#171513" strokeWidth="0.9" />
              <line x1="60" y1="22" x2="60" y2="38" stroke="#171513" strokeWidth="0.6" />
              <line x1="84" y1="22" x2="84" y2="38" stroke="#171513" strokeWidth="0.6" />
              <rect x="36" y="22" width="24" height="16" fill="#171513" opacity="0.78" />
              <line x1="108" y1="30" x2="128" y2="30" stroke="#171513" strokeWidth="0.6" />
              <path d="M 130 31 l 5 5 l 10 -10" fill="none" stroke="#D85A3D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="160" y1="14" x2="160" y2="46" stroke="#171513" strokeWidth="1.2" />
              <line x1="220" y1="14" x2="220" y2="46" stroke="#171513" strokeWidth="1.2" />
              <line x1="158" y1="14" x2="164" y2="14" stroke="#171513" strokeWidth="1.2" />
              <line x1="158" y1="46" x2="164" y2="46" stroke="#171513" strokeWidth="1.2" />
              <line x1="216" y1="14" x2="222" y2="14" stroke="#171513" strokeWidth="1.2" />
              <line x1="216" y1="46" x2="222" y2="46" stroke="#171513" strokeWidth="1.2" />
            </g>
            <circle cx="190" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
          </g>

          {/* L3 PIPELINES */}
          <g transform="translate(0, 200)">
            <rect x="20" y="0" width="320" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="28" y="6" width="304" height="48" fill="url(#hv-microgrid)" />
            <rect x="20" y="0" width="10" height="10" fill="#171513" />
            <rect x="330" y="50" width="10" height="10" fill="#171513" />
            <line x1="36" y1="30" x2="298" y2="30" stroke="#171513" strokeWidth="0.6" />
            <g fill="#171513">
              <circle cx="40" cy="30" r="2.6" />
              <circle cx="64" cy="30" r="2.6" />
              <circle cx="88" cy="30" r="2.6" />
              <circle cx="112" cy="30" r="2.6" />
              <circle cx="136" cy="30" r="2.6" />
              <circle cx="160" cy="30" r="2.6" />
              <circle cx="214" cy="30" r="2.6" />
              <circle cx="238" cy="30" r="2.6" />
              <circle cx="262" cy="30" r="2.6" />
              <circle cx="286" cy="30" r="2.6" />
            </g>
            <g stroke="#171513" strokeWidth="0.5" fill="none" opacity="0.85">
              <path d="M 88 30 V 44 H 112" />
              <path d="M 238 30 V 16 H 262" />
            </g>
            <circle cx="112" cy="44" r="2" fill="#171513" />
            <circle cx="262" cy="16" r="2" fill="#171513" />
            <circle cx="190" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
          </g>

          {/* L2 BFF */}
          <g transform="translate(0, 300)">
            <rect x="20" y="0" width="320" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="28" y="6" width="304" height="48" fill="url(#hv-microgrid)" />
            <rect x="20" y="0" width="10" height="10" fill="#171513" />
            <rect x="330" y="50" width="10" height="10" fill="#171513" />
            <g>
              <line x1="40" y1="30" x2="178" y2="30" stroke="#171513" strokeWidth="0.6" />
              <line x1="200" y1="30" x2="260" y2="14" stroke="#171513" strokeWidth="0.7" />
              <line x1="200" y1="30" x2="270" y2="30" stroke="#171513" strokeWidth="0.7" />
              <line x1="200" y1="30" x2="260" y2="46" stroke="#171513" strokeWidth="0.7" />
              <rect x="262" y="11" width="46" height="6" fill="#171513" />
              <rect x="272" y="27" width="48" height="6" fill="#171513" opacity="0.75" />
              <rect x="262" y="43" width="46" height="6" fill="#171513" />
              <text x="316" y="16" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#171513" opacity="0.7" textAnchor="end">H</text>
              <text x="324" y="32" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#171513" opacity="0.7" textAnchor="end">D</text>
              <text x="316" y="48" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#171513" opacity="0.7" textAnchor="end">A</text>
            </g>
            <circle cx="190" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
          </g>

          {/* L1 STORAGE */}
          <g transform="translate(0, 400)">
            <rect x="20" y="0" width="320" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="28" y="6" width="304" height="48" fill="url(#hv-microgrid)" />
            <rect x="20" y="0" width="10" height="10" fill="#171513" />
            <rect x="330" y="50" width="10" height="10" fill="#171513" />
            <g>
              <path d="M 44 14 L 84 14 L 80 50 L 48 50 Z" fill="#ECE3D2" stroke="#171513" strokeWidth="0.9" />
              <line x1="50" y1="22" x2="78" y2="22" stroke="#171513" strokeWidth="0.5" />
              <line x1="50" y1="30" x2="78" y2="30" stroke="#171513" strokeWidth="0.5" />
              <line x1="50" y1="38" x2="76" y2="38" stroke="#171513" strokeWidth="0.5" />
              <path d="M 110 14 L 150 14 L 146 50 L 114 50 Z" fill="#ECE3D2" stroke="#171513" strokeWidth="0.9" />
              <line x1="116" y1="22" x2="144" y2="22" stroke="#171513" strokeWidth="0.5" />
              <line x1="116" y1="30" x2="144" y2="30" stroke="#171513" strokeWidth="0.5" />
              <path d="M 230 14 L 270 14 L 266 50 L 234 50 Z" fill="#ECE3D2" stroke="#171513" strokeWidth="0.9" />
              <line x1="236" y1="22" x2="264" y2="22" stroke="#171513" strokeWidth="0.5" />
              <line x1="236" y1="30" x2="264" y2="30" stroke="#171513" strokeWidth="0.5" />
              <line x1="236" y1="38" x2="262" y2="38" stroke="#171513" strokeWidth="0.5" />
              <g fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#171513" opacity="0.7" letterSpacing="0.6">
                <text x="64" y="58" textAnchor="middle">MinIO</text>
                <text x="130" y="58" textAnchor="middle">FS</text>
                <text x="250" y="58" textAnchor="middle">S3</text>
              </g>
            </g>
            <circle cx="190" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
          </g>

          <rect x="0" y="478" width="360" height="6" fill="#171513" />
          <rect x="-10" y="486" width="380" height="3" fill="#171513" />

          <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" letterSpacing="1.4">
            <text x="14" y="33" textAnchor="end">L5</text>
            <text x="14" y="133" textAnchor="end">L4</text>
            <text x="14" y="233" textAnchor="end">L3</text>
            <text x="14" y="333" textAnchor="end">L2</text>
            <text x="14" y="433" textAnchor="end">L1</text>
          </g>

          <g stroke="#171513" strokeWidth="0.6">
            <line x1="-30" y1="0" x2="-30" y2="460" />
            <line x1="-34" y1="0" x2="-26" y2="0" />
            <line x1="-34" y1="460" x2="-26" y2="460" />
          </g>
          <text
            x="-40"
            y="230"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="#171513"
            letterSpacing="1.4"
            textAnchor="middle"
            transform="rotate(-90, -40, 230)"
          >
            STACK · 5 LAYERS
          </text>

          <g>
            <line x1="190" y1="-34" x2="190" y2="-2" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#hv-arrowOrange)" />
            <text x="198" y="-22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#D85A3D" letterSpacing="1.4">
              REQ
            </text>
            <line x1="190" y1="60" x2="190" y2="98" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#hv-arrowOrange)" />
            <line x1="190" y1="160" x2="190" y2="198" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#hv-arrowOrange)" />
            <line x1="190" y1="260" x2="190" y2="298" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#hv-arrowOrange)" />
            <line x1="190" y1="360" x2="190" y2="398" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#hv-arrowOrange)" />
          </g>

          <g>
            <line
              x1="220"
              y1="430"
              x2="220"
              y2="-30"
              stroke="#171513"
              strokeWidth="0.9"
              strokeDasharray="3,3"
              markerEnd="url(#hv-arrowInk)"
              opacity="0.85"
            />
            <text x="228" y="-22" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" letterSpacing="1.4" opacity="0.85">
              RES
            </text>
          </g>
        </g>

        <g stroke="#171513" strokeWidth="0.8" fill="none">
          <line x1="420" y1="130" x2="450" y2="130" />
          <line x1="420" y1="230" x2="450" y2="230" />
          <line x1="420" y1="330" x2="450" y2="330" />
          <line x1="420" y1="430" x2="450" y2="430" />
          <line x1="420" y1="530" x2="450" y2="530" />
        </g>
        <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1">
          <text x="456" y="133">EDGE · NGINX</text>
          <text x="456" y="233">AUTH · SUPERTOKENS</text>
          <text x="456" y="333">PIPELINES · CHAINED</text>
          <text x="456" y="433">BFF · NO CORS</text>
          <text x="456" y="533">STORAGE · S3 / GCS</text>
        </g>

        <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" opacity="0.7" letterSpacing="2">
          <text x="20" y="700">REF · CE · STACK · 01</text>
          <text x="580" y="700" textAnchor="end">DOCKER · COMPOSE</text>
        </g>
      </svg>
    </div>
  );
}
