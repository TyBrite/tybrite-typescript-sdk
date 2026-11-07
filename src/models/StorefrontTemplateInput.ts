/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StorefrontTemplateInput = {
    /**
     * What the merchant sees when asked to accept it.
     */
    name: string;
    /**
     * One line about the template.
     */
    summary?: string | null;
    /**
     * The version being offered. A new version is a new offer the merchant is asked about again; repeating the same version does not ask again.
     */
    version: string;
    /**
     * An `https` address where the merchant can look at the template before deciding.
     */
    preview_url?: string | null;
};

