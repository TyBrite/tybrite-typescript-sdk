/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from './SearchResult';
export type SearchResponse = {
    query?: string;
    results?: Array<SearchResult>;
    totalResults?: number;
    searchTimeMs?: number;
    message?: string;
};

