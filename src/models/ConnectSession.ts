/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConnectSession = {
    /**
     * Unique identifier for this connection session.
     */
    session_id: string;
    /**
     * Client identifier of the connected application.
     */
    client_id: string;
    /**
     * Display name of the connected application.
     */
    client_name: string;
    /**
     * Logo URL of the connected application.
     */
    client_logo_url?: string | null;
    /**
     * Whether this connection is scoped to live or test data.
     */
    environment: ConnectSession.environment;
    /**
     * Permission scopes granted to this application.
     */
    scopes: Array<string>;
    /**
     * When the merchant authorized this connection.
     */
    connected_at: string;
    /**
     * When an API call was last made with this connection's keys. Null if never used.
     */
    last_used_at?: string | null;
    /**
     * Key pair identifier. Use this to revoke via `POST /v1/connect/revoke`.
     */
    pair_id: string;
};
export namespace ConnectSession {
    /**
     * Whether this connection is scoped to live or test data.
     */
    export enum environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

