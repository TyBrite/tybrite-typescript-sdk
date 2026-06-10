/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WebhookEvent = {
    /**
     * Unique event identifier (format `evt_<timestamp>_<random>`)
     */
    id?: string;
    store_id?: string;
    /**
     * Event type
     */
    type?: string;
    /**
     * The environment this event was emitted in. Events fired while
     * authenticating with a test key (`tybrite_sk_test_…` / `tybrite_pk_test_…`)
     * are `sandbox`; everything else is `production`.
     *
     */
    environment?: WebhookEvent.environment;
    /**
     * Full event envelope:
     * ```json
     * {
         * "id": "evt_...",
         * "type": "order.paid",
         * "created_at": "2026-05-20T10:30:00Z",
         * "store_id": "...",
         * "api_version": "v1",
         * "livemode": true,
         * "data": { "object": { ... } },
         * "previous_attributes": { ... }
         * }
         * ```
         *
         * Two independent flags on the envelope tell you how to treat the event —
         * they answer different questions, so check the one that matches your need:
         *
         * - **`livemode`** (always present) — *which environment produced this event.*
         * `true` for production; `false` for any event emitted while
         * authenticating with a test key (`tybrite_sk_test_…` / `tybrite_pk_test_…`).
         * This is the flag to **route on**: e.g. ignore everything where
         * `livemode` is `false` in your production handler.
         *
         * - **`test`** (present and `true` only on synthetic events) — *this payload
         * is fake.* It is set exclusively on events sent via
         * `POST /v1/webhook_endpoints/{id}/test`, whose `data.object` contains
         * placeholder values (e.g. `order_number: "TEST-001"`). Use it to **skip
         * side effects** (don't fulfil, charge, or write records). It is absent on
         * all real events.
         *
         * The two are orthogonal. A **real** order placed with a test key is
         * `livemode: false` with **no** `test` flag — a genuine sandbox event you can
         * process as an integration test. A synthetic test fired while on a live key
         * is `livemode: true` with `test: true`.
         *
         */
        payload?: Record<string, any>;
        created_at?: string;
    };
    export namespace WebhookEvent {
        /**
         * The environment this event was emitted in. Events fired while
         * authenticating with a test key (`tybrite_sk_test_…` / `tybrite_pk_test_…`)
         * are `sandbox`; everything else is `production`.
         *
         */
        export enum environment {
            PRODUCTION = 'production',
            SANDBOX = 'sandbox',
        }
    }

