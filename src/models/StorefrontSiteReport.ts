/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontSiteReport = {
    /**
     * The storefront's public address: https, a domain name (not an IP address), no user name or password.
     * `null` reports the storefront as taken down.
     *
     */
    base_url: string | null;
    /**
     * The address the storefront also answers on before a custom domain is connected, if any.
     */
    platform_url?: string | null;
    /**
     * The host name of a custom domain connected to the storefront, if any.
     */
    custom_domain?: string | null;
    /**
     * Page templates by purpose. Allowed keys: `product`, `collection`, `category`, `policy`, `account`.
     * Each value is a relative path beginning with `/`, at most 512 characters, and may contain `{slug}`.
     * Routes require a `base_url`.
     *
     */
    routes?: any | null;
};

