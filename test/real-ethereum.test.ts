import { describe, expect, test } from "bun:test"
import { Provider, EthereumPayload as Pld, EthereumRpc as Rpc } from "~/index"

describe(`Ethereum Real Integration Test`, () => {
  // Use a public RPC for real tests
  const provider = new Provider(`wss://ethereum-rpc.publicnode.com`)
  const eth = new Rpc(provider)

  test(`should fetch real block number`, async () => {
    const blockNumber = await eth.blockNumber()
    console.log(`+ Real Block Number:`, blockNumber)
    expect(typeof blockNumber).toBe(`bigint`)
    expect(blockNumber).toBeGreaterThan(0n)
  })

  test(`should handle batch requests`, async () => {
    const [blockNumber, chainId] = await provider.sendBatch(Pld.blockNumber(), Pld.chainId())
    console.log(`+ Real Batch Result - Block:`, blockNumber, `ChainId:`, chainId)
    expect(typeof blockNumber).toBe(`bigint`)
    expect(typeof chainId).toBe(`bigint`)
  })

  test(`should subscribe and receive real event`, async () => {
    // We'll wrap the subscription in a promise to wait for the first data
    const result = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Subscription timed out`)), 15000)

      provider
        .subscribe(Pld.subscribe(`newHeads`), true, async (data, subsId) => {
          clearTimeout(timeout)
          console.log(`+ Received real sub data (subsId: ${subsId}):`, data)

          // Unsubscribe immediately
          const uns = await eth.unsubscribe(subsId)
          console.log(`+ Unsubscribe result:`, uns)

          resolve({ data, uns })
        })
        .catch(reject)
    })

    expect((result as any).data).toBeDefined()
    expect((result as any).uns).toBe(true)
  }, 20000) // 20s timeout for network latency
})
