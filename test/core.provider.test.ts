import { describe, expect, test, mock } from "bun:test"
import { Provider } from "~/core/provider"

// Mock HTTP Provider since we don't want real network calls in unit tests
// For integration tests we might want real calls or a local node
describe(`Core Provider`, () => {
  test(`should be able to instantiate`, () => {
    const provider = new Provider(`http://localhost:8545`)
    expect(provider).toBeDefined()
  })

  test(`should format return value correctly`, async () => {
    const provider = new Provider(`http://localhost:8545`)

    // Mock request
    const mockRequest = mock(async (payload) => {
      return {
        jsonrpc: `2.0`,
        id: payload.id,
        result: `0x1`
      }
    })
    provider.request = mockRequest as any

    const result = await provider.send(`test_method`, [], (val) => Number(val))
    expect(result).toBe(1)
    expect(typeof result).toBe(`number`)
  })

  test(`should support generic return types`, async () => {
    const provider = new Provider(`http://localhost:8545`)

    // Mock request
    provider.request = mock(async () => ({ jsonrpc: `2.0`, id: 1, result: `100` })) as any

    const res = await provider.send<string>(`foo`, [], (val) => val.toString())
    expect(res).toBe(`100`)
  })

  test(`should support object overload`, async () => {
    const provider = new Provider(`http://localhost:8545`)
    provider.request = mock(async () => ({ jsonrpc: `2.0`, id: 1, result: `100` })) as any

    // Test object overloading
    const res = await provider.send({
      method: `foo`,
      params: [],
      format: (val) => Number(val)
    })
    expect(res).toBe(100)
  })

  test(`should support createFullPayload overload`, () => {
    const provider = new Provider(`http://localhost:8545`)
    const p1 = provider.createFullPayload({ method: `foo`, params: [] })
    expect(p1.method).toBe(`foo`)

    const p2 = provider.createFullPayload(`bar`, [])
    expect(p2.method).toBe(`bar`)
  })

  test(`should support subscribe overload`, async () => {
    const provider = new Provider(`http://localhost:8545`)

    // Mock send for subscription
    provider.send = mock(async () => `0x123`)

    // Mock on
    provider.client.on = mock(() => {}) as any

    await provider.subscribe({ method: `eth_subscribe`, params: [] }, false, () => {})
    expect(provider.send).toHaveBeenCalled()

    await provider.subscribe(`eth_subscribe`, [], false, () => {})
    expect(provider.send).toHaveBeenCalledTimes(2)
  })

  test(`should support sendBatch overload`, async () => {
    const provider = new Provider(`http://localhost:8545`)

    // Mock request for batch
    provider.request = mock(async (payload) => {
      // Should be an array of requests
      if (Array.isArray(payload)) {
        return payload.map((p: any) => ({
          jsonrpc: `2.0`,
          id: p.id,
          result: p.params[0] // echo param as result
        }))
      }
      return { error: `Not a batch` }
    }) as any

    const p1 = { method: `echo`, params: [1], format: (v: any) => v }
    const p2 = { method: `echo`, params: [2], format: (v: any) => v }

    // Test Array
    const res1 = await provider.sendBatch([p1, p2])
    expect(res1).toEqual([1, 2])

    // Test Variadic
    const res2 = await provider.sendBatch(p1, p2)
    expect(res2).toEqual([1, 2])
  })
})
