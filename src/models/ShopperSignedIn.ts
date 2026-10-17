/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { ShopperSession } from './ShopperSession';
import type { User } from './User';
/**
 * A successful sign-in, sign-up verification or password reset.
 */
export type ShopperSignedIn = {
    message: string;
    user: User;
    /**
     * The shopper's customer record at this store. `null` when the key belongs to a marketplace, where a shopper holds an account without a per-store record.
     */
    customer: (Customer | null);
    session: ShopperSession;
};

