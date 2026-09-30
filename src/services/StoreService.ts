/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StorePolicy } from '../models/StorePolicy';
import type { StorePolicySummary } from '../models/StorePolicySummary';
import type { StoreProfile } from '../models/StoreProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StoreService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the store profile
     * Returns the store's public business profile: support contact details, business and returns
     * addresses, legal identity, social profiles, the list of published legal documents, and the
     * store-level custom entries the merchant has made public.
     *
     * Everything in the response is intended for display on a storefront, so a publishable key may
     * read it. Draft documents and private custom entries are never included. Contact `email` and
     * `phone` fall back to the store's own contact details when the merchant has not set dedicated
     * support ones.
     *
     * Responses are cached for up to five minutes and carry an `ETag`; send it back as
     * `If-None-Match` to receive `304 Not Modified` when nothing has changed. Subscribe to the
     * `store.profile_updated` webhook event to learn when the profile changes.
     *
     * @returns any The store profile
     * @throws ApiError
     */
    public getStoreProfile(): CancelablePromise<{
        profile: StoreProfile;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/store/profile',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `Resource not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * List published policies
     * Returns the store's published legal documents — privacy policy, terms of service, returns,
     * shipping and cookie policies, a legal notice, an accessibility statement, and any documents the
     * merchant has added — without their text. A storefront uses this list to render footer links and
     * a `/policies/{slug}` route for each entry.
     *
     * Only documents the merchant has published appear. A document that exists only as a draft, has
     * been switched off, or has been unpublished is not listed. When `external_url` is set the
     * merchant hosts that document elsewhere, and a storefront links to that address instead.
     *
     * @returns any The published documents
     * @throws ApiError
     */
    public listStorePolicies(): CancelablePromise<{
        policies: Array<StorePolicySummary>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/store/policies',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a published policy
     * Returns one published legal document with its text, in Markdown. Without `version` the latest
     * published version is returned; with `version` that earlier version is returned, so an order
     * can be shown the terms that applied when it was placed. `latest_version` always reports the
     * current one.
     *
     * Every published version is kept and stays readable for as long as the document is published.
     * A slug that was never published, has been switched off or has been unpublished returns `404`,
     * as does a version number that does not exist.
     *
     * @returns any The published document
     * @throws ApiError
     */
    public getStorePolicy({
        slug,
        version,
    }: {
        /**
         * The document's address: `privacy`, `terms`, `returns`, `shipping`, `cookies`, `imprint`, `accessibility`, or a slug the merchant chose for a document of their own. Lowercase letters, digits and hyphens, starting with a letter, 2 to 48 characters.
         */
        slug: string,
        /**
         * A specific published version. Omit for the latest.
         */
        version?: number,
    }): CancelablePromise<{
        policy: StorePolicy;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/store/policies/{slug}',
            path: {
                'slug': slug,
            },
            query: {
                'version': version,
            },
            errors: {
                400: `The slug or version is malformed.`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                404: `No published document with this slug, or no such version.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
