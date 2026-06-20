/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductCollection = {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    /**
     * The kind of collection. `featured_collections` is a manually curated set;
     * `new_arrivals` and `best_selling` are automatically maintained.
     *
     */
    collection_type?: ProductCollection.collection_type;
    is_active?: boolean;
    show_on_homepage?: boolean;
    display_priority?: number;
    created_at?: string;
    updated_at?: string;
};
export namespace ProductCollection {
    /**
     * The kind of collection. `featured_collections` is a manually curated set;
     * `new_arrivals` and `best_selling` are automatically maintained.
     *
     */
    export enum collection_type {
        FEATURED_COLLECTIONS = 'featured_collections',
        NEW_ARRIVALS = 'new_arrivals',
        BEST_SELLING = 'best_selling',
        MANUAL = 'manual',
        AUTOMATED = 'automated',
        SMART = 'smart',
    }
}

