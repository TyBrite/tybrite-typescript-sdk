/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A sandbox-only stock level for one variant. A test key reads it in place of the variant's live
 * stock, and sandbox orders take from it. A live key never sees it.
 *
 */
export type SandboxStockLevel = {
    variant_id?: string;
    product_id?: string | null;
    /**
     * The product name.
     */
    name?: string | null;
    variant_name?: string | null;
    sku?: string | null;
    /**
     * The sandbox level a test key reads.
     */
    stock?: number;
    /**
     * The variant's live stock, which the level stands in for and never changes.
     */
    live_stock?: number | null;
    updated_at?: string;
};

