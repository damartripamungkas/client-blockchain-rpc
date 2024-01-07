import { IpcProvider } from "web3-providers-ipc"
import { HttpProvider } from "web3-providers-http"
import { WebSocketProvider } from "web3-providers-ws"
import { TypeParamInit, TypeSend } from "./type"
import { Web3 } from "web3"

/**
 * @param url url rpc node blockchain
 * @param socket [optional] socket for lib
 * @param reconnect [optional] reconnect for network type ws/ipc
 */
export default ({ url, socket, reconnect }: TypeParamInit) => {
  if (!socket) socket = {}
  if (!reconnect) reconnect = {}
  let state = { nextId: 0, maxSafeNextId: Number["MAX_SAFE_INTEGER"] }
  let provider: WebSocketProvider
  const hookNextId = () => {
    if (state["nextId"] >= state["maxSafeNextId"]) {
      state["nextId"] = 0
    }
    return (state["nextId"] += 1) // increment id jsonrpc
  }

  const returnSend = (result: any, returnFormat: (args: any) => any) => {
    if (result["error"] !== undefined) throw result.error["message"]
    if (returnFormat === null || returnFormat === undefined) return result["result"]
    return returnFormat(result["result"])
  }

  if (url.startsWith("http")) {
    provider = new HttpProvider(url) as any
  } else if (url.startsWith("ws")) {
    provider = new WebSocketProvider(url, socket, reconnect) as any
  } else if (url.endsWith(".ipc")) {
    provider = new IpcProvider(url, socket, reconnect) as any
  } else {
    throw `network type is not supported, only support http/ws/.ipc`
  }

  const web3 = new Web3(provider)
  const client = provider
  const res = {
    client,
    web3,
    send: async (data: TypeSend) => {
      const res = await client.request({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: data["method"],
        params: data["params"],
      })
      return returnSend(res, data["formatReturn"])
    },
    sendBatch: async (data: TypeSend[]) => {
      const bodyJsonRpc = data.map((it) => ({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: it["method"],
        params: it["params"],
      }))

      const result: any = await client.request(bodyJsonRpc as any)
      return result.map((it: any, index: any) => returnSend(it, data[index]["formatReturn"]))
      // return result.sort((a: any, b: any) => a["id"] - b["id"]).map((it: any, index) => returnSend(it, data[index]["formatReturn"]))
    },
  }

  return res
}
