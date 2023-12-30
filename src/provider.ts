import libHttp from "./connect/http"
import libIpc from "./connect/ipc"
import libWs from "./connect/ws"

type TypeSend = { method: string; params: any[]; formatReturn?: (pureValue: any) => any }
type TypeParamInit = {
  urlRpc: string
  socket?: object
  reconnect?: {
    autoReconnect?: boolean
    delay?: number
    maxAttempts?: number
  }
}

/**
 * @param urlRpc url rpc node blockchain
 * @param socket [optional] socket for lib
 * @param reconnect [optional] reconnect for network type ws/ipc
 */
export default ({ urlRpc, socket, reconnect }: TypeParamInit) => {
  socket = socket ? socket : {}
  reconnect = reconnect ? reconnect : {}
  const state = { nextId: 0, maxSafeNextId: Number["MAX_SAFE_INTEGER"] }
  const client: ReturnType<typeof libWs> = Object.assign({})
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

  if (urlRpc.startsWith("http")) {
    Object.assign(client, libHttp(urlRpc, socket))
  } else if (urlRpc.startsWith("ws")) {
    Object.assign(client, libWs(urlRpc, socket, reconnect))
  } else if (urlRpc.endsWith(".ipc")) {
    Object.assign(client, libIpc(urlRpc, socket, reconnect))
  } else {
    throw `network type is not supported, only support http/ws/.ipc`
  }

  return {
    ...client,
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

      const res: any = await client.request(bodyJsonRpc as any)
      return res.sort((a: any, b: any) => a["id"] - b["id"]).map((it: any, index: number) => returnSend(it, data[index]["formatReturn"]))
    },
  }
}
