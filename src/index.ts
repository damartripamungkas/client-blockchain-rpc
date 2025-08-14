import { IpcProvider } from "web3-providers-ipc"
import { HttpProvider } from "web3-providers-http"
import { WebSocketProvider } from "web3-providers-ws"
import { Web3 } from "web3"

export type TypeInitOpts = {
  options?: object
  reconnect?: {
    autoReconnect?: boolean
    delay?: number
    maxAttempts?: number
  }
}

export type TypeSend = {
  method: string
  params: any[]
  formatReturn?: (pureValue: any) => any
}

// 1. Get the type parameter "options" original from each provider
type HttpProviderOptions = NonNullable<ConstructorParameters<typeof HttpProvider>[1]>[`providerOptions`]
type WebSocketOptions = ConstructorParameters<typeof WebSocketProvider>[1]
type IpcOptions = ConstructorParameters<typeof IpcProvider>[1]
type ReconnectOptions = { autoReconnect?: boolean; delay?: number; maxAttempts?: number }

// 2. Map url -> parameter shape
type ProtocolOf<U extends string> = U extends `${infer P}://${string}` ? P : U extends `${string}.ipc` ? `ipc` : never
type AllowedUrl = `http://${string}` | `https://${string}` | `ws://${string}` | `wss://${string}` | `${string}.ipc`
type InitShape<U extends AllowedUrl> = ProtocolOf<U> extends `http` | `https`
  ? { options?: HttpProviderOptions }
  : ProtocolOf<U> extends `ws` | `wss`
  ? { options?: WebSocketOptions; reconnect?: ReconnectOptions }
  : ProtocolOf<U> extends `ipc`
  ? { options?: IpcOptions; reconnect?: ReconnectOptions }
  : never

export class Provider<U extends AllowedUrl> {
  public web3: Web3
  public client: WebSocketProvider | HttpProvider | IpcProvider
  private nextId = 0
  private maxSafeNextId = Number.MAX_SAFE_INTEGER

  /**
   * Universal RPC Provider for Web3.
   * @param url  – Fully-qualified RPC endpoint.
   *               Examples:
   *               • `http://localhost:8545`
   *               • `wss://mainnet.infura.io/ws/v3/<key>`
   *               • `/var/run/geth.ipc`
   * @param opts – Optional configuration object automatically tailored to the protocol:
   *               • `http/https`: `{ providerOptions?: HttpProviderOptions }`
   *               • `ws/wss`:     `{ options?: WebSocketOptions; reconnect?: ReconnectOptions }`
   *               • `ipc`:        `{ options?: IpcOptions;     reconnect?: ReconnectOptions }`
   */
  constructor(url: U, opts?: InitShape<U>) {
    const _opts = opts as any
    if (url.startsWith(`http`)) {
      this.client = new HttpProvider(url, _opts?.options || undefined)
    } else if (url.startsWith(`ws`)) {
      this.client = new WebSocketProvider(url, _opts?.options || {}, _opts?.reconnect || {})
    } else if (url.endsWith(`.ipc`)) {
      this.client = new IpcProvider(url, _opts?.options || {}, _opts?.reconnect || {})
    } else {
      throw `Network type is not supported, only support http/ws/.ipc`
    }
    this.web3 = new Web3(this.client)
  }

  private incrementNextId() {
    if (this.nextId >= this.maxSafeNextId) {
      this.nextId = 0
    }
    return (this.nextId += 1) // increment id jsonrpc
  }

  private formatReturn(result: any, returnFormat?: (args: any) => any) {
    if (result?.error !== undefined) {
      throw result.error.message
    } else if (returnFormat === null || returnFormat === undefined) {
      return result.result
    } else {
      return returnFormat(result.result)
    }
  }

  async isReady() {
    // return await this.client.isReady();
  }

  async request(payload: object | any[]) {
    return await this.client.request(payload as any)
  }

  createSend(data: TypeSend, randomId = false) {
    return {
      jsonrpc: `2.0`,
      id: randomId ? Math.random() : this.incrementNextId(),
      method: data.method,
      params: data.params
    }
  }

  createSendBatch(data: TypeSend[], randomId = false) {
    const bodyJsonRpc = data.map((it) => this.createSend(it, randomId))
    return bodyJsonRpc
  }

  async send(data: TypeSend): Promise<any> {
    const bodyJsonRpc = this.createSend(data)
    const res = await this.request(bodyJsonRpc)
    return this.formatReturn(res, data.formatReturn)
  }

  async sendBatch(data: TypeSend[]): Promise<any[]> {
    const bodyJsonRpc = this.createSendBatch(data)
    const result: any = await this.request(bodyJsonRpc as any)
    if (Array.isArray(result) === false) {
      throw `Batch request failed: ${String(result)}`
    }
    return result.map((it: any, index: number) => this.formatReturn(it, data[index]?.formatReturn))
  }

  async subscribe(args: TypeSend, reconnect: boolean, callback: (res: any, subsId: string) => void): Promise<string> {
    let subsId = await this.send(args)
    const handle = (res: any) => {
      if (res?.params?.subscription == subsId) {
        callback(res.params.result, subsId)
      }
    }

    this.client.on(`message` as any, handle)
    if (reconnect === true) {
      this.client.on(`connect`, async () => {
        subsId = await this.send(args)
      })
    }
    return subsId
  }
}
