import { describe, expect, test } from "bun:test"
import { EthereumPayload } from "~/payloads/ethereum/ethereum"

describe(`EthereumPayload`, () => {
  test(`eth_estimateGas with stateOverride`, () => {
    const transaction = { to: `0x123` }
    const override = { "0x123": { balance: `0x1` } }
    const payload = EthereumPayload.estimateGas(transaction, `latest`, override)
    expect(payload.params).toEqual([transaction, `latest`, override])
  })

  test(`eth_estimateGas without stateOverride`, () => {
    const transaction = { to: `0x123` }
    const payload = EthereumPayload.estimateGas(transaction, `latest`)
    expect(payload.params).toEqual([transaction, `latest`])
  })

  test(`eth_call with stateOverride`, () => {
    const transaction = { to: `0x123` }
    const override = { "0x123": { balance: `0x1` } }
    const payload = EthereumPayload.call(transaction, `latest`, override)
    expect(payload.params).toEqual([transaction, `latest`, override])
  })

  test(`eth_call without stateOverride`, () => {
    const transaction = { to: `0x123` }
    const payload = EthereumPayload.call(transaction, `latest`)
    expect(payload.params).toEqual([transaction, `latest`])
  })

  test(`eth_subscribe without data`, () => {
    const payload = EthereumPayload.subscribe(`newHeads`)
    expect(payload.params).toEqual([`newHeads`])
  })
})
