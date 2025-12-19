import { PayloadHelper as hlp } from "~/helpers/payload"
import type { TCr, TCrd } from "~/types/payloads"
import type {
  IHash,
  IAddress,
  IEncoding,
  ICommitment,
  IBlockConfig,
  IResultBlock,
  IResultSupply,
  IGeneralConfig,
  IResultBalance,
  IResultVersion,
  IResultEpochInfo,
  IResultAccountInfo,
  IAccountInfoConfig,
  IResultTransaction,
  IResultClusterNode,
  IResultTokenSupply,
  IResultVoteAccounts,
  IResultEpochSchedule,
  IResultFeeForMessage,
  IResultTokenAccounts,
  IResultInflationRate,
  IResultProgramAccount,
  IResultBlockhashValid,
  IResultBlockCommitment,
  IResultBlockProduction,
  IResultLargestAccounts,
  IResultLatestBlockhash,
  IResultStakeActivation,
  IResultInflationReward,
  IResultInflationGovernor,
  IResultSignatureStatuses,
  IResultTokenAccountBalance,
  IResultSignatureForAddress,
  IResultSimulateTransaction,
  IResultHighestSnapshotSlot,
  IResultTokenLargestAccounts,
  IResultRecentPerformanceSample
} from "~/types/payloads.solana"

export class SolanaPayload {
  public static getAccountInfo<GCr extends TCr = TCrd>(address: IAddress, config?: IAccountInfoConfig, _customResult: GCr | TCrd = `value`) {
    return hlp.build<typeof _customResult extends TCrd ? number : IResultAccountInfo>(`getAccountInfo`, config ? [address, config] : [address], (v) => {
      return _customResult === `value` ? v.value : v
    })
  }

  public static getBalance<GCr extends TCr = TCrd>(address: IAddress, config?: IGeneralConfig, _customResult: GCr | TCrd = `value`) {
    return hlp.build<typeof _customResult extends TCrd ? number : IResultBalance>(`getBalance`, config ? [address, config] : [address], (v) => {
      return _customResult === `value` ? v.value : v
    })
  }

  public static getBlock(slot: number, config?: IBlockConfig) {
    return hlp.build<IResultBlock>(`getBlock`, config ? [slot, config] : [slot])
  }

  public static getBlockHeight(config?: IGeneralConfig) {
    return hlp.build<number>(`getBlockHeight`, config ? [config] : [])
  }

  public static getBlockProduction(config?: { commitment?: ICommitment; range?: { firstSlot: number; lastSlot?: number }; identity?: IAddress }) {
    return hlp.build<IResultBlockProduction>(`getBlockProduction`, config ? [config] : [])
  }

  public static getBlockCommitment(slot: number) {
    return hlp.build<IResultBlockCommitment>(`getBlockCommitment`, [slot])
  }

  public static getBlocks(startSlot: number, endSlot?: number, config?: { commitment?: ICommitment }) {
    const params: any[] = [startSlot]
    if (endSlot !== undefined) params[1] = endSlot
    if (config !== undefined) params[2] = config
    return hlp.build<number[]>(`getBlocks`, params)
  }

  public static getBlocksWithLimit(startSlot: number, limit: number, config?: { commitment?: ICommitment }) {
    return hlp.build<number[]>(`getBlocksWithLimit`, config ? [startSlot, limit, config] : [startSlot, limit])
  }

  public static getBlockTime(slot: number) {
    return hlp.build<number>(`getBlockTime`, [slot])
  }

  public static getClusterNodes() {
    return hlp.build<IResultClusterNode[]>(`getClusterNodes`, [])
  }

  public static getEpochInfo(config?: IGeneralConfig) {
    return hlp.build<IResultEpochInfo>(`getEpochInfo`, config ? [config] : [])
  }

  public static getEpochSchedule() {
    return hlp.build<IResultEpochSchedule>(`getEpochSchedule`, [])
  }

  public static getFeeForMessage<GCr extends TCr = TCrd>(message: string, config?: IGeneralConfig, _customResult: GCr | TCrd = `value`) {
    return hlp.build<typeof _customResult extends TCrd ? number : IResultFeeForMessage>(`getFeeForMessage`, config ? [message, config] : [message], (v) => {
      return _customResult === `value` ? v.value : v
    })
  }

