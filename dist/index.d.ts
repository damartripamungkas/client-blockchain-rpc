import * as web3 from 'web3';
import { Web3 } from 'web3';
import * as web3_eth from 'web3-eth';
import * as web3_providers_ws from 'web3-providers-ws';
import { WebSocketProvider } from 'web3-providers-ws';
import * as web3_types from 'web3-types';

type TypeSend = {
    method: string;
    params: any[];
    formatReturn?: (pureValue: any) => any;
};
type TypeParamInit = {
    url: string;
    socket?: object;
    reconnect?: {
        autoReconnect?: boolean;
        delay?: number;
        maxAttempts?: number;
    };
};

/**
 * @param url url rpc node blockchain
 * @param socket [optional] socket for lib
 * @param reconnect [optional] reconnect for network type ws/ipc
 */
declare const _default$1: ({ url, socket, reconnect }: TypeParamInit) => {
    client: WebSocketProvider<web3.EthExecutionAPI>;
    web3: Web3<web3_eth.RegisteredSubscription>;
    send: (data: TypeSend) => Promise<any>;
    sendBatch: (data: TypeSend[]) => Promise<any>;
};

declare const _default: {
    provider: ({ url, socket, reconnect }: TypeParamInit) => {
        client: web3_providers_ws.default<web3_types.EthExecutionAPI>;
        web3: web3.default<web3_eth.RegisteredSubscription>;
        send: (data: TypeSend) => Promise<any>;
        sendBatch: (data: TypeSend[]) => Promise<any>;
    };
};

export { _default as default, _default$1 as provider };
