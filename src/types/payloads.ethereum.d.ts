/**
 * A Block Tag.
 *
 * @example
 * "latest"
 * "earliest"
 * "pending"
 * "safe"
 * "finalized"
 * "0x1b4" // Hex block number
 */
export type IBlockTag = `latest` | `earliest` | `pending` | `safe` | `finalized` | string | number | bigint

/**
 * An Ethereum Address (20 bytes).
 *
 * @example
 * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
 */
export type IAddress = string

/**
 * A 32-byte Hash (DATA, 32 Bytes).
 *
 * @example
 * "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3"
 */
export type IHash = string

/**
 * A Hex String (DATA, unformatted).
 *
 * @example
 * "0x123abc"
 */
export type IHexString = string

/**
 * A Quantity (QUANTITY, integer).
 *
 * @example
 * "0x123" // Hex
 * 291 // Number
 * 291n // BigInt
 */
export type IQuantity = string | number | bigint

/**
 * Block Override (Object).
 *
 * @example
 * {
 *   "number": "0x1b4",
 *   "time": "0x5"
 * }
 */
export type IBlockOverride = Record<string, any>

/**
 * Simulation Context (Object).
 */
export type ISimulationContext = {
  /**
   * A Block Tag position.
   *
   * @example
   * "latest"
   * "earliest"
   * "pending"
   * "safe"
   * "finalized"
   * "0x1b4" // Hex block number
   */
  blockNumber?: IBlockTag
  /**
   * The transaction index of the simulated transactions. Default value of the transaction index is -1, which would place the simulated transactions after the entire block.
   *
   * @example
   * 0
   * -1
   */
  transactionIndex?: IQuantity
}

/**
 * A Log Topic (DATA, 32 Bytes).
 *
 * @example
 * "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
 * ["0xddf252ad...", "0x..."]
 * null
 */
export type ITopic = IHash | IHash[] | null

export type ITransactionRequest = {
  /**
   * The address from which the transaction is sent.
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  from?: IAddress
  /**
   * The address the transaction is directed to.
   *
   * If this field is omitted or `null`, the transaction is treated as a contract creation.
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // Send to specific address
   */
  to?: IAddress
  /**
   * The maximum amount of gas provided for the transaction execution.
   *
   * @example
   * "0x5208" // 21000 (basic transfer)
   * 21000
   */
  gas?: IQuantity
  /**
   * The gas price willing to be paid for the transaction, in wei.
   *
   * This is used for legacy transactions (Type 0) or EIP-2930 transactions (Type 1).
   * For EIP-1559 transactions (Type 2), use `maxFeePerGas` and `maxPriorityFeePerGas` instead.
   *
   * @example
   * "0x4a817c800" // 20 Gwei
   */
  gasPrice?: IQuantity
  /**
   * The value transferred with this transaction, in wei.
   *
   * @example
   * "0xde0b6b3a7640000" // 1 ETH
   */
  value?: IQuantity
  /**
   * The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
   *
   * @example
   * "0xa9059cbb000000000000000000000000..." // ERC20 transfer(address,uint256)
   */
  data?: IHexString
  /**
   * An alias for `data`. Prefer using `data` if possible for consistency.
   *
   * @deprecated standard JSON-RPC uses `data`.
   */
  input?: IHexString
  /**
   * The integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
   *
   * @example
   * "0x1" // Nonce 1
   */
  nonce?: IQuantity
  /**
   * The Chain ID that this transaction is valid on. Prevents replay attacks on other networks.
   *
   * @example
   * "0x1" // Ethereum Mainnet
   */
  chainId?: IQuantity
  /**
   * The maximum fee per gas willing to be paid, in wei. (EIP-1559)
   *
   * This represents the absolute maximum you are willing to pay per unit of gas, including both the base fee and the priority fee.
   *
   * @example
   * "0x4a817c800" // 20 Gwei
   */
  maxFeePerGas?: IQuantity
  /**
   * The maximum priority fee per gas (miner tip), in wei. (EIP-1559)
   *
   * This part of the fee goes directly to the validator/miner.
   *
   * @example
   * "0x3b9aca00" // 1 Gwei
   */
  maxPriorityFeePerGas?: IQuantity
  /**
   * The transaction type identifier.
   *
   * - `0x0`: Legacy transaction
   * - `0x1`: EIP-2930 (Access List)
   * - `0x2`: EIP-1559 (Fee Market)
   * - `0x3`: EIP-4844 (Blob)
   *
   * @example
   * "0x2" // EIP-1559
   */
  type?: IQuantity
  /**
   * An optional list of addresses and storage keys that the transaction plans to access. (EIP-2930)
   *
   * Including an access list can reduce gas costs for accessing these storage slots.
   *
   * @example
   * [
   *   {
   *     address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
   *     storageKeys: ["0x0000000000000000000000000000000000000000000000000000000000000001"]
   *   }
   * ]
   */
  accessList?: IAccessList
  /**
   * List of blobs associated with the transaction. (EIP-4844)
   *
   * @example
   * ["0x01..."]
   */
  blobs?: IHexString[]
  /**
   * List of versioned hashes for the blobs. (EIP-4844)
   *
   * @example
   * ["0x01..."]
   */
  blobVersionedHashes?: IHash[]
}

