/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IngestRowError } from './IngestRowError';
import type { IngestSummary } from './IngestSummary';
/**
 * The outcome of an ingestion batch.
 */
export type IngestResult = {
    /**
     * `success` (no failures), `partial` (some rows failed, the rest applied), or
     * `failed` (every row failed; nothing written).
     *
     */
    status?: IngestResult.status;
    format?: IngestResult.format;
    strategy?: IngestResult.strategy;
    summary?: IngestSummary;
    errors?: Array<IngestRowError>;
};
export namespace IngestResult {
    /**
     * `success` (no failures), `partial` (some rows failed, the rest applied), or
     * `failed` (every row failed; nothing written).
     *
     */
    export enum status {
        SUCCESS = 'success',
        PARTIAL = 'partial',
        FAILED = 'failed',
    }
    export enum format {
        JSON = 'json',
        XML = 'xml',
        CSV = 'csv',
    }
    export enum strategy {
        UPSERT_BY_SKU = 'upsert_by_sku',
        CREATE_ONLY = 'create_only',
    }
}

