/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Campaign } from '../models/Campaign';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CampaignsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List running campaigns
     * Returns the campaigns that are running right now, by the same test the checkout applies: the
     * campaign is active and today falls inside its date window. A campaign that is scheduled,
     * paused, ended or still a draft is not returned, so an offer advertised here is one the
     * checkout will honour.
     *
     * A campaign is a discount with a budget behind it. It stops discounting once that budget is
     * spent, which is the difference between a campaign and a promotion — a promotion runs until
     * its end date. The budget itself is never exposed.
     *
     * Use `applies_to` to tell where an offer is valid: `online` for a storefront, `pos` for a
     * till, `all` for both. Pass the campaign id to the order you create and the discount is
     * applied and validated server-side.
     *
     * @returns any The campaigns currently running.
     * @throws ApiError
     */
    public listCampaigns({
        limit = 50,
    }: {
        /**
         * Maximum number of campaigns to return.
         */
        limit?: number,
    }): CancelablePromise<{
        campaigns?: Array<Campaign>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/campaigns',
            query: {
                'limit': limit,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a running campaign
     * Returns one campaign, if it is running right now. A campaign that exists but is not currently
     * running returns 404, the same as one that does not exist.
     *
     * @returns Campaign The campaign.
     * @throws ApiError
     */
    public getCampaign({
        id,
    }: {
        /**
         * The campaign id.
         */
        id: string,
    }): CancelablePromise<Campaign> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/campaigns/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
