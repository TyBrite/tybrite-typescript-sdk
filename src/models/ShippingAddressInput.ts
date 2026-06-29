/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A shipping address for live carrier rating. Supplied alongside a parcel to ALSO get live carrier rates from a connected carrier account (returned as `rates[]`).
 */
export type ShippingAddressInput = {
    name?: string;
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    email?: string;
    phone?: string;
};

