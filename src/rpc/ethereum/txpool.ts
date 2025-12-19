import type { Provider } from "~/core"
import { EthereumTxPoolPayload as Pld } from "~/payloads"

export class EthereumTxpoolRpc {
  public constructor(protected provider: Provider<any>) {}

  public async txpoolContent() {
    return await this.provider.send(Pld.content())
  }

  public async txpoolInspect() {
    return await this.provider.send(Pld.inspect())
  }

  public async txpoolContentFrom(...args: Parameters<typeof Pld.contentFrom>) {
    return await this.provider.send(Pld.contentFrom(...args))
  }

  public async txpoolStatus() {
    return await this.provider.send(Pld.status())
  }
}
