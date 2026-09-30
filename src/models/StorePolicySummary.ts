/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A published legal document, without its text. Only documents the merchant has published appear; a draft or an unpublished document is never listed.
 */
export type StorePolicySummary = {
    /**
     * The document's address. The built-in documents are `privacy`, `terms`, `returns`, `shipping`, `cookies`, `imprint` and `accessibility`; a merchant may add documents of their own under any other slug.
     */
    slug: string;
    title: string;
    /**
     * The current published version. Each publish creates a new version.
     */
    version: number;
    /**
     * The date from which this version applies, as set by the merchant.
     */
    effective_date: string;
    published_at: string;
    /**
     * Set when the merchant hosts this document elsewhere. A storefront links to it instead of rendering the text.
     */
    external_url?: string | null;
};

