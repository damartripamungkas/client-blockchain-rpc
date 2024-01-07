const { provider } = require("..");
const init = provider({
  url: "https://bscrpc.com",
});

(async () => {
  const req = await init.sendBatch([
    {
      method: "eth_blockNumber",
      params: [],
      formatReturn: BigInt,
    },
    {
      method: "eth_chainId",
      params: [],
      formatReturn: parseInt,
    },
  ]);

  console.log({ req });
})();
