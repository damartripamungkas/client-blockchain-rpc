import type { Provider } from "~/core"
import { EthereumWeb3Payload as Pld } from "~/payloads"

export class EthereumWeb3Rpc {
  public constructor(protected provider: Provider<any>) {}

  public async clientVersion() {
    return await this.provider.send(Pld.clientVersion())
  }

  public async sha3(...args: Parameters<typeof Pld.sha3>) {
    return await this.provider.send(Pld.sha3(...args))
  }
}
