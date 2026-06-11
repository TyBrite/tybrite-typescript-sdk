/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Connection details for receiving a thread's new messages in realtime. The `mode` field selects
 * the shape: a customer signed in through Galactic Core gets `direct` (with a short-lived
 * `token` to subscribe directly), while bring-your-own-auth customers, server integrations, and
 * marketplace operators get `broadcast` (subscribe to the named `channel`).
 *
 */
export type MessagingRealtimeToken = {
    /**
     * How to subscribe. `direct` — for a customer signed in through Galactic Core; subscribe with
     * the returned `token`. `broadcast` — for bring-your-own-auth customers, server integrations,
     * and operators; subscribe to the `channel`.
     *
     */
    mode: MessagingRealtimeToken.mode;
    /**
     * Base URL of the realtime service to connect to.
     */
    realtime_url: string;
    /**
     * Public connection key for the realtime service. Safe for the browser.
     */
    realtime_key?: string;
    /**
     * Short-lived subscription token. Present only when `mode` is `direct`.
     */
    token?: string | null;
    /**
     * Name of the channel to subscribe to.
     */
    channel: string;
    /**
     * The conversation these connection details are for.
     */
    thread_id?: string | null;
    /**
     * Whether the connection covers live or test conversations.
     */
    environment: MessagingRealtimeToken.environment;
};
export namespace MessagingRealtimeToken {
    /**
     * How to subscribe. `direct` — for a customer signed in through Galactic Core; subscribe with
     * the returned `token`. `broadcast` — for bring-your-own-auth customers, server integrations,
     * and operators; subscribe to the `channel`.
     *
     */
    export enum mode {
        DIRECT = 'direct',
        BROADCAST = 'broadcast',
    }
    /**
     * Whether the connection covers live or test conversations.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

