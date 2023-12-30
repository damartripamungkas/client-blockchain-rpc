<h1 align="center">
    CLIENT-BLOCKCHAIN-RPC
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
  </a>
</p>

<br>

### 📖 Description :

This very light package was created for those of you who want to interact directly with the EVM, SOLANA, and other blockchain.

- support network http
- support network websocket
- support network ipc

### 💻 Step to install :

```
npm install client-blockchain-rpc
```

### ✏️ Example :

```javascript
import { provider } from "client-blockchain-rpc";
const init = provider({
  urlRpc: "https://bscrpc.com",
});
```

#### Usage

```javascript
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
```

full example see [here](./test)

### 🧾 Pre-Requisistes :

```
node.js >= 18
```

### 📝 License :

Licensed under the [MIT License](./LICENSE).
