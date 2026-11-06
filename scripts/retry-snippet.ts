// ===== TYBRITE-RETRY-BLOCK-START =====

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const IDEMPOTENT_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']);

const retrySleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Parse a Retry-After header (delta-seconds or HTTP-date) into milliseconds, or null. */
const parseRetryAfter = (response: Response): number | null => {
    const raw = response.headers.get('Retry-After');
    if (!raw) return null;
    const asInt = Number(raw);
    if (Number.isFinite(asInt)) return Math.max(0, asInt * 1000);
    const asDate = Date.parse(raw);
    if (!Number.isNaN(asDate)) return Math.max(0, asDate - Date.now());
    return null;
};

/**
 * Is this request safe to auto-retry on an HTTP failure status?
 * Idempotent methods always are. POST/PATCH only when an Idempotency-Key header is present
 * (Headers.has is case-insensitive), so server-side dedupe protects against duplicate side effects.
 */
const isRetryableRequest = (options: ApiRequestOptions, headers: Headers): boolean => {
    const method = (options.method || 'GET').toUpperCase();
    if (IDEMPOTENT_METHODS.has(method)) return true;
    return headers.has('Idempotency-Key');
};

/**
 * Wraps sendRequest with bounded exponential-backoff-with-jitter retries.
 * config.MAX_RETRIES <= 0 disables retries entirely (single attempt).
 */
export const sendRequestWithRetry = async (
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: any,
    formData: FormData | undefined,
    headers: Headers,
    onCancel: OnCancel
): Promise<Response> => {
    const maxRetries = Math.max(0, config.MAX_RETRIES ?? 2);
    const baseDelay = Math.max(0, config.RETRY_DELAY_MS ?? 500);
    const httpRetryAllowed = maxRetries > 0 && isRetryableRequest(options, headers);

    let attempt = 0;
    // total attempts = 1 + maxRetries
    while (true) {
        try {
            const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
            if (!httpRetryAllowed || attempt >= maxRetries || !RETRYABLE_STATUS.has(response.status)) {
                return response;
            }
            const retryAfter = parseRetryAfter(response);
            const backoff = retryAfter ?? baseDelay * 2 ** attempt + Math.floor(Math.random() * baseDelay);
            attempt += 1;
            if (onCancel.isCancelled) return response;
            await retrySleep(backoff);
        } catch (error) {
            // Network-level failure: nothing reached the server, so even a non-idempotent
            // POST/PATCH is safe to retry here. Still bounded by maxRetries / cancellation.
            if (maxRetries <= 0 || attempt >= maxRetries || onCancel.isCancelled) throw error;
            const backoff = baseDelay * 2 ** attempt + Math.floor(Math.random() * baseDelay);
            attempt += 1;
            await retrySleep(backoff);
        }
    }
};

// ===== TYBRITE-RETRY-BLOCK-END =====
