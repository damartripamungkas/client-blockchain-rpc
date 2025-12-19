/**
 * A Solana Address (Base58 string).
 *
 * @example
 * "7ev...t5"
 * "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
 */
export type IAddress = string

/**
 * A Solana Hash/Signature (Base58 string).
 *
 * @example
 * "5ZA...2c"
 * "5eykt4UsFv8P8NJdTREpY1vzqKqZKggw"
 */
export type IHash = string

/**
 * Limit the specific commitment level of state to watch.
 *
 * @example
 * "finalized"
 * "confirmed"
 * "processed"
 */
export type ICommitment = `finalized` | `confirmed` | `processed`

/**
 * Encoding for the returned data.
 *
 * @example
 * "base58"
 * "base64"
 * "jsonParsed"
 */
export type IEncoding = `base58` | `base64` | `base64+zstd` | `json` | `jsonParsed`

/**
 * Params general config object request
 */
export type IGeneralConfig = {
  /**
   * The commitment level to use.
   *
   * @example
   * "finalized"
   */
  commitment?: ICommitment
  /**
   * The minimum slot that the request can be evaluated at.
   *
   * @example
   * 12345678
   */
  minContextSlot?: number
}

/**
 * Configuration object for block requests.
 */
export type IBlockConfig = {
  /**
   * Encoding for the returned transaction data.
   *
   * @example
   * "json"
   * "base64"
   */
  encoding?: IEncoding
  /**
   * Level of transaction detail to return.
   *
   * @example
   * "full"
   * "accounts"
   * "signatures"
   * "none"
   */
  transactionDetails?: `full` | `accounts` | `signatures` | `none`
  /**
   * Whether to include rewards.
   *
   * @example
   * true
   * false
   */
  rewards?: boolean
  /**
   * The commitment level to use.
   *
   * @example
   * "finalized"
   */
  commitment?: ICommitment
}

/**
 * Configuration for getAccountInfo.
 */
export type IAccountInfoConfig = {
  /**
   * Encoding for the returned account data.
   *
   * @example
   * "base64"
   */
  encoding?: IEncoding
  /**
   * The commitment level to use.
   *
   * @example
   * "finalized"
   */
  commitment?: ICommitment
  /**
   * Request a slice of the account's data.
   *
   * @example
   * { "offset": 0, "length": 32 }
   */
  dataSlice?: { offset: number; length: number }
  /**
   * The minimum slot that the request can be evaluated at.
   *
   * @example
   * 12345678
   */
  minContextSlot?: number
}

/**
 * Solana Account Info Object.
 */
export type IResultAccountInfo = {
  /**
   * An object that contains metadata about the current state of the Solana network at the time the request was processed
   */
  context: {
    /**
     * The version number
     */
    apiVersion: number
    /**
     * The current slot in the Solana cluster during which the transactions are processed and new blocks are added to the blockchain
     */
    slot: number
  }
  /**
   * An object that contains information about the requested account
   */
  value: {
    /**
     * The number of lamports assigned to this account as u64 (64-bit unsigned integer)
     */
    lamports: number
    /**
     * The base-58 encoded Pubkey of the program this account has been assigned to
     */
    owner: IAddress
    /**
     * Data associated with the account. Format depends on encoding parameter:
     *
     * - If the encoding parameter is left as the deprecated default of binary, this will be a string containing encoded binary data.
     * - If base58, base64, or base64+zstd is specified, this will be an array, where the first element is the encoded data string and the second element is the encoding format.
     * - If jsonParsed is specified, this will be JSON format {<program>:<state>}.
     */
    data: string | string[]
    /**
     * A boolean indicating if the account contains a program (and is strictly read-only)
     */
    executable: boolean
    /**
     * The epoch at which this account will next owe rent, as u64 (64-bit unsigned integer)
     */
    rentEpoch: number
    /**
     * The amount of storage space required to store the token account
     */
    space: number
  }
}

