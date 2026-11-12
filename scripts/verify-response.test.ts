// Tests for src/verify-response.ts. Run: npm test (tsx --test).
// The signer below is the published recipe written independently of the helper:
// base64(HMAC-SHA256(secret, "{timestamp}.{body}")).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyResponseSignature } from '../src/verify-response';
import * as sdk from '../src/index';

const SECRET = 'whsec_test_secret';

function sign(secret: string, timestamp: string, body: string | Uint8Array): string {
  return createHmac('sha256', secret)
    .update(Buffer.concat([Buffer.from(`${timestamp}.`, 'utf8'), Buffer.from(body)]))
    .digest('base64');
}

function signed(body: string | Uint8Array, secret = SECRET, ageSeconds = 0) {
  const timestamp = String(Math.floor(Date.now() / 1000) - ageSeconds);
  return { timestamp, headers: { 'X-Signature-Timestamp': timestamp, 'X-Signature': sign(secret, timestamp, body) } };
}

const BODY = JSON.stringify({ id: 'ord_1', customer_name: 'Zoë Müller — 日本語 💶', total_amount: 12.5 });

test('a body signed with the platform recipe verifies', async () => {
  const { headers } = signed(BODY);
  assert.equal(await verifyResponseSignature(BODY, headers, SECRET), true);
});

test('accepts bytes, a Headers object and any header-name casing', async () => {
  const { headers } = signed(BODY);
  assert.equal(await verifyResponseSignature(new TextEncoder().encode(BODY), new Headers(headers), SECRET), true);
  const lower = { 'x-signature-timestamp': headers['X-Signature-Timestamp'], 'x-signature': headers['X-Signature'] };
  assert.equal(await verifyResponseSignature(BODY, lower, SECRET), true);
});

test('a body that is not valid UTF-8 text verifies as bytes', async () => {
  const bytes = new Uint8Array([0x7b, 0xff, 0xfe, 0x7d]);
  const { headers } = signed(bytes);
  assert.equal(await verifyResponseSignature(bytes, headers, SECRET), true);
});

test('a tampered body fails', async () => {
  const { headers } = signed(BODY);
  assert.equal(await verifyResponseSignature(BODY.replace('12.5', '0.5'), headers, SECRET), false);
  assert.equal(await verifyResponseSignature(JSON.stringify(JSON.parse(BODY), null, 2), headers, SECRET), false);
});

test('a wrong secret fails', async () => {
  const { headers } = signed(BODY);
  assert.equal(await verifyResponseSignature(BODY, headers, 'another-secret'), false);
});

test('a timestamp changed after signing fails', async () => {
  const { headers, timestamp } = signed(BODY);
  const shifted = { ...headers, 'X-Signature-Timestamp': String(Number(timestamp) + 1) };
  assert.equal(await verifyResponseSignature(BODY, shifted, SECRET), false);
});

test('a stale response fails, and a wider tolerance accepts it', async () => {
  const { headers } = signed(BODY, SECRET, 600);
  assert.equal(await verifyResponseSignature(BODY, headers, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, headers, SECRET, { toleranceSeconds: 900 }), true);
});

test('a timestamp from the future beyond tolerance fails', async () => {
  const { headers } = signed(BODY, SECRET, -600);
  assert.equal(await verifyResponseSignature(BODY, headers, SECRET), false);
});

test('the default tolerance is 300 seconds', async () => {
  assert.equal(await verifyResponseSignature(BODY, signed(BODY, SECRET, 290).headers, SECRET), true);
  assert.equal(await verifyResponseSignature(BODY, signed(BODY, SECRET, 310).headers, SECRET), false);
});

test('several secrets: valid under any of them', async () => {
  const { headers } = signed(BODY, 'old-secret');
  assert.equal(await verifyResponseSignature(BODY, headers, ['new-secret', 'old-secret']), true);
  assert.equal(await verifyResponseSignature(BODY, headers, ['new-secret', 'third-secret']), false);
});

test('missing or malformed headers fail', async () => {
  const { headers } = signed(BODY);
  assert.equal(await verifyResponseSignature(BODY, {}, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, { 'X-Signature': headers['X-Signature'] }, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, { 'X-Signature-Timestamp': headers['X-Signature-Timestamp'] }, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, { ...headers, 'X-Signature': 'not base64!' }, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, { ...headers, 'X-Signature': '' }, SECRET), false);
  assert.equal(await verifyResponseSignature(BODY, { ...headers, 'X-Signature-Timestamp': 'abc' }, SECRET), false);
});

test('an empty secret never verifies', async () => {
  const { headers } = signed(BODY, '');
  assert.equal(await verifyResponseSignature(BODY, headers, ''), false);
  assert.equal(await verifyResponseSignature(BODY, headers, []), false);
});

test('the helper is exported from the package entry point', () => {
  assert.equal(typeof sdk.verifyResponseSignature, 'function');
});
