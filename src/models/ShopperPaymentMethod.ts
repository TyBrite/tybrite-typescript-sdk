/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A card a shopper saved for Subscribe & Save deliveries. Only what is shown to the shopper is
 * returned; the card number and the processor's references are never exposed.
 *
 */
export type ShopperPaymentMethod = {
    id: string;
    /**
     * The payment processor that holds the card.
     */
    processor?: string;
    brand?: string | null;
    last4?: string | null;
    exp_month?: number | null;
    exp_year?: number | null;
    /**
     * Only active cards are listed.
     */
    status: ShopperPaymentMethod.status;
    created_at?: string;
};
export namespace ShopperPaymentMethod {
    /**
     * Only active cards are listed.
     */
    export enum status {
        ACTIVE = 'active',
    }
}

