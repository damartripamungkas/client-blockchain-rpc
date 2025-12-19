import { SolanaPayload as Pld } from "~/payloads/solana/solana"
import type { Provider } from "~/core/provider"
import type { IAccountInfoConfig, IAddress, IBlockConfig, ICommitment, IEncoding, IHash } from "~/types/payloads.solana"

export class SolanaRPC {
  constructor(protected provider: Provider<any>) {}

  public async getAccountInfo(address: IAddress, config?: IAccountInfoConfig) {
    return await this.provider.send(Pld.getAccountInfo(address, config))
  }

  public async getBalance(address: IAddress, config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getBalance(address, config))
  }

  public async getBlock(slot: number, config?: IBlockConfig) {
    return await this.provider.send(Pld.getBlock(slot, config))
  }

  public async getBlockHeight(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getBlockHeight(config))
  }

  public async getBlockProduction(config?: { commitment?: ICommitment; range?: { firstSlot: number; lastSlot?: number }; identity?: IAddress }) {
    return await this.provider.send(Pld.getBlockProduction(config))
  }

  public async getBlockCommitment(slot: number) {
    return await this.provider.send(Pld.getBlockCommitment(slot))
  }

  public async getBlocks(startSlot: number, endSlot?: number, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getBlocks(startSlot, endSlot, config))
  }

  public async getBlocksWithLimit(startSlot: number, limit: number, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getBlocksWithLimit(startSlot, limit, config))
  }

  public async getBlockTime(slot: number) {
    return await this.provider.send(Pld.getBlockTime(slot))
  }

  public async getClusterNodes() {
    return await this.provider.send(Pld.getClusterNodes())
  }

  public async getEpochInfo(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getEpochInfo(config))
  }

  public async getEpochSchedule() {
    return await this.provider.send(Pld.getEpochSchedule())
  }

  public async getFeeForMessage(message: string, config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getFeeForMessage(message, config))
  }

  public async getFirstAvailableBlock() {
    return await this.provider.send(Pld.getFirstAvailableBlock())
  }

  public async getGenesisHash() {
    return await this.provider.send(Pld.getGenesisHash())
  }

  public async getHealth() {
    return await this.provider.send(Pld.getHealth())
  }

  public async getHighestSnapshotSlot() {
    return await this.provider.send(Pld.getHighestSnapshotSlot())
  }

  public async getIdentity() {
    return await this.provider.send(Pld.getIdentity())
  }

  public async getInflationGovernor(config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getInflationGovernor(config))
  }

  public async getInflationRate() {
    return await this.provider.send(Pld.getInflationRate())
  }

  public async getInflationReward(addresses: IAddress[], config?: { commitment?: ICommitment; epoch?: number; minContextSlot?: number }) {
    return await this.provider.send(Pld.getInflationReward(addresses, config))
  }

  public async getLargestAccounts(config?: { commitment?: ICommitment; filter?: `circulating` | `nonCirculating` }) {
    return await this.provider.send(Pld.getLargestAccounts(config))
  }

  public async getLatestBlockhash(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getLatestBlockhash(config))
  }

  public async getLeaderSchedule(slot?: number, config?: { commitment?: ICommitment; identity?: IAddress }) {
    return await this.provider.send(Pld.getLeaderSchedule(slot, config))
  }

  public async getMaxRetransmitSlot() {
    return await this.provider.send(Pld.getMaxRetransmitSlot())
  }

  public async getMaxShredInsertSlot() {
    return await this.provider.send(Pld.getMaxShredInsertSlot())
  }

  public async getMinimumBalanceForRentExemption(dataLength: number, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getMinimumBalanceForRentExemption(dataLength, config))
  }

  public async getMultipleAccounts(addresses: IAddress[], config?: IAccountInfoConfig) {
    return await this.provider.send(Pld.getMultipleAccounts(addresses, config))
  }

  public async getProgramAccounts(programId: IAddress, config?: { encoding?: IEncoding; commitment?: ICommitment; dataSlice?: { offset: number; length: number }; filters?: any[]; minContextSlot?: number; withContext?: boolean }) {
    return await this.provider.send(Pld.getProgramAccounts(programId, config))
  }

  public async getRecentPerformanceSamples(limit?: number) {
    return await this.provider.send(Pld.getRecentPerformanceSamples(limit))
  }

  public async getSignaturesForAddress(address: IAddress, config?: { commitment?: ICommitment; minContextSlot?: number; limit?: number; before?: string; until?: string }) {
    return await this.provider.send(Pld.getSignaturesForAddress(address, config))
  }

  public async getSignatureStatuses(signatures: IHash[], config?: { searchTransactionHistory?: boolean }) {
    return await this.provider.send(Pld.getSignatureStatuses(signatures, config))
  }

  public async getSlot(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getSlot(config))
  }

  public async getSlotLeader(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getSlotLeader(config))
  }

  public async getStakeActivation(publicKey: IAddress, config?: { commitment?: ICommitment; minContextSlot?: number; epoch?: number }) {
    return await this.provider.send(Pld.getStakeActivation(publicKey, config))
  }

  public async getSupply(config?: { commitment?: ICommitment; excludeNonCirculatingAccountsList?: boolean }) {
    return await this.provider.send(Pld.getSupply(config))
  }

  public async getTokenAccountBalance(account: IAddress, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getTokenAccountBalance(account, config))
  }

  public async getTokenAccountsByDelegate(delegate: IAddress, filter: { mint?: IAddress; programId?: IAddress }, config?: { commitment?: ICommitment; minContextSlot?: number; encoding?: IEncoding; dataSlice?: { offset: number; length: number } }) {
    return await this.provider.send(Pld.getTokenAccountsByDelegate(delegate, filter, config))
  }

  public async getTokenAccountsByOwner(owner: IAddress, filter: { mint?: IAddress; programId?: IAddress }, config?: { commitment?: ICommitment; minContextSlot?: number; encoding?: IEncoding; dataSlice?: { offset: number; length: number } }) {
    return await this.provider.send(Pld.getTokenAccountsByOwner(owner, filter, config))
  }

  public async getTokenLargestAccounts(mint: IAddress, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getTokenLargestAccounts(mint, config))
  }

  public async getTokenSupply(mint: IAddress, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.getTokenSupply(mint, config))
  }

  public async getTransaction(signature: IHash, config?: { commitment?: ICommitment; maxSupportedTransactionVersion?: number; encoding?: IEncoding }) {
    return await this.provider.send(Pld.getTransaction(signature, config))
  }

  public async getTransactionCount(config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.getTransactionCount(config))
  }

  public async getVersion() {
    return await this.provider.send(Pld.getVersion())
  }

  public async getVoteAccounts(config?: { commitment?: ICommitment; votePubkey?: IAddress; keepUnstakedDelinquents?: boolean; delinquentSlotDistance?: number }) {
    return await this.provider.send(Pld.getVoteAccounts(config))
  }

  public async isBlockhashValid(blockhash: string, config?: { commitment?: ICommitment; minContextSlot?: number }) {
    return await this.provider.send(Pld.isBlockhashValid(blockhash, config))
  }

  public async minimumLedgerSlot() {
    return await this.provider.send(Pld.minimumLedgerSlot())
  }

  public async requestAirdrop(address: IAddress, lamports: number, config?: { commitment?: ICommitment }) {
    return await this.provider.send(Pld.requestAirdrop(address, lamports, config))
  }

  public async sendTransaction(rawTx: string, config?: { encoding?: IEncoding; skipPreflight?: boolean; preflightCommitment?: ICommitment; maxRetries?: number; minContextSlot?: number }) {
    return await this.provider.send(Pld.sendTransaction(rawTx, config))
  }

  public async simulateTransaction(rawTx: string, config?: { encoding?: IEncoding; sigVerify?: boolean; commitment?: ICommitment; replaceRecentBlockhash?: boolean; accounts?: { addresses: IAddress[]; encoding?: IEncoding } }) {
    return await this.provider.send(Pld.simulateTransaction(rawTx, config))
  }
}
