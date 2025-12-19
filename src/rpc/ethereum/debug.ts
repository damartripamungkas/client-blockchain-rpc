import type { Provider } from "~/core"
import { EthereumDebugPayload as Pld } from "~/payloads"

export class EthereumDebugRpc {
  public constructor(protected provider: Provider<any>) {}

  public async dumpBlock(...args: Parameters<typeof Pld.dumpBlock>) {
    return await this.provider.send(Pld.dumpBlock(...args))
  }

  public async gcStats() {
    return await this.provider.send(Pld.gcStats())
  }

  public async getBadBlocks() {
    return await this.provider.send(Pld.getBadBlocks())
  }

  public async storageRangeAt(...args: Parameters<typeof Pld.storageRangeAt>) {
    return await this.provider.send(Pld.storageRangeAt(...args))
  }

  public async traceBlock(...args: Parameters<typeof Pld.traceBlock>) {
    return await this.provider.send(Pld.traceBlock(...args))
  }

  public async traceBlockByHash(...args: Parameters<typeof Pld.traceBlockByHash>) {
    return await this.provider.send(Pld.traceBlockByHash(...args))
  }

  public async traceBlockByNumber(...args: Parameters<typeof Pld.traceBlockByNumber>) {
    return await this.provider.send(Pld.traceBlockByNumber(...args))
  }

  public async traceCall(...args: Parameters<typeof Pld.traceCall>) {
    return await this.provider.send(Pld.traceCall(...args))
  }

  public async traceTransaction(...args: Parameters<typeof Pld.traceTransaction>) {
    return await this.provider.send(Pld.traceTransaction(...args))
  }
}
