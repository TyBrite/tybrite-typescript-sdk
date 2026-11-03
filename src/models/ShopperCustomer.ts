/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The shopper's customer record as the sign-in endpoints and `GET /v1/auth/me` return it. The full record, with address, status, consent and custom fields, comes from `GET /v1/customers/me`.
 */
export type ShopperCustomer = {
    id: string;
    name: string;
    email: string;
    /**
     * The phone number on file; an empty string when none was given.
     */
    phone: string;
    /**
     * The pricing tier the merchant assigned to this customer. New customers start at `bronze`.
     */
    tier: string | null;
    /**
     * The customer's lifetime purchases, in the store's currency (decimal major units).
     */
    total_purchases: number | null;
    created_at: string | null;
};

