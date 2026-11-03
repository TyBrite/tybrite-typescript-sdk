/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recommendation } from './Recommendation';
export type RecommendationResponse = {
    type?: string;
    recommendations?: Array<Recommendation>;
    /**
     * An internal hint, not a cache indicator. False when the list was assembled by a fallback (see `fallbackUsed`). Use `computedAt` for freshness.
     */
    fromCache?: boolean;
    computedAt?: string;
    fallbackUsed?: string;
};

