import { Provider } from "~/core"
import { EthereumPayload as Pld } from "~/payloads"

export class EthereumRpc {
  public constructor(protected provider: Provider<any>) {}

  public async accounts() {
    return await this.provider.send(Pld.accounts())
  }

  public async blobBaseFee() {
    return await this.provider.send(Pld.blobBaseFee())
  }

  public async blockNumber() {
    return await this.provider.send(Pld.blockNumber())
  }

  public async call(...args: Parameters<typeof Pld.call>) {
    return await this.provider.send(Pld.call(...args))
  }

  public async callMany(...args: Parameters<typeof Pld.callMany>) {
    return await this.provider.send(Pld.callMany(...args))
  }

  public async chainId() {
    return await this.provider.send(Pld.chainId())
  }

  public async estimateGas(...args: Parameters<typeof Pld.estimateGas>) {
    return await this.provider.send(Pld.estimateGas(...args))
  }

  public async feeHistory(...args: Parameters<typeof Pld.feeHistory>) {
    return await this.provider.send(Pld.feeHistory(...args))
  }

  public async gasPrice() {
    return await this.provider.send(Pld.gasPrice())
  }

  public async getAccount(...args: Parameters<typeof Pld.getAccount>) {
    return await this.provider.send(Pld.getAccount(...args))
  }

  public async getBalance(...args: Parameters<typeof Pld.getBalance>) {
    return await this.provider.send(Pld.getBalance(...args))
  }

  public async getBlockByHash(...args: Parameters<typeof Pld.getBlockByHash>) {
    return await this.provider.send(Pld.getBlockByHash(...args))
  }

  public async getBlockByNumber(...args: Parameters<typeof Pld.getBlockByNumber>) {
    return await this.provider.send(Pld.getBlockByNumber(...args))
  }

  public async getBlockReceipts(...args: Parameters<typeof Pld.getBlockReceipts>) {
    return await this.provider.send(Pld.getBlockReceipts(...args))
  }

  public async getBlockTransactionCountByHash(...args: Parameters<typeof Pld.getBlockTransactionCountByHash>) {
    return await this.provider.send(Pld.getBlockTransactionCountByHash(...args))
  }

  public async getBlockTransactionCountByNumber(...args: Parameters<typeof Pld.getBlockTransactionCountByNumber>) {
    return await this.provider.send(Pld.getBlockTransactionCountByNumber(...args))
  }

  public async getCode(...args: Parameters<typeof Pld.getCode>) {
    return await this.provider.send(Pld.getCode(...args))
  }

  public async getFilterChanges(...args: Parameters<typeof Pld.getFilterChanges>) {
    return await this.provider.send(Pld.getFilterChanges(...args))
  }

  public async getFilterLogs(...args: Parameters<typeof Pld.getFilterLogs>) {
    return await this.provider.send(Pld.getFilterLogs(...args))
  }

  public async getLogs(...args: Parameters<typeof Pld.getLogs>) {
    return await this.provider.send(Pld.getLogs(...args))
  }

  public async getProof(...args: Parameters<typeof Pld.getProof>) {
    return await this.provider.send(Pld.getProof(...args))
  }

  public async getStorageAt(...args: Parameters<typeof Pld.getStorageAt>) {
    return await this.provider.send(Pld.getStorageAt(...args))
  }

  public async getTransactionByBlockHashAndIndex(...args: Parameters<typeof Pld.getTransactionByBlockHashAndIndex>) {
    return await this.provider.send(Pld.getTransactionByBlockHashAndIndex(...args))
  }

  public async getTransactionByBlockNumberAndIndex(...args: Parameters<typeof Pld.getTransactionByBlockNumberAndIndex>) {
    return await this.provider.send(Pld.getTransactionByBlockNumberAndIndex(...args))
  }

  public async getTransactionByHash(...args: Parameters<typeof Pld.getTransactionByHash>) {
    return await this.provider.send(Pld.getTransactionByHash(...args))
  }

  public async getRawTransactionByHash(...args: Parameters<typeof Pld.getRawTransactionByHash>) {
    return await this.provider.send(Pld.getRawTransactionByHash(...args))
  }

  public async getTransactionCount(...args: Parameters<typeof Pld.getTransactionCount>) {
    return await this.provider.send(Pld.getTransactionCount(...args))
  }

  public async getTransactionReceipt(...args: Parameters<typeof Pld.getTransactionReceipt>) {
    return await this.provider.send(Pld.getTransactionReceipt(...args))
  }

  public async getUncleCountByBlockHash(...args: Parameters<typeof Pld.getUncleCountByBlockHash>) {
    return await this.provider.send(Pld.getUncleCountByBlockHash(...args))
  }

  public async getUncleCountByBlockNumber(...args: Parameters<typeof Pld.getUncleCountByBlockNumber>) {
    return await this.provider.send(Pld.getUncleCountByBlockNumber(...args))
  }

  public async hashrate() {
    return await this.provider.send(Pld.hashrate())
  }

  public async maxPriorityFeePerGas() {
    return await this.provider.send(Pld.maxPriorityFeePerGas())
  }

  public async mining() {
    return await this.provider.send(Pld.mining())
  }

  public async newBlockFilter() {
    return await this.provider.send(Pld.newBlockFilter())
  }

  public async newFilter(...args: Parameters<typeof Pld.newFilter>) {
    return await this.provider.send(Pld.newFilter(...args))
  }

  public async newPendingTransactionFilter() {
    return await this.provider.send(Pld.newPendingTransactionFilter())
  }

  public async sendRawTransaction(...args: Parameters<typeof Pld.sendRawTransaction>) {
    return await this.provider.send(Pld.sendRawTransaction(...args))
  }

  public async signTransaction(...args: Parameters<typeof Pld.signTransaction>) {
    return await this.provider.send(Pld.signTransaction(...args))
  }

  public async simulateV1(...args: Parameters<typeof Pld.simulateV1>) {
    return await this.provider.send(Pld.simulateV1(...args))
  }

  public async submitWork(...args: Parameters<typeof Pld.submitWork>) {
    return await this.provider.send(Pld.submitWork(...args))
  }

  public async subscribe(...args: Parameters<typeof Pld.subscribe>) {
    return await this.provider.send(Pld.subscribe(...args))
  }

  public async syncing() {
    return await this.provider.send(Pld.syncing())
  }

  public async uninstallFilter(...args: Parameters<typeof Pld.uninstallFilter>) {
    return await this.provider.send(Pld.uninstallFilter(...args))
  }

  public async unsubscribe(...args: Parameters<typeof Pld.unsubscribe>) {
    return await this.provider.send(Pld.unsubscribe(...args))
  }
}
