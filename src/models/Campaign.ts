/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A discount with a budget behind it. It stops discounting once the budget is spent, which is
 * what separates a campaign from a promotion — a promotion runs until its end date. The budget
 * and everything measured against it are the merchant's own figures and are not exposed.
 *
 */
export type Campaign = {
    id?: string;
    name?: string;
    /**
     * The kind of campaign, as the merchant categorised it.
     */
    type?: string;
    /**
     * Whether `discount_value` is a percentage of the cart or a fixed amount off it.
     */
    discount_type?: Campaign.discount_type;
    /**
     * The percentage, or the fixed amount, depending on `discount_type`.
     */
    discount_value?: number;
    start_date?: string;
    end_date?: string;
    /**
     * Lifecycle status. Only a running campaign is returned, so this is always `active`.
     */
    status?: string;
    /**
     * Where the campaign is valid — a storefront, a till, or both.
     */
    applies_to?: Campaign.applies_to;
    /**
     * Whether the campaign only applies at certain hours or on certain days.
     */
    has_time_restrictions?: boolean;
    /**
     * Start of the daily window, in `time_zone`. Null when there is no time restriction.
     */
    start_time?: string | null;
    /**
     * End of the daily window, in `time_zone`. Null when there is no time restriction.
     */
    end_time?: string | null;
    /**
     * The zone the daily window is evaluated in.
     */
    time_zone?: string | null;
    /**
     * Days of the week the campaign applies on. Null when it applies every day.
     */
    apply_to_days?: any[] | null;
    /**
     * Banner artwork for the campaign. Null when the merchant has not set one.
     */
    image?: string | null;
    /**
     * Phone-sized banner. Null when only the desktop banner is set — fall back to `image` there,
     * rather than cropping it.
     *
     */
    image_mobile?: string | null;
};
export namespace Campaign {
    /**
     * Whether `discount_value` is a percentage of the cart or a fixed amount off it.
     */
    export enum discount_type {
        PERCENTAGE = 'percentage',
        FIXED_AMOUNT = 'fixed_amount',
    }
    /**
     * Where the campaign is valid — a storefront, a till, or both.
     */
    export enum applies_to {
        ALL = 'all',
        ONLINE = 'online',
        POS = 'pos',
    }
}

