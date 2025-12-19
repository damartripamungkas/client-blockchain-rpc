import { PayloadHelper as hlp } from "~/helpers/payload"

export class EthereumNetPayload {
  public static listening() {
    return hlp.build<boolean>(`net_listening`, [])
  }

  public static peerCount() {
    return hlp.build<bigint>(`net_peerCount`, [], BigInt)
  }

  public static version() {
    return hlp.build<string>(`net_version`, [])
  }
}
