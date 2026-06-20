/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Lookbook = {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    featured_image?: string;
    /**
     * Publication status. Only `published` lookbooks are returned by the public API.
     */
    status?: Lookbook.status;
    /**
     * The product collection this lookbook is backed by, or null if it is standalone.
     */
    collection_id?: string | null;
    published_at?: string;
    created_at?: string;
    /**
     * Ordered gallery images. Each image may carry shoppable `hotspots`.
     */
    images?: Array<{
        url?: string;
        /**
         * Shoppable product hotspots positioned on the image.
         */
        hotspots?: Array<Record<string, any>>;
    }>;
};
export namespace Lookbook {
    /**
     * Publication status. Only `published` lookbooks are returned by the public API.
     */
    export enum status {
        PUBLISHED = 'published',
        DRAFT = 'draft',
    }
}

