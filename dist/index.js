var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  provider: () => provider_default
});
module.exports = __toCommonJS(src_exports);

// src/provider.ts
var import_web3_providers_ipc = require("web3-providers-ipc");
var import_web3_providers_http = require("web3-providers-http");
var import_web3_providers_ws = require("web3-providers-ws");
var import_web3 = require("web3");
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
    provider = new import_web3_providers_http.HttpProvider(url);
  } else if (url.startsWith("ws")) {
    provider = new import_web3_providers_ws.WebSocketProvider(url, socket, reconnect);
  } else if (url.endsWith(".ipc")) {
    provider = new import_web3_providers_ipc.IpcProvider(url, socket, reconnect);
  } else {
    throw `network type is not supported, only support http/ws/.ipc`;
  }
  const web3 = new import_web3.Web3(provider);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  provider
});
