import { IpcProvider } from "web3-providers-ipc"
import { HttpProvider } from "web3-providers-http"
import { WebSocketProvider } from "web3-providers-ws"
import type { IMethod, IParams, IPayload } from "~/types/core.provider"

// 1. Get the type parameter "options" original from each provider
type IHttpProviderOpt = NonNullable<ConstructorParameters<typeof HttpProvider>[1]>[`providerOptions`]
type IWebSocketOpt = ConstructorParameters<typeof WebSocketProvider>[1]
type IIpcOpt = ConstructorParameters<typeof IpcProvider>[1]
type IReconnectOpt = { autoReconnect?: boolean; delay?: number; maxAttempts?: number }

// 2. Map url -> parameter shape
type IProtocolOf<U extends string> = U extends `${infer P}://${string}` ? P : U extends `${string}.ipc` ? `ipc` : never
type IAllowedUrl = `http://${string}` | `https://${string}` | `ws://${string}` | `wss://${string}` | `${string}.ipc`
type IOpts<U extends IAllowedUrl> = IProtocolOf<U> extends `http` | `https` ? { options?: IHttpProviderOpt } : IProtocolOf<U> extends `ws` | `wss` ? { options?: IWebSocketOpt; reconnect?: IReconnectOpt } : IProtocolOf<U> extends `ipc` ? { options?: IIpcOpt; reconnect?: IReconnectOpt } : never

export class Provider<U extends IAllowedUrl> {
  public client: WebSocketProvider | HttpProvider | IpcProvider
  public _nextId = 0
  public _maxSafeNextId = Number.MAX_SAFE_INTEGER

  /**
   * Universal RPC Provider for Web3.
   * @param _url  – Fully-qualified RPC endpoint.
   *               Examples:
   *               - `http://localhost:8545`
   *               - `wss://mainnet.infura.io/ws/v3/<key>`
   *               - `/var/run/geth.ipc`
   * @param _opts – Optional configuration object automatically tailored to the protocol:
   *               - `http/https`: `{ options?: HttpProviderOptions }`
   *               - `ws/wss`:     `{ options?: WebSocketOptions; reconnect?: ReconnectOptions }`
   *               - `ipc`:        `{ options?: IpcOptions;     reconnect?: ReconnectOptions }`
   */
  public constructor(public _url: U, _opts?: IOpts<U>) {
    const __opts = _opts as any
    if (_url.startsWith(`http`)) {
      this.client = new HttpProvider(_url, __opts?.options || undefined)
    } else if (_url.startsWith(`ws`)) {
      this.client = new WebSocketProvider(_url, __opts?.options || {}, __opts?.reconnect || {})
    } else if (_url.endsWith(`.ipc`)) {
      this.client = new IpcProvider(_url, __opts?.options || {}, __opts?.reconnect || {})
    } else {
      throw `Network type is not supported, only support http/ws/.ipc`
    }
  }

  public _incrementNextId() {
    if (this._nextId >= this._maxSafeNextId) {
      this._nextId = 0
    }
    return (this._nextId += 1) // increment id jsonrpc
  }

  public _format<T = any>(result: { error?: any; result?: any }, func?: (args: any) => T): T {
    if (result?.error !== undefined) {
      throw result.error.message
    } else if (func === null || func === undefined) {
      return result.result
    } else {
      return func(result.result)
    }
  }

  public async request(payload: IPayload | IPayload[]) {
    return await this.client.request(payload as IPayload)
  }

  public createFullPayload(data: IPayload): any
  public createFullPayload(method: string, params: any[]): any
  public createFullPayload(methodOrData: string | IPayload, params: any[] = []): any {
    if (typeof methodOrData === `string`) {
      return {
        jsonrpc: `2.0`,
        id: this._incrementNextId(),
        method: methodOrData,
        params
      }
    } else {
      return {
        jsonrpc: `2.0`,
        id: this._incrementNextId(),
        method: methodOrData.method,
        params: methodOrData.params
      }
    }
  }

  public createFullPayloads(data: IPayload[]) {
    return data.map((it) => this.createFullPayload(it))
  }

  public async send<T = any>(payload: IPayload<T>): Promise<T>
  public async send<T = any>(method: IMethod, params?: IParams, format?: (value: any) => T): Promise<T>
  public async send<T = any>(methodOrPayload: IMethod | IPayload<T>, params: IParams = [], format?: (value: any) => T): Promise<T> {
    const pld = typeof methodOrPayload === `string` ? { method: methodOrPayload, params, format } : methodOrPayload
    const fld = this.createFullPayload(pld)
    const res = await this.request(fld)
    return this._format(res, pld.format)
  }

  public async sendBatch<const T extends readonly IPayload<any>[]>(...args: T | [T]): Promise<{ -readonly [P in keyof T]: T[P] extends IPayload<infer R> ? R : any }> {
    const data = (args[1] === undefined ? args[0] : args) as unknown as IPayload[]
    const pld = this.createFullPayloads(data)
    const res: any = await this.request(pld)
    if (Array.isArray(res) === false) {
      throw `Batch request failed: ${String(res)}`
    }
    return res.map((it: any, index: number) => this._format(it, data[index]?.format)) as any
  }

  public async subscribe(payload: IPayload, reconnect: boolean, callback: (result: any, subsId: string) => void): Promise<string>
  public async subscribe(method: IMethod, params: IParams, reconnect: boolean, callback: (result: any, subsId: string) => void): Promise<string>
  public async subscribe(methodOrPayload: IMethod | IPayload, paramsOrReconnect: IParams | boolean, reconnectOrCallback: boolean | ((result: any, subsId: string) => void), callback?: (result: any, subsId: string) => void): Promise<string> {
    let method: IMethod
    let params: IParams
    let reconnect: boolean
    let cb: (result: any, subsId: string) => void

    if (typeof methodOrPayload === `string`) {
      method = methodOrPayload
      params = paramsOrReconnect as IParams
      reconnect = reconnectOrCallback as boolean
      cb = callback as typeof cb
    } else {
      method = methodOrPayload.method
      params = methodOrPayload.params
      reconnect = paramsOrReconnect as boolean
      cb = reconnectOrCallback as typeof cb
    }

    let subsId = await this.send(method, params)
    const handle = (res: any) => {
      if (res?.params?.subscription == subsId) {
        cb(res.params.result, subsId)
      }
    }

    this.client.on(`message` as any, handle)
    if (reconnect === true) {
      this.client.on(`connect`, async () => {
        subsId = await this.send(method, params)
      })
    }
    return subsId
  }
}
