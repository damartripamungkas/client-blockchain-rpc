import { IpcProvider } from "web3-providers-ipc"

export default (url: string, socketOpt: object, reconnectOpt: object) => {
  const client = new IpcProvider(url, socketOpt, reconnectOpt)
  Object.assign(client, {
    _getChainId: () => new Promise((res) => res([])), // overrides because is calling without agreement
    _getAccounts: () => new Promise((res) => res([])), // overrides because is calling without agreement
  })

  const on = client["on"]
  const isReady = async () => {
    return new Promise((resolve) => {
      client.once("connect", () => resolve(true))
    })
  }
  const request = client["request"]

  return { on, isReady, request }
}
