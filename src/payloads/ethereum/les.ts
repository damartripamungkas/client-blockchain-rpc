import { PayloadHelper as hlp } from "~/helpers/payload"
import type { IAddress } from "~/types/payloads.ethereum"
import type { IResultLesCheckpoint, IResultLesClientInfo, IResultLesServerInfo } from "~/types/payloads.ethereum.les"

export class EthereumLesPayload {
  public static clientInfo(ids: string[]) {
    return hlp.build<IResultLesClientInfo>(`les_clientInfo`, [ids])
  }

  public static getCheckpoint(sectionIndex: number) {
    return hlp.build<IResultLesCheckpoint>(`les_getCheckpoint`, [sectionIndex])
  }

  public static getCheckpointContractAddress() {
    return hlp.build<IAddress>(`les_getCheckpointContractAddress`, [])
  }

  public static latestCheckpoint() {
    return hlp.build<IResultLesCheckpoint>(`les_latestCheckpoint`, [])
  }

  public static priorityClientInfo(ids: string[]) {
    return hlp.build<IResultLesClientInfo>(`les_priorityClientInfo`, [ids])
  }

  public static serverInfo() {
    return hlp.build<IResultLesServerInfo>(`les_serverInfo`, [])
  }
}
