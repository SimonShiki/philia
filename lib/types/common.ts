import {Anonymous, BaseEvent, GroupSender, OneBotEvent, PrivateSender} from './events';
import {Message} from './messages';

export interface BaseConfig {
    host: string;
    port: number;
    log_level: 'debug' | 'info' | 'warn' | 'error';
}

type GetEventDetail<T> = T extends { message_type: infer M extends string } ? `message.${M}` :
    T extends { request_type: infer R extends string } ? `request.${R}` :
    T extends { notice_type: infer N extends string, sub_type?: infer S } ?
    S extends string ? `notice.${N}.${S}` : `notice.${N}` :
    T extends { meta_event_type: infer E extends string, sub_type?: infer S } ?
    S extends string ? `meta_event.${E}.${S}` : `meta_event.${E}` :
    never;

type BuildEventType<T> = T extends BaseEvent ? GetEventDetail<T> : never;

type AllEventTypes = BuildEventType<OneBotEvent>;

export type EventTypeMap = {
    [K in AllEventTypes]: Extract<OneBotEvent, {
        post_type: K extends `${infer P}.${string}` ? P : never;
        message_type?: K extends `message.${infer MT}` ? MT : never;
        request_type?: K extends `request.${infer RT}` ? RT : never;
        notice_type?: K extends `notice.${infer NT}.${string}` ? NT : K extends `notice.${infer NT}` ? NT : never;
        meta_event_type?:
        K extends `meta_event.${infer MT}.${string}` ? MT : K extends `meta_event.${infer MT}` ? MT : never;
    }>
};

export interface Bot {
    /**
     * Initialize the bot.
     */
    init(): void;

    /**
     * Dispose the bot.
     */
    dispose(): void;

    /**
     * Add a listener.
     */
    on (listener: (event: OneBotEvent) => void): void;

    /**
     * Add a listener with specific event type.
     */
    on<T extends BuildEventType<OneBotEvent>> (type: T, listener: (event: EventTypeMap[T]) => void): void;

    /**
     * Remove a listener.
     */
    off (listener: (event: OneBotEvent) => void): void;

