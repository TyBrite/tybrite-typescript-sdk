/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReviewSummary = {
    /**
     * Total number of approved reviews for the product.
     */
    total_reviews: number;
    /**
     * Average star rating across all approved reviews.
     */
    average_rating: number;
    five_star: number;
    four_star: number;
    three_star: number;
    two_star: number;
    one_star: number;
    /**
     * Number of approved reviews marked as verified purchases.
     */
    verified_count: number;
};

