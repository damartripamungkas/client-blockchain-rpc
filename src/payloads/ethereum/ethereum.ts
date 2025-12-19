import { PayloadHelper as hlp } from "~/helpers/payload"
import type {
  IHash,
  IFilter,
  IAddress,
  IBlockTag,
  IQuantity,
  IResultLog,
  IResultProof,
  IResultBlock,
  IResultAccount,
  IBlockOverride,
  IResultCallMany,
  IResultSimulateV1,
  IStateOverrideSet,
  IResultFeeHistory,
  ISimulationContext,
  IResultTransaction,
  ITransactionRequest,
  IResultSyncingStatus,
  IResultSignTransaction,
  IResultTransactionReceipt
} from "~/types/payloads.ethereum"

export class EthereumPayload {
  public static accounts() {
    return hlp.build<IAddress[]>(`eth_accounts`, [])
  }

  public static blobBaseFee() {
    return hlp.build<bigint>(`eth_blobBaseFee`, [], BigInt)
  }

  public static blockNumber() {
    return hlp.build<bigint>(`eth_blockNumber`, [], BigInt)
  }

  public static call(transaction: ITransactionRequest, block: IBlockTag = `latest`, stateOverride?: IStateOverrideSet) {
    return hlp.build<string>(`eth_call`, stateOverride ? [transaction, block, stateOverride] : [transaction, block])
  }

  public static callMany(transactions: ITransactionRequest[], block: IBlockTag = `latest`, blockOverride?: IBlockOverride, simulationContext?: ISimulationContext, stateOverride?: IStateOverrideSet, timeout?: number) {
    const params: any[] = [transactions, block]
    if (blockOverride) params[2] = blockOverride
    if (simulationContext) params[3] = simulationContext
    if (stateOverride) params[4] = stateOverride
    if (timeout) params[5] = timeout
    return hlp.build<IResultCallMany[]>(`eth_callMany`, params)
  }

  public static chainId() {
    return hlp.build<bigint>(`eth_chainId`, [], BigInt)
  }

  public static estimateGas(transaction: ITransactionRequest, block: IBlockTag = `latest`, stateOverride?: IStateOverrideSet) {
    return hlp.build<bigint>(`eth_estimateGas`, stateOverride ? [transaction, block, stateOverride] : [transaction, block], BigInt)
  }

  public static feeHistory(blockCount: IQuantity, newestBlock: IBlockTag, rewardPercentiles?: number[]) {
    return hlp.build<IResultFeeHistory>(`eth_feeHistory`, rewardPercentiles ? [blockCount, newestBlock, rewardPercentiles] : [blockCount, newestBlock])
  }

  public static gasPrice() {
    return hlp.build<bigint>(`eth_gasPrice`, [], BigInt)
  }

  public static getAccount(address: IAddress, block: IBlockTag = `latest`) {
    return hlp.build<IResultAccount>(`eth_getAccount`, [address, block], (v) => {
      v.balance = BigInt(v.balance)
      v.nonce = BigInt(v.nonce)
      return v
    })
  }

  public static getBalance(address: IAddress, block: IBlockTag = `latest`) {
    return hlp.build<bigint>(`eth_getBalance`, [address, block], BigInt)
  }

  public static getBlockByHash(hash: IHash, fullTransactionObjects = false) {
    return hlp.build<IResultBlock>(`eth_getBlockByHash`, [hash, fullTransactionObjects])
  }

  public static getBlockByNumber(block: IBlockTag, fullTransactionObjects = false) {
    return hlp.build<IResultBlock>(`eth_getBlockByNumber`, [block, fullTransactionObjects])
  }

  public static getBlockReceipts(block: IBlockTag = `latest`) {
    return hlp.build<IResultTransactionReceipt[]>(`eth_getBlockReceipts`, [block])
  }

  public static getBlockTransactionCountByHash(hash: IHash) {
    return hlp.build<bigint>(`eth_getBlockTransactionCountByHash`, [hash], BigInt)
  }

  public static getBlockTransactionCountByNumber(block: IBlockTag = `latest`) {
    return hlp.build<bigint>(`eth_getBlockTransactionCountByNumber`, [block], BigInt)
  }

  public static getCode(address: IAddress, block: IBlockTag = `latest`) {
    return hlp.build<string>(`eth_getCode`, [address, block])
  }