/**
 * Null if the account doesn't exist otherwise RpcResponse JSON object with the following fields:
 */
export type IResultBalance = null | {
  /**
   * An object that contains metadata about the current state of the Solana network at the time the request was processed
   */
  context: {
    /**
     * The version number
     */
    apiVersion: number
    /**
     * The current slot in the Solana cluster during which the transactions are processed and new blocks are added to the blockchain
     */
    slot: number
  }
  /**
   * The balance of the account of provided Pubkey
   */
  value: number
}

/**
 * Result Transaction Object.
 */
export type IResultTransaction = {
  /**
   * The slot this transaction was processed in
   *
   * @example
   * 123456789
   */
  slot: number
  /**
   * The transaction details
   */
  transaction: {
    /**
     * Array of signatures included on the transaction
     *
     * @example
     * ["5ZA...2c"]
     */
    signatures: IHash[]
    /**
     * The transaction message
     */
    message: {
      /**
       * Array of account addresses used by the transaction
       *
       * @example
       * ["7ev...t5", "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"]
       */
      accountKeys: IAddress[]
      /**
       * Transaction header information
       */
      header: {
        /**
         * The number of required signatures
         */
        numRequiredSignatures: number
        /**
         * The number of read-only signed accounts
         */
        numReadonlySignedAccounts: number
        /**
         * The number of read-only unsigned accounts
         */
        numReadonlyUnsignedAccounts: number
      }
      /**
       * Array of program instructions included in the transaction
       */
      instructions: Array<{
        /**
         * Index of the program account in accountKeys
         */
        programIdIndex: number
        /**
         * Array of account indices to pass to the program
         */
        accounts: number[]
        /**
         * Program input data encoded as base-58 string
         */
        data: string
      }>
      /**
       * A recent blockhash included in the transaction
       *
       * @example
       * "5eykt4UsFv8P8NJdTREpY1vzqKqZKggw"
       */
      recentBlockhash: IHash
    }
  }
  /**
   * Transaction metadata. Null if the transaction failed during processing
   */
  meta: null | {
    /**
     * Error if transaction failed, null if transaction succeeded
     */
    err: any | null
    /**
     * Fee this transaction was charged, as u64
     *
     * @example
     * 5000
     */
    fee: number
    /**
     * Array of account balances from before the transaction was processed
     */
    preBalances: number[]
    /**
     * Array of account balances after the transaction was processed
     */
    postBalances: number[]
    /**
     * Array of inner instructions
     */
    innerInstructions?: any[]
    /**
     * Array of string log messages
     */
    logMessages?: string[]
    /**
     * Array of rewards applied during this transaction
     */
    rewards?: any[]
  }
  /**
   * Estimated production time, as Unix timestamp (seconds since the Unix epoch). Null if not available
   *
   * @example
   * 1628017920
   */
  blockTime?: number | null
}

/**
 * Result Block Object.
 */
export type IResultBlock = {
  /**
   * The blockhash of this block, as base-58 encoded string
   *
   * @example
   * "5eykt4UsFv8P8NJdTREpY1vzqKqZKggw"
   */
  blockhash: IHash
  /**
   * The blockhash of this block's parent, as base-58 encoded string
   *
   * @example
   * "5eykt4UsFv8P8NJdTREpY1vzqKqZKggw"
   */
  previousBlockhash: IHash
  /**
   * The slot index of this block's parent
   *
   * @example
   * 123456788
   */
  parentSlot: number
  /**
   * Array of transactions included in the block
   */
  transactions: Array<{
    /**
     * Transaction object or encoded transaction data
     */
    transaction: IResultTransaction[`transaction`] | string
    /**
     * Transaction metadata
     */
    meta?: IResultTransaction[`meta`]
    /**
     * Transaction version. Undefined if legacy transaction
     *
     * @example
     * 0
     * "legacy"
     */
    version?: number | `legacy`
  }>
  /**
   * Array of block rewards
   */
  rewards?: Array<{
    /**
     * The public key of the account that received the reward
     */
    pubkey: IAddress
    /**
     * Number of reward lamports credited or debited
     */
    lamports: number
    /**
     * Account balance in lamports after the reward was applied
     */
    postBalance: number
    /**
     * Type of reward: "fee", "rent", "voting", "staking"
     */
    rewardType?: string
    /**
     * Vote account commission when the reward was credited
     */
    commission?: number
  }>
  /**
   * Estimated production time, as Unix timestamp (seconds since the Unix epoch). Null if not available
   *
   * @example
   * 1628017920
   */
  blockTime: number | null
  /**
   * The number of blocks beneath this block. Null if not available
   *
   * @example
   * 123456789
   */
  blockHeight: number | null
}

