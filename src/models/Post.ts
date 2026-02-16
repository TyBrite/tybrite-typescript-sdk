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
    products?: Array<Record<string, any>>;
    lookbooks?: Array<Record<string, any>>;
};
export namespace Post {
    export enum status {
        PUBLISHED = 'published',
        DRAFT = 'draft',
        ARCHIVED = 'archived',
    }
}