  public static getFilterChanges(filterId: IQuantity) {
    return hlp.build<IResultLog[] | IHash[]>(`eth_getFilterChanges`, [filterId])
  }

  public static getFilterLogs(filterId: IQuantity) {
    return hlp.build<IResultLog[]>(`eth_getFilterLogs`, [filterId])
  }

  public static getLogs(filter: IFilter) {
    return hlp.build<IResultLog[]>(`eth_getLogs`, [filter])
  }

  public static getProof(address: IAddress, storageKeys: string[], block: IBlockTag = `latest`) {
    return hlp.build<IResultProof>(`eth_getProof`, [address, storageKeys, block], (v) => {
      v.balance = BigInt(v.balance)
      v.nonce = v.nonce ? BigInt(v.nonce) : null
      return v
    })
  }

  public static getStorageAt(address: IAddress, position: IQuantity, block: IBlockTag = `latest`) {
    return hlp.build<string>(`eth_getStorageAt`, [address, position, block])
  }

  public static getTransactionByBlockHashAndIndex(hash: IHash, index: IQuantity) {
    return hlp.build<IResultTransaction>(`eth_getTransactionByBlockHashAndIndex`, [hash, index])
  }

  public static getTransactionByBlockNumberAndIndex(block: IBlockTag, index: IQuantity) {
    return hlp.build<IResultTransaction>(`eth_getTransactionByBlockNumberAndIndex`, [block, index])
  }

  public static getTransactionByHash(hash: IHash) {
    return hlp.build<IResultTransaction>(`eth_getTransactionByHash`, [hash])
  }

  public static getRawTransactionByHash(hash: IHash) {
    return hlp.build<string>(`eth_getRawTransactionByHash`, [hash])
  }

  public static getTransactionCount(address: IAddress, block: IBlockTag = `latest`) {
    return hlp.build<bigint>(`eth_getTransactionCount`, [address, block], BigInt)
  }

  public static getTransactionReceipt(hash: IHash) {
    return hlp.build<IResultTransactionReceipt>(`eth_getTransactionReceipt`, [hash])
  }

  public static getUncleCountByBlockHash(hash: IHash) {
    return hlp.build<bigint>(`eth_getUncleCountByBlockHash`, [hash], BigInt)
  }

  public static getUncleCountByBlockNumber(block: IBlockTag = `latest`) {
    return hlp.build<bigint>(`eth_getUncleCountByBlockNumber`, [block], BigInt)
  }

  public static hashrate() {
    return hlp.build<bigint>(`eth_hashrate`, [], BigInt)
  }

  public static maxPriorityFeePerGas() {
    return hlp.build<bigint>(`eth_maxPriorityFeePerGas`, [], BigInt)
  }

  public static mining() {
    return hlp.build<boolean>(`eth_mining`, [])
  }

  public static newBlockFilter() {
    return hlp.build<string>(`eth_newBlockFilter`, [])
  }

  public static newFilter(filter: IFilter) {
    return hlp.build<string>(`eth_newFilter`, [filter])
  }

  public static newPendingTransactionFilter() {
    return hlp.build<string>(`eth_newPendingTransactionFilter`, [])
  }

  public static sendRawTransaction(signedTxData: string) {
    return hlp.build<string>(`eth_sendRawTransaction`, [signedTxData])
  }

  public static signTransaction(transaction: ITransactionRequest) {
    return hlp.build<IResultSignTransaction>(`eth_signTransaction`, [transaction])
  }

  public static simulateV1(payload: ITransactionRequest | ITransactionRequest[], block: IBlockTag = `latest`) {
    return hlp.build<IResultSimulateV1 | IResultSimulateV1[]>(`eth_simulateV1`, [payload, block])
  }

  public static submitWork(nonce: string, powHash: IHash, digest: IHash) {
    return hlp.build<boolean>(`eth_submitWork`, [nonce, powHash, digest])
  }

  public static subscribe(subscriptionName: string, data?: any) {
    return hlp.build<string>(`eth_subscribe`, data ? [subscriptionName, data] : [subscriptionName])
  }

  public static syncing() {
    return hlp.build<IResultSyncingStatus>(`eth_syncing`, [])
  }

  public static uninstallFilter(filterId: IQuantity) {
    return hlp.build<boolean>(`eth_uninstallFilter`, [filterId])
  }

  public static unsubscribe(subscriptionId: string) {
    return hlp.build<boolean>(`eth_unsubscribe`, [subscriptionId])
  }
}
