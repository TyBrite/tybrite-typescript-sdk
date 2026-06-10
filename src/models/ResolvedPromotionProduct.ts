/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A promotion product entry with its details embedded. Returned inside the
 * `*_resolved` arrays when a promotion is fetched with `expand=products`.
 *
 */
export type ResolvedPromotionProduct = {
    /**
     * The product this entry refers to.
     */
    productId?: string;
    /**
     * Quantity of this product the promotion entry covers.
     */
    quantity?: number;
    /**
     * The resolved product details, or `null` if the product is unavailable
     * (for example, it has been removed from the catalog).
     *
     */
    product?: any | null;
};

