/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShopperSubscriptionItem } from './ShopperSubscriptionItem';
/**
 * A shopper's Subscribe & Save subscription: a recurring delivery they agreed to, with the terms
 * accepted at sign-up. Each delivery after the first is an ordinary order for the store.
 *
 * `status` is `active`, `paused`, `past_due` (a delivery could not be paid and is being retried),
 * `cancelled` or `ended`. `renewal_mode` is `off_session` when a saved card is charged for each delivery,
 * or `confirm` when the shopper pays each delivery from a link sent to them.
 *
 */
export type ShopperSubscription = {
    id: string;
    status: ShopperSubscription.status;
    offer_id: string;
    /**
     * The offer's name as the shopper saw it.
     */
    offer_label?: string;
    interval_unit: ShopperSubscription.interval_unit;
    interval_count: number;
    /**
     * The date of the next delivery, in the store's time zone; `null` while paused or after cancellation.
     */
    next_delivery_on?: string | null;
    /**
     * How each delivery reaches the shopper. `none` is a subscription of items that are not shipped
     * (downloads, codes, event tickets, services): it has no address or pickup location and cannot be given one.
     *
     */
    fulfillment_method?: ShopperSubscription.fulfillment_method;
    /**
     * The saved address deliveries go to, when `fulfillment_method` is `delivery`.
     */
    shipping_address_id?: string | null;
    /**
     * The pickup location, when `fulfillment_method` is `pickup`.
     */
    pickup_location_id?: string | null;
    renewal_mode: ShopperSubscription.renewal_mode;
    /**
     * The saved card charged for each delivery; `null` in `confirm` mode.
     */
    payment_method?: (null | {
        id?: string;
        brand?: string | null;
        last4?: string | null;
        exp_month?: number | null;
        exp_year?: number | null;
    });
    /**
     * The terms the shopper accepted: the discount, free shipping, the minimum number of deliveries,
     * the yearly skip limit and the stacking rule. A later change to the offer does not alter them.
     *
     */
    terms?: Record<string, any>;
    /**
     * How many deliveries have been paid, the first order included.
     */
    deliveries_completed?: number;
    paused_until?: string | null;
    /**
     * When a requested cancellation takes effect; later than today while the minimum number of deliveries is still owed.
     */
    cancel_effective_on?: string | null;
    created_at?: string;
    items: Array<ShopperSubscriptionItem>;
    /**
     * Set when the next delivery needs the shopper, for example to confirm a payment.
     */
    pending_action?: (null | {
        cycle_no?: number;
        /**
         * Why the shopper's action is needed.
         */
        reason?: string | null;
        /**
         * Where the shopper completes the payment.
         */
        confirm_url?: string | null;
    });
};
export namespace ShopperSubscription {
    export enum status {
        ACTIVE = 'active',
        PAUSED = 'paused',
        PAST_DUE = 'past_due',
        CANCELLED = 'cancelled',
        ENDED = 'ended',
    }
    export enum interval_unit {
        WEEK = 'week',
        MONTH = 'month',
    }
    /**
     * How each delivery reaches the shopper. `none` is a subscription of items that are not shipped
     * (downloads, codes, event tickets, services): it has no address or pickup location and cannot be given one.
     *
     */
    export enum fulfillment_method {
        DELIVERY = 'delivery',
        PICKUP = 'pickup',
        NONE = 'none',
    }
    export enum renewal_mode {
        OFF_SESSION = 'off_session',
        CONFIRM = 'confirm',
    }
}

