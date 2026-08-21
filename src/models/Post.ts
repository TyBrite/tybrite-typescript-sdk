/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Post = {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featured_image?: string;
    category_id?: string;
    category_name?: string;
    category_slug?: string;
    category_icon?: string;
    author_name?: string;
    author_avatar?: string;
    status?: Post.status;
    published_at?: string;
    view_count?: number;
    product_count?: number;
    seo_title?: string;
    seo_description?: string;
    created_at?: string;
    updated_at?: string;
    /**
     * Products embedded in the post body, in the order the author placed them. `block_id` ties an embed to the content block it belongs beside, and `display_type` is how the author chose to show it. Each entry arrives with the product already resolved, and an embed whose product is no longer available is omitted, so a post can return fewer products than were authored.
     */
    products?: Array<{
        /**
         * Identifies this placement, not the product.
         */
        embed_id: string;
        /**
         * The content block this embed sits with, when the author anchored it to one.
         */
        block_id?: string | null;
        /**
         * How the author chose to present it, for example a card or an inline mention.
         */
        display_type?: string | null;
        position?: number | null;
        product_id: string;
        /**
         * The product's default variant — pass this to `POST /v1/cart/items`, which is keyed by variant rather than product, so an embedded product can be added to a basket without a second call. Its price, image and stock are the ones given here.
         */
        variant_id?: string | null;
        name: string;
        variant_name?: string | null;
        sku?: string | null;
        price: number;
        sale_price?: number | null;
        images?: Array<string>;
        stock?: number | null;
        category?: string | null;
        subcategory?: string | null;
    }>;
    /**
     * Lookbooks embedded in the post, each with the lookbook it points to already resolved.
     */
    lookbooks?: Array<{
        embed_id: string;
        position?: number | null;
        display_style?: string | null;
        /**
         * The embedded lookbook, or null if it is no longer published.
         */
        lookbook?: any | null;
    }>;
};
export namespace Post {
    export enum status {
        PUBLISHED = 'published',
        DRAFT = 'draft',
        ARCHIVED = 'archived',
    }
}

