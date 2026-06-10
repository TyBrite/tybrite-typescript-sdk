/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The result of calculating a single promotion against a cart. The discount is
 * computed server-side so it always matches the merchant's own calculation — you
 * never reimplement the math.
 *
 */
export type PromotionCalculation = {
    /**
     * The promotion that was evaluated.
     */
    promotion_id?: string;
    /**
     * How the promotion works. `discount` (percentage) and `fixed` are cart-wide
     * discounts; `bundle` and `bogo` are computed from the products in the cart.
     *
     */
    type?: PromotionCalculation.type;
    /**
     * Whether the cart qualifies for the promotion.
     */
    eligible?: boolean;
    /**
     * The discount amount to subtract from the cart total. `0` when the cart is
     * not eligible.
     *
     */
    discount?: number;
    /**
     * When `eligible` is `false`, a short explanation of why the cart does not
     * qualify (for example: minimum purchase not met, the promotion is outside its
     * active date/time window, or required products are absent). `null` when
     * eligible.
     *
     */
    reason?: string | null;
};
export namespace PromotionCalculation {
    /**
     * How the promotion works. `discount` (percentage) and `fixed` are cart-wide
     * discounts; `bundle` and `bogo` are computed from the products in the cart.
     *
     */
    export enum type {
        DISCOUNT = 'discount',
        FIXED = 'fixed',
        BUNDLE = 'bundle',
        BOGO = 'bogo',
    }
}

