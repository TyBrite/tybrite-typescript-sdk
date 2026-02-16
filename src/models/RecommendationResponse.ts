/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recommendation } from './Recommendation';
export type RecommendationResponse = {
    type?: string;
    recommendations?: Array<Recommendation>;
    fromCache?: boolean;
    computedAt?: string;
    fallbackUsed?: string;
};

