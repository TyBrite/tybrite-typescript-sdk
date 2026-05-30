/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Subcategory = {
    id?: string;
    category_id?: string;
    /**
     * ID of the parent subcategory, or null for a top-level subcategory directly under its category. Subcategories can be nested to arbitrary depth (e.g. Shoes → Men's → Sneakers).
     */
    parent_id?: string | null;
    name?: string;
    description?: string;
    /**
     * URL of the subcategory image
     */
    image?: string | null;
    /**
     * Whether the subcategory is active
     */
    active?: boolean;
    /**
     * Nested child subcategories. Only included when listing subcategories with tree=true, or when fetching a single subcategory with include=children; omitted otherwise.
     */
    children?: Array<Subcategory>;
    /**
     * Ancestor breadcrumb chain, ordered from the top-level subcategory down to the immediate parent (root-first). Only included when fetching a single subcategory with include=ancestors; empty for a top-level subcategory, omitted otherwise.
     */
    ancestors?: Array<Subcategory>;
    created_at?: string;
    updated_at?: string;
};

