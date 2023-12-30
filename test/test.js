const { provider } = require("..");

const init = provider({
  urlRpc: "https://bscrpc.com",
});

(async () => {
  // single request
  const chainId = await init.send({
    method: "eth_chainId",
    params: [],
    formatReturn: parseInt,
  });

  // batch request
  const resBatch = await init.sendBatch([
    {
      method: "eth_chainId",
      params: [],
      formatReturn: BigInt,
    },
    {
      method: "eth_gasPrice",
      params: [],
      formatReturn: BigInt,
    },
  ]);
})();
