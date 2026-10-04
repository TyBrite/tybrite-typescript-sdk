/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
/**
 * Where the order goes. On a pickup order it is the collection location's address, with `type: pickup`, the location's `name` and `location_id`, and the address in `line1` / `line2` / `city` / `state` / `postal_code` / `country`.
 */
export type OrderShippingAddress = (Address & {
    /**
     * Present, as `pickup`, only on a pickup order.
     */
    type?: OrderShippingAddress.type;
    name?: string;
    location_id?: string;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
});
export namespace OrderShippingAddress {
    /**
     * Present, as `pickup`, only on a pickup order.
     */
    export enum type {
        PICKUP = 'pickup',
    }
}

