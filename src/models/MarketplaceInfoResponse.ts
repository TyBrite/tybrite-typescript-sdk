/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Identity and branding for a marketplace as a whole, returned by GET /v1/marketplace/info when called with a marketplace operator key and no store_id. Use it to render the marketplace's own branding (name, logo, colors, contact details).
 */
export type MarketplaceInfoResponse = {
    /**
     * Always true — confirms this is a marketplace.
     */
    marketplace: boolean;
    /**
     * Always "marketplace".
     */
    mode: MarketplaceInfoResponse.mode;
    /**
     * Marketplace display name, or null if not set.
     */
    name?: string | null;
    /**
     * URL of the marketplace logo, or null if not set.
     */
    logo_url?: string | null;
    /**
     * Marketplace primary brand color, or null if not set.
     */
    primary_color?: string | null;
    /**
     * Short marketplace tagline, or null if not set.
     */
    tagline?: string | null;
    /**
     * Marketplace support email, or null if not set.
     */
    support_email?: string | null;
    /**
     * Description of the marketplace, or null if not set.
     */
    description?: string | null;
    /**
     * Marketplace website URL, or null if not set.
     */
    website?: string | null;
    /**
     * Marketplace contact phone number, or null if not set.
     */
    phone?: string | null;
    /**
     * Marketplace business address, or null if not set.
     */
    address?: string | null;
    /**
     * Whether shoppers can check out a basket spanning multiple merchants in one payment.
     */
    unified_checkout?: boolean;
    /**
     * Whether commission is applied to marketplace sales.
     */
    commission_enabled?: boolean;
};
export namespace MarketplaceInfoResponse {
    /**
     * Always "marketplace".
     */
    export enum mode {
        MARKETPLACE = 'marketplace',
    }
}

