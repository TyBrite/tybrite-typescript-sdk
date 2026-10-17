/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CodeSent } from '../models/CodeSent';
import type { Customer } from '../models/Customer';
import type { RegisterPending } from '../models/RegisterPending';
import type { ShopperSession } from '../models/ShopperSession';
import type { ShopperSignedIn } from '../models/ShopperSignedIn';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthenticationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Register customer account
     * Start a customer account with an email address and, optionally, a password. Registration does not
     * return a session. Every call, whatever the address, answers `202` with the same body and sends one
     * email: a confirmation code and link when the address is new, or a notice that an account already
     * exists when it is not. The account is created, and the first session issued, by
     * `POST /v1/auth/register/verify` with the emailed code or link. A shopper who has not confirmed the
     * address has no account, so nothing about the address can be learned from the response.
     *
     * A password is optional. An account created without one signs in with an emailed code
     * (`POST /v1/auth/magic-link`) and can set a password later with `POST /v1/auth/password/change`.
     *
     * The email must be a real, deliverable address; disposable and example domains (e.g. `example.com`)
     * are refused with `400 invalid_email`.
     *
     * **Password rule:** a password must be 8 to 72 characters long (counted as characters, not bytes) and must not
     * be on the list of commonly used passwords, which is compared without regard to case. A password that breaks the rule
     * is refused with `400 weak_password` and `details.rule` set to `too_short`, `too_long` or `common`. The rule is
     * checked before the email is looked up, so the refusal is the same whether or not the email already has an account.
     *
     * **Confirmation link:** `redirect_to` names the storefront page that receives the shopper from the
     * email. The email appends `?link_token=<token>` to it, and the page sends that token to
     * `POST /v1/auth/register/verify`. `redirect_to` must be on one of the store's allowed storefront
     * origins (set by the merchant in the dashboard); otherwise it is ignored and the email carries the
     * code only.
     *
     * One account exists per email address at a store. The same address can hold accounts at several
     * stores, each with its own password and sessions.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 5 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 60 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 20 attempts for one
     * email the call is slowed to one every 60 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns RegisterPending Confirmation required. The body is the same for a new address and for an address that already has an account.
     * @throws ApiError
     */
    public register({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Password, 8 to 72 characters, not on the list of commonly used passwords. Omit it to create an account that signs in with an emailed code.
             */
            password?: string;
            /**
             * Customer full name
             */
            name?: string;
            /**
             * Phone number with country code
             */
            phone?: string;
            /**
             * Whether the customer opted in to marketing communications at sign-up.
             * Defaults to false (opt-in). Pass the state of your sign-up form's
             * marketing opt-in checkbox.
             *
             */
            marketing_consent?: boolean;
            /**
             * Storefront page that receives the shopper from the confirmation email. Must be on one of the store's allowed storefront origins, or it is ignored.
             */
            redirect_to?: string;
        },
    }): CancelablePromise<RegisterPending> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request was refused. \`code\` is \`invalid_request\` when \`email\` is missing or a field has the
                wrong type, \`invalid_email\` when the address is malformed or uses a disposable or example domain,
                and \`weak_password\` when the password breaks the password rule (\`details.rule\` is \`too_short\`,
                \`too_long\` or \`common\`).
                `,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Confirm a new account
     * Confirm the address with the code from the confirmation email, or with the `link_token` the
     * email's link carries, and create the account. The response is the shopper's first session.
     *
     * A code is six digits, is valid for 15 minutes and is accepted 5 times; a `link_token` is single-use and
     * shares its code's expiry and attempts. A link needs no `email`. When the address already had an
     * account, the emailed code is consumed and the call answers `400 invalid_code`, the same as a wrong
     * code.
     *
     * A refused call states why in `details.reason`: `expired`, `too_many_attempts` or `wrong`. The
     * reason reveals nothing about the address, because a code exists for every address that registers.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 10 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 30 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 20 attempts for one
     * email the call is slowed to one every 30 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns ShopperSignedIn Account created and signed in.
     * @throws ApiError
     */
    public verifyRegistration({
        requestBody,
    }: {
        requestBody: {
            /**
             * The address that registered. Required with `code`.
             */
            email?: string;
            /**
             * The six-digit code from the confirmation email.
             */
            code?: string;
            /**
             * The `link_token` query parameter of the confirmation link. Replaces `email` and `code`.
             */
            link_token?: string;
        },
    }): CancelablePromise<ShopperSignedIn> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/register/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `\`invalid_code\` when the code or link is wrong, expired, used, or tried too many times
                (\`details.reason\` is \`expired\`, \`too_many_attempts\` or \`wrong\`); \`invalid_request\` when the
                body lacks \`email\` and \`code\`, or \`link_token\`.
                `,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Resend the confirmation email
     * Send a new confirmation code and link for an address that has registered and not yet confirmed.
     * The earlier code stops working. The call answers `202` with the same body for every address, and
     * sends one email: a fresh confirmation for a pending registration, or the notice that an account
     * exists when the address already has one.
     *
     * At most one email per address is sent every 60 seconds and five an hour; a call past that is
     * answered `202` and sends nothing.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 5 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 60 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 10 attempts for one
     * email the call is slowed to one every 60 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns RegisterPending Accepted. The body is the same for every address.
     * @throws ApiError
     */
    public resendRegistration({
        requestBody,
    }: {
        requestBody: {
            /**
             * The address that registered.
             */
            email: string;
            /**
             * Storefront page that receives the shopper from the email. Must be on one of the store's allowed storefront origins, or it is ignored.
             */
            redirect_to?: string;
        },
    }): CancelablePromise<RegisterPending> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/register/resend',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Login with email and password
     * Authenticate with an email address and password. Returns the shopper, the customer record and a
     * session.
     *
     * Every refusal that depends on the account answers `401 invalid_credentials` with the same body: an
     * address with no account, a wrong password, an account that has not been confirmed, a disabled
     * account, and an account that has no password (one created for sign-in by emailed code). The
     * response never tells which. `401 password_reset_required` is returned only after the correct
     * password, for an account that must set a new password with `POST /v1/auth/password/forgot` and
     * `POST /v1/auth/password/reset`.
     *
     * Repeated wrong passwords on one account lock it for a short period, during which every call for that
     * account answers `429 rate_limited` with a `Retry-After` header.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 10 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 15 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 50 attempts for one
     * email the call is slowed to one every 10 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns ShopperSignedIn Login successful
     * @throws ApiError
     */
    public login({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Customer password
             */
            password: string;
        },
    }): CancelablePromise<ShopperSignedIn> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `\`invalid_credentials\` for any refused sign-in, or \`password_reset_required\` when the password
                was correct and the account must set a new one. An invalid API key answers \`unauthorized\`.
                `,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Logout current session
     * End a session. The refresh token's whole session is revoked, so no refresh token issued since the
     * sign-in works again. The call answers `204` with no body for every request, including a refresh
     * token that is unknown or already ended, so a storefront can call it whenever a shopper leaves.
     *
     * An access token already issued remains valid until its `expires_at` (at most 15 minutes).
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** 20 requests per refresh token per 15 minutes. Beyond that the call returns
     * `429 rate_limited` with a `Retry-After` header.
     *
     * @returns void
     * @throws ApiError
     */
    public logout({
        requestBody,
    }: {
        requestBody?: {
            /**
             * The `refresh_token` of the session to end.
             */
            refresh_token?: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Send a sign-in code
     * Send a one-time sign-in code, and a link carrying it, to an address that has an account. Any
     * account can sign in this way, with or without a password. The code is six digits and is valid for 15
     * minutes. The call answers `202` with the same body for every address; an address without an account
     * receives no email and no account is created. The shopper completes sign-in with
     * `POST /v1/auth/verify-otp`.
     *
     * Sign-in by code is on for every store unless the merchant switches it off; `store.auth.passwordless`
     * in the store information reports the setting. When it is off, the call answers
     * `403 passwordless_disabled`.
     *
     * `redirect_to` names the storefront page that receives the shopper from the email, which appends
     * `?link_token=<token>` to it. It must be on one of the store's allowed storefront origins; otherwise
     * it is ignored and the email carries the code only.
     *
     * At most one email per address is sent every 60 seconds and five an hour; a call past that is
     * answered `202` and sends nothing.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 5 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 60 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 10 attempts for one
     * email the call is slowed to one every 60 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns CodeSent Accepted. The body is the same for every address.
     * @throws ApiError
     */
    public sendMagicLink({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Storefront page that receives the shopper from the email. Must be on one of the store's allowed storefront origins, or it is ignored.
             */
            redirect_to?: string;
        },
    }): CancelablePromise<CodeSent> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/magic-link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `\`passwordless_disabled\` when the store does not offer sign-in by emailed code, or \`forbidden\` when the call was made with a publishable key.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Verify a sign-in code
     * Complete sign-in with the code from the sign-in email, or with the `link_token` the email's link
     * carries. Returns the shopper, the customer record and a session. A link needs no `email`.
     *
     * A code is valid for 15 minutes, is accepted 5 times and works once; a `link_token` is single-use and
     * shares its code's expiry and attempts. A wrong, expired, used or unknown code answers
     * `400 invalid_code` with no reason, and an address without an account answers the same way. This
     * endpoint never creates an account.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 10 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 30 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 20 attempts for one
     * email the call is slowed to one every 30 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns ShopperSignedIn Signed in
     * @throws ApiError
     */
    public verifyOtp({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address. Required with `code`.
             */
            email?: string;
            /**
             * The six-digit code from the sign-in email.
             */
            code?: string;
            /**
             * The `link_token` query parameter of the sign-in link. Replaces `email` and `code`.
             */
            link_token?: string;
        },
    }): CancelablePromise<ShopperSignedIn> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/verify-otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `\`invalid_code\` when the code or link is not accepted; \`invalid_request\` when the body lacks \`email\` and \`code\`, or \`link_token\`.`,
                401: `Authentication failed - invalid or missing API key`,
                403: `\`passwordless_disabled\` when the store does not offer sign-in by emailed code, or \`forbidden\` when the call was made with a publishable key.`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Request a password reset
     * Send a password reset code, and a link carrying it, to an address that has an account. The call
     * answers `202` with the same body for every address; an address without an account receives no
     * email. The shopper completes the reset with `POST /v1/auth/password/reset`. The code is six digits
     * and is valid for 15 minutes.
     *
     * `redirect_to` names the storefront page that receives the shopper from the email, which appends
     * `?link_token=<token>` to it. It must be on one of the store's allowed storefront origins; otherwise
     * it is ignored and the email carries the code only.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 5 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 60 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 10 attempts for one
     * email the call is slowed to one every 60 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns CodeSent Accepted. The body is the same for every address.
     * @throws ApiError
     */
    public forgotPassword({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address
             */
            email: string;
            /**
             * Storefront page that receives the shopper from the email. Must be on one of the store's allowed storefront origins, or it is ignored.
             */
            redirect_to?: string;
        },
    }): CancelablePromise<CodeSent> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/password/forgot',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Reset a password
     * Set a new password with the code from the reset email, or with the `link_token` the email's link
     * carries. Every earlier session of the account ends, and the response is a new session. A link needs
     * no `email`. The account is also sent a notice that its password changed.
     *
     * A code is valid for 15 minutes, is accepted 5 times and works once. A wrong, expired or used code
     * answers `400 invalid_code` with no reason. The new password follows the password rule of
     * `POST /v1/auth/register`; a password that breaks it is refused with `400 weak_password`. The reset
     * also clears a `password_reset_required` state.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** with a secret key, past 10 attempts for one email address from one store in
     * 15 minutes, the call is slowed to one attempt every 30 seconds; other calls for that address
     * answer `429 rate_limited` with a `Retry-After` header giving the seconds until the next attempt is
     * accepted. With a publishable key, attempts are limited per calling address: 20 per address and email,
     * and 60 per address, in 15 minutes. Across every store and address, past 20 attempts for one
     * email the call is slowed to one every 30 seconds. Every attempt counts, successful or not,
     * and an address with no account is treated identically.
     *
     * @returns ShopperSignedIn Password changed and signed in.
     * @throws ApiError
     */
    public resetPassword({
        requestBody,
    }: {
        requestBody: {
            /**
             * Customer email address. Required with `code`.
             */
            email?: string;
            /**
             * The six-digit code from the reset email.
             */
            code?: string;
            /**
             * The `link_token` query parameter of the reset link. Replaces `email` and `code`.
             */
            link_token?: string;
            /**
             * New password, 8 to 72 characters, not on the list of commonly used passwords.
             */
            new_password: string;
        },
    }): CancelablePromise<ShopperSignedIn> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/password/reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `\`invalid_code\` when the code or link is not accepted; \`weak_password\` when the new password
                breaks the password rule (\`details.rule\` is \`too_short\`, \`too_long\` or \`common\`);
                \`invalid_request\` when \`new_password\`, or the code or link, is missing.
                `,
                401: `Authentication failed - invalid or missing API key`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Change or set a password
     * Change the password of the signed-in shopper, or set one for an account that has none. Every other
     * session of the account ends; the response carries a new session for the caller. The account is also
     * sent a notice that its password changed.
     *
     * `current_password` is required when the account has a password (`user.has_password` is `true`) and
     * is checked first; a wrong one answers `401 invalid_credentials` and counts toward the account's
     * lock. An account created for sign-in by emailed code has no password, so it omits
     * `current_password`. The new password follows the password rule of `POST /v1/auth/register`; a
     * password that breaks it is refused with `400 weak_password`.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** 5 password changes per sign-in token per 15 minutes. Beyond that the call
     * returns `429 rate_limited` with a `Retry-After` header.
     *
     * @returns any Password updated.
     * @throws ApiError
     */
    public changePassword({
        xAuthToken,
        requestBody,
    }: {
        /**
         * The store's sign-in token, the `access_token` of the shopper's session. A token that is expired, revoked, issued by another store or environment, or malformed answers `401 invalid_token`.
         */
        xAuthToken: string,
        requestBody: {
            /**
             * The password in use. Required when the account has a password.
             */
            current_password?: string;
            /**
             * New password, 8 to 72 characters, not on the list of commonly used passwords.
             */
            new_password: string;
        },
    }): CancelablePromise<{
        message: string;
        user: User;
        session: ShopperSession;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/password/change',
            headers: {
                'x-auth-token': xAuthToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `\`weak_password\` when the new password breaks the password rule (\`details.rule\` is \`too_short\`,
                \`too_long\` or \`common\`); \`invalid_request\` when \`new_password\` or a required \`current_password\`
                is missing.
                `,
                401: `\`invalid_token\` when the sign-in token is not valid for this store, \`invalid_credentials\` when \`current_password\` is wrong, or \`unauthorized\` for an invalid API key.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Refresh access token
     * Exchange a refresh token for a new session. The refresh token is valid for 30 days from its last use and
     * works once: the response carries a replacement, and the earlier token stops working the moment the
     * new one is issued. A storefront stores the new pair on every refresh.
     *
     * A refresh that cannot be honoured answers `401 invalid_refresh_token`: the token has expired, its
     * session was ended by logout or a password change, it belongs to another store or environment, or it
     * was presented a second time. Presenting a used token again ends its whole session. Two refreshes
     * with the same token at once therefore leave one of them refused, so a storefront serialises
     * refreshes per session. On `invalid_refresh_token` the shopper is signed out.
     *
     * **Secret key required.** This endpoint requires a secret key (`tybrite_sk_*`). Publishable keys
     * answer `403 forbidden`. Account calls are made from a server, which then holds the shopper's session.
     *
     * **Attempt limits:** 20 refreshes per refresh token per 15 minutes. Beyond that the call returns
     * `429 rate_limited` with a `Retry-After` header.
     *
     * @returns any Token refreshed
     * @throws ApiError
     */
    public refreshToken({
        requestBody,
    }: {
        requestBody: {
            /**
             * The `refresh_token` of the current session.
             */
            refresh_token: string;
        },
    }): CancelablePromise<{
        /**
         * Success message
         */
        message: string;
        session: ShopperSession;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `\`invalid_refresh_token\` when the session has ended, or \`unauthorized\` for an invalid API key.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get current user
     * Return the signed-in shopper and their customer record, read from the sign-in token. A token that
     * is expired, revoked, issued by another store or environment, or malformed answers
     * `401 invalid_token`; a storefront refreshes once and treats the shopper as signed out if that
     * fails. `customer` is `null` when the key belongs to a marketplace.
     *
     * This endpoint accepts a secret or a publishable key.
     *
     * **Attempt limits:** 120 requests per sign-in token per minute. Beyond that the call returns
     * `429 rate_limited` with a `Retry-After` header.
     *
     * @returns any Success
     * @throws ApiError
     */
    public getCurrentUser({
        xAuthToken,
    }: {
        /**
         * The store's sign-in token, the `access_token` of the shopper's session. A token that is expired, revoked, issued by another store or environment, or malformed answers `401 invalid_token`.
         */
        xAuthToken: string,
    }): CancelablePromise<{
        user: User;
        customer: (Customer | null);
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/auth/me',
            headers: {
                'x-auth-token': xAuthToken,
            },
            errors: {
                400: `Invalid request - malformed data or missing required fields`,
                401: `\`invalid_token\` when the sign-in token is not valid for this store, or \`unauthorized\` for an invalid API key.`,
                403: `Insufficient permissions - operation requires secret key`,
                429: `Too many requests. Two distinct \`429\` codes: \`rate_limited\` (an abuse throttle — too many requests too fast; carries an \`X-RateLimit-Scope: abuse\` header and is NOT counted against your monthly quota) and \`quota_exceeded\` (your plan's monthly request allowance is reached).`,
                500: `Internal server error`,
            },
        });
    }
}
