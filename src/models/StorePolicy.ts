/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One published version of a legal document, with its text.
 */
export type StorePolicy = {
    slug: string;
    title: string;
    /**
     * The version returned — the latest unless `?version=` asked for an earlier one.
     */
    version: number;
    /**
     * The current published version. Differs from `version` when an earlier one was requested.
     */
    latest_version: number;
    effective_date: string;
    published_at: string;
    /**
     * The document text in Markdown. Empty when the merchant publishes only an `external_url`.
     */
    body: string;
    /**
     * The format of `body`.
     */
    format: StorePolicy.format;
    /**
     * Set when the merchant hosts this document elsewhere.
     */
    external_url?: string | null;
};
export namespace StorePolicy {
    /**
     * The format of `body`.
     */
    export enum format {
        MARKDOWN = 'markdown',
    }
}

