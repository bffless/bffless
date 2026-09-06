// Copy and structured data for the landing page. Kept out of the components so
// the sections stay layout-only and the words are easy to review in one place.

export const LINKS = {
  quickstart: 'https://docs.bffless.app/getting-started/quickstart/',
  docs: 'https://docs.bffless.app/',
  github: 'https://github.com/bffless/ce',
  store: 'https://apps.bffless.dev/',
  rulesRecipe: 'https://docs.bffless.app/recipes/proxy-rules-as-code/',
  catalogDocs: 'https://docs.bffless.dev/features/app-catalog/',
  youtube: 'https://www.youtube.com/@bffless',
  discord: 'https://bffless.dev/discord',
} as const;

/** The four-stop story the ledger rail sets up; each links to its section. */
export const ledger = [
  { n: '01', id: 'host', title: 'What you can host', sub: 'Apps, docs, reports, Storybooks.' },
  { n: '02', id: 'platform', title: 'What it adds', sub: 'Auth, a proxy, pipelines, storage.' },
  { n: '03', id: 'apps', title: 'What ships with it', sub: 'Five apps and MCP servers.' },
  { n: '04', id: 'install', title: 'Who runs it', sub: 'You do. Or I set it up for you.' },
] as const;

export const hostTargets = [
  {
    title: 'AI-generated apps & internal tools',
    body: 'Any SPA build, behind SSO, on a subdomain inside your network.',
  },
  {
    title: 'Engineering docs',
    body: 'Docusaurus, VitePress, MkDocs. Versioned per branch, instant rollback.',
  },
  {
    title: 'Storybook & design system',
    body: 'Publish every PR; designers and PMs browse before merge.',
  },
  {
    title: 'API reference sites',
    body: 'Redoc, Scalar, Stoplight. Shareable URLs, gated to staff.',
  },
  {
    title: 'Coverage & test reports',
    body: 'A coverage URL, a Lighthouse report, a Playwright trace — linked in the PR.',
  },
  {
    title: 'Runbooks & onboarding',
    body: 'Markdown-built ops content, RBAC-gated. New-hire wiki without the SaaS.',
  },
];

export const deployYaml = `name: Deploy to BFFless
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: bffless/upload-artifact@v1
        with:
          path: dist
          api-url: \${{ vars.BFFLESS_URL }}
          api-key: \${{ secrets.BFFLESS_API_KEY }}
          alias: production`;

export const layers = [
  {
    key: 'EDGE',
    lead: 'SSO-gated URLs out of the box.',
    body: 'nginx + TLS, custom domains with auto-SSL. Sessions via SuperTokens, JWT/JWKS, Google OAuth or your own OIDC.',
    tags: 'tls · routing · sessions',
  },
  {
    key: 'AUTH',
    lead: 'Two-tier RBAC.',
    body: 'Global roles (Admin, User, Member) and per-project roles (Owner → Guest). API keys scoped per project for CI/CD.',
    tags: 'roles · api keys · share links',
  },
  {
    key: 'PROXY',
    lead: 'Call any backend without a backend.',
    body: 'Rules in your repo forward routes to internal services and strip the CORS problem.',
    tags: 'proxy-rules · same-origin',
  },
  {
    key: 'PIPELINES',
    lead: 'Forms, uploads, DB writes, email, AI — no server code.',
    body: 'Chain handlers in YAML: form_handler → data_create → email_handler. Reviewed in a PR, synced by CI.',
    tags: '12 handlers · yaml',
  },
  {
    key: 'STORAGE',
    lead: 'Immutable, SHA-keyed deploys.',
    body: 'S3, GCS, Azure, MinIO or local disk. Postgres + Redis. Audit trails come free.',
    tags: 's3 · postgres · redis',
  },
];

export type CatalogApp = {
  id: string;
  name: string;
  tag: string;
  isNew?: boolean;
  summary: string;
  href: string;
  image: string;
};

