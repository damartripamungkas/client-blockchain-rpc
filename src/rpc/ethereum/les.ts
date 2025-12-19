import type { Provider } from "~/core"
import { EthereumLesPayload as Pld } from "~/payloads"

export class EthereumLesRpc {
  public constructor(protected provider: Provider<any>) {}

  public async clientInfo(...args: Parameters<typeof Pld.clientInfo>) {
    return await this.provider.send(Pld.clientInfo(...args))
  }

  public async getCheckpoint(...args: Parameters<typeof Pld.getCheckpoint>) {
    return await this.provider.send(Pld.getCheckpoint(...args))
  }

  public async getCheckpointContractAddress() {
    return await this.provider.send(Pld.getCheckpointContractAddress())
  }

  public async latestCheckpoint() {
    return await this.provider.send(Pld.latestCheckpoint())
  }

  public async priorityClientInfo(...args: Parameters<typeof Pld.priorityClientInfo>) {
    return await this.provider.send(Pld.priorityClientInfo(...args))
  }

  public async serverInfo() {
    return await this.provider.send(Pld.serverInfo())
  }
}
