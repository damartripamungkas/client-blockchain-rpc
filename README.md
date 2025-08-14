<h1 align="center">CLIENT-BLOCKCHAIN-RPC</h1>

<p align="center">
  <i>⚡ A lightweight, multi-protocol blockchain RPC client for EVM, Solana, and more ⚡</i>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/client-blockchain-rpc">
    <img alt="npm version" src="https://img.shields.io/npm/v/client-blockchain-rpc?color=04D361&labelColor=000000">
  </a>
  <a href="https://www.npmjs.com/package/client-blockchain-rpc">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/client-blockchain-rpc?color=04D361&labelColor=000000">
  </a>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
  <img alt="Repo Size" src="https://img.shields.io/github/repo-size/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
  <img alt="License" src="https://img.shields.io/github/license/damartripamungkas/client-blockchain-rpc?color=04D361&labelColor=000000">
</p>

---

### 📖 Overview

**client-blockchain-rpc** is a minimal yet powerful RPC client for interacting directly with blockchain nodes.  
It supports **HTTP**, **WebSocket**, and **IPC** connections, with a consistent API for EVM-based chains, Solana, and more.

### 🎯 Why This Library?

- **Unified API** — No need to learn different libraries for different chains
- **Multi-Protocol** — Switch between HTTP, WS, and IPC without code changes
- **Tiny & Fast** — Zero heavy dependencies
- **Cross-Platform** — Works on Node.js, Bun, and Deno
- **Production Ready** — Used in real trading bots & blockchain tools

### ✨ Features

| Feature                    | Description                 |
| -------------------------- | --------------------------- |
| **Multi-Protocol Support** | HTTP, WebSocket, IPC        |
| **Multi-Chain Ready**      | EVM, Solana, and more       |
| **Lightweight**            | No unnecessary dependencies |
| **Flexible API**           | Single, batch, subscription |
| **Cross-Platform**         | Node.js, Bun, and Deno      |

### 🌐 Supported Networks

| Blockchain                             | Protocols Supported    |
| -------------------------------------- | ---------------------- |
| **EVM** (Ethereum, BSC, Polygon, etc.) | HTTP / WebSocket / IPC |
| **Solana**                             | HTTP / WebSocket       |
| **Others**                             | Custom RPC endpoints   |

### 📦 Installation

**Using npm**

```bash
npm install client-blockchain-rpc
```

**Using Yarn**

```bash
yarn add client-blockchain-rpc
```

**Using Bun**

```bash
bun add client-blockchain-rpc
```

### 🚀 Quick Start

```typescript
import { Provider } from "client-blockchain-rpc";

const provider = new Provider(`ws://localhost:8545`);

// Single request
const chainId = await provider.send({
  method: `eth_chainId`,
  params: [],
  formatReturn: parseInt,
});

// Batch request
const resBatch = await provider.sendBatch([
  { method: `eth_chainId`, params: [], formatReturn: BigInt },
  { method: `eth_gasPrice`, params: [], formatReturn: BigInt },
]);

// Subscription
provider.subscribe(
  { method: `eth_subscribe`, params: [`newHeads`] },
  true,
  (data, subsId) => {
    console.log(subsId, data);
  }
);
```

📎 **More examples:** See the [examples](./test) directory.

### 📚 API Reference

#### `new Provider(endpoint: string)`

Create a provider instance.

#### `.send({ method, params, formatReturn })`

Send a single RPC request.

#### `.sendBatch(requests[])`

Send multiple RPC requests in one batch.

#### `.subscribe({ method, params }, autoReconnect, callback)`

Subscribe to a WebSocket event.

#### 🧾 Requirements

- **Node.js**
- **Bun** _(optional)_
- **Deno** _(optional)_

### 📜 License

Licensed under the [MIT License](./LICENSE).

### 🌟 Support

If you find this project useful, please give it a ⭐ on GitHub and share it with the community.