/**
 * Result Block Commitment Object.
 */
export type IResultBlockCommitment = {
  /**
   * The commitment values for the block. It could be either:
   * - null: Null if the block is unknown
   * - array: An array of u64 integers logging the amount of cluster stake
   * in lamports that has voted on the block at each depth from 0 to MAX_LOCKOUT_HISTORY + 1
   *
   * @example
   * null
   * [123456789012345678, ...]
   */
  commitment: null | number[]
  /**
   * The total number of lamports being used by validators to participate in the block production and voting process
   *
   * @example
   * 389417798908805250
   */
  totalStake: number
}

/**
 * Result block production object.
 */
export type IResultBlockProduction = {
  /**
   * The additional context to retrieve the block production information
   */
  context: {
    /**
     * The API version
     */
    apiVersion: string
    /**
     * The slot number to retrieve block production information
     */
    slot: number
  }
  /**
   * Information about the block production in the specified slot range
   */
  value: {
    /**
     * A dictionary of validator identities, as base-58 encoded strings. Value is a two element array containing the number of leader slots and the number of blocks produced
     */
    byIdentity: {
      [base58EncodedString: string]: [number, number]
    }
    /**
     * The block production slot range
     */
    range: {
      /**
       * The first slot of the block production information (inclusive)
       */
      firstSlot: number
      /**
       * The last slot of the block production information (inclusive)
       */
      lastSlot: number
    }
  }
}

/**
 * Result cluster node object.
 */
export type IResultClusterNode = {
  /**
   * The unique identifier of the node's feature set
   */
  featureSet: string
  /**
   * The gossip network address for the node
   */
  gossip: string
  /**
   * The public key of the node encoded as base-58 string
   */
  pubkey: string
  /**
   * The IP address and port number of the node's JSON-RPC service. Null if the JSON RPC service is not enabled
   */
  rpc: string
  /**
   * The version of the data structure used by this node to store and transmit blocks
   */
  shredVersion: string
  /**
   * The TPU network address for the node
   */
  tpu: string
  /**
   * The software version of the node. Null if the version information is not available
   */
  version: string
}

/**
 * Result epoch info object
 */
export type IResultEpochInfo = {
  /**
   * The current slot
   */
  absoluteSlot: number
  /**
   * The current block height
   */
  blockHeight: number
  /**
   * The current epoch
   */
  epoch: number
  /**
   * The current slot relative to the start of the current epoch
   */
  slotIndex: number
  /**
   * The number of slots in this epoch
   */
  slotsInEpoch: number
  /**
   * The total number of transactions processed during the current epoch
   */
  transactionCount: number
}

/**
 * Result epoch schedule object
 */
export type IResultEpochSchedule = {
  /**
   * The first normal-length epoch, log2(slotsPerEpoch) - log2(MINIMUM_SLOTS_PER_EPOCH)
   */
  firstNormalEpoch: number
  /**
   * The slot number of the first normal slot. MINIMUM_SLOTS_PER_EPOCH * (2.pow(firstNormalEpoch) - 1)
   */
  firstNormalSlot: number
  /**
   * The number of slots before beginning of an epoch to calculate a leader schedule for that epoch
   */
  leaderScheduleSlotOffset: number
  /**
   * The maximum number of slots in each epoch
   */
  slotsPerEpoch: number
  /**
   * Whether epochs start short and grow
   */
  warmup: boolean
}

