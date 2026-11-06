/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Commission, shipping and payout breakdown for a single merchant within a unified order.
 */
export type MerchantBreakdownItem = {
    merchant_store_id?: string;
    /**
     * Total of this merchant's items before any discount is applied.
     */
    gross_amount?: number;
    /**
     * Total discount applied to this merchant's portion of the basket (the merchant's own promotion and/or gift card). Reduces this merchant's subtotal.
     */
    discount_amount?: number;
    /**
     * Total of this merchant's items after their own discount — the base commission is charged on.
     */
    merchant_gross?: number;
    /**
     * Discount on this merchant's portion funded by the marketplace operator. Lowers what the shopper pays, not what the merchant is paid.
     */
    operator_funded_discount?: number;
    /**
     * Who ships this merchant's items: the merchant, or the marketplace operator on their behalf. Decided at checkout, and decides who receives the shipping.
     */
    fulfillment_mode?: MerchantBreakdownItem.fulfillment_mode;
    /**
     * What the shopper pays for delivering this merchant's items.
     */
    shipping_charged?: number;
    /**
     * The part of `shipping_charged` the merchant receives — all of it when the merchant ships, none when the marketplace does.
     */
    shipping_amount?: number;
    /**
     * The part of `shipping_charged` the marketplace keeps because it ships these items.
     */
    shipping_retained?: number;
    /**
     * Commission taken on the merchant's shipping, when the marketplace charges commission on shipping. Included in `commission_amount`.
     */
    shipping_commission?: number;
    /**
     * How the shipping was priced: the merchant's own delivery rates, the marketplace operator's rates, a carrier option the shopper chose, the marketplace's flat rate, or free under the marketplace's free-shipping threshold.
     */
    shipping_pricing?: MerchantBreakdownItem.shipping_pricing;
    /**
     * Commission deducted from this merchant's share, including any `shipping_commission`.
     */
    commission_amount?: number;
    /**
     * Amount this merchant receives: `merchant_gross` plus `shipping_amount`, less `commission_amount`.
     */
    net_amount?: number;
    /**
     * Identifier of the commission rule applied to this merchant, or null if none matched.
     */
    commission_rule_id?: string | null;
    /**
     * The currency this seller prices in (ISO 4217, upper case).
     */
    seller_currency?: string;
    /**
     * Rate used to convert the seller's prices into the cart currency.
     */
    currency_rate?: number;
    /**
     * `gross_amount` in the seller's currency.
     */
    gross_seller_amount?: number;
    /**
     * `merchant_gross` in the seller's currency.
     */
    merchant_gross_seller?: number;
    /**
     * Human label of the shipping applied, for example `Flat rate`.
     */
    shipping_description?: string | null;
    /**
     * The carrier option chosen; null unless `shipping_pricing` is `carrier_rate`.
     */
    shipping_rate?: any | null;
    /**
     * Gift card value applied to this merchant's share, in the cart currency.
     */
    gift_card_amount?: number;
    /**
     * The same gift card amount in the seller's currency.
     */
    gift_card_amount_seller?: number;
};
export namespace MerchantBreakdownItem {
    /**
     * Who ships this merchant's items: the merchant, or the marketplace operator on their behalf. Decided at checkout, and decides who receives the shipping.
     */
    export enum fulfillment_mode {
        MERCHANT = 'merchant',
        OPERATOR = 'operator',
    }
    /**
     * How the shipping was priced: the merchant's own delivery rates, the marketplace operator's rates, a carrier option the shopper chose, the marketplace's flat rate, or free under the marketplace's free-shipping threshold.
     */
    export enum shipping_pricing {
        SELLER_RATE = 'seller_rate',
        OPERATOR_RATE = 'operator_rate',
        CARRIER_RATE = 'carrier_rate',
        FLAT = 'flat',
        FREE = 'free',
    }
}

