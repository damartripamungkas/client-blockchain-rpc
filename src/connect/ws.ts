import { WebSocketProvider } from "web3-providers-ws"

export default (url: string, socketOpt: object, reconnectOpt: object) => {
  const client = new WebSocketProvider(url, socketOpt, reconnectOpt)
  Object.assign(client, {
    _getChainId: () => new Promise((res) => res([])), // overrides because is calling without agreement
    _getAccounts: () => new Promise((res) => res([])), // overrides because is calling without agreement
  })

  const on = client["on"]
  const disconnect = client["disconnect"]
  const request = client["request"]
  const isReady = () => {
    client.connect()
    return true
  }
  return { on, disconnect, isReady, request }
}
