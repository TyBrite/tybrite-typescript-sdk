/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResolvedPromotionProduct } from './ResolvedPromotionProduct';
export type Promotion = {
    id?: string;
    name?: string;
    /**
     * Promotion mechanic.
     */
    type?: Promotion.type;
    /**
     * Human-readable label derived from `type` (e.g. "Percentage Discount").
     */
    display_type?: string;
    /**
     * The discount amount or percentage for this promotion, depending on `type`.
     */
    value?: string;
    /**
     * Minimum order total required for the promotion to apply.
     */
    min_purchase?: number | null;
    start_date?: string;
    end_date?: string;
    /**
     * Lifecycle status. Only `active` promotions (within their date window) apply.
     */
    status?: string;
    /**
     * Optional human-readable conditions for the promotion.
     */
    conditions?: string | null;
    /**
     * URL of the promotion banner image. This is the default banner — used on desktop and as the fallback whenever `image_mobile` is not set.
     */
    image?: string | null;
    /**
     * Optional banner image sized for mobile viewports. When set, render this on small screens and fall back to `image` on larger ones (e.g. a `<picture>` element with a mobile `<source>`). When absent, use `image` everywhere.
     */
    image_mobile?: string | null;
    /**
     * Products that make up a bundle promotion (present for `bundle` type).
     */
    bundle_products?: Array<Record<string, any>>;
    /**
     * Products that must be purchased to unlock a BOGO promotion (present for `bogo` type).
     */
    bogo_required_products?: Array<Record<string, any>>;
    /**
     * Products given free under a BOGO promotion (present for `bogo` type).
     */
    bogo_free_products?: Array<Record<string, any>>;
    /**
     * Present only when the promotion is fetched with `expand=products`. The same
     * entries as `bundle_products`, each enriched with an embedded `product` object
     * so you can render the bundle without a second lookup.
     *
     */
    bundle_products_resolved?: Array<ResolvedPromotionProduct>;
    /**
     * Present only when the promotion is fetched with `expand=products`. The same
     * entries as `bogo_required_products`, each enriched with an embedded `product`
     * object.
     *
     */
    bogo_required_products_resolved?: Array<ResolvedPromotionProduct>;
    /**
     * Present only when the promotion is fetched with `expand=products`. The same
     * entries as `bogo_free_products`, each enriched with an embedded `product`
     * object.
     *
     */
    bogo_free_products_resolved?: Array<ResolvedPromotionProduct>;
    /**
     * Whether the promotion only applies during specific times/days.
     */
    has_time_restrictions?: boolean;
    /**
     * Daily start time (when `has_time_restrictions` is true).
     */
    start_time?: string | null;
    /**
     * Daily end time (when `has_time_restrictions` is true).
     */
    end_time?: string | null;
    /**
     * Time zone the time restrictions are evaluated in.
     */
    time_zone?: string | null;
    /**
     * Days of the week the promotion applies to (when `has_time_restrictions` is true).
     */
    apply_to_days?: any[] | null;
    created_at?: string;
    updated_at?: string;
};
export namespace Promotion {
    /**
     * Promotion mechanic.
     */
    export enum type {
        FIXED = 'fixed',
        DISCOUNT = 'discount',
        BUNDLE = 'bundle',
        BOGO = 'bogo',
    }
}

