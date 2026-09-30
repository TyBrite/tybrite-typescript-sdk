/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoreAddress } from './StoreAddress';
import type { StoreBusinessIdentity } from './StoreBusinessIdentity';
import type { StoreContact } from './StoreContact';
import type { StorePolicySummary } from './StorePolicySummary';
import type { StoreSocialProfile } from './StoreSocialProfile';
/**
 * The store's public business profile: how shoppers reach it, where it trades from, its legal identity, its social profiles, the legal documents it has published, and the custom entries the merchant has made public. Everything here is intended for display on a storefront.
 */
export type StoreProfile = {
    /**
     * Null when the store has no contact details at all.
     */
    contact: (StoreContact | null);
    addresses: {
        /**
         * The store's registered or trading address.
         */
        business?: (StoreAddress | null);
        /**
         * Where returned items are sent, when it differs from the business address.
         */
        returns?: (StoreAddress | null);
    };
    /**
     * The legal identity behind the store, for a legal notice, an invoice footer or a policy page. Null when the merchant has entered none.
     */
    business: (StoreBusinessIdentity | null);
    social: Array<StoreSocialProfile>;
    /**
     * The published legal documents, without their text. Fetch one with `GET /v1/store/policies/{slug}`.
     */
    policies: Array<StorePolicySummary>;
    /**
     * Store-level custom entries the merchant has defined and marked public, with their values. Entries without a value are omitted.
     */
    custom_fields: Array<{
        /**
         * The key the value is stored under.
         */
        name?: string;
        label?: string;
        /**
         * The field type, e.g. `text`, `number`, `date`, `select`.
         */
        type?: string;
        /**
         * The value, typed per the field.
         */
        value?: any;
    }>;
    /**
     * When the merchant last saved the profile. Null when it has never been saved.
     */
    updated_at: string | null;
};

