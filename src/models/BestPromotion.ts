/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The single highest-value eligible promotion for a cart — what to auto-apply at
 * checkout.
 *
 */
export type BestPromotion = {
    /**
     * The winning promotion, or `null` when no promotion applies to the cart.
     *
     */
    promotion?: any | null;
    /**
     * The discount amount for the winning promotion. `0` when none applies.
     */
    discount?: number;
};

