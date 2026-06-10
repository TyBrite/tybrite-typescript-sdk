/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A single line item in the cart you want a discount calculated for.
 */
export type PromotionCartItem = {
    /**
     * The product in this cart line.
     */
    product_id: string;
    /**
     * How many units of this product are in the cart.
     */
    quantity: number;
    /**
     * The unit price you are charging for this product.
     */
    price: number;
};

