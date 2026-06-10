/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A single sponsored placement to render inside a marketplace storefront slot. Always render it together with its disclosure label so shoppers can tell it apart from organic results.
 */
export type AdPlacement = {
    /**
     * Identifier for this sponsored placement. Pass it back when logging impression and click beacons for this placement.
     */
    booking_id: string;
    /**
     * The merchant whose products or shop this placement promotes.
     */
    merchant_store_id: string;
    /**
     * Whether the placement promotes specific products (`product`) or a merchant's shop as a whole (`merchant`).
     */
    placement_kind: AdPlacement.placement_kind;
    /**
     * The product identifiers to feature. For `merchant` placements this may be a curated selection of that merchant's products, or empty.
     */
    product_ids: Array<string>;
    /**
     * Creative content to render for this placement (for example a headline, image, or call to action). The shape varies by slot; render the fields your storefront supports.
     */
    creative?: Record<string, any>;
    /**
     * Always true — this is paid placement and must be labelled as such.
     */
    sponsored: boolean;
    /**
     * The label the storefront must show on the placement (for example "Sponsored"). Always display it.
     */
    disclosure_label: string;
};
export namespace AdPlacement {
    /**
     * Whether the placement promotes specific products (`product`) or a merchant's shop as a whole (`merchant`).
     */
    export enum placement_kind {
        PRODUCT = 'product',
        MERCHANT = 'merchant',
    }
}

