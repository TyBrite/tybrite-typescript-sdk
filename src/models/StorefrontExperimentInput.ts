/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontExperimentInput = {
    name?: string | null;
    /**
     * The variant ids an order's `attribution.variation_id` can carry.
     */
    variants: Array<string>;
    status?: StorefrontExperimentInput.status;
};
export namespace StorefrontExperimentInput {
    export enum status {
        ACTIVE = 'active',
        ENDED = 'ended',
    }
}

