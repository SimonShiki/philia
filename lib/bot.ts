import {WsReverseConfig, Server as WsReverseServer} from './ws-reverse/server';
import {WsConfig, Client as WsClient} from './ws/client';

export type Config = WsConfig | WsReverseConfig;

export function createBot (config: Config) {
    switch (config.mode) {
    case 'ws':
        return new WsClient(config);
    case 'ws-reverse':
        return new WsReverseServer(config);
    default:
        throw new Error('Unsupported mode');
    }
}