  public static getFirstAvailableBlock() {
    return hlp.build<number>(`getFirstAvailableBlock`, [])
  }

  public static getGenesisHash() {
    return hlp.build<string>(`getGenesisHash`, [])
  }

  public static getHealth() {
    return hlp.build<string>(`getHealth`, [])
  }

  public static getHighestSnapshotSlot() {
    return hlp.build<IResultHighestSnapshotSlot>(`getHighestSnapshotSlot`, [])
  }

  public static getIdentity() {
    return hlp.build<{ identity: string }>(`getIdentity`, [])
  }

  public static getInflationGovernor(config?: { commitment?: ICommitment }) {
    return hlp.build<IResultInflationGovernor>(`getInflationGovernor`, config ? [config] : [])
  }

  public static getInflationRate() {
    return hlp.build<IResultInflationRate>(`getInflationRate`, [])
  }

  public static getInflationReward(addresses: IAddress[], config?: { commitment?: ICommitment; epoch?: number; minContextSlot?: number }) {
    return hlp.build<IResultInflationReward[]>(`getInflationReward`, config ? [addresses, config] : [addresses])
  }

  public static getLargestAccounts(config?: { commitment?: ICommitment; filter?: `circulating` | `nonCirculating` }) {
    return hlp.build<IResultLargestAccounts>(`getLargestAccounts`, config ? [config] : [])
  }

  public static getLatestBlockhash(config?: IGeneralConfig) {
    return hlp.build<IResultLatestBlockhash>(`getLatestBlockhash`, config ? [config] : [])
  }

  public static getLeaderSchedule(slot?: number, config?: { commitment?: ICommitment; identity?: IAddress }) {
    const params: any[] = []
    if (slot !== undefined) params[0] = slot
    if (config) params[1] = config
    return hlp.build<Record<string, number[]>>(`getLeaderSchedule`, params)
  }

  public static getMaxRetransmitSlot() {
    return hlp.build<number>(`getMaxRetransmitSlot`, [])
  }

  public static getMaxShredInsertSlot() {
    return hlp.build<number>(`getMaxShredInsertSlot`, [])
  }

  public static getMinimumBalanceForRentExemption(dataLength: number, config?: { commitment?: ICommitment }) {
    return hlp.build<number>(`getMinimumBalanceForRentExemption`, config ? [dataLength, config] : [dataLength])
  }

  public static getMultipleAccounts(addresses: IAddress[], config?: IAccountInfoConfig) {
    return hlp.build<IResultAccountInfo[]>(`getMultipleAccounts`, config ? [addresses, config] : [addresses])
  }

  public static getProgramAccounts(programId: IAddress, config?: { encoding?: IEncoding; commitment?: ICommitment; dataSlice?: { offset: number; length: number }; filters?: any[]; minContextSlot?: number; withContext?: boolean }) {
    return hlp.build<IResultProgramAccount[]>(`getProgramAccounts`, config ? [programId, config] : [programId])
  }

  public static getRecentPerformanceSamples(limit?: number) {
    return hlp.build<IResultRecentPerformanceSample[]>(`getRecentPerformanceSamples`, limit ? [limit] : [])
  }

  public static getSignaturesForAddress(address: IAddress, config?: { commitment?: ICommitment; minContextSlot?: number; limit?: number; before?: string; until?: string }) {
    return hlp.build<IResultSignatureForAddress[]>(`getSignaturesForAddress`, config ? [address, config] : [address])
  }

  public static getSignatureStatuses(signatures: IHash[], config?: { searchTransactionHistory?: boolean }) {
    return hlp.build<IResultSignatureStatuses>(`getSignatureStatuses`, config ? [signatures, config] : [signatures])
  }

  public static getSlot(config?: IGeneralConfig) {
    return hlp.build<number>(`getSlot`, config ? [config] : [])
  }

  public static getSlotLeader(config?: IGeneralConfig) {
    return hlp.build<string>(`getSlotLeader`, config ? [config] : [])
  }