/**
 * Access List (EIP-2930).
 */
export type IAccessList = Array<{
  /**
   * The address to be accessed.
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  address: IAddress
  /**
   * A list of storage keys to be accessed.
   *
   * @example
   * ["0x0000000000000000000000000000000000000000000000000000000000000001"]
   */
  storageKeys: IHash[]
}>

/**
 * Filter options object.
 */
export type IFilter = {
  /**
   * Integer block number to start searching from.
   *
   * @example
   * "latest"
   * "earliest"
   * "pending"
   * "safe"
   * "finalized"
   * "0x1b4" // Hex block number
   */
  fromBlock?: IBlockTag
  /**
   * Integer block number to stop searching at.
   *
   * @example
   * "latest"
   * "earliest"
   * "pending"
   * "safe"
   * "finalized"
   * "0x1b4" // Hex block number
   */
  toBlock?: IBlockTag
  /**
   * Contract address or a list of addresses from which logs should originate.
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  address?: IAddress | IAddress[]
  /**
   * Array of 32 Bytes DATA topics. Topics are order-dependent.
   * Each topic can also be an array of DATA with "OR" options.
   *
   * @example
   * ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", null, "0x000000000000000000000000d8dA6BF26964aF9D7eEd9e03E53415D37aA96045"]
   */
  topics?: ITopic[]
  /**
   * With the addition of EIP-234, blockHash restricts the logs returned to the single block with the 32-byte hash blockHash.
   * Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash.
   * If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed.
   *
   * @example
   * "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3"
   */
  blockHash?: IHash
}

/**
 * State Override object.
 */
export type IStateOverride = {
  /**
   * Fake balance to set for the account.
   *
   * @example
   * "0xde0b6b3a7640000" // 1 ETH
   */
  balance?: IQuantity
  /**
   * Fake nonce to set for the account.
   *
   * @example
   * "0x1"
   */
  nonce?: IQuantity
  /**
   * Fake byte code to set for the account.
   *
   * @example
   * "0x60806040..."
   */
  code?: IHexString
  /**
   * Fake key-value mapping to override individual storage slots.
   *
   * @example
   * { "0x0000000000000000000000000000000000000000000000000000000000000001": "0x1" }
   */
  state?: Record<IHash, IHash>
  /**
   * Fake key-value mapping to override individual storage slots (diff).
   *
   * @example
   * { "0x0000000000000000000000000000000000000000000000000000000000000001": "0x1" }
   */
  stateDiff?: Record<IHash, IHash>
}

