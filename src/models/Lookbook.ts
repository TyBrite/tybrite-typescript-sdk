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
         * Shoppable points positioned on the image. `x` and `y` place the marker as percentages of the image's width and height from the top-left, so they survive any display size. Each hotspot arrives with its product already resolved — there is no second call to make, and no product id to look up. A hotspot whose product is unavailable (deleted, or no longer sold online) is **omitted from the response entirely**, so an image can return fewer hotspots than were authored, and this array can be empty.
         */
        hotspots?: Array<{
            /**
             * Horizontal position, as a percentage of image width from the left edge.
             */
            'x': number;
            /**
             * Vertical position, as a percentage of image height from the top edge.
             */
            'y': number;
            /**
             * Optional short caption shown with the marker.
             */
            label?: string | null;
            /**
             * The product this point links to, resolved at read time.
             */
            product: {
                product_id: string;
                /**
                 * The product's default variant — pass this to `POST /v1/cart/items`, which is keyed by variant rather than product. Its price, image and stock are the ones given here, so a hotspot can be added to a basket without a second call. Send a shopper choosing a different size or colour to the product page instead.
                 */
                variant_id: string;
                name: string;
                /**
                 * Name of the default variant, when it has one.
                 */
                variant_name?: string | null;
                sku?: string | null;
                /**
                 * Current selling price.
                 */
                price: number;
                sale_price?: number | null;
                image?: string | null;
                stock?: number | null;
            };
        }>;
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