/**
 * Result fee for message object
 */
export type IResultFeeForMessage = null | {
  /**
   * The information about the current state of the program
   */
  context: {
    /**
     * The version of the Solana RPC API to use
     */
    apiVersion: string
    /**
     * An integer representing the slot for which to retrieve the fee calculator
     */
    slot: number
  }
  /**
   * (u64 | null) The fee corresponding to the message at the specified blockhash
   */
  value: number | null
}

/**
 * Result highest snapshot slot object
 */
export type IResultHighestSnapshotSlot = {
  /**
   * The highest full snapshot slot
   */
  full: number
  /**
   * The highest incremental snapshot slot based on full
   */
  incremental: number | null
}

/**
 * Result inflation governor object
 */
export type IResultInflationGovernor = {
  /**
   * The initial inflation percentage from time 0
   */
  initial: number
  /**
   * The terminal inflation percentage
   */
  terminal: number
  /**
   * The rate per year at which inflation is lowered
   */
  taper: number
  /**
   * The percentage of total inflation allocated to the foundation
   */
  foundation: number
  /**
   * The duration of foundation pool inflation in years
   */
  foundationTerm: number
}

/**
 * Result inflation rate object
 */
export type IResultInflationRate = {
  /**
   * The total inflation
   */
  total: number
  /**
   * The inflation allocated to validators
   */
  validator: number
  /**
   * The inflation allocated to the foundation
   */
  foundation: number
  /**
   * The current epoch number
   */
  epoch: number
}

/**
 * Result inflation reward object
 */
export type IResultInflationReward = null | {
  /**
   * The epoch for which reward occurred
   */
  epoch: number
  /**
   * The slot in which the rewards are effective
   */
  effectiveSlot: number
  /**
   * The reward amount in lamports
   */
  amount: number
  /**
   * The post balance of the account in lamports
   */
  postBalance: number
  /**
   * The vote account commission when the reward was credited
   */
  commission: number | null
}

/**
 * Result largest accounts object
 */
export type IResultLargestAccounts = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The list of largest accounts
   */
  value: Array<{
    /**
     * The address of the account
     */
    address: IAddress
    /**
     * The number of lamports in the account
     */
    lamports: number
  }>
}

/**
 * Result latest blockhash object
 */
export type IResultLatestBlockhash = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The value object
   */
  value: {
    /**
     * The blockhash as base-58 encoded string
     */
    blockhash: string
    /**
     * The last block height at which the blockhash will be valid
     */
    lastValidBlockHeight: number
  }
}

/**
 * Result program account object
 */
export type IResultProgramAccount = {
  /**
   * The account pubkey as base-58 encoded string
   */
  pubkey: IAddress
  /**
   * The account object
   */
  account: {
    /**
     * The number of lamports assigned to this account
     */
    lamports: number
    /**
     * The base-58 encoded pubkey of the program this account has been assigned to
     */
    owner: IAddress
    /**
     * The data associated with the account
     */
    data: string | string[]
    /**
     * Boolean indicating if the account contains a program
     */
    executable: boolean
    /**
     * The epoch at which this account will next owe rent
     */
    rentEpoch: number
    /**
     * The data size of the account
     */
    space: number
  }
}

/**
 * Result recent performance sample object
 */
export type IResultRecentPerformanceSample = {
  /**
   * The slot in which the sample was taken
   */
  slot: number
  /**
   * The number of transactions processed during the sample period
   */
  numTransactions: number
  /**
   * The number of slots completed during the sample period
   */
  numSlots: number
  /**
   * The number of seconds in the sample window
   */
  samplePeriodSecs: number
  /**
   * Number of non-vote transactions in sample
   */
  numNonVoteTransaction: number
}