/**
 * A set of state overrides, keyed by address.
 *
 * @example
 * {
 *   "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": {
 *     "balance": "0xde0b6b3a7640000"
 *   }
 * }
 */
export type IStateOverrideSet = Record<IAddress, IStateOverride>

/**
 * Result Log object.
 */
export type IResultLog = {
  /**
   * True when the log was removed, due to a chain reorganization. False if it's a valid log
   *
   * @example
   * false
   */
  removed: boolean
  /**
   * Integer of the log index position in the block. Null when the log is pending
   *
   * @example
   * "0x1"
   */
  logIndex: IQuantity | null
  /**
   * Integer of the transactions index position from which the log was created. Null when the log is pending
   *
   * @example
   * "0x0"
   */
  transactionIndex: IQuantity | null
  /**
   * Hash of the transaction from which this log was created. Null when the log is pending
   *
   * @example
   * "0x..."
   */
  transactionHash: IHash | null
  /**
   * Hash of the block where this log was in. Null when the log is pending
   *
   * @example
   * "0x..."
   */
  blockHash: IHash | null
  /**
   * The block number where this log was in. Null when the log is pending
   *
   * @example
   * "0x1b4"
   */
  blockNumber: IQuantity | null
  /**
   * Address from which this log originated
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  address: IAddress
  /**
   * Contains zero or more 32 Bytes non-indexed arguments of the log
   *
   * @example
   * "0x..."
   */
  data: IHexString
  /**
   * Array of 0 to 4 32 Bytes of indexed log arguments
   *
   * @example
   * ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
   */
  topics: ITopic[]
}

/**
 * Result transaction receipt object.
 */
export type IResultTransactionReceipt = {
  /**
   * Hash of the transaction
   *
   * @example
   * "0x..."
   */
  transactionHash: IHash
  /**
   * Integer of the transaction's index position in the block
   *
   * @example
   * "0x0"
   */
  transactionIndex: IQuantity
  /**
   * Hash of the block where this transaction was in
   *
   * @example
   * "0x..."
   */
  blockHash: IHash
  /**
   * Block number where this transaction was in
   *
   * @example
   * "0x1b4"
   */
  blockNumber: IQuantity
  /**
   * Address of the sender
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  from: IAddress
  /**
   * Address of the receiver. Null when it's a contract creation transaction
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  to: IAddress | null
  /**
   * The total amount of gas used when this transaction was executed in the block
   *
   * @example
   * "0x5208"
   */
  cumulativeGasUsed: IQuantity
  /**
   * The amount of gas used by this specific transaction alone
   *
   * @example
   * "0x5208"
   */
  gasUsed: IQuantity
  /**
   * The contract address created, if the transaction was a contract creation. Otherwise null
   *
   * @example
   * "0x..."
   */
  contractAddress: IAddress | null
  /**
   * Array of log objects, which this transaction generated
   */
  logs: IResultLog[]
  /**
   * Bloom filter for light clients to quickly retrieve related logs
   *
   * @example
   * "0x00000..."
   */
  logsBloom: IHexString
  /**
   * The transaction type (EIP-2718)
   *
   * @example
   * "0x2"
   */
  type?: IQuantity
  /**
   * Post-transaction stateroot (pre Byzantium)
   *
   * @example
   * "0x..."
   */
  root?: IHash
  /**
   * Either 1 (success) or 0 (failure) (post Byzantium)
   *
   * @example
   * "0x1"
   */
  status?: IQuantity
  /**
   * The actual value per gas deducted from the sender's account (EIP-1559)
   *
   * @example
   * "0x4a817c800"
   */
  effectiveGasPrice?: IQuantity
  /**
   * The amount of blob gas used by the transaction (EIP-4844)
   *
   * @example
   * "0x20000"
   */
  blobGasUsed?: IQuantity
  /**
   * The price per blob gas (EIP-4844)
   *
   * @example
   * "0x1"
   */
  blobGasPrice?: IQuantity
}

