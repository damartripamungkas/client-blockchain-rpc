import { PayloadHelper as hlp } from "~/helpers/payload"
import type { IResultNodeInfo, IResultPeer } from "~/types/payloads.ethereum.admin"

export class EthereumAdminPayload {
  public static addPeer(url: string) {
    return hlp.build<boolean>(`admin_addPeer`, [url])
  }

  public static datadir() {
    return hlp.build<string>(`admin_datadir`, [])
  }

  public static nodeInfo() {
    return hlp.build<IResultNodeInfo>(`admin_nodeInfo`, [])
  }

  public static peers() {
    return hlp.build<IResultPeer[]>(`admin_peers`, [])
  }

  public static removePeer(url: string) {
    return hlp.build<boolean>(`admin_removePeer`, [url])
  }

  public static startRPC(host?: string, port?: number, cors?: string, apis?: string) {
    return hlp.build<boolean>(`admin_startRPC`, [host, port, cors, apis])
  }

  public static startWS(host?: string, port?: number, cors?: string, apis?: string) {
    return hlp.build<boolean>(`admin_startWS`, [host, port, cors, apis])
  }

  public static stopRPC() {
    return hlp.build<boolean>(`admin_stopRPC`, [])
  }

  public static stopWS() {
    return hlp.build<boolean>(`admin_stopWS`, [])
  }
}
