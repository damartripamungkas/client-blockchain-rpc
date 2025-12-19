import { describe, expect, test, spyOn } from "bun:test"
import { Provider } from "~/core/provider"
import { EthereumRpc } from "~/rpc/ethereum/ethereum"

describe(`Ethereum RPC`, () => {
  test(`chainId should call provider with correct parameters`, async () => {
    const provider = new Provider(`http://localhost:8545`)
    const eth = new EthereumRpc(provider)

    // Spy on provider.send
    const sendSpy = spyOn(provider, `send`).mockImplementation(async () => BigInt(1))

    const chainId = await eth.chainId()

    expect(chainId).toBe(1n)
    expect(sendSpy).toHaveBeenCalled()
    // Verify arguments: method="eth_chainId", params=[], format=parseInt (from payload)
    // Note: The payload uses parseInt, but our spy returns BigInt directly.
    // The spy bypasses the actual implementation of send, so we just check if it was called.

    const calls = sendSpy.mock.calls
    expect(calls.length).toBe(1)

    // Check if it was called with object (overload)
    const arg = calls[0]?.[0] as any
    expect(arg.method).toBe(`eth_chainId`)
    expect(arg.params).toEqual([])
  })

  test(`blockNumber should call provider with correct parameters`, async () => {
    const provider = new Provider(`http://localhost:8545`)
    const eth = new EthereumRpc(provider)

    // Spy on provider.send
    const sendSpy = spyOn(provider, `send`).mockImplementation(async () => BigInt(123))

    const blockNum = await eth.blockNumber()

    expect(blockNum).toBe(BigInt(123))

    const calls = sendSpy.mock.calls
    expect(calls.length).toBe(1)
    // Check if it was called with object (overload)
    const arg = calls[0]?.[0] as any
    expect(arg.method).toBe(`eth_blockNumber`)
  })
})
