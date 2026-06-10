/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A single placement to render inside a marketplace storefront slot. A placement is either a paid (`sponsored: true`) advertisement — which must be rendered with its disclosure label so shoppers can tell it apart from organic results — or an operator-curated fallback (`curated: true, sponsored: false`) used to fill a slot when no paid placement is available. Only sponsored placements require the disclosure label.
 */
export type AdPlacement = {
    /**
     * Identifier for this placement. Pass it back when logging impression and click beacons for this placement.
     */
    booking_id: string;
    /**
     * The merchant whose products or shop this placement promotes.
     */
    merchant_store_id: string;
    /**
     * Whether the placement promotes specific products (`product`), a merchant's shop as a whole (`merchant`), or a promotion (`promotion`).
     */
    placement_kind: AdPlacement.placement_kind;
    /**
     * The product identifiers to feature. For `merchant` placements this may be a curated selection of that merchant's products, or empty.
     */
    product_ids: Array<string>;
    /**
     * For `promotion` placements, the promotion this placement features. Null for other placement kinds.
     */
    promotion_id?: string | null;
    /**
     * Creative content to render for this placement (for example a headline, image, or call to action). The shape varies by slot; render the fields your storefront supports.
     */
    creative?: Record<string, any>;
    /**
     * Whether this is paid advertising. When `true` the placement must be rendered with its disclosure label. When `false` the placement is an operator-curated fallback and is not labelled as sponsored.
     */
    sponsored: boolean;
    /**
     * Whether this placement was hand-picked by the marketplace operator to fill the slot when no paid placement is available. Curated fallback placements are not labelled as sponsored.
     */
    curated?: boolean;
    /**
     * The label to show on a sponsored placement (for example "Sponsored"). Display it on every placement where `sponsored` is `true`.
     */
    disclosure_label: string;
};
export namespace AdPlacement {
    /**
     * Whether the placement promotes specific products (`product`), a merchant's shop as a whole (`merchant`), or a promotion (`promotion`).
     */
    export enum placement_kind {
        PRODUCT = 'product',
        MERCHANT = 'merchant',
        PROMOTION = 'promotion',
    }
}

