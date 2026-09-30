/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StoreContact } from './StoreContact';
import type { StoreSocialProfile } from './StoreSocialProfile';
/**
 * A compact form of the store profile, returned as the `profile` section of `GET /v1/store/info`. `GET /v1/store/profile` returns the full profile.
 */
export type StoreProfileSummary = {
    contact?: (StoreContact | null);
    social?: Array<StoreSocialProfile>;
    policies?: Array<{
        slug?: string;
        title?: string;
        version?: number;
        effective_date?: string;
        external_url?: string | null;
    }>;
    /**
     * Whether each built-in document is currently published, so a storefront can decide which footer links to render without fetching the list.
     */
    has?: {
        privacy?: boolean;
        terms?: boolean;
        returns?: boolean;
        shipping?: boolean;
        cookies?: boolean;
        imprint?: boolean;
        accessibility?: boolean;
    };
    /**
     * The legal name and governing country, or null when neither is set.
     */
    business?: ({
        legal_name?: string | null;
        country?: string | null;
    } | null);
};

