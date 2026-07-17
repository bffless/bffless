// Single-tenant CE architecture diagram. Outer "YOUR-BOX / VPS" container, edge nginx,
// app tier, data tier (app-pg + auth-pg + supertokens + IdP slot), storage adapter fan-out.

export default function ArchitectureDiagram() {
  return (
    <div className="relative w-full">
      <div className="absolute -top-6 left-0 right-0 flex items-center justify-between">
        <span className="meta-label">Fig. 04 · Architecture · single-tenant CE</span>
        <span className="meta-label">YOUR · BOX</span>
      </div>

      <div className="relative border border-paper-line bg-paper-deep/30 corner-marks">
        <div className="overflow-x-auto scrollbar-hide">
        <svg
          viewBox="0 0 1000 640"
          className="w-full h-auto min-w-[760px] md:min-w-0"
          role="img"
          aria-label="Architecture diagram showing BFFless components inside your box: nginx, frontend, backend, app and auth Postgres, SuperTokens, optional Redis and MinIO, and a storage adapter line fanning out to S3, GCS, Azure, MinIO, and the local filesystem"
        >
          <defs>
            <pattern id="ad-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#171513" opacity="0.16" />
            </pattern>
            <pattern id="ad-microgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
            </pattern>
            <marker id="ad-arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#D85A3D" />
            </marker>
          </defs>

          <rect x="0" y="0" width="1000" height="640" fill="url(#ad-dots)" />

          <g>
            <rect x="40" y="40" width="700" height="560" fill="none" stroke="#171513" strokeWidth="1.4" strokeDasharray="6,4" />
            <rect x="40" y="40" width="220" height="22" fill="#171513" />
            <text x="50" y="56" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ECE3D2" letterSpacing="1.4">
              YOUR-BOX · VPS OR CLUSTER
            </text>
          </g>

          {/* Edge (nginx) */}
          <g transform="translate(80, 90)">
            <rect x="0" y="0" width="620" height="60" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="608" height="48" fill="url(#ad-microgrid)" />
            <rect x="0" y="0" width="10" height="10" fill="#171513" />
            <rect x="610" y="50" width="10" height="10" fill="#171513" />
            <rect x="20" y="14" width="120" height="32" fill="#171513" />
            <text x="80" y="34" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ECE3D2" textAnchor="middle" letterSpacing="1">
              nginx · TLS
            </text>
            <line x1="140" y1="30" x2="200" y2="30" stroke="#171513" strokeWidth="0.8" />
            <line x1="200" y1="30" x2="260" y2="14" stroke="#171513" strokeWidth="0.7" />
            <line x1="200" y1="30" x2="260" y2="30" stroke="#171513" strokeWidth="0.7" />
            <line x1="200" y1="30" x2="260" y2="46" stroke="#171513" strokeWidth="0.7" />
            <text x="270" y="18" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513">
              admin.yourdomain.com
            </text>
            <text x="270" y="34" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513">
              www.yourdomain.com
            </text>
            <text x="270" y="50" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513">
              *.yourdomain.com · custom
            </text>
            <circle cx="470" cy="30" r="5" fill="#D85A3D" stroke="#171513" strokeWidth="1" />
            <text x="482" y="34" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513">
              subdomain routing
            </text>
          </g>

          {/* App tier */}
          <g transform="translate(80, 180)">
            <rect x="0" y="0" width="620" height="80" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="608" height="68" fill="url(#ad-microgrid)" />
            <rect x="0" y="0" width="10" height="10" fill="#171513" />
            <rect x="610" y="70" width="10" height="10" fill="#171513" />
            <rect x="20" y="18" width="160" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <text x="100" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#171513" textAnchor="middle" letterSpacing="0.5">
              frontend · React + Vite
            </text>
            <text x="100" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#7A7268" textAnchor="middle" letterSpacing="1">
              ADMIN CONSOLE
            </text>
            <rect x="220" y="18" width="180" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
            <text x="310" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#171513" textAnchor="middle" letterSpacing="0.5">
              backend · NestJS
            </text>
            <text x="310" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#7A7268" textAnchor="middle" letterSpacing="1">
              UPLOAD · ROUTE · GUARD
            </text>
            <rect x="440" y="18" width="160" height="44" fill="#ECE3D2" stroke="#171513" strokeWidth="1" strokeDasharray="3,3" />
            <text x="520" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#171513" textAnchor="middle" letterSpacing="0.5">
              redis · cache
            </text>
            <text x="520" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#7A7268" textAnchor="middle" letterSpacing="1">
              OPTIONAL
            </text>
            <line x1="180" y1="40" x2="220" y2="40" stroke="#171513" strokeWidth="0.6" />
            <line x1="400" y1="40" x2="440" y2="40" stroke="#171513" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
          </g>

          {/* Data tier */}
          <g transform="translate(80, 290)">
            <rect x="0" y="0" width="620" height="80" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="608" height="68" fill="url(#ad-microgrid)" />
            <rect x="0" y="0" width="10" height="10" fill="#171513" />
            <rect x="610" y="70" width="10" height="10" fill="#171513" />
            <g transform="translate(20, 18)">
              <ellipse cx="40" cy="6" rx="40" ry="6" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <path d="M 0 6 L 0 36 Q 0 42 40 42 Q 80 42 80 36 L 80 6" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <ellipse cx="40" cy="6" rx="40" ry="6" fill="none" stroke="#171513" strokeWidth="1" />
              <line x1="0" y1="18" x2="80" y2="18" stroke="#171513" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="28" x2="80" y2="28" stroke="#171513" strokeWidth="0.5" opacity="0.5" />
              <text x="40" y="32" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513" textAnchor="middle">
                postgres · app
              </text>
            </g>
            <g transform="translate(120, 18)">
              <ellipse cx="40" cy="6" rx="40" ry="6" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <path d="M 0 6 L 0 36 Q 0 42 40 42 Q 80 42 80 36 L 80 6" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <ellipse cx="40" cy="6" rx="40" ry="6" fill="none" stroke="#171513" strokeWidth="1" />
              <line x1="0" y1="18" x2="80" y2="18" stroke="#171513" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="28" x2="80" y2="28" stroke="#171513" strokeWidth="0.5" opacity="0.5" />
              <text x="40" y="32" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#171513" textAnchor="middle">
                postgres · auth
              </text>
            </g>
            <rect x="220" y="18" width="160" height="44" fill="#171513" />
            <text x="300" y="38" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#ECE3D2" textAnchor="middle" letterSpacing="0.5">
              supertokens
            </text>
            <text x="300" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#ECE3D2" textAnchor="middle" letterSpacing="1" opacity="0.75">
              SESSIONS · JWT · JWKS
            </text>
            <rect x="400" y="18" width="200" height="44" fill="#ECE3D2" stroke="#D85A3D" strokeWidth="1.4" strokeDasharray="4,3" />
            <text x="500" y="38" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" textAnchor="middle" letterSpacing="0.5">
              your IdP
            </text>
            <text x="500" y="54" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#D85A3D" textAnchor="middle" letterSpacing="1.2">
              BRING-YOUR-OWN · OIDC / SAML
            </text>
            <line x1="120" y1="40" x2="100" y2="40" stroke="#171513" strokeWidth="0.6" />
            <line x1="200" y1="40" x2="220" y2="40" stroke="#171513" strokeWidth="0.6" />
            <line x1="380" y1="40" x2="400" y2="40" stroke="#D85A3D" strokeWidth="0.8" strokeDasharray="2,2" />
          </g>

          {/* Storage adapter fan-out */}
          <g transform="translate(80, 400)">
            <rect x="0" y="0" width="620" height="100" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="6" width="608" height="88" fill="url(#ad-microgrid)" />
            <rect x="0" y="0" width="10" height="10" fill="#171513" />
            <rect x="610" y="90" width="10" height="10" fill="#171513" />
            <rect x="20" y="20" width="200" height="60" fill="#171513" />
            <text x="120" y="44" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ECE3D2" textAnchor="middle" letterSpacing="1">
              storage adapter
            </text>
            <text x="120" y="58" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#ECE3D2" textAnchor="middle" letterSpacing="1.4" opacity="0.7">
              SAME API · 5 BACKENDS
            </text>
            <text x="120" y="72" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#D85A3D" textAnchor="middle" letterSpacing="1.4">
              owner/repo/&lt;sha&gt;/…
            </text>
            <g stroke="#D85A3D" strokeWidth="1.6" fill="none">
              <line x1="220" y1="32" x2="278" y2="20" markerEnd="url(#ad-arrowOrange)" />
              <line x1="220" y1="40" x2="278" y2="40" markerEnd="url(#ad-arrowOrange)" />
              <line x1="220" y1="50" x2="278" y2="60" markerEnd="url(#ad-arrowOrange)" />
              <line x1="220" y1="60" x2="278" y2="78" markerEnd="url(#ad-arrowOrange)" />
              <line x1="220" y1="68" x2="278" y2="96" markerEnd="url(#ad-arrowOrange)" strokeDasharray="3,2" />
            </g>
            <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" letterSpacing="1">
              <rect x="286" y="12" width="80" height="16" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <text x="326" y="23" textAnchor="middle">
                S3
              </text>
              <rect x="286" y="32" width="80" height="16" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <text x="326" y="43" textAnchor="middle">
                GCS
              </text>
              <rect x="286" y="52" width="80" height="16" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <text x="326" y="63" textAnchor="middle">
                AZURE
              </text>
              <rect x="286" y="72" width="80" height="16" fill="#ECE3D2" stroke="#171513" strokeWidth="1" />
              <text x="326" y="83" textAnchor="middle">
                MINIO
              </text>
            </g>
            <text x="380" y="23" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268" letterSpacing="1">
              aws · per-tenant prefix
            </text>
            <text x="380" y="43" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268" letterSpacing="1">
              google cloud · same model
            </text>
            <text x="380" y="63" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268" letterSpacing="1">
              azure · blob storage
            </text>
            <text x="380" y="83" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#7A7268" letterSpacing="1">
              s3-compatible · on-prem
            </text>
            <text x="270" y="98" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#171513" letterSpacing="1" opacity="0.6">
              FS · dev only
            </text>
          </g>

          <g>
            <line x1="500" y1="62" x2="500" y2="84" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#ad-arrowOrange)" />
          </g>

          <g stroke="#171513" strokeWidth="0.8" fill="none">
            <line x1="780" y1="120" x2="810" y2="120" />
            <line x1="780" y1="220" x2="810" y2="220" />
            <line x1="780" y1="330" x2="810" y2="330" />
            <line x1="780" y1="450" x2="810" y2="450" />
          </g>
          <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1">
            <text x="816" y="116">
              EDGE
            </text>
            <text x="816" y="128" fontSize="8" fill="#7A7268">
              nginx · TLS · routing
            </text>

            <text x="816" y="216">
              APP
            </text>
            <text x="816" y="228" fontSize="8" fill="#7A7268">
              frontend · backend · cache
            </text>

            <text x="816" y="326">
              AUTH
            </text>
            <text x="816" y="338" fontSize="8" fill="#7A7268">
              SuperTokens · bring-your-own IdP
            </text>

            <text x="816" y="446">
              STORAGE
            </text>
            <text x="816" y="458" fontSize="8" fill="#7A7268">
              pluggable adapter · 5 backends
            </text>
          </g>

          <g>
            <rect x="780" y="490" width="190" height="110" fill="#171513" />
            <text x="790" y="510" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="#ECE3D2" letterSpacing="1.2">
              — GUARANTEES
            </text>
            <text x="790" y="532" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fill="#ECE3D2">
              No external SaaS
            </text>
            <text x="790" y="546" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fill="#ECE3D2" opacity="0.85">
              in the request path.
            </text>
            <text x="790" y="566" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fill="#ECE3D2">
              Data residency: yours.
            </text>
            <text x="790" y="582" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fill="#ECE3D2" opacity="0.85">
              No phone-home by default.
            </text>
          </g>

          <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" opacity="0.7" letterSpacing="2">
            <text x="40" y="624">
              REF · CE · ARCHITECTURE · 01
            </text>
            <text x="960" y="624" textAnchor="end">
              SELF-HOSTED · DOCKER-COMPOSE
            </text>
          </g>
        </svg>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center meta-label" aria-hidden="true">← swipe to read the full diagram →</p>
    </div>
  );
}
