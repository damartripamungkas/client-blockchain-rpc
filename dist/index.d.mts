import * as web3_types from 'web3-types';

type TypeSend = {
    method: string;
    params: any[];
    formatReturn?: (pureValue: any) => any;
};
type TypeParamInit = {
    urlRpc: string;
    socket?: object;
    reconnect?: {
        autoReconnect?: boolean;
        delay?: number;
        mamaxAttempts?: number;
    };
};
/**
 * @param urlRpc url rpc node blockchain
 * @param socket [optional] socket for lib
 * @param reconnect [optional] reconnect for network type ws/ipc
 */
declare const _default$1: ({ urlRpc, socket, reconnect }: TypeParamInit) => {
    send: (data: TypeSend) => Promise<any>;
    sendBatch: (data: TypeSend[]) => Promise<any>;
    on: {
        (type: "disconnect", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderRpcError>): void;
        (type: "connect", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderConnectInfo>): void;
        (type: "chainChanged", listener: web3_types.Web3Eip1193ProviderEventCallback<string>): void;
        (type: "accountsChanged", listener: web3_types.Web3Eip1193ProviderEventCallback<string[]>): void;
        <T = web3_types.JsonRpcResult>(type: "message", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderMessage> | web3_types.Web3ProviderMessageEventCallback<T>): void;
        <T_1 = web3_types.JsonRpcResult>(type: string, listener: web3_types.Web3Eip1193ProviderEventCallback<unknown> | web3_types.Web3ProviderEventCallback<T_1>): void;
    };
    isReady: () => Promise<unknown>;
    request: <Method extends string, ResultType = ReturnType<web3_types.EthExecutionAPI[Method]>>(request: web3_types.Web3APIPayload<web3_types.EthExecutionAPI, Method>) => Promise<web3_types.JsonRpcResponseWithResult<ResultType>>;
};

declare const _default: {
    provider: ({ urlRpc, socket, reconnect }: {
        urlRpc: string;
        socket?: object;
        reconnect?: {
            autoReconnect?: boolean;
            delay?: number;
            mamaxAttempts?: number;
        };
    }) => {
        send: (data: {
            method: string;
            params: any[];
            formatReturn?: (pureValue: any) => any;
        }) => Promise<any>;
        sendBatch: (data: {
            method: string;
            params: any[];
            formatReturn?: (pureValue: any) => any;
        }[]) => Promise<any>;
        on: {
            (type: "disconnect", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderRpcError>): void;
            (type: "connect", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderConnectInfo>): void;
            (type: "chainChanged", listener: web3_types.Web3Eip1193ProviderEventCallback<string>): void;
            (type: "accountsChanged", listener: web3_types.Web3Eip1193ProviderEventCallback<string[]>): void;
            <T = web3_types.JsonRpcResult>(type: "message", listener: web3_types.Web3Eip1193ProviderEventCallback<web3_types.ProviderMessage> | web3_types.Web3ProviderMessageEventCallback<T>): void;
            <T_1 = web3_types.JsonRpcResult>(type: string, listener: web3_types.Web3Eip1193ProviderEventCallback<unknown> | web3_types.Web3ProviderEventCallback<T_1>): void;
        };
        isReady: () => Promise<unknown>;
        request: <Method extends string, ResultType = ReturnType<web3_types.EthExecutionAPI[Method]>>(request: web3_types.Web3APIPayload<web3_types.EthExecutionAPI, Method>) => Promise<web3_types.JsonRpcResponseWithResult<ResultType>>;
    };
};

export { _default as default, _default$1 as provider };
