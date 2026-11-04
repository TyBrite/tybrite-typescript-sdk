/**
 * Response signature verification.
 *
 * A call made with a secret key to a signed operation (orders, payments status, returns) returns
 * `X-Signature-Timestamp` (Unix seconds) and `X-Signature`, where
 *
 *     X-Signature = base64( HMAC-SHA256( signing_secret, "{X-Signature-Timestamp}.{body}" ) )
 *
 * and `body` is the exact bytes of the decoded response. `verifyResponseSignature` recomputes that
 * value and compares it in constant time. It uses Web Crypto (`crypto.subtle`), so it runs on
 * Node 18+, Deno, Bun and edge runtimes. Run it on a server that holds the signing secret; the
 * secret does not belong in a browser.
 *
 * Re-exported from src/index.ts. The export is re-added on every SDK regeneration by
 * scripts/post-generate.js (the code generator overwrites src/index.ts).
 */

export interface VerifyResponseSignatureOptions {
  /**
   * The largest accepted difference, in seconds, between `X-Signature-Timestamp` and the current
   * time. Defaults to 300 (five minutes).
   */
  toleranceSeconds?: number;
}

const DEFAULT_TOLERANCE_SECONDS = 300;

/** Case-insensitive header lookup for a `Headers` object or a plain record. */
function readHeader(headers: Headers | Record<string, string>, name: string): string | null {
  if (typeof (headers as Headers).get === 'function') {
    return (headers as Headers).get(name);
  }
  const wanted = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === wanted) {
      const value = (headers as Record<string, string>)[key];
      return typeof value === 'string' ? value : null;
    }
  }
  return null;
}

/** Decode standard base64 to bytes; `null` when the input is not valid base64. */
function decodeBase64(value: string): Uint8Array | null {
  const trimmed = value.trim();
  if (trimmed === '' || !/^[A-Za-z0-9+/]+={0,2}$/.test(trimmed) || trimmed.length % 4 !== 0) return null;
  try {
    const binary = atob(trimmed);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

/**
 * Web Crypto: the global on Node 19+, Deno, Bun, browsers and edge runtimes; on Node 18 the same API
 * is `webcrypto` in the built-in crypto module.
 */
async function getSubtle(): Promise<SubtleCrypto | null> {
  if (globalThis.crypto?.subtle) return globalThis.crypto.subtle;
  try {
    const specifier = 'node:crypto';
    const mod: any = await import(specifier);
    return mod?.webcrypto?.subtle ?? null;
  } catch {
    return null;
  }
}

/** Constant-time byte comparison: the cost depends on the length of `a`, never on where a mismatch is. */
function equalBytes(a: Uint8Array, b: Uint8Array): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ (b[i] ?? 0);
  return diff === 0;
}

/**
 * Verify a signed API response.
 *
 * @param body The decoded response body exactly as received: the string from `response.text()` or
 *   the bytes from `response.arrayBuffer()`. Do not parse and re-serialise it first.
 * @param headers The response headers (`Headers`, or a record; names are matched case-insensitively).
 * @param secret The signing secret, or several during a rotation. The response is valid when it
 *   verifies under any of them.
 * @param opts `toleranceSeconds` bounds how far `X-Signature-Timestamp` may be from the current
 *   time, in either direction (default 300).
 * @returns `true` when the signature matches and the timestamp is within tolerance. `false` for a
 *   missing or malformed header, a stale or future timestamp, a changed body or a wrong secret.
 */
export async function verifyResponseSignature(
  body: string | Uint8Array,
  headers: Headers | Record<string, string>,
  secret: string | string[],
  opts?: VerifyResponseSignatureOptions
): Promise<boolean> {
  try {
    const subtle = await getSubtle();
    if (!subtle) return false;

    const timestamp = readHeader(headers, 'X-Signature-Timestamp')?.trim() ?? '';
    const signatureHeader = readHeader(headers, 'X-Signature');
    if (!timestamp || !signatureHeader || !/^\d{1,13}$/.test(timestamp)) return false;

    const tolerance = opts?.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
    if (!Number.isFinite(tolerance) || tolerance < 0) return false;
    const skew = Math.abs(Date.now() / 1000 - Number(timestamp));
    if (skew > tolerance) return false;

    const received = decodeBase64(signatureHeader);
    if (!received) return false;

    const secrets = (Array.isArray(secret) ? secret : [secret]).filter(
      (s): s is string => typeof s === 'string' && s !== ''
    );
    if (secrets.length === 0) return false;

    const encoder = new TextEncoder();
    const prefix = encoder.encode(`${timestamp}.`);
    const bodyBytes = typeof body === 'string' ? encoder.encode(body) : body;
    const payload = new Uint8Array(prefix.length + bodyBytes.length);
    payload.set(prefix, 0);
    payload.set(bodyBytes, prefix.length);

    // Every secret is tried (no early exit), so the time taken does not reveal which one matched.
    let valid = false;
    for (const candidate of secrets) {
      const key = await subtle.importKey(
        'raw',
        encoder.encode(candidate),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const expected = new Uint8Array(await subtle.sign('HMAC', key, payload));
      if (equalBytes(received, expected)) valid = true;
    }
    return valid;
  } catch {
    return false;
  }
}
