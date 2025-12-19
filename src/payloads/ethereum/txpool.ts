import { PayloadHelper as hlp } from "~/helpers/payload"
import type { IAddress } from "~/types/payloads.ethereum"
import type { IResultTxPoolContent, IResultTxPoolInspect, IResultTxPoolStatus } from "~/types/payloads.ethereum.txpool"

export class EthereumTxPoolPayload {
  public static content() {
    return hlp.build<IResultTxPoolContent>(`txpool_content`, [])
  }

  public static inspect() {
    return hlp.build<IResultTxPoolInspect>(`txpool_inspect`, [])
  }

  public static contentFrom(address: IAddress) {
    return hlp.build<IResultTxPoolContent>(`txpool_contentFrom`, [address])
  }

  public static status() {
    return hlp.build<IResultTxPoolStatus>(`txpool_status`, [])
  }
}
