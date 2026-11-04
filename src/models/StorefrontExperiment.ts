/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontExperiment = {
    experiment_id: string;
    name?: string | null;
    variants: Array<string>;
    status: StorefrontExperiment.status;
    created_at: string;
    updated_at: string;
};
export namespace StorefrontExperiment {
    export enum status {
        ACTIVE = 'active',
        ENDED = 'ended',
    }
}

