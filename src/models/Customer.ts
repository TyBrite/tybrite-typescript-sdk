/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    /**
     * The customer's address, or null if not on file.
     */
    address?: string | null;
    status?: Customer.status;
    /**
     * The customer's loyalty/spend tier, derived from their purchase history. New
     * customers start at `bronze`.
     *
     */
    tier?: Customer.tier;
    join_date?: string;
    /**
     * Optional identifier from an external identity provider (Auth0, Clerk, Cognito,
     * Firebase, NextAuth, etc). Unique per store + environment. Set this when you
     * manage authentication outside Galactic Core and need a stable handle to map
     * your upstream user back to the Galactic Core customer record.
     *
     */
    external_id?: string | null;
    /**
     * Whether the customer has opted in to marketing communications. Defaults to false
     * (opt-in). Set this from your storefront's marketing opt-in checkbox at sign-up,
     * checkout, or in the customer's account preferences. When true, the customer is
     * eligible to be subscribed to the store's connected marketing tools.
     *
     */
    marketing_consent?: boolean;
    total_purchases?: number;
    /**
     * Timestamp of the customer's most recent purchase, or null if they have not purchased yet.
     */
    last_purchase?: string | null;
    /**
     * The customer's total redeemable store-credit balance. Store credit is
     * issued when a customer accepts a store-credit offer on a return, and can
     * be applied at checkout (see `apply_store_credit` on `POST /v1/orders`).
     *
     */
    store_credit_balance?: number;
    created_at?: string;
    updated_at?: string;
    /**
     * Aggregated purchase metrics for the customer, or null until they have purchase history.
     */
    store_metrics?: any | null;
    /**
     * Whether this customer record belongs to the live or test environment.
     */
    environment?: Customer.environment;
};
export namespace Customer {
    export enum status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
    }
    /**
     * The customer's loyalty/spend tier, derived from their purchase history. New
     * customers start at `bronze`.
     *
     */
    export enum tier {
        BRONZE = 'bronze',
        SILVER = 'silver',
        GOLD = 'gold',
        PLATINUM = 'platinum',
    }
    /**
     * Whether this customer record belongs to the live or test environment.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

