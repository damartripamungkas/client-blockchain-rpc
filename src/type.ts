type TypeValNum = string | bigint | number

export type TypeTx = {
  to?: string
  from?: string
  data?: string
  gasLimit?: TypeValNum
  gasPrice?: TypeValNum
  maxFeePerGas?: TypeValNum
  maxPriorityFeePerGas?: TypeValNum
  value?: TypeValNum
  nonce?: TypeValNum
  chainId?: TypeValNum
  type?: TypeValNum
}

export type TypeSend = {
  method: string
  params: any[]
  formatReturn?: (pureValue: any) => any
}

export type TypeParamInit = {
  url: string
  socket?: object
  reconnect?: {
    autoReconnect?: boolean
    delay?: number
    maxAttempts?: number
  }
}
