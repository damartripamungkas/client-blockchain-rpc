import type { Provider } from "~/core"
import { EthereumNetPayload as Pld } from "~/payloads"

export class EthereumNetRpc {
  public constructor(protected provider: Provider<any>) {}

  public async listening() {
    return await this.provider.send(Pld.listening())
  }

  public async peerCount() {
    return await this.provider.send(Pld.peerCount())
  }

  public async version() {
    return await this.provider.send(Pld.version())
  }
}
