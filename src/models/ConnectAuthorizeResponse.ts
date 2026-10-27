/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConnectAuthorizeResponse = {
    valid: boolean;
    client: {
        client_id: string;
        name: string;
        description?: string | null;
        logo_url?: string | null;
    };
    request: {
        redirect_uri: string;
        scopes: Array<string>;
        /**
         * `identity` asks only to sign the person in (no store, no keys); `login_link` signs the person in and
         * links a store they own; `store` is a store connection without sign-in.
         *
         */
        mode?: ConnectAuthorizeResponse.mode;
        /**
         * The `store_hint` from the request when it is a valid UUID; the consent screen preselects it only for a store the signed-in user owns.
         */
        store_hint?: string | null;
        state: string;
        environment: ConnectAuthorizeResponse.environment;
        /**
         * True when the application registered a webhook URL, so connecting also creates a webhook
         * subscription for the store (the consent screen can disclose the resulting event feed).
         *
         */
        receives_webhooks?: boolean;
    };
};
export namespace ConnectAuthorizeResponse {
    /**
     * `identity` asks only to sign the person in (no store, no keys); `login_link` signs the person in and
     * links a store they own; `store` is a store connection without sign-in.
     *
     */
    export enum mode {
        IDENTITY = 'identity',
        LOGIN_LINK = 'login_link',
        STORE = 'store',
    }
    export enum environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