/**
 * Result transaction object.
 */
export type IResultTransaction = {
  /**
   * The block hash. Null when the transaction is pending
   *
   * @example
   * "0x..."
   */
  blockHash: IHash | null
  /**
   * The block number. Null when the transaction is pending
   *
   * @example
   * "0x1b4"
   */
  blockNumber: IQuantity | null
  /**
   * Address of the sender
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  from: IAddress
  /**
   * Gas provided by the sender
   *
   * @example
   * "0x5208"
   */
  gas: IQuantity
  /**
   * Gas price provided by the sender in wei
   *
   * @example
   * "0x4a817c800"
   */
  gasPrice: IQuantity
  /**
   * Hash of the transaction
   *
   * @example
   * "0x..."
   */
  hash: IHash
  /**
   * The data sent along with the transaction
   *
   * @example
   * "0xa9059cbb000000000000000000000000..."
   */
  input: IHexString
  /**
   * The number of transactions made by the sender prior to this one
   *
   * @example
   * "0x1"
   */
  nonce: IQuantity
  /**
   * Address of the receiver. Null when it's a contract creation transaction
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  to: IAddress | null
  /**
   * Integer of the transaction's index position in the block. Null when the transaction is pending
   *
   * @example
   * "0x0"
   */
  transactionIndex: IQuantity | null
  /**
   * Value transferred in wei
   *
   * @example
   * "0xde0b6b3a7640000"
   */
  value: IQuantity
  /**
   * ECDSA recovery id
   *
   * @example
   * "0x1b"
   */
  v: IQuantity
  /**
   * ECDSA signature r
   *
   * @example
   * "0x..."
   */
  r: IQuantity
  /**
   * ECDSA signature s
   *
   * @example
   * "0x..."
   */
  s: IQuantity
  /**
   * Transaction type (EIP-2718): 0x0=legacy, 0x1=EIP-2930, 0x2=EIP-1559, 0x3=EIP-4844
   *
   * @example
   * "0x2"
   */
  type?: IQuantity
  /**
   * Chain ID that this transaction is valid on
   *
   * @example
   * "0x1"
   */
  chainId?: IQuantity
  /**
   * List of addresses and storage keys the transaction plans to access (EIP-2930)
   */
  accessList?: IAccessList
  /**
   * Maximum fee per gas the sender is willing to pay (EIP-1559)
   *
   * @example
   * "0x4a817c800"
   */
  maxFeePerGas?: IQuantity
  /**
   * Maximum priority tip per gas the sender is willing to pay (EIP-1559)
   *
   * @example
   * "0x3b9aca00"
   */
  maxPriorityFeePerGas?: IQuantity
  /**
   * The parity of the y-value of a secp256k1 signature
   *
   * @example
   * "0x0"
   * "0x1"
   */
  yParity?: IQuantity
}

/**
 * Result block object
 */
