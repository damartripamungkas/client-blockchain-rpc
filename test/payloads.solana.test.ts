import { describe, expect, test } from "bun:test"
import { SolanaPayload } from "~/payloads/solana/solana"

describe(`SolanaPayload`, () => {
  test(`getBalance generates correct payload`, () => {
    const payload = SolanaPayload.getBalance(`addr123`)
    expect(payload.method).toBe(`getBalance`)
    expect(payload.params).toEqual([`addr123`])
    expect(payload.format).toBeTypeOf(`function`)
  })

  test(`getBalance with config parses correctly`, () => {
    const payload = SolanaPayload.getBalance(`addr123`, { commitment: `finalized` })
    expect(payload.method).toBe(`getBalance`)
    expect(payload.params).toEqual([`addr123`, { commitment: `finalized` }])
    expect(payload.format).toBeTypeOf(`function`)
  })

  test(`sendTransaction`, () => {
    const payload = SolanaPayload.sendTransaction(`tx_base64`)
    expect(payload.method).toBe(`sendTransaction`)
    expect(payload.params).toEqual([`tx_base64`])
    expect(payload.format).toBeUndefined()
  })

  test(`getAccountInfo`, () => {
    const payload = SolanaPayload.getAccountInfo(`addr123`, { encoding: `base64` })
    expect(payload.method).toBe(`getAccountInfo`)
    expect(payload.params).toEqual([`addr123`, { encoding: `base64` }])
    expect(payload.format).toBeTypeOf(`function`)
  })
})
