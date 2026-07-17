#!/usr/bin/env node

import autocannon from 'autocannon';

const TARGET_URL = process.env.TARGET_URL || 'https://landing.sandbox.workspace.bffless.app';
const DURATION = parseInt(process.env.DURATION || '30', 10);
const CONNECTIONS = parseInt(process.env.CONNECTIONS || '5', 10);
const PIPELINING = parseInt(process.env.PIPELINING || '1', 10);

// All assets loaded when visiting the site
const endpoints = [
  { path: '/', name: 'Homepage (HTML)' },
  { path: '/favicon.svg', name: 'Favicon (SVG)' },
  { path: '/styles/main.css', name: 'Stylesheet (CSS)' },
  { path: '/images/hero.png', name: 'Image: Hero (PNG)' },
  { path: '/images/logo-circle.svg', name: 'Image: Logo (SVG)' },
];

async function runTest(endpoint) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${endpoint.name} (${TARGET_URL}${endpoint.path})`);
  console.log('='.repeat(60));

  const result = await autocannon({
    url: `${TARGET_URL}${endpoint.path}`,
    connections: CONNECTIONS,
    pipelining: PIPELINING,
    duration: DURATION,
  });

  return {
    name: endpoint.name,
    path: endpoint.path,
    latency: {
      avg: result.latency?.avg ?? 0,
      p50: result.latency?.p50 ?? 0,
      p90: result.latency?.p90 ?? 0,
      p99: result.latency?.p99 ?? 0,
      max: result.latency?.max ?? 0,
    },
    requests: {
      total: result.requests?.total ?? 0,
      avg: result.requests?.average ?? 0,
      perSec: result.requests?.mean ?? 0,
    },
    throughput: {
      avg: result.throughput?.average ?? 0,
      perSec: result.throughput?.mean ?? 0,
    },
    errors: result.errors ?? 0,
    timeouts: result.timeouts ?? 0,
    non2xx: result.non2xx ?? 0,
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function printSummary(results) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('LOAD TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Target: ${TARGET_URL}`);
  console.log(`Duration: ${DURATION}s | Connections: ${CONNECTIONS} | Pipelining: ${PIPELINING}`);
  console.log('');

  console.log('Endpoint Performance:');
  console.log('-'.repeat(60));

  let totalErrors = 0;
  let totalRequests = 0;
  let allPassed = true;

  for (const r of results) {
    const status = r.errors === 0 && r.non2xx === 0 ? '✓' : '✗';
    if (r.errors > 0 || r.non2xx > 0) allPassed = false;
    totalErrors += r.errors + r.non2xx;
    totalRequests += r.requests.total;

    console.log(`\n${status} ${r.name} (${r.path})`);
    console.log(`  Requests: ${r.requests.total.toLocaleString()} total | ${r.requests.perSec.toFixed(2)}/sec`);
    console.log(`  Latency avg: ${r.latency.avg.toFixed(2)}ms | p50: ${r.latency.p50}ms | p90: ${r.latency.p90}ms | p99: ${r.latency.p99}ms`);
    console.log(`  Throughput: ${formatBytes(r.throughput.perSec)}/sec`);
    if (r.errors > 0) console.log(`  Errors: ${r.errors}`);
    if (r.non2xx > 0) console.log(`  Non-2xx: ${r.non2xx}`);
  }

  console.log('\n' + '-'.repeat(60));
  console.log(`Overall: ${allPassed ? 'PASSED' : 'FAILED'}`);
  console.log(`Total requests: ${totalRequests.toLocaleString()} | Errors: ${totalErrors}`);

  // Output JSON for CI parsing
  if (process.env.CI || process.env.OUTPUT_JSON) {
    const jsonOutput = {
      target: TARGET_URL,
      config: { duration: DURATION, connections: CONNECTIONS, pipelining: PIPELINING },
      timestamp: new Date().toISOString(),
      results,
      passed: allPassed,
      totalRequests,
      totalErrors,
    };
    console.log('\n--- JSON OUTPUT ---');
    console.log(JSON.stringify(jsonOutput, null, 2));
  }

  return allPassed ? 0 : 1;
}

async function main() {
  console.log('Starting load tests...');
  console.log(`Target: ${TARGET_URL}`);
  console.log(`Config: ${DURATION}s duration, ${CONNECTIONS} connections, ${PIPELINING} pipelining`);
  console.log(`Running ${endpoints.length} endpoints in PARALLEL\n`);

  // Run all endpoint tests simultaneously
  const results = await Promise.all(endpoints.map(endpoint => runTest(endpoint)));

  const exitCode = printSummary(results);
  process.exit(exitCode);
}

main().catch((err) => {
  console.error('Load test failed:', err);
  process.exit(1);
});
