/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A saved address in a shopper's personal address book. Shoppers can store
 * multiple billing and shipping addresses and reuse them at checkout.
 *
 */
export type CustomerAddress = {
    id?: string;
    customer_id?: string;
    /**
     * Whether this address is usable for shipping, billing, or both.
     */
    address_type?: CustomerAddress.address_type;
    /**
     * An optional friendly name for the address, e.g. "Home" or "Office".
     */
    label?: string | null;
    full_name?: string;
    phone?: string | null;
    line1?: string;
    line2?: string | null;
    city?: string;
    state?: string | null;
    postal_code?: string | null;
    country?: string;
    /**
     * When true, this is the default address pre-selected for shipping at checkout.
     */
    is_default_shipping?: boolean;
    /**
     * When true, this is the default address pre-selected for billing at checkout.
     */
    is_default_billing?: boolean;
    created_at?: string;
    updated_at?: string;
};
export namespace CustomerAddress {
    /**
     * Whether this address is usable for shipping, billing, or both.
     */
    export enum address_type {
        SHIPPING = 'shipping',
        BILLING = 'billing',
        BOTH = 'both',
    }
}

