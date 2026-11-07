/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutomaticOfferPrice } from './AutomaticOfferPrice';
export type AutomaticOffer = {
    id: string;
    /**
     * The offer's public title
     */
    title: string | null;
    discount: {
        type: AutomaticOffer.type;
        /**
         * Present when `type` is `percent`
         */
        percent_off?: number;
    };
    /**
     * How long the discount lasts. `first_period` is the first billing period only, `n_periods` a set number of periods, `forever` every period.
     */
    duration: {
        mode: AutomaticOffer.mode;
        periods: number;
    };
    starts_at?: string | null;
    ends_at?: string | null;
    prices: Array<AutomaticOfferPrice>;
};
export namespace AutomaticOffer {
    export enum type {
        PERCENT = 'percent',
        AMOUNT = 'amount',
    }
    export enum mode {
        FIRST_PERIOD = 'first_period',
        N_PERIODS = 'n_periods',
        FOREVER = 'forever',
    }
}

