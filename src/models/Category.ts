/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Category = {
    id?: string;
    name?: string;
    /**
     * URL-safe identifier for the category, stable across renames — use it to build a durable category page URL rather than deriving one from the name. Categories are a fixed platform-wide set, so the same slug identifies the same category in every store.
     */
    slug?: string;
    description?: string;
    /**
     * URL of the category image
     */
    image?: string | null;
    /**
     * Whether the category is active
     */
    active?: boolean;
    created_at?: string;
    updated_at?: string;
};

