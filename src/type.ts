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
