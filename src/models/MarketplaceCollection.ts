/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A merchandising section hand-picked (or auto-curated) by the marketplace operator to feature on the storefront — for example "Trending now", "Featured shops", or a seasonal promotion rail. Use these to render homepage sections.
 */
export type MarketplaceCollection = {
    /**
     * Stable identifier for the section. Use it to fetch the section's resolved members.
     */
    slug: string;
    /**
     * Display name for the section.
     */
    name: string;
    /**
     * Optional longer description for the section.
     */
    description?: string | null;
    /**
     * Whether the section features products (`product`), merchants (`merchant`), or promotions (`promotion`).
     */
    placement_kind: MarketplaceCollection.placement_kind;
    /**
     * Suggested ordering for the section relative to others. Lower comes first.
     */
    display_priority?: number | null;
    /**
     * Whether the operator intends this section to appear on the storefront homepage.
     */
    show_on_homepage?: boolean | null;
};
export namespace MarketplaceCollection {
    /**
     * Whether the section features products (`product`), merchants (`merchant`), or promotions (`promotion`).
     */
    export enum placement_kind {
        PRODUCT = 'product',
        MERCHANT = 'merchant',
        PROMOTION = 'promotion',
    }
}

