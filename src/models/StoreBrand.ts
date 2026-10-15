/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The merchant's design system, as a storefront applies it to match the store's identity. Null when the store has no design system or has switched it off; it is never an empty object. Typography is the merchant's own description of a typeface and how it is used, not CSS. Subscribe to the `store.design_system_updated` webhook event to learn when it changes.
 */
export type StoreBrand = {
    /**
     * The named design language the store is built on, or null if none is set.
     */
    language: any | null;
    /**
     * The merchant's one-sentence statement of the brand's intent, or null if not set.
     */
    north_star: string | null;
    /**
     * The brand colours, each with the role it plays.
     */
    palette: Array<{
        /**
         * Colour as `#RRGGBB`.
         */
        hex: string;
        /**
         * The part this colour plays in the layout.
         */
        role: 'primary' | 'secondary' | 'accent' | 'background' | 'surface' | 'text' | 'muted' | 'highlight';
        /**
         * The merchant's name for the colour, or null if not set.
         */
        name: string | null;
        /**
         * Share of the overall design this colour should occupy, or null if not set.
         */
        proportion: number | null;
    }>;
    /**
     * The merchant's own descriptions of the typefaces and how they are used.
     */
    typography: {
        /**
         * Heading typeface and its usage, or null if not set.
         */
        headings: string | null;
        /**
         * Body typeface and its usage, or null if not set.
         */
        body: string | null;
    };
    /**
     * Distinctive elements that make the brand recognisable.
     */
    signature: Array<string>;
    /**
     * The merchant's rule for when and where the accent colour is used, or null if not set.
     */
    accent_rule: string | null;
    /**
     * Guidance on photography and illustration style, or null if not set.
     */
    imagery: string | null;
    /**
     * Guidance on spacing, density and page structure, or null if not set.
     */
    layout: string | null;
    /**
     * Practices the merchant wants applied.
     */
    dos: Array<string>;
    /**
     * Practices the merchant wants avoided.
     */
    donts: Array<string>;
    /**
     * When the design system last changed.
     */
    updated_at: string;
};

