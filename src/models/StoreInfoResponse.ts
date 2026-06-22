/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoreInfoResponse = {
    /**
     * Basic store information (always included)
     */
    store: {
        /**
         * Unique store identifier
         */
        store_id: string;
        /**
         * Store display name
         */
        name: string;
        /**
         * URL of the store's logo, or null if not set.
         */
        logo_url?: string | null;
        /**
         * Short description of the store, or null if not set.
         */
        description?: string | null;
        /**
         * Store's public website URL, or null if not set.
         */
        website?: string | null;
        /**
         * Store contact phone number, or null if not set.
         */
        phone?: string | null;
        /**
         * Store contact email, or null if not set.
         */
        email?: string | null;
        /**
         * Store physical or business address, or null if not set.
         */
        address?: string | null;
        /**
         * Store's default currency code (ISO 4217)
         */
        default_currency: string;
        /**
         * List of active currency codes supported by the store
         */
        currencies: Array<string>;
        /**
         * Store timezone (IANA timezone identifier)
         */
        timezone: string;
        /**
         * Store creation timestamp
         */
        created_at: string;
    };
    /**
     * Catalog overview (optional, included when requested)
     */
    catalog?: {
        products?: {
            total?: number;
            has_variants?: number;
            simple_products?: number;
            active?: number;
            inactive?: number;
            featured?: number;
            with_images?: number;
            low_stock?: number;
            /**
             * A small sample of products (at most 10) for context — useful for AI agents and overview screens. This is NOT the full catalog; use the products endpoint to browse all products.
             */
            sample?: Array<{
                id?: string;
                name?: string;
                category?: string | null;
                price?: number | null;
                image?: string | null;
                featured?: boolean;
            }>;
        };
        collections?: {
            total?: number;
            names?: Array<string>;
        };
        taxonomy?: {
            categories?: {
                total?: number;
                list?: Array<{
                    id?: string;
                    name?: string;
                    /**
                     * Category image URL, if the merchant set one.
                     */
                    image?: string | null;
                    product_count?: number;
                }>;
            };
            subcategories?: {
                total?: number;
                list?: Array<{
                    id?: string;
                    name?: string;
                    /**
                     * Subcategory image URL, if the merchant set one.
                     */
                    image?: string | null;
                    /**
                     * Name of the top-level category this subcategory belongs to.
                     */
                    category?: string;
                    category_id?: string | null;
                    /**
                     * The parent subcategory's id, or null for a top-level subcategory.
                     */
                    parent_id?: string | null;
                    /**
                     * The parent subcategory's name, or null for a top-level subcategory.
                     */
                    parent_name?: string | null;
                    /**
                     * Ids of this subcategory's direct (one-level-down) child subcategories.
                     */
                    children?: Array<string>;
                    product_count?: number;
                }>;
            };
        };
        specifications?: {
            total?: number;
            types?: Array<string>;
        };
        brands?: {
            total?: number;
            list?: Array<string>;
        };
    };
    /**
     * Pricing configuration (optional, included when requested)
     */
    pricing?: {
        has_dynamic_pricing?: boolean;
        features?: {
            customer_tiers?: boolean;
            customer_segments?: boolean;
            volume_discounts?: boolean;
            location_based?: boolean;
            time_based?: boolean;
        };
        customer_tiers?: Array<string>;
        pricing_rules?: {
            total?: number;
            active?: number;
        };
    };
    /**
     * Promotions overview (optional, included when requested)
     */
    promotions?: {
        total?: number;
        active?: number;
        types?: {
            percentage_discount?: number;
            fixed_discount?: number;
            bogo?: number;
            bundle?: number;
            free_shipping?: number;
        };
    };
    /**
     * Payment configuration (optional, included when requested)
     */
    payments?: {
        providers?: Array<string>;
        methods?: Array<{
            name?: string;
            display_name?: string;
            type?: 'manual' | 'redirect' | 'popup' | 'stk_push';
        }>;
    };
    /**
     * Shipping configuration (optional, included when requested)
     */
    shipping?: {
        zones?: {
            /**
             * Number of shipping rules — the combined count of custom delivery zones and distance-based pricing tiers (equals `list.length`).
             */
            total?: number;
            /**
             * Both custom polygon delivery zones and distance-based pricing tiers, each tagged with its `type`.
             */
            list?: Array<{
                name?: string;
                /**
                 * `zone` = a custom polygon delivery zone; `distance_tier` = a distance-based pricing tier.
                 */
                type?: 'zone' | 'distance_tier';
                delivery_fee?: number;
                free_threshold?: number | null;
            }>;
        };
        has_free_shipping_threshold?: boolean;
    };
    /**
     * CMS content overview (optional, included when requested)
     */
    cms?: {
        posts?: {
            total?: number;
            published?: number;
            draft?: number;
        };
        lookbooks?: {
            total?: number;
            published?: number;
        };
    };
    /**
     * Feature flags (optional, included when requested). Each flag is a boolean answering "should the storefront show this capability right now?" — use them to decide which UI to render.
     *
     * **What `true` / `false` mean.** A flag is `true` only when the capability is BOTH available to the store AND has data/config to surface. `false` is deliberately broad — it can mean any of: the store's plan doesn't include the feature, the plan includes it but it isn't set up/has no data yet, or both. A `false` flag therefore does NOT tell you *why* it's off; treat it simply as "don't render this yet."
     *
     * **Two kinds of flag:**
     * - **Plan-gated** — `ai_recommendations`, `semantic_search`, `multi_currency`,
     * `dynamic_pricing`, `cms`, `lookbooks`, `returns`. `true` requires the store's plan to
     * include the feature AND it to be configured. By plan: Starter includes none of these;
     * Growth adds content pages/lookbooks (`cms`, `lookbooks`) and `returns`; Premium and
     * Enterprise add smart search & recommendations (`ai_recommendations`, `semantic_search`),
     * `dynamic_pricing`, and `multi_currency`.
     *
     * - **Data-presence (every plan)** — `gift_cards`, `promotions`, `messaging`,
     * `specifications`, `collections`. Not plan-gated at all; `true` simply means the store
     * currently has at least one of that item (e.g. `gift_cards: true` = the store has issued
     * one or more gift cards). `false` means none exist yet, not that the feature is forbidden.
     */
    features?: {
        /**
         * Smart recommendations are available (plan-dependent and configured).
         */
        ai_recommendations?: boolean;
        /**
         * Smart search is available (plan-dependent and configured).
         */
        semantic_search?: boolean;
        /**
         * Selling in multiple currencies is available (plan-dependent and configured).
         */
        multi_currency?: boolean;
        /**
         * Automatic pricing rules are available (plan-dependent and configured).
         */
        dynamic_pricing?: boolean;
        /**
         * The store has issued at least one gift card (data-presence; every plan).
         */
        gift_cards?: boolean;
        /**
         * The store has at least one promotion (data-presence; every plan).
         */
        promotions?: boolean;
        /**
         * The store publishes content pages (plan-dependent and configured).
         */
        cms?: boolean;
        /**
         * The store publishes shoppable lookbooks (plan-dependent and configured).
         */
        lookbooks?: boolean;
        /**
         * The store accepts customer-lodged returns (Settings → General → Returns).
         */
        returns?: boolean;
        /**
         * The store has at least one customer conversation thread (data-presence; every plan).
         */
        messaging?: boolean;
        /**
         * The store has published product specifications (data-presence; every plan).
         */
        specifications?: boolean;
        /**
         * The store has product collections (storefront catalog groupings) to display.
         */
        collections?: boolean;
        /**
         * The REASON behind each flag above, keyed by the same feature name — so you can tell a feature that's off because the plan excludes it apart from one that's in the plan but has no data yet. Each value is one of: `available` (usable now — the boolean is `true`); `awaiting_data` (entitled/ungated but nothing to show yet — the boolean is `false`, but you can safely **pre-build the UI** and it will light up automatically once data exists); or `not_in_plan` (a plan-gated feature the store's plan doesn't include — hide it, an upgrade is required). Data-presence features (gift_cards, promotions, messaging, specifications, collections) are never `not_in_plan`.
         */
        feature_status?: Record<string, 'available' | 'awaiting_data' | 'not_in_plan'>;
    };
    /**
     * Indicates whether this store is part of a marketplace, so a storefront can adapt its experience accordingly.
     */
    marketplace?: {
        /**
         * Whether the store runs on its own or inside a marketplace.
         */
        mode?: StoreInfoResponse.mode;
        /**
         * Whether marketplace features are available.
         */
        marketplace_enabled?: boolean;
    };
};
export namespace StoreInfoResponse {
    /**
     * Whether the store runs on its own or inside a marketplace.
     */
    export enum mode {
        STANDARD = 'standard',
        MARKETPLACE = 'marketplace',
    }
}

