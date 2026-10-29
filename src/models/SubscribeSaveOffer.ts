/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscribeSaveInterval } from './SubscribeSaveInterval';
/**
 * A Subscribe & Save offer that is live for a product: the shopper subscribes to a recurring
 * delivery of the product at a discount. Only the fields a storefront shows are returned.
 *
 * `discount_value` depends on `discount_type`. For `percentage` it is in hundredths of a percent
 * (`1500` is 15%). For `fixed_per_item` it is in the smallest unit of the store's currency taken
 * off each item (`200` is 2.00 in a two-decimal currency). For `none` it is `0` and the offer's
 * benefit is its free shipping.
 *
 */
export type SubscribeSaveOffer = {
    id: string;
    /**
     * The text to show on the subscribe option.
     */
    label: string;
    /**
     * The delivery intervals the shopper can choose from.
     */
    intervals: Array<SubscribeSaveInterval>;
    discount_type: SubscribeSaveOffer.discount_type;
    /**
     * The discount on every delivery after the first, in the units described above.
     */
    discount_value: number;
    /**
     * The discount on the first delivery, when it differs from `discount_value`; otherwise `null`.
     */
    first_order_discount_value?: number | null;
    /**
     * The number of deliveries the shopper commits to before cancelling takes effect. `0` means none.
     */
    min_cycles: number;
    /**
     * How many deliveries the shopper may skip in a year; `null` means no limit.
     */
    max_skips_per_year?: number | null;
    /**
     * Whether the subscription's orders ship free.
     */
    free_shipping: boolean;
    /**
     * Whether promotions and campaigns also apply to a subscription's orders. When `false` they are ignored on those orders.
     */
    stacks_with_promotions: boolean;
    /**
     * Banner image, for the subscribe option.
     */
    image?: string | null;
    /**
     * Phone-sized banner. A storefront falls back to `image` when it is absent.
     */
    image_mobile?: string | null;
    /**
     * Optional banner video. `image` stays the poster and the fallback.
     */
    video?: string | null;
    /**
     * When the offer stops accepting new subscribers; `null` when it has no end.
     */
    ends_at?: string | null;
};
export namespace SubscribeSaveOffer {
    export enum discount_type {
        PERCENTAGE = 'percentage',
        FIXED_PER_ITEM = 'fixed_per_item',
        NONE = 'none',
    }
}

