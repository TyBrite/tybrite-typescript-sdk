/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AgentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List the agent tools
     * The tool manifest for this store. Each entry names a tool, its HTTP operation, a JSON Schema for its
     * request and for its response `data`, the credential it needs, and its cost class: `deterministic` tools
     * read store data and cost what any storefront read costs; `hosted_helper` tools run a model and debit the
     * store's Agent Compute credits.
     *
     * `hosted_helpers_available` says whether the two hosted helpers can be called right now. When it is
     * false, `hosted_helpers_reason` says why: `disabled` (the merchant has not turned them on), `paused`,
     * or `insufficient_credits`. The deterministic tools are always available.
     *
     * Every Agent API response shares one envelope: `data`, `evidence` (where each figure was read from),
     * `computed_at`, `currency` and `environment`.
     * @returns any The manifest
     * @throws ApiError
     */
    public getCapabilities(): CancelablePromise<{
        data: {
            tools?: Array<{
                name?: string;
                method?: string;
                path?: string;
                auth?: 'publishable' | 'secret' | 'shopper' | 'shopper_optional' | 'shopper_or_guest_token';
                cost_class?: 'deterministic' | 'hosted_helper';
                description?: string;
                request_schema?: any | null;
                response_schema?: Record<string, any>;
            }>;
            hosted_helpers_available?: boolean;
            hosted_helpers_reason?: string | null;
            response_contract?: Record<string, any>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/capabilities',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Search by constraints
     * Constraint search over the store's catalogue. Every result carries `match_reasons` naming which of the
     * requested constraints it satisfied. With a `query`, the store's semantic search ranks results by meaning
     * where it is available (`semantic_search: used`); a direct match on name, brand, category, SKU or tags is
     * also admitted and ranked higher. `attributes` are matched against each product's variant attributes,
     * product attributes, brand and category — use `POST /v1/agent/fit` to check a product's published
     * specifications.
     *
     * `price` is the catalogue selling price. The amount a shopper is charged, after dynamic pricing,
     * promotions, shipping and tax, comes from `POST /v1/agent/quote`.
     *
     * `in_stock_only` checks every variant of a multi-variant product before excluding it.
     * @returns any Matching products
     * @throws ApiError
     */
    public search({
        requestBody,
        fields,
    }: {
        requestBody: {
            /**
             * Free text. Matched by meaning where the store has semantic search, and against name, brand, category, SKU and tags.
             */
            query?: string;
            price_min?: number;
            price_max?: number;
            /**
             * A category or subcategory name (case-insensitive).
             */
            category?: string;
            /**
             * Attribute name to wanted value, e.g. `{"color": "black"}`.
             */
            attributes?: Record<string, string>;
            in_stock_only?: boolean;
            limit?: number;
        },
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            results?: Array<{
                product_id?: string;
                variant_id?: string | null;
                name?: string;
                brand?: string | null;
                category?: string | null;
                subcategory?: string | null;
                price?: number | null;
                list_price?: number | null;
                currency?: string | null;
                in_stock?: boolean;
                stock?: number | null;
                has_variants?: boolean;
                thumbnail_url?: string | null;
                attributes?: Record<string, string>;
                match_reasons?: Array<{
                    constraint?: string;
                    detail?: string;
                }>;
                /**
                 * Semantic similarity to `query`, when used.
                 */
                score?: number | null;
            }>;
            total_matched?: number;
            /**
             * Products considered.
             */
            scanned?: number;
            /**
             * True when the catalogue is larger than one search considers (1,000 products).
             */
            catalog_truncated?: boolean;
            semantic_search?: 'used' | 'unavailable' | 'not_requested';
            constraints?: {
                /**
                 * Free text. Matched by meaning where the store has semantic search, and against name, brand, category, SKU and tags.
                 */
                query?: string;
                price_min?: number;
                price_max?: number;
                /**
                 * A category or subcategory name (case-insensitive).
                 */
                category?: string;
                /**
                 * Attribute name to wanted value, e.g. `{"color": "black"}`.
                 */
                attributes?: Record<string, string>;
                in_stock_only?: boolean;
            };
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/search',
            query: {
                'fields': fields,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Turn a request into search constraints
     * A hosted helper: natural language in, the exact constraint object `POST /v1/agent/search` accepts out,
     * plus `unresolved` — the parts of the request it could not map to a constraint.
     *
     * It runs a model and debits the store's Agent Compute credits at the true cost of the call; `usage`
     * reports what was debited. A failed call keeps no credits. It is limited to 60 calls a minute per client
     * and 1,000 an hour per key, in addition to the standard limits.
     * @returns any The constraints
     * @throws ApiError
     */
    public interpret({
        requestBody,
    }: {
        requestBody: {
            query: string;
        },
    }): CancelablePromise<{
        data: {
            constraints?: {
                /**
                 * Free text. Matched by meaning where the store has semantic search, and against name, brand, category, SKU and tags.
                 */
                query?: string;
                price_min?: number;
                price_max?: number;
                /**
                 * A category or subcategory name (case-insensitive).
                 */
                category?: string;
                /**
                 * Attribute name to wanted value, e.g. `{"color": "black"}`.
                 */
                attributes?: Record<string, string>;
                in_stock_only?: boolean;
            };
            unresolved?: Array<string>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
        /**
         * What the call cost. Present on the hosted-helper tools only.
         */
        usage?: {
            /**
             * Agent Compute credits debited, in US dollars.
             */
            credits_debited?: number;
            model_class?: 'fast' | 'reasoning' | 'fast+reasoning';
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/interpret',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                402: `The store has no Agent Compute credits available`,
                403: `Hosted helpers are not enabled for this store`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                502: `The hosted helper did not complete`,
            },
        });
    }
    /**
     * Get a product dossier
     * Everything an agent needs to reason about one product: each variant with its live stock and the price
     * a shopper is charged, the promotion that applies to one unit, published specifications (per variant and
     * merged), the review summary, where the store ships and at what base fees, and the store's return
     * window.
     *
     * A specification the merchant has not published is absent, never inferred. The exact shipping fee for an
     * address comes from `POST /v1/agent/quote`.
     *
     * Cached at the edge for up to five minutes and purged when the catalogue changes.
     * @returns any The product dossier
     * @throws ApiError
     */
    public getProductContext({
        id,
        fields,
    }: {
        /**
         * The product.
         */
        id: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            product?: Record<string, any>;
            variants?: Array<Record<string, any>>;
            price_range?: any | null;
            total_stock?: number | null;
            promotion?: any | null;
            specifications?: Record<string, any>;
            reviews?: any | null;
            shipping?: any | null;
            returns?: {
                accepted?: boolean;
                window_days?: number | null;
            };
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/products/{id}/context',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Compare products
     * Two to five products side by side: price and price range, stock, rating, and the store's return
     * window, with `spec_rows` aligning every published specification across them. A specification a product
     * does not publish is `null` in its column.
     * @returns any The comparison
     * @throws ApiError
     */
    public compare({
        requestBody,
        fields,
    }: {
        requestBody: {
            product_ids: Array<string>;
        },
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            products?: Array<Record<string, any>>;
            spec_rows?: Array<{
                key?: string;
                values?: Record<string, any>;
            }>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/compare',
            query: {
                'fields': fields,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Check a product against constraints
     * Which constraints a product meets, which it misses, and which cannot be judged because the merchant
     * has not published the attribute (`unknown`). A price constraint is met when any variant's price fits
     * it, and stock when any variant is in stock. When something is missed or unknown, `alternatives` lists
     * in-stock products that meet more of the constraints.
     * @returns any The verdict
     * @throws ApiError
     */
    public checkFit({
        requestBody,
        fields,
    }: {
        requestBody: {
            product_id: string;
            constraints: {
                /**
                 * Free text. Matched by meaning where the store has semantic search, and against name, brand, category, SKU and tags.
                 */
                query?: string;
                price_min?: number;
                price_max?: number;
                /**
                 * A category or subcategory name (case-insensitive).
                 */
                category?: string;
                /**
                 * Attribute name to wanted value, e.g. `{"color": "black"}`.
                 */
                attributes?: Record<string, string>;
                in_stock_only?: boolean;
            };
        },
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            product_id?: string;
            met?: Array<{
                constraint?: string;
                detail?: string;
            }>;
            missed?: Array<{
                constraint?: string;
                detail?: string;
            }>;
            unknown?: Array<{
                constraint?: string;
                detail?: string;
            }>;
            alternatives?: Array<Record<string, any>>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/fit',
            query: {
                'fields': fields,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Find alternatives to a product
     * Alternatives to a product, by `mode`: `similar`, `cheaper` (priced below the product's lowest variant),
     * `in_stock`, or `same_spec` (matching every specification both products publish, ignoring identity
     * fields such as model). Candidates come from the store's recommendations where available
     * (`basis: recommendations`), otherwise from the same subcategory or category (`basis: same_category`).
     * @returns any The alternatives
     * @throws ApiError
     */
    public getAlternatives({
        requestBody,
        fields,
    }: {
        requestBody: {
            product_id: string;
            mode: 'cheaper' | 'similar' | 'in_stock' | 'same_spec';
            limit?: number;
        },
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            base?: Record<string, any>;
            mode?: string;
            basis?: 'recommendations' | 'same_category';
            alternatives?: Array<{
                product_id?: string;
                variant_id?: string | null;
                name?: string;
                brand?: string | null;
                category?: string | null;
                subcategory?: string | null;
                price?: number | null;
                list_price?: number | null;
                currency?: string | null;
                in_stock?: boolean;
                stock?: number | null;
                has_variants?: boolean;
                thumbnail_url?: string | null;
                attributes?: Record<string, string>;
                match_reasons?: Array<{
                    constraint?: string;
                    detail?: string;
                }>;
                /**
                 * Semantic similarity to `query`, when used.
                 */
                score?: number | null;
            }>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/alternatives',
            query: {
                'fields': fields,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Price a basket
     * The landed price of a basket: each line at the price a shopper is charged, the best promotion for the
     * basket, shipping and tax for the address, and the grand total. The steps run in the order an order is
     * priced — the promotion first, shipping on the discounted amount, tax last — so a quote and the order
     * placed from it agree.
     *
     * A line that cannot be bought as asked is flagged with `available: false` and an `unavailable_reason`,
     * never dropped, and is left out of the totals. Without an address, shipping and tax report
     * `address_required` and `total_is_final` is false.
     * @returns any The quote
     * @throws ApiError
     */
    public quote({
        requestBody,
        fields,
    }: {
        requestBody: {
            items: Array<{
                variant_id: string;
                quantity: number;
            }>;
            /**
             * Where the order is going. `country` (ISO 3166-1 alpha-2) is needed for tax; `line1` with `city`, or `latitude` with `longitude`, for shipping.
             */
            shipping_address?: {
                name?: string;
                line1?: string;
                line2?: string;
                city?: string;
                state?: string;
                postal_code?: string;
                country?: string;
                latitude?: number;
                longitude?: number;
            };
        },
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            lines?: Array<{
                variant_id?: string;
                product_id?: string | null;
                name?: string | null;
                variant_name?: string | null;
                sku?: string | null;
                quantity?: number;
                unit_price?: number | null;
                list_price?: number | null;
                line_total?: number | null;
                category_name?: string | null;
                available?: boolean;
                stock?: number | null;
                unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
            }>;
            subtotal?: number;
            discount?: {
                amount?: number;
                promotion?: any | null;
            };
            shipping?: {
                status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                amount?: number | null;
                description?: string | null;
                free_threshold?: number | null;
                is_free?: boolean | null;
            };
            tax?: {
                status?: 'quoted' | 'address_required' | 'unavailable';
                amount?: number | null;
                source?: 'automatic' | 'fallback';
                /**
                 * When true the tax is contained in the line prices and is not added to the total.
                 */
                prices_include_tax?: boolean;
            };
            grand_total?: number;
            /**
             * True when every line is available and both shipping and tax were priced for the address.
             */
            total_is_final?: boolean;
            unavailable_count?: number;
            currency?: string | null;
            shipping_address?: any | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/quote',
            query: {
                'fields': fields,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a cart draft
     * A draft cart, kept apart from the shopper's live cart, with its quote. A draft expires after 24 hours.
     * Sending a shopper credential records the draft against that shopper; without one it is anonymous.
     * `POST /v1/agent/cart-drafts/{id}/apply` moves it into the shopper's live cart.
     * @returns any The draft
     * @throws ApiError
     */
    public createCartDraft({
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        requestBody: {
            items: Array<{
                variant_id: string;
                quantity: number;
            }>;
            /**
             * Where the order is going. `country` (ISO 3166-1 alpha-2) is needed for tax; `line1` with `city`, or `latitude` with `longitude`, for shipping.
             */
            shipping_address?: {
                name?: string;
                line1?: string;
                line2?: string;
                city?: string;
                state?: string;
                postal_code?: string;
                country?: string;
                latitude?: number;
                longitude?: number;
            };
        },
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            draft?: {
                id?: string;
                items?: Array<{
                    variant_id: string;
                    quantity: number;
                }>;
                source?: 'items' | 'intent';
                expires_at?: string;
                applied_at?: string | null;
                created_at?: string;
            };
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/cart-drafts',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Draft a cart from an intent
     * A hosted helper: an intent such as "a birthday gift for a runner, under 80" and an optional `budget`
     * become a priced, stock-checked draft. The request is turned into constraints, the catalogue is searched
     * for in-stock products, and a model selects from those results only, by variant — it never supplies a
     * price. Every amount in the draft comes from the quote. `over_budget` reports whether the quoted total
     * exceeds the budget.
     *
     * It debits the store's Agent Compute credits for both model steps; `usage` reports the total.
     * @returns any The draft
     * @throws ApiError
     */
    public draftCartFromIntent({
        requestBody,
    }: {
        requestBody: {
            intent: string;
            budget?: number;
            /**
             * Where the order is going. `country` (ISO 3166-1 alpha-2) is needed for tax; `line1` with `city`, or `latitude` with `longitude`, for shipping.
             */
            shipping_address?: {
                name?: string;
                line1?: string;
                line2?: string;
                city?: string;
                state?: string;
                postal_code?: string;
                country?: string;
                latitude?: number;
                longitude?: number;
            };
        },
    }): CancelablePromise<{
        data?: {
            draft?: {
                id?: string;
                items?: Array<{
                    variant_id: string;
                    quantity: number;
                }>;
                source?: 'items' | 'intent';
                expires_at?: string;
                applied_at?: string | null;
                created_at?: string;
            };
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
            selections?: Array<{
                variant_id?: string;
                quantity?: number;
                reason?: string | null;
            }>;
            constraints?: {
                /**
                 * Free text. Matched by meaning where the store has semantic search, and against name, brand, category, SKU and tags.
                 */
                query?: string;
                price_min?: number;
                price_max?: number;
                /**
                 * A category or subcategory name (case-insensitive).
                 */
                category?: string;
                /**
                 * Attribute name to wanted value, e.g. `{"color": "black"}`.
                 */
                attributes?: Record<string, string>;
                in_stock_only?: boolean;
            };
            unresolved?: Array<string>;
            over_budget?: boolean | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence?: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at?: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment?: 'production' | 'sandbox';
        /**
         * What the call cost. Present on the hosted-helper tools only.
         */
        usage?: {
            /**
             * Agent Compute credits debited, in US dollars.
             */
            credits_debited?: number;
            model_class?: 'fast' | 'reasoning' | 'fast+reasoning';
        };
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/cart-drafts/from-intent',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                402: `The store has no Agent Compute credits available`,
                403: `Hosted helpers are not enabled for this store`,
                404: `Nothing in stock matches the intent`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
                502: `The hosted helper did not complete`,
            },
        });
    }
    /**
     * Get a cart draft
     * A draft with a fresh quote: prices, promotion, availability, and — when the draft was created with an
     * address — shipping and tax, all re-read now.
     * @returns any The draft, re-quoted
     * @throws ApiError
     */
    public getCartDraft({
        id,
        fields,
    }: {
        /**
         * The draft.
         */
        id: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            draft?: {
                id?: string;
                items?: Array<{
                    variant_id: string;
                    quantity: number;
                }>;
                source?: 'items' | 'intent';
                expires_at?: string;
                applied_at?: string | null;
                created_at?: string;
            };
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/cart-drafts/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Add a draft to the shopper's cart
     * Adds each of the draft's items to the shopper's live cart and returns the cart. `applied` reports
     * each item; a draft is applied once. Requires the shopper's credential.
     * @returns any The cart after the items were added
     * @throws ApiError
     */
    public applyCartDraft({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The draft.
         */
        id: string,
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            draft_id?: string;
            applied?: Array<{
                variant_id?: string;
                quantity?: number;
                added?: boolean;
                error?: Record<string, any>;
            }>;
            cart?: any | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/cart-drafts/{id}/apply',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                409: `Already applied, or no item could be added`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get insights on a cart
     * For a draft (`draft_id`) or the shopper's live cart (a shopper credential, or `x-session-id` for an
     * anonymous cart): lines that can no longer be bought as they are, prices that changed since each item was
     * added, the promotion the cart qualifies for, the gap to free shipping when a destination is given, and
     * complementary items where the store's recommendations provide them.
     * @returns any The insights
     * @throws ApiError
     */
    public getCartInsights({
        draftId,
        country,
        postalCode,
        city,
        state,
        line1,
        xSessionId,
        fields,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * A cart draft. Omit to read the live cart.
         */
        draftId?: string,
        /**
         * Destination country (ISO 3166-1 alpha-2), for the free-shipping gap.
         */
        country?: string,
        postalCode?: string,
        city?: string,
        state?: string,
        line1?: string,
        /**
         * The anonymous cart's session, when there is no shopper credential.
         */
        xSessionId?: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            source?: 'draft' | 'cart';
            unavailable?: Array<Record<string, any>>;
            price_changes?: Array<{
                variant_id?: string;
                name?: string | null;
                price_when_added?: number;
                price_now?: number;
            }>;
            promotion?: any | null;
            free_shipping?: any | null;
            free_shipping_status?: string;
            complementary?: Array<Record<string, any>>;
            complementary_basis?: 'recommendations' | 'unavailable';
            subtotal?: number;
            draft_id?: string;
            empty?: boolean;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/cart-insights',
            headers: {
                'x-session-id': xSessionId,
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'draft_id': draftId,
                'country': country,
                'postal_code': postalCode,
                'city': city,
                'state': state,
                'line1': line1,
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the shopper's personalisation consent
     * Whether the shopper has allowed agent tools to use their own history. Requires the shopper's credential.
     * @returns any The consent
     * @throws ApiError
     */
    public getConsent({
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            personalization?: boolean;
            granted_at?: string | null;
            revoked_at?: string | null;
            updated_at?: string | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/me/consent',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Grant or revoke personalisation consent
     * Records the shopper's choice. With consent, `GET /v1/agent/me/context` and
     * `GET /v1/agent/me/reorder-suggestions` read the shopper's own orders; without it they return
     * `403 consent_required`. This consent is separate from email marketing consent.
     * @returns any The consent
     * @throws ApiError
     */
    public setConsent({
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        requestBody: {
            personalization: boolean;
        },
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            personalization?: boolean;
            granted_at?: string | null;
            revoked_at?: string | null;
            updated_at?: string | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/me/consent',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the shopper's own context
     * From the shopper's own data only: sizes they have ordered, the price band of what they buy, their
     * recent orders, and their wishlist with availability. Requires the shopper's credential and their
     * consent.
     * @returns any The shopper's context
     * @throws ApiError
     */
    public getShopperContext({
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        fields,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            sizes?: Array<string>;
            price_band?: any | null;
            recent_orders?: Array<Record<string, any>>;
            order_count?: number;
            wishlist?: any[] | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/me/context',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                403: `The shopper has not granted personalisation`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get wishlist insights
     * The shopper's wishlist with each item's current stock and the price they would be charged now, and
     * whether that price is below the item's list price. Requires the shopper's credential.
     * @returns any The wishlist
     * @throws ApiError
     */
    public getWishlistInsights({
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        fields,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            items?: Array<Record<string, any>>;
            in_stock_count?: number;
            below_list_price_count?: number;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/me/wishlist-insights',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get reorder suggestions
     * Items the shopper has bought before, most often first, with how many they usually buy and the current
     * price and stock. Requires the shopper's credential and their consent.
     * @returns any The suggestions
     * @throws ApiError
     */
    public getReorderSuggestions({
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        fields,
    }: {
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            suggestions?: Array<Record<string, any>>;
            orders_considered?: number;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/me/reorder-suggestions',
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                403: `The shopper has not granted personalisation`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get an order's status
     * The status of one of the shopper's own orders: order and payment status, tracking, the return
     * window for this order, and `allowed_actions` — what the shopper can do next, such as `request_return`
     * until a date, `track_shipment`, or `complete_payment`. Requires the shopper's credential.
     * @returns any The order's status
     * @throws ApiError
     */
    public getOrderStatus({
        id,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
        fields,
    }: {
        /**
         * The order.
         */
        id: string,
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            order_id?: string;
            order_number?: string;
            status?: string;
            payment_status?: string;
            total?: number;
            tracking_number?: string | null;
            estimated_delivery?: string | null;
            placed_through_agent?: boolean;
            shipped_at?: string | null;
            delivered_at?: string | null;
            placed_at?: string;
            returns?: any | null;
            allowed_actions?: Array<Record<string, any>>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/orders/{id}/status',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a checkout intent
     * An agent's hand-off to the shopper. The basket is priced for the address, the price is frozen, and the
     * stock is held until the intent expires (30 minutes). The response carries a `confirmation_token`, once:
     * it is stored only as a hash, so a replay of the same `Idempotency-Key` returns the intent without it.
     * No order exists and nothing is charged until the shopper confirms.
     *
     * The intent is refused when a line cannot be bought (`409 items_unavailable`), the store does not deliver
     * to the address (`409 shipping_not_deliverable`), or shipping or tax cannot be priced for it
     * (`409 quote_incomplete`); each carries the quote in `error.details`.
     *
     * A shopper credential, when sent, ties the intent to that shopper, who must then confirm with it.
     * @returns any A replay of an Idempotency-Key already used with the same items
     * @throws ApiError
     */
    public createCheckoutIntent({
        idempotencyKey,
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * Unique per intent. A retry with the same key returns the same intent.
         */
        idempotencyKey: string,
        requestBody: {
            items: Array<{
                variant_id: string;
                quantity: number;
            }>;
            /**
             * Where the order is going. `country` (ISO 3166-1 alpha-2) is needed for tax; `line1` with `city`, or `latitude` with `longitude`, for shipping.
             */
            shipping_address: {
                name?: string;
                line1?: string;
                line2?: string;
                city?: string;
                state?: string;
                postal_code?: string;
                country?: string;
                latitude?: number;
                longitude?: number;
            };
            confirmation_mode?: 'token' | 'hosted';
        },
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            id?: string;
            status?: 'pending_confirmation' | 'confirmed' | 'expired' | 'cancelled' | 'completed';
            confirmation_mode?: 'token' | 'hosted';
            /**
             * Returned once, when the intent is created. Store it only for as long as the shopper needs to confirm.
             */
            confirmation_token?: string | null;
            /**
             * Reserved for a hosted confirmation page. Currently always null; confirm with the token.
             */
            confirmation_url?: string | null;
            expires_at?: string;
            order_id?: string | null;
            customer_id?: string | null;
            total?: number;
            currency?: string;
            items?: Array<{
                variant_id: string;
                quantity: number;
            }>;
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
            created_at?: string;
            confirmed_at?: string | null;
            cancelled_at?: string | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/checkout-intents',
            headers: {
                'Idempotency-Key': idempotencyKey,
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                409: `The key was used with different items, or the basket cannot be bought as quoted`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a checkout intent
     * The intent's status and frozen quote. An intent past its expiry reads as `expired` and its stock hold
     * is released.
     * @returns any The intent
     * @throws ApiError
     */
    public getCheckoutIntent({
        id,
        fields,
    }: {
        /**
         * The checkout intent.
         */
        id: string,
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            id?: string;
            status?: 'pending_confirmation' | 'confirmed' | 'expired' | 'cancelled' | 'completed';
            confirmation_mode?: 'token' | 'hosted';
            /**
             * Returned once, when the intent is created. Store it only for as long as the shopper needs to confirm.
             */
            confirmation_token?: string | null;
            /**
             * Reserved for a hosted confirmation page. Currently always null; confirm with the token.
             */
            confirmation_url?: string | null;
            expires_at?: string;
            order_id?: string | null;
            customer_id?: string | null;
            total?: number;
            currency?: string;
            items?: Array<{
                variant_id: string;
                quantity: number;
            }>;
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
            created_at?: string;
            confirmed_at?: string | null;
            cancelled_at?: string | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/checkout-intents/{id}',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Confirm a checkout intent
     * The shopper's approval. Send the `confirmation_token` with the shopper's credential, or — for a guest —
     * with `contact` (`email` and `name`).
     *
     * The basket is re-priced first. If anything the shopper pays has changed — a line price, the discount,
     * shipping, tax or the total — the response is `409 quote_changed` with the new quote in `error.details`,
     * and nothing is placed; show the shopper the new figures and create a new intent. Otherwise the order is
     * placed with payment pending, using the held stock, and the response carries what
     * `POST /v1/payments/initialize` needs to take payment, plus the store's payment methods.
     *
     * The token is single use: a second confirmation returns `409 intent_not_pending`. A wrong token returns
     * `403 invalid_token` and discloses nothing about the intent.
     * @returns any The order, placed with payment pending
     * @throws ApiError
     */
    public confirmCheckoutIntent({
        id,
        requestBody,
        xAuthToken,
        xExternalAuth,
        xIdpToken,
    }: {
        /**
         * The checkout intent.
         */
        id: string,
        requestBody: {
            confirmation_token: string;
            /**
             * A guest's details. Not needed with a shopper credential.
             */
            contact?: {
                email?: string;
                name?: string;
                phone?: string;
            };
            /**
             * The payment method the shopper intends to use, recorded on the order.
             */
            payment_method?: string;
        },
        /**
         * Customer session token from `POST /v1/auth/login` or `POST /v1/auth/verify-otp`. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xAuthToken?: string,
        /**
         * Bring-your-own-auth assertion identifying the customer. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xExternalAuth?: string,
        /**
         * A raw token from the store's own identity provider, verified by the store's configured Auth verifier. Provide exactly one of `x-auth-token`, `x-external-auth`, or `x-idp-token`.
         */
        xIdpToken?: string,
    }): CancelablePromise<{
        data: {
            intent?: {
                id?: string;
                status?: 'pending_confirmation' | 'confirmed' | 'expired' | 'cancelled' | 'completed';
                confirmation_mode?: 'token' | 'hosted';
                /**
                 * Returned once, when the intent is created. Store it only for as long as the shopper needs to confirm.
                 */
                confirmation_token?: string | null;
                /**
                 * Reserved for a hosted confirmation page. Currently always null; confirm with the token.
                 */
                confirmation_url?: string | null;
                expires_at?: string;
                order_id?: string | null;
                customer_id?: string | null;
                total?: number;
                currency?: string;
                items?: Array<{
                    variant_id: string;
                    quantity: number;
                }>;
                quote?: {
                    lines?: Array<{
                        variant_id?: string;
                        product_id?: string | null;
                        name?: string | null;
                        variant_name?: string | null;
                        sku?: string | null;
                        quantity?: number;
                        unit_price?: number | null;
                        list_price?: number | null;
                        line_total?: number | null;
                        category_name?: string | null;
                        available?: boolean;
                        stock?: number | null;
                        unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                    }>;
                    subtotal?: number;
                    discount?: {
                        amount?: number;
                        promotion?: any | null;
                    };
                    shipping?: {
                        status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                        amount?: number | null;
                        description?: string | null;
                        free_threshold?: number | null;
                        is_free?: boolean | null;
                    };
                    tax?: {
                        status?: 'quoted' | 'address_required' | 'unavailable';
                        amount?: number | null;
                        source?: 'automatic' | 'fallback';
                        /**
                         * When true the tax is contained in the line prices and is not added to the total.
                         */
                        prices_include_tax?: boolean;
                    };
                    grand_total?: number;
                    /**
                     * True when every line is available and both shipping and tax were priced for the address.
                     */
                    total_is_final?: boolean;
                    unavailable_count?: number;
                    currency?: string | null;
                    shipping_address?: any | null;
                };
                created_at?: string;
                confirmed_at?: string | null;
                cancelled_at?: string | null;
            };
            order?: {
                id?: string;
                order_number?: string | null;
                total_amount?: number;
                currency?: string;
                payment_status?: string;
                order_status?: string;
            };
            payment?: {
                next_step?: string;
                initialize_body?: Record<string, any>;
                methods?: Array<Record<string, any>>;
            };
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/checkout-intents/{id}/confirm',
            path: {
                'id': id,
            },
            headers: {
                'x-auth-token': xAuthToken,
                'x-external-auth': xExternalAuth,
                'x-idp-token': xIdpToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                403: `The token does not match`,
                404: `Not found`,
                409: `The price changed, or the intent is no longer pending or has expired`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Cancel a checkout intent
     * Cancels a pending intent and releases its stock hold at once.
     * @returns any The cancelled intent
     * @throws ApiError
     */
    public cancelCheckoutIntent({
        id,
    }: {
        /**
         * The checkout intent.
         */
        id: string,
    }): CancelablePromise<{
        data: {
            id?: string;
            status?: 'pending_confirmation' | 'confirmed' | 'expired' | 'cancelled' | 'completed';
            confirmation_mode?: 'token' | 'hosted';
            /**
             * Returned once, when the intent is created. Store it only for as long as the shopper needs to confirm.
             */
            confirmation_token?: string | null;
            /**
             * Reserved for a hosted confirmation page. Currently always null; confirm with the token.
             */
            confirmation_url?: string | null;
            expires_at?: string;
            order_id?: string | null;
            customer_id?: string | null;
            total?: number;
            currency?: string;
            items?: Array<{
                variant_id: string;
                quantity: number;
            }>;
            quote?: {
                lines?: Array<{
                    variant_id?: string;
                    product_id?: string | null;
                    name?: string | null;
                    variant_name?: string | null;
                    sku?: string | null;
                    quantity?: number;
                    unit_price?: number | null;
                    list_price?: number | null;
                    line_total?: number | null;
                    category_name?: string | null;
                    available?: boolean;
                    stock?: number | null;
                    unavailable_reason?: 'not_found' | 'insufficient_stock' | 'no_price';
                }>;
                subtotal?: number;
                discount?: {
                    amount?: number;
                    promotion?: any | null;
                };
                shipping?: {
                    status?: 'quoted' | 'not_configured' | 'not_deliverable' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    description?: string | null;
                    free_threshold?: number | null;
                    is_free?: boolean | null;
                };
                tax?: {
                    status?: 'quoted' | 'address_required' | 'unavailable';
                    amount?: number | null;
                    source?: 'automatic' | 'fallback';
                    /**
                     * When true the tax is contained in the line prices and is not added to the total.
                     */
                    prices_include_tax?: boolean;
                };
                grand_total?: number;
                /**
                 * True when every line is available and both shipping and tax were priced for the address.
                 */
                total_is_final?: boolean;
                unavailable_count?: number;
                currency?: string | null;
                shipping_address?: any | null;
            };
            created_at?: string;
            confirmed_at?: string | null;
            cancelled_at?: string | null;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/agent/checkout-intents/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `The request is invalid`,
                401: `Authentication failed - invalid or missing API key`,
                404: `Not found`,
                409: `The intent is no longer pending`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the store's policies
     * The facts a shopper asks before buying: whether the store accepts returns, its return window and
     * reasons, where it ships and the base fees, the payment methods it accepts, and its currencies. With a
     * live key, only payment methods configured for live payments are listed.
     * @returns any The store's policies
     * @throws ApiError
     */
    public getStorePolicies({
        fields,
    }: {
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            store?: any | null;
            currencies?: any | null;
            payment_methods?: any[] | null;
            shipping?: any | null;
            returns?: Record<string, any>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/store-policies',
            query: {
                'fields': fields,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get Agent Compute usage
     * The store's Agent Compute credit balance, the state of its automatic recharge and of its hosted helpers,
     * and this month's hosted-helper spend by tool and environment. Requires a secret key.
     * @returns any The usage
     * @throws ApiError
     */
    public getUsage({
        fields,
    }: {
        /**
         * Comma-separated top-level keys of `data` to return, e.g. `fields=grand_total,lines`.
         */
        fields?: string,
    }): CancelablePromise<{
        data: {
            balance_usd?: number;
            expires_at?: string | null;
            hosted_helpers?: Record<string, any>;
            auto_recharge?: Record<string, any>;
            month?: Record<string, any>;
        };
        /**
         * Where each figure in `data` was read from.
         */
        evidence: Array<{
            source?: string;
            operation?: string;
            id?: string;
            field?: string;
            note?: string;
        }>;
        computed_at: string;
        /**
         * ISO 4217 code every amount in `data` is expressed in.
         */
        currency?: string | null;
        environment: 'production' | 'sandbox';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/agent/usage',
            query: {
                'fields': fields,
            },
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
