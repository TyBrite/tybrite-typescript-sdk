/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One delivery interval an offer allows.
 */
export type SubscribeSaveInterval = {
    unit: SubscribeSaveInterval.unit;
    /**
     * How many units between deliveries.
     */
    count: number;
};
export namespace SubscribeSaveInterval {
    export enum unit {
        WEEK = 'week',
        MONTH = 'month',
    }
}

