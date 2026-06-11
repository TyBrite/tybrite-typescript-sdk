#!/usr/bin/env node
/**
 * Post-generation script to rename TOKEN to apiKey for better DX
 * and manage version increments
 * Runs automatically after openapi-typescript-codegen
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filesToUpdate = [
  'src/Tybrite.ts',
  'src/core/OpenAPI.ts',
  'src/core/request.ts'
];

console.log('🔧 Post-processing generated SDK...');

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} (not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Replace TOKEN with apiKey in various contexts
  content = content
    .replace(/TOKEN\?:/g, 'apiKey?:')
    .replace(/TOKEN:/g, 'apiKey:')
    .replace(/config\.TOKEN/g, 'config.apiKey')
    .replace(/this\.TOKEN/g, 'this.apiKey')
    .replace(/TOKEN\s*=/g, 'apiKey =')
    .replace(/TOKEN,/g, 'apiKey,');
  
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Updated ${filePath}`);
});

console.log('✨ Post-processing complete!\n');

// ---------------------------------------------------------------------------
// Inject automatic-retry logic into the generated client.
// Source of truth: scripts/retry-snippet.ts (the block between the markers).
// Every step below is idempotent — safe to re-run after each codegen.
// ---------------------------------------------------------------------------
function injectRetryLogic() {
  console.log('🔁 Injecting automatic-retry logic...');

  // 1) Add MAX_RETRIES / RETRY_DELAY_MS to the OpenAPI config (type + defaults).
  const openApiPath = path.join(__dirname, '..', 'src/core/OpenAPI.ts');
  if (fs.existsSync(openApiPath)) {
    let oa = fs.readFileSync(openApiPath, 'utf-8');
    if (!oa.includes('MAX_RETRIES')) {
      oa = oa.replace(
        /(\n {4}ENCODE_PATH\?: \(\(path: string\) => string\) \| undefined;\n)/,
        '$1    MAX_RETRIES?: number | undefined;\n    RETRY_DELAY_MS?: number | undefined;\n'
      );
      oa = oa.replace(
        /(\n {4}ENCODE_PATH: undefined,\n)/,
        '$1    MAX_RETRIES: 2,\n    RETRY_DELAY_MS: 500,\n'
      );
      fs.writeFileSync(openApiPath, oa, 'utf-8');
      console.log('✅ Added MAX_RETRIES/RETRY_DELAY_MS to OpenAPI.ts');
    } else {
      console.log('⏭️  OpenAPI.ts already has retry config');
    }
  }

  // 2) Splice the retry block from retry-snippet.ts into request.ts and route the
  //    request() call site through the wrapper.
  const requestPath = path.join(__dirname, '..', 'src/core/request.ts');
  const snippetPath = path.join(__dirname, 'retry-snippet.ts');
  if (!fs.existsSync(requestPath) || !fs.existsSync(snippetPath)) {
    console.log('⚠️  request.ts or retry-snippet.ts missing — skipping retry injection');
    return;
  }

  let req = fs.readFileSync(requestPath, 'utf-8');
  const snippet = fs.readFileSync(snippetPath, 'utf-8');
  const startMarker = '// ===== TYBRITE-RETRY-BLOCK-START';
  const endMarker = '// ===== TYBRITE-RETRY-BLOCK-END';
  const startIdx = snippet.indexOf(startMarker);
  const endLineEnd = snippet.indexOf('\n', snippet.indexOf(endMarker));
  if (startIdx === -1 || endLineEnd === -1) {
    console.log('⚠️  Retry markers not found in retry-snippet.ts — skipping');
    return;
  }
  const block = snippet.slice(startIdx, endLineEnd + 1);

  if (!req.includes('TYBRITE-RETRY-BLOCK-START')) {
    // Splice immediately before `export const request` — sendRequest is defined earlier in
    // the file (in scope for the wrapper), and the wrapper is in scope for the call site below.
    const anchor = 'export const request = <T>';
    if (req.includes(anchor)) {
      req = req.replace(anchor, `${block}\nexport const request = <T>`);
      console.log('✅ Spliced retry block into request.ts');
    } else {
      console.log('⚠️  Could not find request() anchor to splice retry block — skipping');
      return;
    }
  } else {
    console.log('⏭️  request.ts already has retry block');
  }

  // Route the request() call site through the wrapper.
  //
  // IMPORTANT: after the splice above, this exact call-site string appears TWICE —
  // once INSIDE the spliced retry block (the wrapper's own call to the real
  // sendRequest) and once at the genuine request() call site further down. A
  // plain .replace() rewrites the FIRST match (the one inside the wrapper),
  // turning sendRequestWithRetry into infinite self-recursion AND leaving the
  // real call site un-routed. We must rewrite ONLY the LAST occurrence — the
  // real call site — and leave the wrapper's internal sendRequest call intact.
  const callSite = 'const response = await sendRequest(config, options, url, body, formData, headers, onCancel);';
  const routed = 'const response = await sendRequestWithRetry(config, options, url, body, formData, headers, onCancel);';
  const lastIdx = req.lastIndexOf(callSite);
  if (lastIdx !== -1) {
    req = req.slice(0, lastIdx) + routed + req.slice(lastIdx + callSite.length);
    console.log('✅ Routed request() through sendRequestWithRetry (last occurrence)');
  } else {
    console.log('⏭️  request() call site already routed');
  }

  fs.writeFileSync(requestPath, req, 'utf-8');
}

injectRetryLogic();
console.log('');

// ---------------------------------------------------------------------------
// Realtime helper export.
// The code generator overwrites src/index.ts on every run, which drops the
// hand-written realtime helper export. Re-add it here (idempotent) so
// `subscribeToThread` is always exported from the package entry point.
// Source: src/realtime.ts (hand-written, not generated).
// ---------------------------------------------------------------------------
function injectRealtimeExport() {
  const indexPath = path.join(__dirname, '..', 'src/index.ts');
  const realtimePath = path.join(__dirname, '..', 'src/realtime.ts');
  if (!fs.existsSync(indexPath) || !fs.existsSync(realtimePath)) {
    console.log('⚠️  src/index.ts or src/realtime.ts missing — skipping realtime export injection');
    return;
  }
  let idx = fs.readFileSync(indexPath, 'utf-8');
  if (idx.includes("from './realtime'")) {
    console.log('⏭️  index.ts already exports the realtime helper');
    return;
  }
  const exportLine =
    "\n// Realtime messaging helper (hand-written — re-added by scripts/post-generate.js)\n" +
    "export { subscribeToThread } from './realtime';\n" +
    "export type { SubscribeMode, SubscribeToThreadOptions } from './realtime';\n";
  fs.writeFileSync(indexPath, idx + exportLine, 'utf-8');
  console.log('✅ Re-added realtime helper export to index.ts');
}

injectRealtimeExport();
console.log('');

// Version management
async function promptVersionUpdate() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const currentVersion = packageJson.version;
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  console.log(`📦 Current version: ${currentVersion}`);
  console.log('\n🔢 Version update options:');
  console.log('  1. Press ENTER to auto-increment patch version (X.Y.Z+1)');
  console.log('  2. Enter major version (e.g., "2" for 2.0.0)');
  console.log('  3. Enter major.minor (e.g., "1.5" for 1.5.0)');
  console.log('  4. Enter full version (e.g., "1.2.3")');
  console.log('  5. Type "skip" to keep current version\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter version (or press ENTER for auto-increment): ', (answer) => {
      rl.close();
      
      const input = answer.trim();
      let newVersion;

      if (!input || input === '') {
        // Auto-increment patch
        newVersion = `${major}.${minor}.${patch + 1}`;
      } else if (input.toLowerCase() === 'skip') {
        console.log(`⏭️  Keeping version ${currentVersion}`);
        resolve(false);
        return;
      } else if (/^\d+$/.test(input)) {
        // Major version only (e.g., "2")
        const newMajor = parseInt(input);
        newVersion = `${newMajor}.0.0`;
      } else if (/^\d+\.\d+$/.test(input)) {
        // Major.minor (e.g., "1.5")
        const [newMajor, newMinor] = input.split('.').map(Number);
        newVersion = `${newMajor}.${newMinor}.0`;
      } else if (/^\d+\.\d+\.\d+$/.test(input)) {
        // Full version (e.g., "1.2.3")
        newVersion = input;
      } else {
        console.log('❌ Invalid version format. Keeping current version.');
        resolve(false);
        return;
      }

      // Update package.json
      packageJson.version = newVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
      console.log(`✅ Version updated: ${currentVersion} → ${newVersion}\n`);
      resolve(true);
    });
  });
}

// Run version prompt
promptVersionUpdate().catch(console.error);
