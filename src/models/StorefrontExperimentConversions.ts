/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontExperimentConversions = {
    experiment_id: string;
    name?: string | null;
    status: StorefrontExperimentConversions.status;
    /**
     * The store's currency code. Every amount below is in this currency, in major units.
     */
    currency: string;
    from: string;
    to: string;
    /**
     * One entry per registered variant, with zero when it has no paid orders in the window.
     */
    totals: Array<{
        variant: string;
        orders: number;
        /**
         * The sum of the paid orders' totals, in major units.
         */
        revenue: number;
    }>;
    daily: Array<{
        variant: string;
        date: string;
        orders: number;
        /**
         * The sum of the day's paid orders' totals, in major units.
         */
        revenue: number;
        /**
         * The sum of each order's total squared. With `orders` and `revenue` it gives the variance of the order value.
         */
        revenue_sum_of_squares: number;
    }>;
};
export namespace StorefrontExperimentConversions {
    export enum status {
        ACTIVE = 'active',
        ENDED = 'ended',
    }
}

