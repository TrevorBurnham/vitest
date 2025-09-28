#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.error('[DEBUG] debug-test.js starting');
console.error('[DEBUG] process.argv:', process.argv);
console.error('[DEBUG] process.env.CI:', process.env.CI);
console.error('[DEBUG] process.env.NODE_ENV:', process.env.NODE_ENV);
console.error('[DEBUG] process.cwd():', process.cwd());
console.error('[DEBUG] __dirname:', __dirname);

// Try to find vitest
const vitestPaths = [
  './node_modules/vitest/vitest.mjs',
  join(__dirname, 'node_modules/vitest/vitest.mjs'),
  './node_modules/.bin/vitest',
  join(__dirname, 'node_modules/.bin/vitest'),
];

let vitestPath;
for (const p of vitestPaths) {
  try {
    if (existsSync(p)) {
      console.error(`[DEBUG] Found vitest at: ${p}`);
      vitestPath = p;
      break;
    }
  } catch (e) {
    console.error(`[DEBUG] Error checking ${p}:`, e.message);
  }
}

if (!vitestPath) {
  console.error('[DEBUG] ERROR: Could not find vitest binary!');
  process.exit(1);
}

console.error('[DEBUG] Spawning vitest with --typecheck.enabled');
const child = spawn(process.execPath, [vitestPath, '--typecheck.enabled'], {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd(),
});

child.on('error', (err) => {
  console.error('[DEBUG] Failed to start vitest:', err);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  console.error(`[DEBUG] vitest exited with code: ${code}, signal: ${signal}`);
  process.exit(code || 0);
});