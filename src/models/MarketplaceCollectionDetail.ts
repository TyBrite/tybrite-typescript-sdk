/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionItem } from './CollectionItem';
/**
 * A single curated merchandising section with its resolved members. The members are products, merchants, or promotions hand-picked (or auto-curated) by the marketplace operator. Render them as a homepage section and blend them with sponsored placements and organic recommendations as appropriate.
 */
export type MarketplaceCollectionDetail = {
    slug: string;
    name: string;
    description?: string | null;
    placement_kind: MarketplaceCollectionDetail.placement_kind;
    /**
     * Always true — the members were selected by the marketplace operator.
     */
    curated: boolean;
    items: Array<CollectionItem>;
};
export namespace MarketplaceCollectionDetail {
    export enum placement_kind {
        PRODUCT = 'product',
        MERCHANT = 'merchant',
        PROMOTION = 'promotion',
    }
}

