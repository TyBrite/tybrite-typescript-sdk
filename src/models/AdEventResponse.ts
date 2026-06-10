/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Acknowledges an impression or click beacon.
 */
export type AdEventResponse = {
    /**
     * Always true — the beacon was accepted.
     */
    recorded: boolean;
    /**
     * Whether this event counted toward billing after de-duplication and invalid-traffic filtering. Informational only — the storefront does not need to act on it.
     */
    billable: boolean;
};

