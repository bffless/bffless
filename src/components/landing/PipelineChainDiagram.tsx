// A real pipeline, drawn as its handler chain. Mirrors WorkflowDiagram's idiom
// (specimen boxes, microgrid fill, corner ticks, terracotta flow arrows) so it
// reads as the same drafting system. The pipeline shown is this repo's own
// contact/feedback rule: request → form_handler → data_create → email_handler.
// Locally-scoped <defs> ids (pc-*) so it can coexist with WorkflowDiagram.

export default function PipelineChainDiagram() {
  return (
    <div className="relative w-full">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
        <span className="meta-label">Fig. 05 · feedback-form/any.rule.yaml</span>
        <span className="meta-label">Three handlers · no server code</span>
      </div>

      <div className="relative border border-paper-line bg-paper-deep/30 corner-marks">
        <div className="overflow-x-auto scrollbar-hide">
          <svg
            viewBox="0 40 1000 250"
            className="w-full h-auto min-w-[820px] md:min-w-0"
            role="img"
            aria-label="Pipeline diagram: a POST to /api/feedback-form flows through three chained handlers — form_handler validates the body and rejects honeypots, data_create writes a row to the feedback schema, email_handler notifies the team — and returns 201."
          >
            <defs>
              <pattern id="pc-microgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
              </pattern>
              <pattern id="pc-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.9" fill="#171513" opacity="0.14" />
              </pattern>
              <marker id="pc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <polygon points="0,0 10,5 0,10" fill="#D85A3D" />
              </marker>
            </defs>

            <rect x="0" y="0" width="1000" height="320" fill="url(#pc-dots)" />

            {/* Inbound request */}
            <g transform="translate(24, 96)">
              <rect x="0" y="0" width="150" height="108" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
              <rect x="6" y="6" width="138" height="96" fill="url(#pc-microgrid)" />
              <rect x="0" y="0" width="8" height="8" fill="#171513" />
              <rect x="142" y="100" width="8" height="8" fill="#171513" />
              <rect x="14" y="14" width="122" height="12" fill="#D85A3D" />
              <text x="20" y="23" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#ECE3D2" letterSpacing="0.5">
                POST /api/feedback-form
              </text>
              <text x="20" y="46" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#171513">{'{'}</text>
              <text x="30" y="58" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">"name": "…",</text>
              <text x="30" y="70" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">"email": "…",</text>
              <text x="30" y="82" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">"message": "…"</text>
              <text x="20" y="94" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#171513">{'}'}</text>
            </g>
            <text x="99" y="228" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.2" textAnchor="middle">
              STATIC SITE
            </text>
            <text x="99" y="242" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
              fetch() · no CORS
            </text>

            {/* Handler 1 · form_handler */}
            <g transform="translate(244, 96)">
              <rect x="0" y="0" width="164" height="108" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
              <rect x="6" y="6" width="152" height="96" fill="url(#pc-microgrid)" />
              <rect x="0" y="0" width="8" height="8" fill="#171513" />
              <rect x="156" y="100" width="8" height="8" fill="#171513" />
              <rect x="14" y="14" width="136" height="14" fill="#171513" />
              <text x="20" y="24" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2">form_handler</text>
              {/* checklist glyph */}
              <path d="M 22 46 l 4 4 l 8 -8" fill="none" stroke="#D85A3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="42" y="50" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">required: message</text>
              <path d="M 22 66 l 4 4 l 8 -8" fill="none" stroke="#D85A3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="42" y="70" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">honeypot: website</text>
              <text x="20" y="90" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268">parse · validate · guard</text>
            </g>
            <text x="326" y="228" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.2" textAnchor="middle">
              01 · VALIDATE
            </text>
            <text x="326" y="242" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
              reject bad input
            </text>

            {/* Handler 2 · data_create */}
            <g transform="translate(478, 96)">
              <rect x="0" y="0" width="164" height="108" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
              <rect x="6" y="6" width="152" height="96" fill="url(#pc-microgrid)" />
              <rect x="0" y="0" width="8" height="8" fill="#171513" />
              <rect x="156" y="100" width="8" height="8" fill="#171513" />
              <rect x="14" y="14" width="136" height="14" fill="#171513" />
              <text x="20" y="24" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2">data_create</text>
              {/* table glyph */}
              <g transform="translate(20, 40)" stroke="#171513" strokeWidth="1">
                <rect x="0" y="0" width="60" height="34" fill="#ECE3D2" />
                <line x1="0" y1="11" x2="60" y2="11" />
                <line x1="0" y1="22" x2="60" y2="22" />
                <line x1="20" y1="0" x2="20" y2="34" />
                <line x1="40" y1="0" x2="40" y2="34" />
                <rect x="0" y="0" width="60" height="11" fill="#171513" opacity="0.8" stroke="none" />
              </g>
              <text x="90" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">$schema:</text>
              <text x="90" y="63" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#7A2D1D">feedback</text>
              <text x="20" y="90" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268">insert row · typed fields</text>
            </g>
            <text x="560" y="228" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.2" textAnchor="middle">
              02 · STORE
            </text>
            <text x="560" y="242" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
              Postgres-backed table
            </text>

            {/* Handler 3 · email_handler */}
            <g transform="translate(712, 96)">
              <rect x="0" y="0" width="164" height="108" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
              <rect x="6" y="6" width="152" height="96" fill="url(#pc-microgrid)" />
              <rect x="0" y="0" width="8" height="8" fill="#171513" />
              <rect x="156" y="100" width="8" height="8" fill="#171513" />
              <rect x="14" y="14" width="136" height="14" fill="#171513" />
              <text x="20" y="24" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2">email_handler</text>
              {/* envelope glyph */}
              <g transform="translate(20, 40)" stroke="#D85A3D" strokeWidth="1.6" fill="none">
                <rect x="0" y="0" width="52" height="34" fill="#ECE3D2" />
                <path d="M 0 3 L 26 22 L 52 3" />
              </g>
              <text x="82" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">to: your</text>
              <text x="82" y="63" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#3A352E">team</text>
              <text x="20" y="90" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268">templated · {'{{ name }}'}</text>
            </g>
            <text x="794" y="228" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.2" textAnchor="middle">
              03 · NOTIFY
            </text>
            <text x="794" y="242" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
              email on submit
            </text>

            {/* Outcome */}
            <g transform="translate(918, 110)">
              <rect x="0" y="0" width="58" height="34" fill="#D85A3D" />
              <text x="29" y="21" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ECE3D2" textAnchor="middle">201</text>
              <text x="29" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513" textAnchor="middle">stored</text>
              <text x="29" y="62" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513" textAnchor="middle">+ sent</text>
            </g>

            {/* flow arrows */}
            <g stroke="#D85A3D" strokeWidth="2.4" fill="none">
              <line x1="178" y1="150" x2="238" y2="150" markerEnd="url(#pc-arrow)" />
              <line x1="412" y1="150" x2="472" y2="150" markerEnd="url(#pc-arrow)" />
              <line x1="646" y1="150" x2="706" y2="150" markerEnd="url(#pc-arrow)" />
              <line x1="880" y1="127" x2="912" y2="127" markerEnd="url(#pc-arrow)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center meta-label" aria-hidden="true">← swipe to read the full chain →</p>
    </div>
  );
}
