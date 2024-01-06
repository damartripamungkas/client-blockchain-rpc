// src/connect/http.ts
var http_default = (url, socketOpt) => {
  const on = () => {
  };
  const isReady = () => true;
  const disconnect = () => true;
  const request = async (body) => {
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...socketOpt
    };
    const res = await fetch(url, init);
    const jsonData = await res.json();
    return jsonData;
  };
  return { on, isReady, disconnect, request };
};

// src/connect/ipc.ts
import { IpcProvider } from "web3-providers-ipc";
var ipc_default = (url, socketOpt, reconnectOpt) => {
  const client = new IpcProvider(url, socketOpt, reconnectOpt);
  Object.assign(client, {
    _getChainId: () => new Promise((res) => res([])),
    // overrides because is calling without agreement
    _getAccounts: () => new Promise((res) => res([]))
    // overrides because is calling without agreement
  });
  const on = client["on"];
  const disconnect = client["disconnect"];
  const request = client["request"];
  const isReady = () => {
    client.connect();
    return true;
  };
  return { on, disconnect, isReady, request };
};

// src/connect/ws.ts
import { WebSocketProvider } from "web3-providers-ws";
var ws_default = (url, socketOpt, reconnectOpt) => {
  const client = new WebSocketProvider(url, socketOpt, reconnectOpt);
  Object.assign(client, {
    _getChainId: () => new Promise((res) => res([])),
    // overrides because is calling without agreement
    _getAccounts: () => new Promise((res) => res([]))
    // overrides because is calling without agreement
  });
  const on = client["on"];
  const disconnect = client["disconnect"];
  const request = client["request"];
  const isReady = () => {
    client.connect();
    return true;
  };
  return { on, disconnect, isReady, request };
};

// src/provider.ts
var provider_default = ({ urlRpc, socket, reconnect }) => {
  socket = socket ? socket : {};
  reconnect = reconnect ? reconnect : {};
  const state = { nextId: 0, maxSafeNextId: Number["MAX_SAFE_INTEGER"] };
  const client = Object.assign({});
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
  if (urlRpc.startsWith("http")) {
    Object.assign(client, http_default(urlRpc, socket));
  } else if (urlRpc.startsWith("ws")) {
    Object.assign(client, ws_default(urlRpc, socket, reconnect));
  } else if (urlRpc.endsWith(".ipc")) {
    Object.assign(client, ipc_default(urlRpc, socket, reconnect));
  } else {
    throw `network type is not supported, only support http/ws/.ipc`;
  }
  return {
    ...client,
    send: async (data) => {
      const res = await client.request({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: data["method"],
        params: data["params"]
      });
      return returnSend(res, data["formatReturn"]);
    },
    sendBatch: async (data) => {
      const bodyJsonRpc = data.map((it) => ({
        jsonrpc: "2.0",
        id: hookNextId(),
        method: it["method"],
        params: it["params"]
      }));
      const res = await client.request(bodyJsonRpc);
      return res.sort((a, b) => a["id"] - b["id"]).map((it, index) => returnSend(it, data[index]["formatReturn"]));
    }
  };
};

// src/index.ts
var src_default = { provider: provider_default };
export {
  src_default as default,
  provider_default as provider
};
