/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: Customer.status;
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
    last_purchase?: string;
    created_at?: string;
    updated_at?: string;
    store_metrics?: {
        total_purchases?: number;
        total_spent?: number;
        first_purchase_date?: string;
        last_purchase_date?: string;
        status?: string;
        preferred_store?: string;
    };
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
     * Whether this customer record belongs to the live or test environment.
     */
    export enum environment {
        PRODUCTION = 'production',
        SANDBOX = 'sandbox',
    }
}

