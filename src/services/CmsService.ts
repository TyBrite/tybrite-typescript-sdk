/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeadForm } from '../models/LeadForm';
import type { LeadFormSubmission } from '../models/LeadFormSubmission';
import type { Lookbook } from '../models/Lookbook';
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CmsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List blog posts
     * List the store's published blog posts, newest first, with cursor-based pagination. Posts may
     * be commerce-aware (shoppable) and link to products in the catalog (`product_count` on each
     * item).
     *
     * **Auth:** read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API
     * keys, so it can be called directly from the storefront. No customer session required.
     *
     * **When to use:** render a blog index or editorial feed. Filter by category with `?category=`
     * (a category **slug**), cap page size with `limit` (default 20, max 100), and page through with
     * the `cursor` returned in `pagination.next_cursor` while `pagination.has_more` is `true`. Use
     * `getPost` to fetch a single post's full `content`.
     *
     * @returns any Success
     * @throws ApiError
     */
    public listPosts({
        category,
        limit = 20,
        cursor,
        fields,
    }: {
        /**
         * Filter posts by category slug
         */
        category?: string,
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `excerpt`, `featured_image`, `video`
         * - `category_id`, `category_name`, `category_slug`, `category_icon`
         * - `author_name`, `author_avatar`, `status`, `published_at`
         * - `view_count`, `product_count`, `seo_title`, `seo_description`
         * - `created_at`, `updated_at`
         *
         * The article body (`content`) and its embedded `products` and `lookbooks` are returned by
         * `GET /v1/posts/{slug}`, not here — requesting one of them on the listing is a `400`.
         *
         */
        fields?: string,
    }): CancelablePromise<{
        posts?: Array<Post>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts',
            query: {
                'category': category,
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get blog post by slug
     * Retrieve a single published blog post by its URL slug, including full `content` and any linked products (for shoppable posts). `content` is an Editor.js document (`time`, `version`, `blocks`), or `null` for a post with no body; the block types and rendering rules are described on the `PostContent` schema. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. Returns 404 if no published post matches the slug.
     * @returns Post Success
     * @throws ApiError
     */
    public getPost({
        slug,
        fields,
        visitorId,
        sessionId,
        xVisitorId,
        xSessionId,
    }: {
        slug: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `video`
         * - `category_id`, `category_name`, `category_slug`, `category_icon`
         * - `author_name`, `author_avatar`, `status`, `published_at`
         * - `view_count`, `product_count`, `seo_title`, `seo_description`
         * - `created_at`, `updated_at`, `products`, `lookbooks`
         *
         */
        fields?: string,
        /**
         * Identifies the shopper viewing the post, so the view is attributed to them in
         * your content analytics. Send the same value you use for other storefront
         * analytics calls. When omitted, the view is attributed to a coarse fallback
         * derived from the request, so repeat views by one shopper may not group together.
         *
         * The `x-visitor-id` header carries the same value and takes precedence.
         *
         */
        visitorId?: string,
        /**
         * Groups this view into a browsing session. When omitted, a session is derived
         * from the visitor identity.
         *
         * The `x-session-id` header carries the same value and takes precedence.
         *
         */
        sessionId?: string,
        /**
         * Header form of `visitor_id`. Takes precedence over the query parameter when both are sent.
         */
        xVisitorId?: string,
        /**
         * Header form of `session_id`. Takes precedence over the query parameter when both are sent.
         */
        xSessionId?: string,
    }): CancelablePromise<Post> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts/{slug}',
            path: {
                'slug': slug,
            },
            headers: {
                'x-visitor-id': xVisitorId,
                'x-session-id': xSessionId,
            },
            query: {
                'fields': fields,
                'visitor_id': visitorId,
                'session_id': sessionId,
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
    /**
     * Most-read blog posts
     * The posts being read most, ranked by reads per day over a recent window. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     *
     * The window widens — 7, then 21, 45 and 90 days — until enough posts qualify, and the one that was used is returned as `window_days`. A blog that publishes occasionally has quiet weeks, and a shelf that is empty half the time is worse than one that describes a longer period honestly. Render the period beside the list rather than claiming "this week" for all of them.
     *
     * `reads_per_day` is normalised by the window, so the figure stays comparable as the window widens. It ranks the list; it is not a view counter and is not intended to be shown as one.
     * @returns any Ranked posts, and the window they were ranked over.
     * @throws ApiError
     */
    public getTrendingPosts({
        limit = 6,
    }: {
        /**
         * How many posts to return.
         */
        limit?: number,
    }): CancelablePromise<{
        posts?: Array<{
            id?: string;
            title?: string;
            slug?: string;
            excerpt?: string | null;
            featured_image?: string | null;
            /**
             * Optional cover video; `featured_image` stays the poster and the fallback.
             */
            video?: string | null;
            published_at?: string | null;
            reads_per_day?: number;
        }>;
        /**
         * The window these rankings cover, in days.
         */
        window_days?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts/trending',
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
     * Posts related to this one
     * Posts related to the given one, ranked server-side so a storefront does not compute similarity in the browser. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. Returns 404 if no published post matches the slug.
     *
     * Ranking combines what the writing is about with the topics two posts share and how recent each one is, and nudges a post from a different category up between otherwise equal results.
     *
     * **`score` is diagnostic — render `reason` instead.** The list is ordered by a rank that includes the category nudge, so the scores are not always decreasing: a post scoring 0.458 can legitimately sit above one scoring 0.511. Shown to a reader that looks like a sorting fault, whereas `reason` ("Closely related subject") is something they can act on.
     *
     * The list is topped up to at least three entries when few posts qualify, since a shelf of one reads as a fault rather than a short list. Topped-up entries score strictly below the weakest genuine match and carry the reason "More from this blog".
     *
     * `degraded` is true when the post has no stored vector yet — newly published, most often — and the ranking used topics and recency alone. The list is still returned.
     * @returns any Related posts, most relevant first.
     * @throws ApiError
     */
    public getRelatedPosts({
        slug,
        limit = 4,
    }: {
        slug: string,
        /**
         * How many related posts to return.
         */
        limit?: number,
    }): CancelablePromise<{
        /**
         * The post these are related to.
         */
        anchor?: {
            id?: string;
            slug?: string;
            title?: string;
        };
        related?: Array<{
            id?: string;
            title?: string;
            slug?: string;
            excerpt?: string | null;
            featured_image?: string | null;
            /**
             * Optional cover video; `featured_image` stays the poster and the fallback.
             */
            video?: string | null;
            published_at?: string | null;
            /**
             * Diagnostic relevance. Not ordered monotonically — render `reason`.
             */
            score?: number;
            /**
             * Why this post is here, in words fit to show a reader.
             */
            reason?: string;
        }>;
        /**
         * True when the post had no stored vector and ranking used topics and recency alone.
         */
        degraded?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/posts/{slug}/related',
            path: {
                'slug': slug,
            },
            query: {
                'limit': limit,
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
    /**
     * List lookbooks
     * List the store's published shoppable lookbooks (curated, image-led product galleries), newest first, with cursor-based pagination. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     * @returns any Success
     * @throws ApiError
     */
    public listLookbooks({
        limit = 20,
        cursor,
        fields,
    }: {
        limit?: number,
        /**
         * Cursor for pagination (base64-encoded)
         */
        cursor?: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `description`, `featured_image`, `video`
         * - `status`, `published_at`, `created_at`, `updated_at`
         *
         * The gallery (`images`, with its shoppable hotspots) and `collection_id` are returned by
         * `GET /v1/lookbooks/{slug}`, not here — requesting one on the listing is a `400`.
         *
         */
        fields?: string,
    }): CancelablePromise<{
        lookbooks?: Array<Lookbook>;
        pagination?: {
            limit?: number;
            next_cursor?: string | null;
            has_more?: boolean;
        };
        total?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks',
            query: {
                'limit': limit,
                'cursor': cursor,
                'fields': fields,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get lookbook details by slug
     * Retrieve a single published lookbook by its URL slug, including its images and the products featured in each. Read-only; accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. Returns 404 if no published lookbook matches the slug.
     * @returns Lookbook Success
     * @throws ApiError
     */
    public getLookbook({
        slug,
        fields,
        visitorId,
        sessionId,
        xVisitorId,
        xSessionId,
    }: {
        slug: string,
        /**
         * Comma-separated list of fields to include in the response.
         *
         * **Allowed Fields:**
         * - `id`, `title`, `slug`, `description`, `featured_image`, `video`
         * - `collection_id`, `published_at`, `created_at`, `images`
         *
         */
        fields?: string,
        /**
         * Identifies the shopper viewing the lookbook, so the view is attributed to them in
         * your content analytics. Send the same value you use for other storefront
         * analytics calls. When omitted, the view is attributed to a coarse fallback
         * derived from the request, so repeat views by one shopper may not group together.
         *
         * The `x-visitor-id` header carries the same value and takes precedence.
         *
         */
        visitorId?: string,
        /**
         * Groups this view into a browsing session. When omitted, a session is derived
         * from the visitor identity.
         *
         * The `x-session-id` header carries the same value and takes precedence.
         *
         */
        sessionId?: string,
        /**
         * Header form of `visitor_id`. Takes precedence over the query parameter when both are sent.
         */
        xVisitorId?: string,
        /**
         * Header form of `session_id`. Takes precedence over the query parameter when both are sent.
         */
        xSessionId?: string,
    }): CancelablePromise<Lookbook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lookbooks/{slug}',
            path: {
                'slug': slug,
            },
            headers: {
                'x-visitor-id': xVisitorId,
                'x-session-id': xSessionId,
            },
            query: {
                'fields': fields,
                'visitor_id': visitorId,
                'session_id': sessionId,
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
    /**
     * Subscribe an email to the store's newsletter
     * Capture a storefront newsletter signup. Email is the identity — this works for anonymous
     * visitors and signed-in shoppers alike (a signed-in storefront simply prefills the email
     * field). When the store has connected a marketing tool, the new subscriber is automatically
     * synced to the merchant's chosen list.
     *
     * **Auth:** accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys, so
     * it can be called directly from the storefront. No customer session required.
     *
     * **Idempotent:** re-subscribing the same email is safe — it returns `200` with
     * `already_subscribed: true` and never creates a duplicate. A fresh signup returns `201`.
     *
     * @returns any Already subscribed (idempotent re-subscribe).
     * @throws ApiError
     */
    public subscribeNewsletter({
        requestBody,
    }: {
        requestBody: {
            /**
             * The subscriber's email address.
             */
            email: string;
            /**
             * Optional free-text label for where the signup happened (e.g. a blog post or lookbook slug, or `footer`). Surfaced to the merchant and forwarded as an event property.
             */
            source?: string | null;
        },
    }): CancelablePromise<{
        subscribed?: boolean;
        already_subscribed?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/newsletter/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a lead form
     * Returns the published definition of a lead form: its title, the questions it asks beyond the
     * email address, the consent wording to display, whether a challenge is asked for, and the
     * name of the hidden field to render. A storefront draws the form from this response and sends
     * the answers to `POST /v1/lead-forms/{slug}/submit`.
     *
     * **Auth:** accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys.
     *
     * **Caching:** the response is cacheable and changes when the merchant edits the form. A form that
     * requires a challenge on every submission is returned with `Cache-Control: private, no-store`
     * and carries a per-request `form_token`.
     *
     * A form that is a draft, archived, or does not exist, and a form on a store whose plan does not
     * include lead forms, answer `404`.
     *
     * @returns LeadForm The form definition.
     * @throws ApiError
     */
    public getLeadForm({
        slug,
    }: {
        /**
         * The form's address, lowercase letters, digits and hyphens, starting with a letter.
         */
        slug: string,
    }): CancelablePromise<LeadForm> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/lead-forms/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                400: `The form address is not valid.`,
                401: `Authentication failed - invalid or missing API key`,
                404: `The form does not exist or is not available.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `The form could not be loaded.`,
            },
        });
    }
    /**
     * Submit a lead form
     * Records a signup through a lead form: the shopper's email address, their answers to the form's
     * questions, and the consents they gave. The shopper is added to the store's subscribers, and the
     * submission, with the form's labels and consent wording as they were at that moment, is kept for
     * the merchant.
     *
     * **Auth:** accepts both publishable (`tybrite_pk_*`) and secret (`tybrite_sk_*`) API keys. No
     * customer session is required.
     *
     * **Validation:** the form's field definitions decide what is accepted. A key in `answers` that
     * the form does not define is ignored. Phone answers are converted to E.164 using the store's
     * country when the shopper omits a country code. Consent is recorded only from the `consents`
     * booleans; the wording stored is the form's own.
     *
     * **Uniform response:** a first signup and a repeat signup by the same email both return `200` with
     * the same shape. Every submission appends to the form's history.
     *
     * **Spam protection:** the field named by `hp_field` on the form is rendered hidden; a submission
     * that fills it is acknowledged with a normal `200` and discarded. A form may also require a
     * challenge: send the widget's result as `captcha_token`. When a challenge is required and
     * verification is unavailable, the request answers `503`.
     *
     * **Rate limits:** per address and per form, and per email address per form. A secret key is
     * called from the merchant's server, so it should send the shopper's address in
     * `X-Forwarded-Shopper-Ip`; without it, every request on that key counts as one address. The header is
     * ignored on a publishable key, which is called from the shopper's own browser.
     *
     * **Idempotency:** a request that repeats an `Idempotency-Key` with the same body returns the
     * original result without recording a second submission; the same key with a different body answers `409`.
     *
     * @returns LeadFormSubmission The submission was accepted.
     * @throws ApiError
     */
    public submitLeadForm({
        slug,
        requestBody,
        idempotencyKey,
        xForwardedShopperIp,
    }: {
        /**
         * The form's address.
         */
        slug: string,
        /**
         * Up to 16 KB of JSON, sent as `application/json`.
         */
        requestBody: {
            /**
             * The shopper's email address.
             */
            email: string;
            /**
             * Answers keyed by field `name`, at most 30. A `multiselect` answer is an array.
             */
            answers?: Record<string, any>;
            /**
             * The consents the shopper gave.
             */
            consents?: {
                email?: boolean;
                sms?: boolean;
            };
            /**
             * The challenge widget's result. Required when the form's `captcha.required` is true, or when a refusal with reason `captcha_required` asks for it.
             */
            captcha_token?: string;
            /**
             * The `form_token` returned with the form definition, when it had one.
             */
            form_token?: string;
            /**
             * The hidden field named by the form's `hp_field`. Leave empty.
             */
            website_url?: string;
            /**
             * A label for where the signup happened. At most 200 characters.
             */
            source?: string;
            /**
             * The page the form was on. At most 500 characters.
             */
            page_url?: string;
            /**
             * Campaign parameters, up to 10 string entries.
             */
            utm?: Record<string, string>;
        },
        /**
         * A unique string of 1 to 255 printable characters that identifies this submission.
         */
        idempotencyKey?: string,
        /**
         * The shopper's IP address. Honoured on a secret key only.
         */
        xForwardedShopperIp?: string,
    }): CancelablePromise<LeadFormSubmission> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/lead-forms/{slug}/submit',
            path: {
                'slug': slug,
            },
            headers: {
                'Idempotency-Key': idempotencyKey,
                'X-Forwarded-Shopper-Ip': xForwardedShopperIp,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The submission is not valid. \`details.field\` names the answer and \`details.reason\` says why.`,
                401: `Authentication failed - invalid or missing API key`,
                403: `The store's plan does not include lead forms (\`details.reason\` is \`plan_required\`).`,
                404: `The form does not exist or is not available.`,
                409: `The \`Idempotency-Key\` was already used with a different submission.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `The form could not be submitted.`,
                503: `The challenge could not be verified. The submission was not recorded; retry shortly.`,
            },
        });
    }
}