export type IResultBlock = {
  /**
   * The block number. Null when the block is pending
   *
   * @example
   * "0x1b4"
   */
  number: IQuantity | null
  /**
   * Hash of the block. Null when the block is pending
   *
   * @example
   * "0x..."
   */
  hash: IHash | null
  /**
   * Hash of the parent block
   *
   * @example
   * "0x..."
   */
  parentHash: IHash
  /**
   * Hash of the generated proof-of-work. Null when the block is pending
   *
   * @example
   * "0x0000000000000000"
   */
  nonce: IHexString | null
  /**
   * SHA3 of the uncles data in the block
   *
   * @example
   * "0x..."
   */
  sha3Uncles: IHash
  /**
   * The bloom filter for the logs of the block. Null when the block is pending
   *
   * @example
   * "0x00000..."
   */
  logsBloom: IHexString | null
  /**
   * The root of the transaction trie of the block
   *
   * @example
   * "0x..."
   */
  transactionsRoot: IHash
  /**
   * The root of the final state trie of the block
   *
   * @example
   * "0x..."
   */
  stateRoot: IHash
  /**
   * The root of the receipts trie of the block
   *
   * @example
   * "0x..."
   */
  receiptsRoot: IHash
  /**
   * The address of the beneficiary to whom the mining rewards were given
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  miner: IAddress
  /**
   * Integer of the difficulty for this block
   *
   * @example
   * "0x4ea3f27bc"
   */
  difficulty: IQuantity
  /**
   * Integer of the total difficulty of the chain until this block
   *
   * @example
   * "0x78cc16100"
   */
  totalDifficulty: IQuantity
  /**
   * The "extra data" field of this block
   *
   * @example
   * "0x..."
   */
  extraData: IHexString
  /**
   * Integer the size of this block in bytes
   *
   * @example
   * "0x220"
   */
  size: IQuantity
  /**
   * The maximum gas allowed in this block
   *
   * @example
   * "0x1c9c380"
   */
  gasLimit: IQuantity
  /**
   * The total used gas by all transactions in this block
   *
   * @example
   * "0x5208"
   */
  gasUsed: IQuantity
  /**
   * The unix timestamp for when the block was collated
   *
   * @example
   * "0x55ba467c"
   */
  timestamp: IQuantity
  /**
   * Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter
   *
   * @example
   * ["0x..."]
   */
  transactions: (IHash | IResultTransaction)[]
  /**
   * Array of uncle hashes
   *
   * @example
   * ["0x..."]
   */
  uncles: IHash[]
  /**
   * Base fee per gas in this block (EIP-1559)
   *
   * @example
   * "0x7"
   */
  baseFeePerGas?: IQuantity
  /**
   * 256-bit hash which, combined with the nonce, proves proof-of-work
   *
   * @example
   * "0x..."
   */
  mixHash?: IHash
  /**
   * Total blob gas consumed by transactions in this block (EIP-4844)
   *
   * @example
   * "0x20000"
   */
  blobGasUsed?: IQuantity
  /**
   * Running total of excess blob gas in the chain until this block (EIP-4844)
   *
   * @example
   * "0x0"
   */
  excessBlobGas?: IQuantity
  /**
   * Root of the parent beacon block (EIP-4788)
   *
   * @example
   * "0x..."
   */
  parentBeaconBlockRoot?: IHash
  /**
   * Root of the withdrawals trie of the block (EIP-4895)
   *
   * @example
   * "0x..."
   */
  withdrawalsRoot?: IHash
  /**
   * Array of withdrawals (EIP-4895)
   *
   * @example
   * [{
   *  "index": "0x1",
   *  "validatorIndex": "0x1",
   *  "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
   *  "amount": "0x1"
   * }]
   */
  withdrawals?: Array<{
    /**
     * Monotonically increasing identifier issued by consensus layer
     *
     * @example
     * "0x1"
     */
    index: IQuantity
    /**
     * Index of validator on the consensus layer
     *
     * @example
     * "0x1"
     */
    validatorIndex: IQuantity
    /**
     * Address that receives Ether for the withdrawal
     *
     * @example
     * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
     */
    address: IAddress
    /**
     * Amount of Ether given for withdrawal (in Gwei)
     *
     * @example
     * "0x1"
     */
    amount: IQuantity
  }>
}

/**
 * Result syncing status object
 */
export type IResultSyncingStatus =
  | boolean
  | {
      /**
       * The starting block of the syncing process
       *
       * @example
       * "0x1b4"
       */
      startingBlock: IQuantity
      /**
       * The current block of the syncing process
       *
       * @example
       * "0x1b5"
       */
      currentBlock: IQuantity
      /**
       * The highest block of the syncing process
       *
       * @example
       * "0x1b6"
       */
      highestBlock: IQuantity
      /**
       * The known states of the syncing process
       *
       * @example
       * "0x3e8"
       */
      knownStates?: IQuantity
      /**
       * The pulled states of the syncing process
       *
       * @example
       * "0x3e8"
       */
      pulledStates?: IQuantity
    }

