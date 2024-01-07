// src/provider.ts
import { IpcProvider } from "web3-providers-ipc";
import { HttpProvider } from "web3-providers-http";
import { WebSocketProvider } from "web3-providers-ws";
import { Web3 } from "web3";
var provider_default = ({ url, socket, reconnect }) => {
  if (!socket)
    socket = {};
  if (!reconnect)
    reconnect = {};
  let state = { nextId: 0, maxSafeNextId: Number["MAX_SAFE_INTEGER"] };
  let provider;
  const hookNextId = () => {
    if (state["nextId"] >= state["maxSafeNextId"]) {
      state["nextId"] = 0;
    }
    return state["nextId"] += 1;
  };
  const returnSend = (result, returnFormat) => {
    if (result["error"] !== void 0)
      throw result.error["message"];
    if (returnFormat === null || returnFormat === void 0)
      return result["result"];
    return returnFormat(result["result"]);
  };
  if (url.startsWith("http")) {
    provider = new HttpProvider(url);
  } else if (url.startsWith("ws")) {
    provider = new WebSocketProvider(url, socket, reconnect);
  } else if (url.endsWith(".ipc")) {
    provider = new IpcProvider(url, socket, reconnect);
  } else {
    throw `network type is not supported, only support http/ws/.ipc`;
  }
  const web3 = new Web3(provider);
  const client = provider;
  const res = {
    client,
    web3,
    send: async (data) => {
      const res2 = await client.request({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: data["method"],
        params: data["params"]
      });
      return returnSend(res2, data["formatReturn"]);
    },
    sendBatch: async (data) => {
      const bodyJsonRpc = data.map((it) => ({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: it["method"],
        params: it["params"]
      }));
      const result = await client.request(bodyJsonRpc);
      return result.map((it, index) => returnSend(it, data[index]["formatReturn"]));
    }
  };
  return res;
};

// src/index.ts
var src_default = { provider: provider_default };
export {
  src_default as default,
  provider_default as provider
};