export const apps: CatalogApp[] = [
  {
    id: 'handoff',
    name: 'Handoff',
    tag: 'Files',
    summary: 'Internal file server with per-folder access and share links for people outside the team.',
    href: 'https://apps.bffless.dev/apps/handoff/',
    image: '/images/apps/handoff.png',
  },
  {
    id: 'studio',
    name: 'Studio',
    tag: 'Video',
    summary: 'Record once; an AI director proposes cuts, you accept scene by scene.',
    href: 'https://apps.bffless.dev/apps/studio/',
    image: '/images/apps/studio.png',
  },
  {
    id: 'reader',
    name: 'Rivulet',
    tag: 'Reader',
    summary: 'Multi-user RSS reader. Folders, unread, OPML, background refresh.',
    href: 'https://apps.bffless.dev/apps/reader/',
    image: '/images/apps/reader.png',
  },
  {
    id: 'recall',
    name: 'Recall',
    tag: 'Search',
    summary: 'Semantic search and RAG chat over your video library. Answers deep-link to the second.',
    href: 'https://recall.bffless.dev/',
    image: '/images/apps/recall.png',
  },
  {
    id: 'workflow',
    name: 'Workflow',
    tag: 'Automation',
    isNew: true,
    summary: 'Reviewable, resumable AI workflows in YAML. Pause for a human, resume where it left off.',
    href: 'https://apps.bffless.dev/apps/workflow/',
    image: '/images/apps/workflow.png',
  },
];

export const security = [
  { lead: 'Runs in your VPC.', body: 'Single docker-compose stack. No phone-home by default.' },
  {
    lead: 'Explicit membership.',
    body: 'Visitors without a membership get a 403. Share links are token-gated, one-off.',
  },
  { lead: 'Immutable deploys.', body: 'SHA-keyed objects; a rollback is an alias change, audited.' },
  { lead: 'Source-available.', body: 'MIT-ish CE build is free. Read every line before you run it.' },
];

export type Mark = 'yes' | 'half' | 'no';

export const compareCols = [
  { label: 'BFFless · CE', sub: 'self-host', emphasis: true },
  { label: 'GitHub Pages', sub: 'static · public' },
  { label: 'Vercel · Netlify', sub: 'managed PaaS' },
  { label: 'Cloudflare Pages', sub: 'edge + workers' },
];

export const compareRows: { row: string; cells: [Mark, Mark, Mark, Mark] }[] = [
  { row: 'SSO / RBAC in front of the site', cells: ['yes', 'no', 'half', 'half'] },
  { row: 'Reverse proxy to any backend (no CORS)', cells: ['yes', 'no', 'half', 'half'] },
  { row: 'Custom domain + auto SSL', cells: ['yes', 'no', 'yes', 'yes'] },
  { row: 'Server-side pipelines (BFF, no code)', cells: ['yes', 'no', 'no', 'no'] },
  { row: 'Self-host in your VPC / on-prem', cells: ['yes', 'yes', 'no', 'no'] },
  { row: 'Immutable, SHA-keyed deploys', cells: ['yes', 'no', 'yes', 'yes'] },
  { row: 'Preview deployment per PR', cells: ['yes', 'half', 'yes', 'yes'] },
  { row: 'Instant rollback by alias pointer', cells: ['yes', 'no', 'half', 'half'] },
  { row: 'Free forever, no usage cap', cells: ['yes', 'yes', 'half', 'half'] },
];

export const stack = [
  { layer: 'Backend', value: 'NestJS · TypeScript' },
  { layer: 'Frontend', value: 'React · Vite' },
  { layer: 'Database', value: 'PostgreSQL · Drizzle' },
  { layer: 'Auth', value: 'SuperTokens · JWT · OAuth' },
  { layer: 'Storage', value: 'Local · MinIO · S3 · GCS · Azure' },
  { layer: 'Edge', value: "nginx · TLS · Let's Encrypt" },
];
