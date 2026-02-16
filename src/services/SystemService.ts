/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SystemService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * API information
     * Returns basic API information including version, documentation URL, and available endpoint prefixes.
     * This endpoint does not require authentication.
     *
     * @returns any API information
     * @throws ApiError
     */
    public getApiInfo(): CancelablePromise<{
        name?: string;
        version?: string;
        documentation?: string;
        endpoints?: Array<{
            prefix?: string;
            description?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Health check
     * Returns the health status of the API gateway.
     * This endpoint does not require authentication.
     *
     * @returns any Service is healthy
     * @throws ApiError
     */
    public healthCheck(): CancelablePromise<{
        status?: string;
        timestamp?: string;
        version?: string;
        service?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/health',
        });
    }
}
