/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Recommendation = {
    productId?: string;
    score?: number;
    reason?: string;
    /**
     * How the item relates to the anchor product. `complement` goes with it (a co-purchase or bundle partner); `alternative` can replace it (a similar product or a substitute). `null` when the list has no anchor relationship (trending, new, next, personalized, and padding).
     */
    relation?: Recommendation.relation;
    /**
     * The kind of signal that produced the item. When a list is topped up or falls back to another kind, each item carries the source it actually came from, so a storefront can keep a "Complete the set" rail to items whose `relation` is `complement`.
     */
    source?: Recommendation.source;
    /**
     * Present only for marketplace recommendations — the merchant that the recommended product belongs to.
     */
    merchant_store_id?: string;
};
export namespace Recommendation {
    /**
     * How the item relates to the anchor product. `complement` goes with it (a co-purchase or bundle partner); `alternative` can replace it (a similar product or a substitute). `null` when the list has no anchor relationship (trending, new, next, personalized, and padding).
     */
    export enum relation {
        COMPLEMENT = 'complement',
        ALTERNATIVE = 'alternative',
    }
    /**
     * The kind of signal that produced the item. When a list is topped up or falls back to another kind, each item carries the source it actually came from, so a storefront can keep a "Complete the set" rail to items whose `relation` is `complement`.
     */
    export enum source {
        CO_PURCHASE = 'co_purchase',
        BUNDLE = 'bundle',
        SIMILAR = 'similar',
        PERSONALIZED = 'personalized',
        NEXT = 'next',
        TRENDING = 'trending',
        NEW = 'new',
        FEATURED = 'featured',
        ENGAGEMENT = 'engagement',
        RANDOM = 'random',
    }
}

