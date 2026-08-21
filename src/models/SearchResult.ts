/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SearchResult = {
    productId?: string;
    score?: number;
    /**
     * Why this product matched, in words a storefront can show. `Text match`, `Similar name` and `Similar brand` describe how the query was matched (the last two mean a spelling fallback was used). **`Featured by the store` means the merchant placed this result deliberately** rather than it earning its rank — worth labelling if you distinguish sponsored or featured placements.
     */
    matchReason?: string;
};

