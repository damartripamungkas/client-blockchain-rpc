import { Provider } from ".."
const provider = new Provider(`wss://ethereum-rpc.publicnode.com`)

const run = async () => {
  console.log(`============= test .send()`)
  const blockNumber = await provider.send({ method: `eth_blockNumber`, params: [], formatReturn: BigInt })
  console.log(`============= test .send():`, blockNumber)

  console.log(`============= test .sendBatch()`)
  const req = await provider.sendBatch([
    {
      method: `eth_blockNumber`,
      params: [],
      formatReturn: BigInt
    },
    {
      method: `eth_chainId`,
      params: [],
      formatReturn: parseInt
    }
  ])
  console.log(`============= test .sendBatch():`, req)

  let id = null as any
  console.log(`============= test .subscribe()`)
  provider.subscribe({ method: `eth_subscribe`, params: [`newHeads`] }, true, (data, subsId) => {
    if (!id) {
      id = subsId
      console.log(`============= test .subscribe():`, subsId)
      return
    }

    console.log(`============= test .subscribe():`, data)
    process.exit()
  })
}

run()
