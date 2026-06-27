/**
 * Realtime messaging helper — subscribe to a thread's new messages over a plain
 * WebSocket served on the API's own domain. No third-party realtime SDK and no
 * extra dependency: this uses the platform `WebSocket` (browsers, Deno, Bun, and
 * Node 22+ all provide it globally).
 *
 * Re-exported from src/index.ts. The export is re-added on every SDK regeneration
 * by scripts/post-generate.js (the code generator overwrites src/index.ts).
 */

/**
 * @deprecated The connection no longer has distinct modes — there is one
 * WebSocket transport for every caller. Kept only for backwards-compatible
 * type imports; ignore it.
 */
export type SubscribeMode = 'direct' | 'broadcast';

export interface SubscribeToThreadOptions {
  /**
   * Base API URL, e.g. `https://api.tybritelabs.com`. `http(s)://` is upgraded to
   * `ws(s)://` automatically. Defaults to `https://api.tybritelabs.com`.
   */
  baseUrl?: string;
  /** The conversation to subscribe to. */
  threadId: string;
  /** Your publishable key (`tybrite_pk_*`). */
  apiKey: string;
  /**
   * The signed-in customer's session token (from `client.auth.login`). Supply this
   * OR `externalAuth` — one customer credential is required to authorize the socket.
   */
  authToken?: string;
  /**
   * A signed external-identity assertion (bring-your-own-auth). Supply this OR
   * `authToken`.
   */
  externalAuth?: string;
  /** Called with each new message's payload as it arrives. */
  onMessage: (message: any) => void;
  /** Optional: called if the socket closes or errors. */
  onClose?: (event: { code: number; reason: string }) => void;
  /**
   * Heartbeat interval (ms) to keep an idle connection alive. The server replies
   * `pong` to a `ping` frame. Default 25000; set 0 to disable.
   */
  heartbeatMs?: number;
}

const DEFAULT_BASE_URL = 'https://api.tybritelabs.com';

/**
 * Subscribe to a conversation and receive new messages in realtime, without
 * polling. Opens a WebSocket to the thread's subscribe endpoint; the server
 * pushes one frame per new message:
 *
 *   { type: 'message.created', payload: { thread_id, message } }
 *
 * `onMessage` is called with `payload.message` for each new message. Returns an
 * unsubscribe function — call it to tear down the connection.
 */
export function subscribeToThread(options: SubscribeToThreadOptions): () => void {
  const {
    baseUrl = DEFAULT_BASE_URL,
    threadId,
    apiKey,
    authToken,
    externalAuth,
    onMessage,
    onClose,
    heartbeatMs = 25_000,
  } = options;

  if (!threadId) throw new Error('subscribeToThread: threadId is required.');
  if (!apiKey) throw new Error('subscribeToThread: apiKey is required.');
  if (!authToken && !externalAuth) {
    throw new Error('subscribeToThread: supply authToken (Galactic Core session) or externalAuth.');
  }
  if (typeof WebSocket === 'undefined') {
    throw new Error('subscribeToThread: no global WebSocket in this runtime (Node 22+ or a browser is required).');
  }

  const wsBase = baseUrl.replace(/^http/i, 'ws').replace(/\/+$/, '');
  const params = new URLSearchParams({ api_key: apiKey });
  if (authToken) params.set('auth_token', authToken);
  if (externalAuth) params.set('external_auth', externalAuth);
  const url = `${wsBase}/v1/messaging/threads/${threadId}/subscribe?${params.toString()}`;

  const ws = new WebSocket(url);
  let heartbeat: ReturnType<typeof setInterval> | undefined;
  let closed = false;

  ws.addEventListener('open', () => {
    if (heartbeatMs > 0) {
      heartbeat = setInterval(() => {
        try { ws.send('ping'); } catch { /* socket gone */ }
      }, heartbeatMs);
    }
  });

  ws.addEventListener('message', (ev: MessageEvent) => {
    const raw = typeof ev.data === 'string' ? ev.data : '';
    if (!raw || raw === 'pong') return;
    let frame: any;
    try { frame = JSON.parse(raw); } catch { return; }
    if (frame && frame.type === 'message.created') {
      onMessage(frame.payload?.message ?? frame.payload);
    }
  });

  const teardown = () => {
    if (heartbeat) clearInterval(heartbeat);
  };
  ws.addEventListener('close', (ev: CloseEvent) => {
    teardown();
    if (!closed) onClose?.({ code: ev.code, reason: ev.reason });
  });
  ws.addEventListener('error', () => {
    // The subsequent 'close' carries the code/reason; nothing else to do here.
  });

  return () => {
    closed = true;
    teardown();
    try { ws.close(1000); } catch { /* already closed */ }
  };
}
