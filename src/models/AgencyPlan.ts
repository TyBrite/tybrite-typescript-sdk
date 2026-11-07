/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AgencyPlan = {
    slug: string;
    name: string;
    currency: string;
    /**
     * Monthly price in major units
     */
    monthly: number;
    /**
     * Annual price in major units, null when the plan has no annual option
     */
    annual?: number | null;
};