/**
 * Result fee history object
 */
export type IResultFeeHistory = {
  /**
   * The lowest number block of the returned range encoded in hexadecimal format
   *
   * @example
   * "0x1b4"
   */
  oldestBlock: string
  /**
   * An array of block base fees per gas. This includes the next block after the newest of the returned range,
   * because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks
   *
   * @example
   * ["0x7", "0x8"]
   */
  baseFeePerGas: string[]
  /**
   * An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit
   *
   * @example
   * [0.5, 0.6]
   */
  gasUsedRatio: number[]
  /**
   * An array of effective priority fees per gas data points from a single block. All zeroes are returned if the block is empty
   *
   * @example
   * [["0x1", "0x2"], ["0x3", "0x4"]]
   */
  reward: string[][]
}

/**
 * Result account object
 */
export type IResultAccount = {
  /**
   * A 32 byte hash of the code of the account
   *
   * @example
   * "0x..."
   */
  codeHash: string
  /**
   * The hash of the account's storage data
   *
   * @example
   * "0x..."
   */
  storageRoot: string
  /**
   * The current balance of the account in wei (as bigint)
   *
   * @example
   * 1000000000000000000n
   */
  balance: bigint
  /**
   * The transaction count of an account (as bigint)
   *
   * @example
   * 1n
   */
  nonce: bigint
}

/**
 * Result proof object
 */
export type IResultProof = {
  /**
   * The address associated with the account
   *
   * @example
   * "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   */
  address: string
  /**
   * An array of rlp-serialized MerkleTree-Nodes which starts with the stateRoot-Node and follows the path of the SHA3 address as key
   *
   * @example
   * ["0x..."]
   */
  accountProof: string[]
  /**
   * The current balance of the account in wei (as bigint)
   *
   * @example
   * 1000000000000000000n
   */
  balance: bigint
  /**
   * A 32 byte hash of the code of the account
   *
   * @example
   * "0x..."
   */
  codeHash: string
  /**
   * The hash of the generated proof-of-work (as bigint). Null if pending
   *
   * @example
   * 1n
   */
  nonce: bigint | null
  /**
   * A 32 byte SHA3 of the storageRoot. All storage will deliver a MerkleProof starting with this rootHash
   *
   * @example
   * "0x..."
   */
  storageHash: string
  /**
   * An array of storage-entries as requested. Each entry is an object
   */
  storageProof: {
    /**
     * The requested storage key
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
    /**
     * An array of rlp-serialized MerkleTree-Nodes which starts with the stateRoot-Node and follows the path of the SHA3 address as key
     *
     * @example
     * ["0x..."]
     */
    proof: string[]
  }[]
}

/**
 * Result call many object
 */
export type IResultCallMany = {
  /**
   * The return value of the call
   *
   * @example
   * "0x"
   */
  value: string
  /**
   * The error message if the call failed
   *
   * @example
   * "execution reverted"
   */
  error?: string
}

/**
 * Result sign transaction object
 */
export type IResultSignTransaction = {
  /**
   * The raw signed transaction
   *
   * @example
   * "0x..."
   */
  raw: string
  /**
   * The transaction object
   */
  tx: IResultTransaction
}

/**
 * Result simulate V1 object
 */
export type IResultSimulateV1 = {
  /**
   * Whether the simulation was successful
   *
   * @example
   * true
   */
  success: boolean
  /**
   * The return data from the call
   *
   * @example
   * "0x"
   */
  returnData: string
  /**
   * The gas used by the call
   *
   * @example
   * "0x5208"
   */
  gasUsed: string
  /**
   * The logs emitted during the simulation
   */
  logs: IResultLog[]
}