  public static getStakeActivation(publicKey: IAddress, config?: { commitment?: ICommitment; minContextSlot?: number; epoch?: number }) {
    return hlp.build<IResultStakeActivation>(`getStakeActivation`, config ? [publicKey, config] : [publicKey])
  }

  public static getSupply(config?: { commitment?: ICommitment; excludeNonCirculatingAccountsList?: boolean }) {
    return hlp.build<IResultSupply>(`getSupply`, config ? [config] : [])
  }

  public static getTokenAccountBalance(account: IAddress, config?: { commitment?: ICommitment }) {
    return hlp.build<IResultTokenAccountBalance>(`getTokenAccountBalance`, config ? [account, config] : [account])
  }

  public static getTokenAccountsByDelegate(delegate: IAddress, filter: { mint?: IAddress; programId?: IAddress }, config?: { commitment?: ICommitment; minContextSlot?: number; encoding?: IEncoding; dataSlice?: { offset: number; length: number } }) {
    return hlp.build<IResultTokenAccounts>(`getTokenAccountsByDelegate`, config ? [delegate, filter, config] : [delegate, filter])
  }

  public static getTokenAccountsByOwner(owner: IAddress, filter: { mint?: IAddress; programId?: IAddress }, config?: { commitment?: ICommitment; minContextSlot?: number; encoding?: IEncoding; dataSlice?: { offset: number; length: number } }) {
    return hlp.build<IResultTokenAccounts>(`getTokenAccountsByOwner`, config ? [owner, filter, config] : [owner, filter])
  }

  public static getTokenLargestAccounts(mint: IAddress, config?: { commitment?: ICommitment }) {
    return hlp.build<IResultTokenLargestAccounts>(`getTokenLargestAccounts`, config ? [mint, config] : [mint])
  }

  public static getTokenSupply(mint: IAddress, config?: { commitment?: ICommitment }) {
    return hlp.build<IResultTokenSupply>(`getTokenSupply`, config ? [mint, config] : [mint])
  }

  public static getTransaction(signature: IHash, config?: { commitment?: ICommitment; maxSupportedTransactionVersion?: number; encoding?: IEncoding }) {
    return hlp.build<IResultTransaction>(`getTransaction`, config ? [signature, config] : [signature])
  }

  public static getTransactionCount(config?: IGeneralConfig) {
    return hlp.build<number>(`getTransactionCount`, config ? [config] : [])
  }

  public static getVersion() {
    return hlp.build<IResultVersion>(`getVersion`, [])
  }

  public static getVoteAccounts(config?: { commitment?: ICommitment; votePubkey?: IAddress; keepUnstakedDelinquents?: boolean; delinquentSlotDistance?: number }) {
    return hlp.build<IResultVoteAccounts>(`getVoteAccounts`, config ? [config] : [])
  }

  public static isBlockhashValid(blockhash: string, config?: IGeneralConfig) {
    return hlp.build<IResultBlockhashValid>(`isBlockhashValid`, config ? [blockhash, config] : [blockhash])
  }

  public static minimumLedgerSlot() {
    return hlp.build<number>(`minimumLedgerSlot`, [])
  }

  public static requestAirdrop(address: IAddress, lamports: number, config?: { commitment?: ICommitment }) {
    return hlp.build<string>(`requestAirdrop`, config ? [address, lamports, config] : [address, lamports])
  }

  public static sendTransaction(rawTx: string, config?: { encoding?: IEncoding; skipPreflight?: boolean; preflightCommitment?: ICommitment; maxRetries?: number; minContextSlot?: number }) {
    return hlp.build<string>(`sendTransaction`, config ? [rawTx, config] : [rawTx])
  }

  public static simulateTransaction(rawTx: string, config?: { encoding?: IEncoding; sigVerify?: boolean; commitment?: ICommitment; replaceRecentBlockhash?: boolean; accounts?: { addresses: IAddress[]; encoding?: IEncoding } }) {
    return hlp.build<IResultSimulateTransaction>(`simulateTransaction`, config ? [rawTx, config] : [rawTx])
  }
}
