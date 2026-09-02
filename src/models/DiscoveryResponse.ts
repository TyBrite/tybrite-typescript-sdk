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
    /**
     * Whether any entry in `products` is padding rather than a measured signal.
     *
     * A store with little or no activity in the window would otherwise return an empty or
     * one-item shelf, so the list is topped up from featured and recently-added products. Those
     * entries are real, purchasable products and are safe to display — but they were not ranked
     * by the requested metric, and their `score` is a ranking weight rather than a view count or
     * conversion ratio.
     *
     * `true` is common on a new store or a short window; it is not an error. Label the shelf
     * generically ("Popular picks") or hide it, rather than presenting padding as the metric.
     *
     */
    backfilled?: boolean;
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
         * When `backfilled` is `true` the score is NOT the signal described above — it is a
         * small ranking weight for a padded entry. Read `backfilled` before presenting a score
         * as a measurement.
         *
         */
        score?: number;
    }>;
};

