import type { IAddress, IResultTransaction } from "./payloads.ethereum"

/**
 * Result txpool content object
 */
export type IResultTxPoolContent = {
  /**
   * The pending transactions, keyed by address and nonce
   *
   * @example
   * {
   *   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
   *     "1": { ... transaction object ... }
   *   }
   * }
   */
  pending: Record<IAddress, Record<string, IResultTransaction>>
  /**
   * The queued transactions, keyed by address and nonce
   *
   * @example
   * {
   *   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
   *     "5": { ... transaction object ... }
   *   }
   * }
   */
  queued: Record<IAddress, Record<string, IResultTransaction>>
}

/**
 * Result txpool inspect object
 */
export type IResultTxPoolInspect = {
  /**
   * The pending transactions summary, keyed by address and nonce
   *
   * @example
   * {
   *   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
   *     "1": "0x... -> 0x...: 0 wei + 21000 gas × 1000000000 wei"
   *   }
   * }
   */
  pending: Record<IAddress, Record<string, string>>
  /**
   * The queued transactions summary, keyed by address and nonce
   *
   * @example
   * {
   *   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
   *     "5": "0x... -> 0x...: 0 wei + 21000 gas × 1000000000 wei"
   *   }
   * }
   */
  queued: Record<IAddress, Record<string, string>>
}

/**
 * Result txpool status object
 */
export type IResultTxPoolStatus = {
  /**
   * The number of pending transactions
   *
   * @example
   * 10
   */
  pending: number
  /**
   * The number of queued transactions
   *
   * @example
   * 5
   */
  queued: number
}
