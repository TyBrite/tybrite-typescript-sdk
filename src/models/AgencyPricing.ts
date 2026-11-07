/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgencyPlan } from './AgencyPlan';
import type { AutomaticOffer } from './AutomaticOffer';
export type AgencyPricing = {
    /**
     * Who bills the agency's merchants for their plan
     */
    billed_by: AgencyPricing.billed_by;
    plans: Array<AgencyPlan>;
    offers: Array<AutomaticOffer>;
};
export namespace AgencyPricing {
    /**
     * Who bills the agency's merchants for their plan
     */
    export enum billed_by {
        AGENCY = 'agency',
        PLATFORM = 'platform',
    }
}

