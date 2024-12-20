import {WsConfig, Client as WsClient} from './ws/client';

export type Config = WsConfig;

export function createBot (config: Config) {
    switch (config.mode) {
    case 'ws':
        return new WsClient(config);
    default:
        throw new Error('Unsupported mode');
    }
}
