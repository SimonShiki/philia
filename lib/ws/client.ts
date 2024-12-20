import {ApiResponseMap, Anonymous, BaseConfig, Bot, Message, OneBotEvent, EventTypeMap as EventMap} from '../common';
import WebSocket from 'ws';
import {Logger} from '../logger';

export interface WsConfig extends BaseConfig {
    mode: 'ws';
    access_token?: string;
}

export class Client implements Bot {
    private config: WsConfig;
    private ws: WebSocket;
    private logger: Logger;
    private listeners: Map<string, ((event: OneBotEvent) => void)[]> = new Map();

    constructor (config: WsConfig) {
        this.config = config;
        this.logger = new Logger(config.log_level);
    }

    init () {
        const url = `ws://${this.config.host}:${this.config.port}`;
        const urlWithToken = 'access_token' in this.config ? `${url}?access_token=${this.config.access_token}` : url;
        this.ws = new WebSocket(urlWithToken);
        this.logger.info(`Connecting to ${url} ...`);
        this.ws.on('open', () => {
            this.logger.info(`WebSocket connection established.`);

        });
        this.ws.on('message', data => {
            const event = JSON.parse(data.toString()) as OneBotEvent;
            this.logger.debug('Received message:\n', event);
            
            const generalListeners = this.listeners.get('*') || [];
            for (const listener of generalListeners) {
                listener(event);
            }

            const type = `${event.post_type}.${this.getEventDetail(event)}`;
            const typeListeners = this.listeners.get(type) || [];
            for (const listener of typeListeners) {
                listener(event);
            }
        });
    }

    private getEventDetail (event: OneBotEvent): string {
        if ('message_type' in event) return event.message_type;
        if ('request_type' in event) return event.request_type;
        if ('notice_type' in event) return event.notice_type;
        if ('meta_event_type' in event) return event.meta_event_type;
        return '';
    }

