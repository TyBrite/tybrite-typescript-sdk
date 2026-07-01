/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A windowed storefront discovery list — product ids ranked by the requested signal.
 */
export type DiscoveryResponse = {
    /**
     * The discovery metric returned (`most-viewed`, `most-added-to-cart`, or `best-converting`).
     */
    metric?: string;
    /**
     * The time window the ranking covers, in hours.
     */
    window_hours?: number;
    products?: Array<{
        product_id?: string;
        /**
         * The raw signal value for this product in the window — NOT normalized to a fixed
         * scale, and with no threshold. Its meaning depends on `metric`:
         * - `most-viewed` → the view **count** (e.g. `15` = viewed 15 times in the window).
         * - `most-added-to-cart` → the add-to-cart **count** (e.g. `6`).
         * - `best-converting` → the view→purchase **ratio** (units purchased ÷ distinct views;
         * e.g. `1.7333` means more units sold than views recorded, `0.375` = ~3 buys per 8 views).
         * Counts scale with your store's traffic; the ratio is a small decimal that can exceed 1.
         * Use `score` only to sort/rank (results are already returned highest-first).
         *
         */
        score?: number;
    }>;
};

