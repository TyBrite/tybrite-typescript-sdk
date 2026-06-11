/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One rejected row, with enough detail to fix and re-submit it.
 */
export type IngestRowError = {
    /**
     * 1-based position of the row in the submitted batch.
     */
    row?: number;
    sku?: string;
    /**
     * The offending field, when attributable to one.
     */
    field?: string;
    reason?: string;
};