    on<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void): void;
    on(listener: (event: OneBotEvent) => void): void;
    on<T extends keyof EventMap> (
        typeOrListener: T | ((event: OneBotEvent) => void), listener?: (event: EventMap[T]) => void) {
        const key = typeof typeOrListener === 'string' ? typeOrListener : '*';
        const callback = typeof typeOrListener === 'string' ? listener! : typeOrListener;
        
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key)!.push(callback as (event: OneBotEvent) => void);
    }

    off (listener: (event: OneBotEvent) => void): void {
        for (const [key, listeners] of this.listeners.entries()) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
                if (listeners.length === 0) {
                    this.listeners.delete(key);
                }
            }
        }
    }

    private callApi<T extends keyof ApiResponseMap> (
        action: T, params: Record<string, any> = {}): Promise<ApiResponseMap[T]> {
        const echo = Date.now().toString();
        const payload = {
            action,
            params,
            echo
        };
        
        return new Promise((resolve, reject) => {
            this.ws.send(JSON.stringify(payload));
            
            const handler = (data: WebSocket.Data) => {
                const response = JSON.parse(data.toString());
                if (response.echo === echo) {
                    this.ws.off('message', handler);
                    if (response.status === 'ok') {
                        resolve(response.data);
                    } else {
                        reject(new Error(response.message || 'API call failed'));
                    }
                }
            };
            
            this.ws.on('message', handler);
        });
    }

    sendPrivateMsg (userId: number, message: string | Message[], autoEscape?: boolean) {
        return this.callApi('send_private_msg', {
            user_id: userId,
            message,
            auto_escape: autoEscape
        });
    }

    sendGroupMsg (groupId: number, message: string | Message[], autoEscape?: boolean) {
        return this.callApi('send_group_msg', {
            group_id: groupId,
            message,
            auto_escape: autoEscape
        });
    }

    sendMsg (messageType: 'private' | 'group', id: number, message: string | Message[], autoEscape?: boolean) {
        return this.callApi('send_msg', {
            message_type: messageType,
            [messageType === 'private' ? 'user_id' : 'group_id']: id,
            message,
            auto_escape: autoEscape
        });
    }

    deleteMsg (messageId: number) {
        return this.callApi('delete_msg', {message_id: messageId});
    }

    getMsg (messageId: number) {
        return this.callApi('get_msg', {message_id: messageId});
    }

    getForwardMsg (id: string) {
        return this.callApi('get_forward_msg', {id});
    }

    sendLike (userId: number, times?: number) {
        return this.callApi('send_like', {user_id: userId, times});
    }

    setGroupKick (groupId: number, userId: number, rejectAddRequest?: boolean) {
        return this.callApi('set_group_kick', {
            group_id: groupId,
            user_id: userId,
            reject_add_request: rejectAddRequest
        });
    }

    setGroupBan (groupId: number, userId: number, duration?: number) {
        return this.callApi('set_group_ban', {
            group_id: groupId,
            user_id: userId,
            duration: duration ?? 1800
        });
    }

    setGroupAnonymousBan (groupId: number, anonymous?: Anonymous, flag?: string, duration?: number) {
        return this.callApi('set_group_anonymous_ban', {
            group_id: groupId,
            anonymous,
            flag,
            duration: duration ?? 1800
        });
    }

    setGroupWholeBan (groupId: number, enable?: boolean) {
        return this.callApi('set_group_whole_ban', {group_id: groupId, enable});
    }

    setGroupAdmin (groupId: number, userId: number, enable?: boolean) {
        return this.callApi('set_group_admin', {group_id: groupId, user_id: userId, enable});
    }

    setGroupAnonymous (groupId: number, enable?: boolean) {
        return this.callApi('set_group_anonymous', {group_id: groupId, enable});
    }

    setGroupCard (groupId: number, userId: number, card?: string) {
        return this.callApi('set_group_card', {group_id: groupId, user_id: userId, card});
    }

    setGroupName (groupId: number, groupName: string) {
        return this.callApi('set_group_name', {group_id: groupId, group_name: groupName});
    }

    setGroupLeave (groupId: number, isDismiss?: boolean) {
        return this.callApi('set_group_leave', {group_id: groupId, is_dismiss: isDismiss});
    }

    setGroupSpecialTitle (groupId: number, userId: number, specialTitle?: string, duration?: number) {
        return this.callApi('set_group_special_title', {
            group_id: groupId,
            user_id: userId,
            special_title: specialTitle,
            duration
        });
    }

    setFriendAddRequest (flag: string, approve?: boolean, remark?: string) {
        return this.callApi('set_friend_add_request', {flag, approve, remark});
    }

    setGroupAddRequest (flag: string, subType: 'add' | 'invite', approve?: boolean, reason?: string) {
        return this.callApi('set_group_add_request', {
            flag,
            sub_type: subType,
            approve,
            reason
        });
    }

    getLoginInfo () {
        return this.callApi('get_login_info');
    }

    getStrangerInfo (userId: number, noCache?: boolean) {
        return this.callApi('get_stranger_info', {user_id: userId, no_cache: noCache});
    }

    getFriendList () {
        return this.callApi('get_friend_list');
    }

    getGroupInfo (groupId: number, noCache?: boolean) {
        return this.callApi('get_group_info', {group_id: groupId, no_cache: noCache});
    }

    getGroupList () {
        return this.callApi('get_group_list');
    }

    getGroupMemberInfo (groupId: number, userId: number, noCache?: boolean) {
        return this.callApi('get_group_member_info', {
            group_id: groupId,
            user_id: userId,
            no_cache: noCache
        });
    }

    getGroupMemberList (groupId: number) {
        return this.callApi('get_group_member_list', {group_id: groupId});
    }

    getGroupHonorInfo (groupId: number, type: 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion' | 'all') {
        return this.callApi('get_group_honor_info', {group_id: groupId, type});
    }

    getCookies (domain?: string) {
        return this.callApi('get_cookies', {domain});
    }

    getCsrfToken () {
        return this.callApi('get_csrf_token');
    }

    getCredentials (domain?: string) {
        return this.callApi('get_credentials', {domain});
    }

    getRecord (file: string, outFormat: string) {
        return this.callApi('get_record', {file, out_format: outFormat});
    }

    getImage (file: string) {
        return this.callApi('get_image', {file});
    }

    canSendImage () {
        return this.callApi('can_send_image');
    }

    canSendRecord () {
        return this.callApi('can_send_record');
    }

    getStatus () {
        return this.callApi('get_status');
    }

    getVersionInfo () {
        return this.callApi('get_version_info');
    }

    setRestart (delay?: number) {
        return this.callApi('set_restart', {delay});
    }

    cleanCache () {
        return this.callApi('clean_cache');
    }
}
