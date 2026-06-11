/**
 * Subscribe to a messaging thread's live events. Pass the connection details returned by
 * getMessagingRealtimeToken (mode, realtimeUrl, realtimeKey, token, channel).
 *
 * Re-exported from src/index.ts. The export is re-added on every SDK regeneration by
 * scripts/post-generate.js (see the "Realtime helper export" block there), because the
 * code generator overwrites src/index.ts. Do not rely on the generator preserving it.
 */

import { createClient } from '@supabase/supabase-js';

export type SubscribeMode = 'direct' | 'broadcast';

export interface SubscribeToThreadOptions {
  /** Base URL of the realtime service (from getMessagingRealtimeToken). */
  realtimeUrl: string;
  /** Public connection key (from getMessagingRealtimeToken). */
  realtimeKey: string;
  /** Channel name to subscribe to (from getMessagingRealtimeToken). */
  channel: string;
  /** Connection mode (from getMessagingRealtimeToken). */
  mode: SubscribeMode;
  /**
   * Short-lived subscription token. Required for `direct`; ignored for `broadcast`.
   */
  token?: string | null;
  /** Called with each new message as it arrives. */
  onMessage: (message: any) => void;
}

/** Derive the thread id from a channel name of the form `thread:<id>`. */
function threadIdFromChannel(channel: string): string | null {
  const idx = channel.indexOf(':');
  return idx === -1 ? null : channel.slice(idx + 1);
}

/**
 * Subscribe to a conversation and receive new messages in realtime, without polling.
 *
 * Returns an unsubscribe function — call it to tear down the subscription.
 */
export async function subscribeToThread(
  options: SubscribeToThreadOptions
): Promise<() => void> {
  const { realtimeUrl, realtimeKey, channel, mode, token, onMessage } = options;

  if (mode === 'direct') {
    if (!token) {
      throw new Error('subscribeToThread: a token is required for direct mode.');
    }
    const threadId = threadIdFromChannel(channel);
    const client = createClient(realtimeUrl, realtimeKey, {
      global: { headers: { Authorization: 'Bearer ' + token } },
      realtime: { params: { eventsPerSecond: 10 } },
    });
    // Authorize the realtime socket with the customer's own session token.
    if (typeof client.realtime?.setAuth === 'function') {
      client.realtime.setAuth(token);
    }
    const sub = client
      .channel(channel)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ecommerce_messages',
          filter: 'thread_id=eq.' + threadId,
        },
        (payload: any) => onMessage(payload.new)
      )
      .subscribe();

    return () => {
      client.removeChannel(sub);
    };
  }

  // broadcast mode — bring-your-own-auth customers, server integrations, operators.
  const client = createClient(realtimeUrl, realtimeKey, {
    realtime: { params: { eventsPerSecond: 10 } },
  });
  const sub = client
    .channel(channel)
    .on('broadcast', { event: '*' }, (event: any) => onMessage(event.payload))
    .subscribe();

  return () => {
    client.removeChannel(sub);
  };
}