    /**
     * Send a private message.
     * @event send_private_msg
     */
    sendPrivateMsg(userId: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * Send a group message.
     * @event send_group_msg
     */
    sendGroupMsg(groupId: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * Send a message.
     * @event send_msg
     */
    sendMsg(messageType: 'private' | 'group', id: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * Recall a message
     * @event delete_msg
     */
    deleteMsg(messageId: number): Promise<void>;

    /**
     * Get a message from specefic message id
     * @event get_msg
     */
    getMsg(messageId: number): Promise<{
        time: number;
        message_type: string;
        message_id: number;
        real_id: number;
        sender: PrivateSender | GroupSender;
        message: string | Message[];
    }>;

    /**
     * Get a forward message by specific id
     * @event get_forward_msg
     */
    getForwardMsg(id: string): Promise<{message: Message[]}>;

    /**
     * Send a like to a user
     * @event send_like
     */
    sendLike(userId: number, times?: number): Promise<void>;

    /**
     * Kick someone in specific group
     * @event set_group_kick
     */
    setGroupKick(groupId: number, userId: number, rejectAddRequest?: boolean): Promise<void>;

    /**
     * Ban someone in specific group
     * @event set_group_ban
     */
    setGroupBan(groupId: number, userId: number, duration?: number): Promise<void>;

    /**
     * Ban someone who is anonymous in specific group
     * @event set_group_anonymous_ban
     */
    setGroupAnonymousBan(groupId: number, anonymous?: Anonymous, flag?: string, duration?: number): Promise<void>;

    /**
     * Ban everyone in specific group
     * @event set_group_whole_ban
     */
    setGroupWholeBan(groupId: number, enable?: boolean): Promise<void>;

    /**
     * Set someone as admin in specific group
     * @event set_group_admin
     */
    setGroupAdmin(groupId: number, userId: number, enable?: boolean): Promise<void>;

    /**
     * Set whether group can use anonymous
     * @event set_group_anonymous
     */
    setGroupAnonymous(groupId: number, enable?: boolean): Promise<void>;

    /**
     * Set group card
     * @event set_group_card
     */
    setGroupCard(groupId: number, userId: number, card?: string): Promise<void>;

    /**
     * Set group name
     * @event set_group_name
     */
    setGroupName(groupId: number, groupName: string): Promise<void>;

    /**
     * Leave a group
     * @event set_group_leave
     */
    setGroupLeave(groupId: number, isDismiss?: boolean): Promise<void>;

    /**
     * Set group special title
     * @event set_group_special_title
     */
    setGroupSpecialTitle(groupId: number, userId: number, specialTitle?: string, duration?: number): Promise<void>;

    /**
     * Handle friend request
     * @event set_friend_add_request
     */
    setFriendAddRequest(flag: string, approve?: boolean, remark?: string): Promise<void>;

    /**
     * Handle group request
     * @event set_group_add_request
     */
    setGroupAddRequest(flag: string, subType: 'add' | 'invite', approve?: boolean, reason?: string): Promise<void>;

    /**
     * Get login info
     * @event get_login_info
     */
    getLoginInfo(): Promise<{user_id: number; nickname: string}>;

    /**
     * Get stranger info
     * @event get_stranger_info
     */
    getStrangerInfo(userId: number, noCache?: boolean): Promise<{
        user_id: number;
        nickname: string;
        sex: 'male' | 'female' | 'unknown';
        age: number;
    }>;

    /**
     * Get friend list
     * @event get_friend_list
     */
    getFriendList(): Promise<Array<{
        user_id: number;
        nickname: string;
        remark: string;
    }>>;

    /**
     * Get group info
     * @event get_group_info
     */
    getGroupInfo(groupId: number, noCache?: boolean): Promise<{
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }>;

    /**
     * Get group list
     * @event get_group_list
     */
    getGroupList(): Promise<Array<{
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }>>;

    /**
     * Get group member info
     * @event get_group_member_info
     */
    getGroupMemberInfo(groupId: number, userId: number, noCache?: boolean): Promise<{
        group_id: number;
        user_id: number;
        nickname: string;
        card: string;
        sex: 'male' | 'female' | 'unknown';
        age: number;
        area: string;
        join_time: number;
        last_sent_time: number;
        level: string;
        role: 'owner' | 'admin' | 'member';
        unfriendly: boolean;
        title: string;
        title_expire_time: number;
        card_changeable: boolean;
    }>;

    /**
     * Get group member list
     * @event get_group_member_list
     */
    getGroupMemberList(groupId: number): Promise<Array<{
        group_id: number;
        user_id: number;
        nickname: string;
        card: string;
        sex: 'male' | 'female' | 'unknown';
        age: number;
        area: string;
        join_time: number;
        last_sent_time: number;
        level: string;
        role: 'owner' | 'admin' | 'member';
        unfriendly: boolean;
        title: string;
        title_expire_time: number;
        card_changeable: boolean;
    }>>;

    /**
     * Get group honor info
     * @event get_group_honor_info
     */
    getGroupHonorInfo(groupId: number, type: 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion' | 'all'): Promise<{
        group_id: number;
        current_talkative?: {
            user_id: number;
            nickname: string;
            avatar: string;
            day_count: number;
        };
        talkative_list?: Array<{
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }>;
        performer_list?: Array<{
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }>;
        legend_list?: Array<{
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }>;
        strong_newbie_list?: Array<{
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }>;
        emotion_list?: Array<{
            user_id: number;
            nickname: string;
            avatar: string;
            description: string;
        }>;
    }>;

    /**
     * Get Cookies
     * @event get_cookies
     */
    getCookies(domain?: string): Promise<{cookies: string}>;

    /**
     * Get CSRF Token
     * @event get_csrf_token
     */
    getCsrfToken(): Promise<{token: number}>;

    /**
     * Get QQ interface credentials
     * @event get_credentials
     */
    getCredentials(domain?: string): Promise<{cookies: string; csrf_token: number}>;

    /**
     * Get voice data
     * @event get_record
     */
    getRecord(file: string, outFormat: string): Promise<{file: string}>;

    /**
     * Get image data
     * @event get_image
     */
    getImage(file: string): Promise<{file: string}>;

    /**
     * Check if images can be sent
     * @event can_send_image
     */
    canSendImage(): Promise<{yes: boolean}>;

    /**
     * Check if voice messages can be sent
     * @event can_send_record
     */
    canSendRecord(): Promise<{yes: boolean}>;

    /**
     * Get runtime status
     * @event get_status
     */
    getStatus(): Promise<{
        online: boolean;
        good: boolean;
    }>;

    /**
     * Get version information
     * @event get_version_info
     */
    getVersionInfo(): Promise<{
        app_name: string;
        app_version: string;
        protocol_version: string;
    }>;

    /**
     * Rrstart OneBot instance
     * @event set_restart
     */
    setRestart(delay?: number): Promise<void>;

    /**
     * Clean cache
     * @event clean_cache
     */
    cleanCache(): Promise<void>;

    /**
     * Send a group forward message
     * Go-cqhttp specific, may not be available in other OneBot implementations.
     * @event send_group_forward_msg
     */
    sendGroupForwardMsg(groupId: number, messages: Message[]): Promise<{message_id: number, forward_id: string}>;

    /**
     * Send a private forward message
     * Go-cqhttp specific, may not be available in other OneBot implementations.
     * @event send_private_forward_msg
     */
    sendPrivateForwardMsg(userId: number, messages: Message[]): Promise<{message_id: number, forward_id: string}>;

    /**
     * Get essence message list
     * Go-cqhttp specific, may not be available in other OneBot implementations.
     * @event get_essence_msg_list
     */
    getEssenceMsgList(groupId: number): Promise<Array<{
        sender_id: number;
        sender_nick: string;
        message_id: number;
        sender_time: number;
        operator_id: number;
        operator_nick: string;
        operator_time: number;
    }>>;

    /**
     * Set essence message
     * Go-cqhttp specific, may not be available in other OneBot implementations.
     * @event set_essence_msg
     */
    setEssenceMsg(messageId: number): Promise<void>;

    /**
     * Delete essence message
     * Go-cqhttp specific, may not be available in other OneBot implementations.
     * @event delete_essence_msg
     */
    deleteEssenceMsg(messageId: number): Promise<void>;
}
