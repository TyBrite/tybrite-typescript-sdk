/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GiftCard = {
    /**
     * Unique gift card identifier.
     */
    id?: string;
    /**
     * The unique redeemable code.
     */
    code?: string;
    /**
     * The original face value the gift card was issued with.
     */
    value?: number;
    /**
     * Remaining redeemable balance.
     */
    balance?: number;
    /**
     * Lifecycle status. A gift card is only redeemable while `active`.
     */
    status?: string;
    /**
     * Gift card type (e.g. `promotional`, `purchased`).
     */
    type?: string;
    /**
     * Date the gift card expires (null if it never expires). It is not redeemable on or after this date.
     */
    expiry_date?: string | null;
    /**
     * Customer the gift card is assigned to, if any.
     */
    customer_id?: string | null;
    /**
     * Free-text recipient the card was issued to (e.g. an email or name), if any.
     */
    issued_to?: string | null;
    issued_date?: string;
    /**
     * Date the gift card was last redeemed, or `null` if never used.
     */
    last_used?: string | null;
    /**
     * Minimum order total required before this gift card can be applied.
     */
    minimum_purchase_amount?: number | null;
    /**
     * Maximum percentage of the balance that may be applied to a single order.
     */
    maximum_usage_percentage?: number | null;
    /**
     * Optional restrictions on where the card can be applied (e.g. excluded categories or products).
     */
    usage_restrictions?: Record<string, any>;
    /**
     * Number of times the gift card has been redeemed.
     */
    redemption_count?: number;
    /**
     * Maximum number of redemptions allowed, or `null` for unlimited.
     */
    max_redemptions?: number | null;
    created_at?: string;
    updated_at?: string;
};

