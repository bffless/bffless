// Two-tier RBAC: global roles (left) feeding project roles (right) with an
// "effective = max(direct, group, global)" bridge across.

export default function RBACDiagram() {
  return (
    <div className="relative w-full">
      <div className="absolute -top-6 left-0 right-0 flex items-center justify-between">
        <span className="meta-label">Fig. 05 · Two-tier RBAC</span>
        <span className="meta-label">DOC-OPS · COMPLIANCE</span>
      </div>

      <div className="relative border border-paper-line bg-paper-deep/30 corner-marks">
        <div className="overflow-x-auto scrollbar-hide">
        <svg
          viewBox="0 0 1000 440"
          className="w-full h-auto min-w-[760px] md:min-w-0"
          role="img"
          aria-label="Two-tier RBAC diagram. Three global roles on the left (Admin, User, Member) feed into five project roles on the right (Owner 4, Admin 3, Contributor 2, Viewer 1, Guest 0), bridged by an effective-permission calculation."
        >
          <defs>
            <pattern id="rb-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#171513" opacity="0.16" />
            </pattern>
            <pattern id="rb-microgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#171513" strokeWidth="0.4" opacity="0.4" />
            </pattern>
            <marker id="rb-arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#D85A3D" />
            </marker>
          </defs>

          <rect x="0" y="0" width="1000" height="440" fill="url(#rb-dots)" />

          {/* LEFT: Global roles */}
          <g transform="translate(40, 50)">
            <text x="0" y="0" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4">
              L1 · GLOBAL ROLES
            </text>
            <text x="0" y="14" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268">
              system-wide capability
            </text>

            <rect x="0" y="30" width="280" height="240" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="36" width="268" height="228" fill="url(#rb-microgrid)" />
            <rect x="0" y="30" width="10" height="10" fill="#171513" />
            <rect x="270" y="260" width="10" height="10" fill="#171513" />

            <rect x="20" y="50" width="240" height="58" fill="#171513" />
            <text x="32" y="68" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2" letterSpacing="1.2">
              G-01
            </text>
            <text x="32" y="86" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="#ECE3D2">
              Admin
            </text>
            <text x="32" y="100" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2" opacity="0.75">
              full system · user mgmt · all projects
            </text>

            <rect x="20" y="118" width="240" height="58" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
            <text x="32" y="136" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268" letterSpacing="1.2">
              G-02
            </text>
            <text x="32" y="154" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="#171513">
              User
            </text>
            <text x="32" y="168" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268">
              create projects · own + granted
            </text>

            <rect x="20" y="186" width="240" height="58" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
            <text x="32" y="204" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268" letterSpacing="1.2">
              G-03
            </text>
            <text x="32" y="222" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="#171513">
              Member
            </text>
            <text x="32" y="236" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268">
              granted projects only · default
            </text>
          </g>

          {/* CENTER: bridge */}
          <g>
            <line x1="332" y1="156" x2="612" y2="156" stroke="#D85A3D" strokeWidth="2.4" markerEnd="url(#rb-arrowOrange)" />
            <text x="472" y="148" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#D85A3D" letterSpacing="1.4" textAnchor="middle">
              effective = max(direct, group, global)
            </text>
            <line x1="332" y1="90" x2="612" y2="100" stroke="#171513" strokeWidth="0.9" opacity="0.55" strokeDasharray="3,3" />
            <line x1="332" y1="226" x2="612" y2="216" stroke="#171513" strokeWidth="0.9" opacity="0.55" strokeDasharray="3,3" />
          </g>

          {/* RIGHT: Project roles */}
          <g transform="translate(620, 50)">
            <text x="0" y="0" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#171513" letterSpacing="1.4">
              L2 · PROJECT ROLES
            </text>
            <text x="0" y="14" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fill="#7A7268">
              per-project · hierarchical
            </text>

            <rect x="0" y="30" width="340" height="280" fill="#ECE3D2" stroke="#171513" strokeWidth="1.4" />
            <rect x="6" y="36" width="328" height="268" fill="url(#rb-microgrid)" />
            <rect x="0" y="30" width="10" height="10" fill="#171513" />
            <rect x="330" y="300" width="10" height="10" fill="#171513" />

            <rect x="20" y="50" width="300" height="42" fill="#D85A3D" />
            <text x="32" y="65" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2" letterSpacing="1.2">
              P-04 · OWNER
            </text>
            <text x="32" y="82" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#ECE3D2">
              transfer · delete · everything
            </text>

            <rect x="20" y="100" width="300" height="42" fill="#171513" />
            <text x="32" y="115" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#ECE3D2" letterSpacing="1.2">
              P-03 · ADMIN
            </text>
            <text x="32" y="132" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#ECE3D2">
              manage permissions · all r/w
            </text>

            <rect x="20" y="150" width="300" height="42" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
            <text x="32" y="165" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268" letterSpacing="1.2">
              P-02 · CONTRIBUTOR
            </text>
            <text x="32" y="182" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#171513">
              deploy · upload · modify
            </text>

            <rect x="20" y="200" width="300" height="42" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" />
            <text x="32" y="215" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268" letterSpacing="1.2">
              P-01 · VIEWER
            </text>
            <text x="32" y="232" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#171513">
              read-only admin backend
            </text>

            <rect x="20" y="250" width="300" height="42" fill="#ECE3D2" stroke="#171513" strokeWidth="1.1" strokeDasharray="3,3" />
            <text x="32" y="265" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7A7268" letterSpacing="1.2">
              P-00 · GUEST
            </text>
            <text x="32" y="282" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fill="#171513">
              site access only
            </text>
          </g>

          <line x1="40" y1="370" x2="960" y2="370" stroke="#171513" strokeWidth="0.6" opacity="0.35" />

          <g transform="translate(40, 388)">
            <text x="0" y="0" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#171513" letterSpacing="1.4">
              — ON TOP OF THE TWO TIERS
            </text>
            <g fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fill="#171513">
              <text x="0" y="22">
                <tspan fill="#D85A3D">●</tspan>
                <tspan dx="6">API keys · scoped per-project for CI/CD</tspan>
              </text>
              <text x="320" y="22">
                <tspan fill="#D85A3D">●</tspan>
                <tspan dx="6">Share links · token-gated one-off access</tspan>
              </text>
              <text x="640" y="22">
                <tspan fill="#D85A3D">●</tspan>
                <tspan dx="6">Immutable deploy IDs · audit-friendly</tspan>
              </text>
            </g>
          </g>
        </svg>
        </div>
      </div>
      <p className="md:hidden mt-3 text-center meta-label" aria-hidden="true">← swipe to read the full diagram →</p>
    </div>
  );
}
