import { PayloadHelper as hlp } from "~/helpers/payload"

export class EthereumWeb3Payload {
  public static clientVersion() {
    return hlp.build<string>(`web3_clientVersion`, [])
  }

  public static sha3(data: string) {
    return hlp.build<string>(`web3_sha3`, [data])
  }
}
