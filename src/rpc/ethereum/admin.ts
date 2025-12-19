import type { Provider } from "~/core"
import { EthereumAdminPayload as Pld } from "~/payloads"

export class EthereumAdminRpc {
  public constructor(protected provider: Provider<any>) {}

  public async addPeer(...args: Parameters<typeof Pld.addPeer>) {
    return await this.provider.send(Pld.addPeer(...args))
  }

  public async datadir() {
    return await this.provider.send(Pld.datadir())
  }

  public async nodeInfo() {
    return await this.provider.send(Pld.nodeInfo())
  }

  public async peers() {
    return await this.provider.send(Pld.peers())
  }

  public async removePeer(...args: Parameters<typeof Pld.removePeer>) {
    return await this.provider.send(Pld.removePeer(...args))
  }

  public async startRPC(...args: Parameters<typeof Pld.startRPC>) {
    return await this.provider.send(Pld.startRPC(...args))
  }

  public async startWS(...args: Parameters<typeof Pld.startWS>) {
    return await this.provider.send(Pld.startWS(...args))
  }

  public async stopRPC() {
    return await this.provider.send(Pld.stopRPC())
  }

  public async stopWS() {
    return await this.provider.send(Pld.stopWS())
  }
}