/**
 * Result signature for address object
 */
export type IResultSignatureForAddress = {
  /**
   * The transaction signature as base-58 encoded string
   */
  signature: IHash
  /**
   * The slot that contains the block with the transaction
   */
  slot: number
  /**
   * Error if transaction failed, null if transaction succeeded
   */
  err: any | null
  /**
   * Memo associated with the transaction, null if no memo is present
   */
  memo: string | null
  /**
   * Estimated production time, as Unix timestamp
   */
  blockTime: number | null
  /**
   * The transaction's cluster confirmation status
   */
  confirmationStatus: ICommitment | null
}

/**
 * Result signature status object
 */
export type IResultSignatureStatus = null | {
  /**
   * The slot the transaction was processed
   */
  slot: number
  /**
   * The number of blocks since signature confirmation
   */
  confirmations: number | null
  /**
   * Error if transaction failed, null if transaction succeeded
   */
  err: any | null
  /**
   * The transaction's cluster confirmation status
   */
  confirmationStatus: ICommitment | null
}

/**
 * Result signature statuses object
 */
export type IResultSignatureStatuses = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The list of signature statuses
   */
  value: IResultSignatureStatus[]
}

/**
 * Result stake activation object
 */
export type IResultStakeActivation = {
  /**
   * The stake account's activation state
   */
  state: `active` | `inactive` | `activating` | `deactivating`
  /**
   * The stake active during the epoch
   */
  active: number
  /**
   * The stake inactive during the epoch
   */
  inactive: number
}

/**
 * Result supply object
 */
export type IResultSupply = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The value object
   */
  value: {
    /**
     * The total supply in lamports
     */
    total: number
    /**
     * The circulating supply in lamports
     */
    circulating: number
    /**
     * The non-circulating supply in lamports
     */
    nonCirculating: number
    /**
     * An array of account addresses of non-circulating accounts
     */
    nonCirculatingAccounts: IAddress[]
  }
}

/**
 * Result token account balance object
 */
export type IResultTokenAccountBalance = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The value object
   */
  value: {
    /**
     * The raw balance without decimals, a string representation of u64
     */
    amount: string
    /**
     * Number of base 10 digits to the right of the decimal place
     */
    decimals: number
    /**
     * The balance, using mint-prescribed decimals
     */
    uiAmount: number | null
    /**
     * The balance as a string, using mint-prescribed decimals
     */
    uiAmountString: string
  }
}

/**
 * Result token accounts object
 */
export type IResultTokenAccounts = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The list of token accounts
   */
  value: Array<{
    /**
     * The account pubkey as base-58 encoded string
     */
    pubkey: IAddress
    /**
     * The account object
     */
    account: {
      /**
       * The number of lamports assigned to this account
       */
      lamports: number
      /**
       * The base-58 encoded pubkey of the program this account has been assigned to
       */
      owner: IAddress
      /**
       * The data associated with the account
       */
      data: string | string[]
      /**
       * Boolean indicating if the account contains a program
       */
      executable: boolean
      /**
       * The epoch at which this account will next owe rent
       */
      rentEpoch: number
      /**
       * The data size of the account
       */
      space: number
    }
  }>
}

/**
 * Result token largest accounts object
 */
export type IResultTokenLargestAccounts = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The list of largest token accounts
   */
  value: Array<{
    /**
     * The address of the token account
     */
    address: IAddress
    /**
     * The raw token account balance without decimals
     */
    amount: string
    /**
     * Number of base 10 digits to the right of the decimal place
     */
    decimals: number
    /**
     * The token account balance, using mint-prescribed decimals
     */
    uiAmount: number | null
    /**
     * The token account balance as a string, using mint-prescribed decimals
     */
    uiAmountString: string
  }>
}

/**
 * Result token supply object
 */
