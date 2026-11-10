/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchRedirect } from './SearchRedirect';
import type { SearchResult } from './SearchResult';
export type SearchResponse = {
    query?: string;
    results?: Array<SearchResult>;
    totalResults?: number;
    message?: string;
    /**
     * Store-scoped searches: the merchant's redirect for this query, or null when there is none. Absent on a marketplace-wide search.
     */
    redirect?: (SearchRedirect | null);
};

