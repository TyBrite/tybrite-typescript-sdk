/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Where the merchant sends this query instead of a result list. The search still returns its results; the storefront decides whether to navigate. `url` is set for type `url` (an `https://` address or a storefront path beginning with `/`); `target_id`, `name` and `slug` are set for a collection, category or product, read when the search ran, so a renamed target carries its current name.
 */
export type SearchRedirect = {
    type: SearchRedirect.type;
    url: string | null;
    target_id: string | null;
    name: string | null;
    slug: string | null;
};
export namespace SearchRedirect {
    export enum type {
        URL = 'url',
        COLLECTION = 'collection',
        CATEGORY = 'category',
        PRODUCT = 'product',
    }
}

