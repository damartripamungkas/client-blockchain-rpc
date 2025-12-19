import type { IAddress, IHash, IResultBlock } from "./payloads.ethereum"

/**
 * Result debug dump block object
 */
export type IResultDumpBlock = {
  /**
   * The block root hash
   *
   * @example
   * "0x..."
   */
  root: string
  /**
   * The accounts in the block state
   */
  accounts: Record<
    string,
    {
      /**
       * The account balance
       *
       * @example
       * "0xde0b6b3a7640000"
       */
      balance: string
      /**
       * The account nonce
       *
       * @example
       * 1
       */
      nonce: number
      /**
       * The account code hash
       *
       * @example
       * "0x..."
       */
      codeHash: string
      /**
       * The account code
       *
       * @example
       * "0x60806040..."
       */
      code: string
      /**
       * The account storage
       *
       * @example
       * { "0x000...": "0x001..." }
       */
      storage: Record<string, string>
    }
  >
}

/**
 * Result debug GC stats object
 */
export type IResultGcStats = {
  /**
   * The last GC time
   *
   * @example
   * "2023-10-27T10:00:00Z"
   */
  LastGC: string
  /**
   * Number of completed GC cycles
   *
   * @example
   * 100
   */
  NumGC: number
  /**
   * Total pause time in nanoseconds
   *
   * @example
   * 5000000
   */
  PauseTotal: number
  /**
   * Recent pause times in nanoseconds
   *
   * @example
   * [100000, 200000]
   */
  Pause: number[]
  /**
   * End times of recent GC pauses
   *
   * @example
   * ["2023-10-27T10:00:01Z", "2023-10-27T10:00:02Z"]
   */
  PauseEnd: string[]
  /**
   * Quantile statistics for pause times
   *
   * @example
   * [100000, 200000, 300000]
   */
  PauseQuantiles: null | number[]
}

/**
 * Result debug bad block object
 */
export type IResultBadBlock = {
  /**
   * The block hash
   *
   * @example
   * "0x..."
   */
  hash: IHash
  /**
   * The block object
   */
  block: IResultBlock
  /**
   * The reason the block is bad
   *
   * @example
   * "invalid merkle root"
   */
  reason: string
}

/**
 * Result debug storage range object
 */
export type IResultStorageRange = {
  /**
   * The storage entries
   */
  storage: Record<
    string,
    {
      /**
       * The storage key
       *
       * @example
       * "0x..."
       */
      key: string
      /**
       * The storage value
       *
       * @example
       * "0x..."
       */
      value: string
    }
  >
  /**
   * The next key for pagination, null if no more entries
   *
   * @example
   * "0x..."
   */
  nextKey: string | null
}

/**
 * Result debug trace object (default structLogs tracer)
 */
export type IResultTrace = {
  /**
   * The gas used by the call
   *
   * @example
   * 21000
   */
  gas: number
  /**
   * Whether the call failed
   *
   * @example
   * false
   */
  failed: boolean
  /**
   * The return value of the call
   *
   * @example
   * "0x"
   */
  returnValue: string
  /**
   * The struct logs of the trace
   */
  structLogs: Array<{
    /**
     * The program counter
     *
     * @example
     * 0
     */
    pc: number
    /**
     * The opcode
     *
     * @example
     * "PUSH1"
     */
    op: string
    /**
     * The remaining gas
     *
     * @example
     * 20000
     */
    gas: number
    /**
     * The gas cost of the operation
     *
     * @example
     * 3
     */
    gasCost: number
    /**
     * The execution depth
     *
     * @example
     * 1
     */
    depth: number
    /**
     * The stack
     *
     * @example
     * ["0x60"]
     */
    stack: string[]
    /**
     * The memory
     *
     * @example
     * ["0x00...00"]
     */
    memory: string[]
    /**
     * The storage
     *
     * @example
     * { "0x000...": "0x001..." }
     */
    storage: Record<string, string>
  }>
}

/**
 * Result call tracer object
 */
export type IResultCallTrace = {
  /**
   * The call type
   *
   * @example
   * "CALL"
   * "STATICCALL"
   * "DELEGATECALL"
   * "CREATE"
   */
  type: string
  /**
   * The from address
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  from: IAddress
  /**
   * The to address
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  to: IAddress
  /**
   * The value transferred
   *
   * @example
   * "0x0"
   */
  value: string
  /**
   * The gas provided
   *
   * @example
   * "0x5208"
   */
  gas: string
  /**
   * The gas used
   *
   * @example
   * "0x5208"
   */
  gasUsed: string
  /**
   * The input data
   *
   * @example
   * "0x..."
   */
  input: string
  /**
   * The output data
   *
   * @example
   * "0x..."
   */
  output: string
  /**
   * The error message if the call failed
   *
   * @example
   * "execution reverted"
   */
  error?: string
  /**
   * The revert reason if the call reverted
   *
   * @example
   * "0x..."
   */
  revertReason?: string
  /**
   * The nested calls
   */
  calls?: IResultCallTrace[]
}

/**
 * Object to specify custom options for the tracer.
 * @template T - The tracer name, defaults to undefined (structLog tracer)
 */
export type ITraceOptions<T extends string | undefined = undefined> = {
  /**
   * Name of the tracer.
   * - callTracer: The calltracer keeps track of all call frames, including depth 0 calls, that are made during a transaction
   * - prestateTracer: The prestateTracer replays the transaction and tracks every part of state that occured during the transaction
   *
   * @example
   * "callTracer"
   * "prestateTracer"
   */
  tracer?: T
  /**
   * Tracer configuration object.
   *
   * @example
   * { onlyTopCall: true }
   */
  tracerConfig?: {
    /**
     * When set to true, this will only trace the primary (top-level) call and not any sub-calls. It eliminates the additional processing for each call frame
     *
     * @example
     * true
     * false
     */
    onlyTopCall: boolean
    /**
     * When set to true, diff mode returns the differences between the transaction's pre and post-state. The result object will contain a pre and a post object.
     *
     * @example
     * true
     * false
     */
    diffMode: boolean
  }
  /**
   * Timeout override.
   *
   * @example
   * "10s"
   */
  timeout?: string
  /**
   * Number of re-executions allowed.
   *
   * @example
   * 100
   */
  reexec?: number
}

/**
 * Conditional type that maps tracer name to the correct result type.
 * - "callTracer" → IResultCallTrace
 * - undefined or other → IResultTrace
 */
export type ITraceResult<T extends string | undefined> = T extends `callTracer` ? IResultCallTrace : IResultTrace
