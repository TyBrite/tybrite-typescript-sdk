/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdPlacement } from './AdPlacement';
/**
 * The active sponsored placements to render in a named marketplace storefront slot. Blend these with your organic listings or recommendations, each shown with its disclosure label.
 */
export type AdSlotResponse = {
    /**
     * The slot key that was requested.
     */
    slot: string;
    /**
     * The context the slot was scoped to (a category identifier or search term), or null when no context was supplied.
     */
    context?: string | null;
    placements: Array<AdPlacement>;
};

