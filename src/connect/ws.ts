import { WebSocketProvider } from "web3-providers-ws"

export default (url: string, socketOpt: object, reconnectOpt: object) => {
  const client = new WebSocketProvider(url, socketOpt, reconnectOpt)
  Object.assign(client, {
    _getChainId: () => new Promise((res) => res([])), // overrides because is calling without agreement
    _getAccounts: () => new Promise((res) => res([])), // overrides because is calling without agreement
  })

  const on = client["on"]
  const disconnect = () => client.disconnect()
  const isReady = async () => {
    return new Promise((resolve) => {
      client.once("connect", () => resolve(true))
    })
  }
  const request = client["request"]
  return { on, disconnect, isReady, request }
}
