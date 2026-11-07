/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AutomaticOfferPrice = {
    /**
     * The plan or tier slug
     */
    plan: string;
    period: AutomaticOfferPrice.period;
    /**
     * List price for the period, in major units
     */
    price: number;
    /**
     * Discount on the first billing period, in major units
     */
    discount: number;
    /**
     * Price payable for the first billing period after the discount, in major units
     */
    final: number;
};
export namespace AutomaticOfferPrice {
    export enum period {
        MONTHLY = 'monthly',
        ANNUAL = 'annual',
    }
}

