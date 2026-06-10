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
                    product_count?: number;
                }>;
            };
            subcategories?: {
                total?: number;
                list?: Array<{
                    id?: string;
                    name?: string;
                    category?: string;
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
            total?: number;
            list?: Array<{
                name?: string;
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
     * Feature flags (optional, included when requested)
     */
    features?: {
        ai_recommendations?: boolean;
        semantic_search?: boolean;
        multi_currency?: boolean;
        dynamic_pricing?: boolean;
        gift_cards?: boolean;
        promotions?: boolean;
        cms?: boolean;
        messaging?: boolean;
        specifications?: boolean;
        collections?: boolean;
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

