import type { IHash } from "./payloads.ethereum"

/**
 * Result LES client info object
 */
export type IResultLesClientInfo = Record<
  string,
  {
    /**
     * Whether the client is known
     *
     * @example
     * true
     */
    isKnown: boolean
    /**
     * The client connection type
     *
     * @example
     * "static"
     */
    connectionType: string
    /**
     * The priority level
     *
     * @example
     * 100
     */
    priority: number
    /**
     * The connection time
     *
     * @example
     * 1635328800
     */
    connectionTime: number
    /**
     * Whether the client is a trusted
     *
     * @example
     * false
     */
    trusted: boolean
  }
>

/**
 * Result LES checkpoint object
 */
export type IResultLesCheckpoint = {
  /**
   * The section index
   *
   * @example
   * 123
   */
  sectionIndex: number
  /**
   * The section head hash
   *
   * @example
   * "0x..."
   */
  sectionHead: IHash
  /**
   * The CHT root hash
   *
   * @example
   * "0x..."
   */
  chtRoot: IHash
  /**
   * The bloom trie root hash
   *
   * @example
   * "0x..."
   */
  bloomTrieRoot: IHash
}

/**
 * Result LES server info object
 */
export type IResultLesServerInfo = {
  /**
   * The free client capacity
   *
   * @example
   * 100
   */
  freeClientCapacity: number
  /**
   * The maximum client capacity
   *
   * @example
   * 1000
   */
  maximumClientCapacity: number
  /**
   * The minimum recharge rate
   *
   * @example
   * 10
   */
  minimumRechargeRate: number
  /**
   * The total capacity
   *
   * @example
   * 10000
   */
  totalCapacity: number
  /**
   * The total connected capacity
   *
   * @example
   * 500
   */
  totalConnectedCapacity: number
  /**
   * The priority connected capacity
   *
   * @example
   * 200
   */
  priorityConnectedCapacity: number
}
