// Wide horizontal flow: developer push → GitHub Actions → BFFless (on your box) → SSO-checked URL.
// Re-tuned for CE: header strip says YOUR-BOX · docker-compose instead of YOUR-CLOUD · k8s-prod.

export default function WorkflowDiagram() {
  return (
    <div className="relative w-full">
      <div className="absolute -top-6 left-0 right-0 flex items-center justify-between">
        <span className="meta-label">Fig. 03 · push → live URL</span>
        <span className="meta-label">Five stops · single direction</span>
      </div>

      <div className="relative border border-paper-line bg-paper-deep/30 corner-marks">
        <div className="overflow-x-auto scrollbar-hide">
        <svg
          viewBox="0 60 1000 230"
          className="w-full h-auto min-w-[760px] md:min-w-0"
          role="img"
          aria-label="Workflow diagram showing a developer push flowing through GitHub Actions, BFFless on your box, RBAC and SSO, into a user's browser"
        >
          <defs>
            <pattern id="wf-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#171513" opacity="0.16" />
            </pattern>
            <pattern id="wf-microgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
            </pattern>
            <marker id="wf-arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#D85A3D" />
            </marker>
          </defs>

          <rect x="0" y="0" width="1000" height="320" fill="url(#wf-dots)" />

          {/* Stop 1 · Developer push */}
          <g transform="translate(40, 110)">
            <rect x="0" y="0" width="140" height="100" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="128" height="88" fill="url(#wf-microgrid)" />
            <rect x="0" y="0" width="8" height="8" fill="#171513" />
            <rect x="132" y="92" width="8" height="8" fill="#171513" />
            <rect x="22" y="26" width="96" height="50" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <line x1="22" y1="34" x2="118" y2="34" stroke="#171513" strokeWidth="0.6" />
            <circle cx="28" cy="30" r="1.4" fill="#171513" />
            <circle cx="33" cy="30" r="1.4" fill="#171513" />
            <circle cx="38" cy="30" r="1.4" fill="#171513" />
            <text x="28" y="48" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513">$ git push</text>
            <text x="28" y="60" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513">  origin main</text>
            <text x="28" y="72" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#D85A3D">  ↳ a4f9c2…</text>
          </g>
          <text x="110" y="232" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4" textAnchor="middle">
            01 · DEVELOPER
          </text>
          <text x="110" y="246" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
            commit + push
          </text>

          {/* Stop 2 · GitHub Actions */}
          <g transform="translate(240, 110)">
            <rect x="0" y="0" width="160" height="100" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="148" height="88" fill="url(#wf-microgrid)" />
            <rect x="0" y="0" width="8" height="8" fill="#171513" />
            <rect x="152" y="92" width="8" height="8" fill="#171513" />
            <rect x="18" y="24" width="124" height="10" fill="#171513" opacity="0.8" />
            <text x="24" y="32" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#ECE3D2">
              checkout
            </text>
            <rect x="18" y="38" width="124" height="10" fill="#171513" opacity="0.6" />
            <text x="24" y="46" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#ECE3D2">
              npm ci · npm run build
            </text>
            <rect x="18" y="52" width="124" height="10" fill="#171513" opacity="0.4" />
            <text x="24" y="60" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#171513">
              tests · coverage
            </text>
            <rect x="18" y="66" width="124" height="10" fill="#D85A3D" />
            <text x="24" y="74" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#ECE3D2">
              bffless/upload-artifact@v1
            </text>
          </g>
          <text x="320" y="232" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4" textAnchor="middle">
            02 · GITHUB ACTIONS
          </text>
          <text x="320" y="246" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
            build + upload
          </text>

          {/* Stop 3 · BFFless on your box */}
          <g transform="translate(460, 80)">
            <rect x="0" y="0" width="240" height="160" fill="#ECE3D2" stroke="#171513" strokeWidth="1.6" />
            <rect x="6" y="6" width="228" height="148" fill="url(#wf-microgrid)" />
            <rect x="0" y="0" width="10" height="10" fill="#171513" />
            <rect x="230" y="150" width="10" height="10" fill="#171513" />

            <rect x="14" y="14" width="212" height="14" fill="#171513" opacity="0.85" />
            <text x="20" y="24" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#ECE3D2" letterSpacing="1">
              YOUR-BOX · docker compose · localhost or VPS
            </text>

            <rect x="18" y="36" width="80" height="20" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <text x="58" y="49" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513" textAnchor="middle">
              nginx · TLS
            </text>

            <rect x="106" y="36" width="116" height="20" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <text x="164" y="49" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513" textAnchor="middle">
              backend · NestJS
            </text>

            <rect x="18" y="62" width="204" height="22" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <text x="120" y="76" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513" textAnchor="middle">
              storage · owner/repo/&lt;sha&gt;/…
            </text>

            <g transform="translate(18, 92)">
              <text x="0" y="8" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268" letterSpacing="1">
                ALIASES
              </text>
              <rect x="50" y="0" width="42" height="14" fill="#D85A3D" />
              <text x="71" y="10" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#ECE3D2" textAnchor="middle">
                prod
              </text>
              <rect x="96" y="0" width="50" height="14" fill="#171513" />
              <text x="121" y="10" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#ECE3D2" textAnchor="middle">
                staging
              </text>
              <rect x="150" y="0" width="54" height="14" fill="#ECE3D2" stroke="#171513" strokeWidth="0.9" />
              <text x="177" y="10" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513" textAnchor="middle">
                pr-1247
              </text>
            </g>

            <text x="18" y="138" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513" letterSpacing="1">
              POSTGRES · SUPERTOKENS · REDIS · OPTIONAL MINIO
            </text>
          </g>
          <text x="580" y="262" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4" textAnchor="middle">
            03 · BFFLESS · ON YOUR BOX
          </text>
          <text x="580" y="276" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
            immutable assets · aliases · custom domains
          </text>

          {/* Stop 4 · Auth gate */}
          <g transform="translate(750, 110)">
            <rect x="0" y="0" width="100" height="100" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="88" height="88" fill="url(#wf-microgrid)" />
            <rect x="0" y="0" width="8" height="8" fill="#171513" />
            <rect x="92" y="92" width="8" height="8" fill="#171513" />
            <line x1="22" y1="28" x2="22" y2="78" stroke="#171513" strokeWidth="1.2" />
            <line x1="22" y1="28" x2="28" y2="28" stroke="#171513" strokeWidth="1.2" />
            <line x1="22" y1="78" x2="28" y2="78" stroke="#171513" strokeWidth="1.2" />
            <line x1="78" y1="28" x2="78" y2="78" stroke="#171513" strokeWidth="1.2" />
            <line x1="72" y1="28" x2="78" y2="28" stroke="#171513" strokeWidth="1.2" />
            <line x1="72" y1="78" x2="78" y2="78" stroke="#171513" strokeWidth="1.2" />
            <circle cx="42" cy="48" r="6" fill="none" stroke="#D85A3D" strokeWidth="1.6" />
            <line x1="48" y1="48" x2="62" y2="48" stroke="#D85A3D" strokeWidth="1.6" />
            <line x1="58" y1="48" x2="58" y2="54" stroke="#D85A3D" strokeWidth="1.6" />
            <line x1="62" y1="48" x2="62" y2="58" stroke="#D85A3D" strokeWidth="1.6" />
            <path d="M 36 64 l 5 5 l 12 -12" fill="none" stroke="#D85A3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="800" y="232" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4" textAnchor="middle">
            04 · SSO + RBAC
          </text>
          <text x="800" y="246" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
            your IdP · project roles
          </text>

          {/* Stop 5 · User */}
          <g transform="translate(890, 110)">
            <rect x="0" y="0" width="80" height="100" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="68" height="88" fill="url(#wf-microgrid)" />
            <rect x="0" y="0" width="8" height="8" fill="#171513" />
            <rect x="72" y="92" width="8" height="8" fill="#171513" />
            <circle cx="40" cy="40" r="9" fill="none" stroke="#171513" strokeWidth="1.4" />
            <path d="M 22 76 Q 22 56 40 56 Q 58 56 58 76" fill="none" stroke="#171513" strokeWidth="1.4" />
            <circle cx="56" cy="32" r="3" fill="#D85A3D" />
          </g>
          <text x="930" y="232" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4" textAnchor="middle">
            05 · USER
          </text>
          <text x="930" y="246" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268" textAnchor="middle">
            in your network
          </text>

          {/* forward flow (terracotta) */}
          <g stroke="#D85A3D" strokeWidth="2.4" fill="none">
            <line x1="184" y1="160" x2="234" y2="160" markerEnd="url(#wf-arrowOrange)" />
            <line x1="404" y1="160" x2="454" y2="160" markerEnd="url(#wf-arrowOrange)" />
            <line x1="704" y1="160" x2="744" y2="160" markerEnd="url(#wf-arrowOrange)" />
            <line x1="854" y1="160" x2="884" y2="160" markerEnd="url(#wf-arrowOrange)" />
          </g>
        </svg>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center meta-label" aria-hidden="true">← swipe to read the full diagram →</p>
    </div>
  );
}