export type IResultTokenSupply = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The value object
   */
  value: {
    /**
     * The raw total token supply without decimals
     */
    amount: string
    /**
     * Number of base 10 digits to the right of the decimal place
     */
    decimals: number
    /**
     * The total token supply, using mint-prescribed decimals
     */
    uiAmount: number | null
    /**
     * The total token supply as a string, using mint-prescribed decimals
     */
    uiAmountString: string
  }
}

/**
 * Result version object
 */
export type IResultVersion = {
  /**
   * The software version of solana-core
   */
  [`solana-core`]: string
  /**
   * The unique identifier of the current software's feature set
   */
  [`feature-set`]: number
}

/**
 * Result vote accounts object
 */
export type IResultVoteAccounts = {
  /**
   * The current vote accounts
   */
  current: Array<{
    /**
     * The vote account address
     */
    votePubkey: IAddress
    /**
     * The validator identity
     */
    nodePubkey: IAddress
    /**
     * The stake, in lamports, delegated to this vote account and active in this epoch
     */
    activatedStake: number
    /**
     * Whether the vote account is staked for this epoch
     */
    epochVoteAccount: boolean
    /**
     * Percentage (0-100) of rewards payout owed to the vote account
     */
    commission: number
    /**
     * Most recent slot voted on by this vote account
     */
    lastVote: number
    /**
     * Current root slot for this vote account
     */
    rootSlot: number
    /**
     * History of how many credits earned by the end of each epoch
     */
    epochCredits: Array<[number, number, number]>
  }>
  /**
   * The delinquent vote accounts
   */
  delinquent: Array<{
    /**
     * The vote account address
     */
    votePubkey: IAddress
    /**
     * The validator identity
     */
    nodePubkey: IAddress
    /**
     * The stake, in lamports, delegated to this vote account and active in this epoch
     */
    activatedStake: number
    /**
     * Whether the vote account is staked for this epoch
     */
    epochVoteAccount: boolean
    /**
     * Percentage (0-100) of rewards payout owed to the vote account
     */
    commission: number
    /**
     * Most recent slot voted on by this vote account
     */
    lastVote: number
    /**
     * Current root slot for this vote account
     */
    rootSlot: number
    /**
     * History of how many credits earned by the end of each epoch
     */
    epochCredits: Array<[number, number, number]>
  }>
}

/**
 * Result blockhash valid object
 */
export type IResultBlockhashValid = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * Whether the blockhash is valid
   */
  value: boolean
}

/**
 * Result simulate transaction object
 */
export type IResultSimulateTransaction = {
  /**
   * The context object
   */
  context: {
    /**
     * The slot number
     */
    slot: number
  }
  /**
   * The value object
   */
  value: {
    /**
     * Error if transaction failed, null if transaction succeeded
     */
    err: any | null
    /**
     * Array of log messages the transaction instructions output during execution
     */
    logs: string[] | null
    /**
     * Array of accounts with the same length as the accounts.addresses array in the request
     */
    accounts: null | Array<{
      /**
       * The number of lamports assigned to this account
       */
      lamports: number
      /**
       * The base-58 encoded pubkey of the program this account has been assigned to
       */
      owner: IAddress
      /**
       * The data associated with the account
       */
      data: string[]
      /**
       * Boolean indicating if the account contains a program
       */
      executable: boolean
      /**
       * The epoch at which this account will next owe rent
       */
      rentEpoch: number
      /**
       * The data size of the account
       */
      space: number
    }>
    /**
     * The number of compute budget units consumed during the processing of this transaction
     */
    unitsConsumed: number
    /**
     * The most-recent return data generated by an instruction in the transaction
     */
    returnData: null | {
      /**
       * The program that generated the return data
       */
      programId: IAddress
      /**
       * The return data itself, as base-64 encoded binary data
       */
      data: [string, string]
    }
    /**
     * The addresses of inner instructions
     */
    innerInstructions: any[] | null
  }
}
