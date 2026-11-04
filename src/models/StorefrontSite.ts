/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontSite = {
    base_url: string | null;
    platform_url?: string | null;
    custom_domain?: string | null;
    routes: Record<string, string>;
    reported_at: string;
    /**
     * Where the merchant's review of `base_url` stands. `pending`: the merchant is being asked.
     * `accepted`: the merchant adopted it. `declined`: the merchant kept their own address.
     * `matches_website`: it is the address the store already uses, so nothing is asked.
     * `unpublished`: the storefront was reported as taken down.
     *
     */
    merchant_review: StorefrontSite.merchant_review;
};
export namespace StorefrontSite {
    /**
     * Where the merchant's review of `base_url` stands. `pending`: the merchant is being asked.
     * `accepted`: the merchant adopted it. `declined`: the merchant kept their own address.
     * `matches_website`: it is the address the store already uses, so nothing is asked.
     * `unpublished`: the storefront was reported as taken down.
     *
     */
    export enum merchant_review {
        PENDING = 'pending',
        ACCEPTED = 'accepted',
        DECLINED = 'declined',
        MATCHES_WEBSITE = 'matches_website',
        UNPUBLISHED = 'unpublished',
    }
}

