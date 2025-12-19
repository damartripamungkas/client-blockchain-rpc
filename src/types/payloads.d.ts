/**
 * Custom result type for Solana RPC methods.
 * Used when methods return simplified values instead of full objects.
 * - `"value"`: Returns only the value field from the response
 *
 * @example
 * "value"
 */
export type TCrd = `value`

/**
 * Custom result type options for Solana RPC methods.
 * - `"value"`: Returns only the value field from the response
 * - `"full"`: Returns the complete response object including context
 *
 * @example
 * "value"
 * "full"
 */
export type TCr = TCrd | `full`
