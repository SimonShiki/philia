export interface BaseConfig {
    host: string;
    port: number;
    log_level: 'debug' | 'info' | 'warn' | 'error';
}

interface BaseEvent {
    /**
     * The qq number of the bot.
     */
    self_id: number;
    /**
     * Time of event (Unix timestamp) in seconds
     */
    time: number;
    /**
     * Event type.
     */
    post_type: 'meta_event' | 'message' | 'notice' | 'request';
}

interface TextMessage {
    type: 'text';
    data: {
        text: string;
    };
}

interface FaceMessage {
    type: 'face';
    data: {
        id: number;
    };
}

interface ImageMessage {
    type: 'image';
    data: {
        file: string;
    };
}

interface RecordMessage {
    type: 'record';
    data: {
        file: string;
    };
}

interface VideoMessage {
    type: 'video';
    data: {
        file: string;
    };
}

interface AtMessage {
    type: 'at';
    data: {
        qq: number;
    };
}

interface RpsMessage {
    type: 'rps';
    data: {};
}

interface DiceMessage {
    type: 'dice';
    data: {};
}

interface ShakeMessage {
    type: 'shake';
    data: {};
}

interface PokeMessage {
    type: 'poke';
    data: {
        type: string;
        id: string;
        name: string;
    };
}

interface AnonymousMessage {
    type: 'anonymous';
    data: {
        ignore?: 0 | 1;
    };
}

interface ShareMessage {
    type: 'share';
    data: {
        url: string;
        title: string;
        content?: string;
        image?: string;
    };
}

interface ContactMessage {
    type: 'contact';
    data: {
        type: 'qq' | 'group';
        id: number;
    };
}

interface LocationMessage {
    type: 'location';
    data: {
        lat: number;
        lon: number;
        title?: string;
        content?: string;
    };
}

interface MusicMessage {
    type: 'music';
    data: CommonMusicShareData | CustomMusicShareData;
}

interface CommonMusicShareData {
    type: 'qq' | '163' | 'xm';
    id: string;
}

interface CustomMusicShareData {
    type: 'custom';
    url: string;
    audio: string;
    title: string;
    content?: string;
    image?: string;
}

interface ReplyMessage {
    type: 'reply';
    data: {
        id: number;
    };
}

interface ForwardMessage {
    type: 'forward';
    data: {
        id: number;
    };
}

interface NodeMessage {
    type: 'node';
    data: CommonNodeData | CustomNodeData;
}

interface CommonNodeData {
    id: string;
}

interface CustomNodeData {
    nickname: string;
    content: string | Message[];
    userid: string;
}

interface XmlMessage {
    type: 'xml';
    data: {
        data: string;
    };
}

interface JsonMessage {
    type: 'json';
    data: {
        data: string;
    };
}

export type Message = TextMessage | FaceMessage | ImageMessage | RecordMessage | VideoMessage | AtMessage |
    RpsMessage | DiceMessage | ShakeMessage | PokeMessage | AnonymousMessage | ShareMessage | ContactMessage |
    LocationMessage | MusicMessage | ReplyMessage | ForwardMessage | NodeMessage | XmlMessage | JsonMessage;

export interface PrivateMessageEvent extends BaseEvent {
    post_type: 'message';
    message_type: 'private';
    sub_type: 'friend' | 'group' | 'other';
    message_id: number;
    user_id: number;
    message: string | Message[];
    raw_message: string;
    font: number;
    sender: Partial<PrivateSender>;
}

type Sex = 'male' | 'female' | 'unknown';

export interface PrivateSender {
    user_id: number;
    nickname: string;
    sex: Sex;
    age: number;
}

export interface GroupMessageEvent extends BaseEvent {
    post_type: 'message';
    message_type: 'group';
    sub_type: 'normal' | 'anonymous' | 'notice';
    message_id: number;
    group_id: number;
    user_id: number;
    anonymous: Anonymous | null;
    message: string | Message[];
    raw_message: string;
    font: number;
    sender: Partial<GroupSender>;
}

export interface Anonymous {
    id: number;
    name: string;
    flag: string;
}

type Role = 'owner' | 'admin' | 'member';

export interface GroupSender {
    user_id: number;
    nickname: string;
    card: string;
    sex: Sex;
    age: number;
    area: string;
    level: string;
    role: Role;
    title: string;
}

export type MessageEvent = PrivateMessageEvent | GroupMessageEvent;

export interface LifecycleMetaEvent extends BaseEvent {
    post_type: 'meta_event';
    meta_event_type: 'lifecycle';
    sub_type: 'connect' | 'enable' | 'disable';
}

export interface HeartbeatMetaEvent extends BaseEvent {
    post_type: 'meta_event';
    meta_event_type: 'heartbeat';
    interval: number;
    status: Status;
}

interface Status {
    good: boolean;
    online: boolean;
    reason?: string;
}

type MetaEvent = LifecycleMetaEvent | HeartbeatMetaEvent;

interface File {
    id: string;
    name: string;
    size: number;
    busid: number;
}

export interface GroupUploadNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_upload';
    group_id: number;
    user_id: number;
    file: File;
}

export interface GroupAdminNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_admin';
    sub_type: 'set' | 'unset';
    group_id: number;
    user_id: number;
}

export interface GroupDecreaseNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_decrease';
    sub_type: 'leave' | 'kick' | 'kick_me';
    group_id: number;
    operator_id: number;
    user_id: number;
}

export interface GroupIncreaseNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_increase';
    sub_type: 'approve' | 'invite';
    group_id: number;
    operator_id: number;
    user_id: number;
}

export interface GroupBanNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_ban';
    sub_type: 'ban' | 'lift_ban';
    group_id: number;
    operator_id: number;
    user_id: number;
    duration: number;
}

export interface FriendAddNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'friend_add';
    user_id: number;
}

export interface GroupRecallNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'group_recall';
    group_id: number;
    user_id: number;
    operator_id: number;
    message_id: number;
}

export interface FriendRecallNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'friend_recall';
    user_id: number;
    message_id: number;
}

export interface PokeOrLuckyKingNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'poke' | 'lucky_king';
    group_id: number;
    user_id: number;
    target_id: number;
}

export interface HonorNoticeEvent extends BaseEvent {
    post_type: 'notice';
    notice_type: 'notify';
    sub_type: 'honor';
    honor_type: 'talkative' | 'performer' | 'emotion' | 'emotion_level';
    group_id: number;
    user_id: number;
}

export type NoticeEvent = GroupUploadNoticeEvent | GroupAdminNoticeEvent | GroupDecreaseNoticeEvent |
    GroupIncreaseNoticeEvent | GroupBanNoticeEvent | FriendAddNoticeEvent | GroupRecallNoticeEvent |
    FriendRecallNoticeEvent | PokeOrLuckyKingNoticeEvent | HonorNoticeEvent;

export interface FriendRequestEvent extends BaseEvent {
    post_type: 'request';
    request_type: 'friend';
    user_id: number;
    comment: string;
    flag: string;
}

export interface GroupRequestEvent extends BaseEvent {
    post_type: 'request';
    request_type: 'group';
    group_id: number;
    user_id: number;
    comment: string;
    flag: string;
}

export type RequestEvent = FriendRequestEvent | GroupRequestEvent;

export type OneBotEvent = MessageEvent | MetaEvent | NoticeEvent | RequestEvent;

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
     * 发送私聊消息
     * @event send_private_msg
     */
    sendPrivateMsg(userId: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * 发送群消息
     * @event send_group_msg
     */
    sendGroupMsg(groupId: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * 发送消息
     * @event send_msg
     */
    sendMsg(messageType: 'private' | 'group', id: number, message: string | Message[], autoEscape?: boolean): Promise<{message_id: number}>;

    /**
     * 撤回消息
     * @event delete_msg
     */
    deleteMsg(messageId: number): Promise<void>;

    /**
     * 获取消息
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
     * 获取合并转发消息
     * @event get_forward_msg
     */
    getForwardMsg(id: string): Promise<{message: Message[]}>;

    /**
     * 发送好友赞
     * @event send_like
     */
    sendLike(userId: number, times?: number): Promise<void>;

    /**
     * 群组踢人
     * @event set_group_kick
     */
    setGroupKick(groupId: number, userId: number, rejectAddRequest?: boolean): Promise<void>;

    /**
     * 群组单人禁言
     * @event set_group_ban
     */
    setGroupBan(groupId: number, userId: number, duration?: number): Promise<void>;

    /**
     * 群组匿名用户禁言
     * @event set_group_anonymous_ban
     */
    setGroupAnonymousBan(groupId: number, anonymous?: Anonymous, flag?: string, duration?: number): Promise<void>;

    /**
     * 群组全员禁言
     * @event set_group_whole_ban
     */
    setGroupWholeBan(groupId: number, enable?: boolean): Promise<void>;

    /**
     * 群组设置管理员
     * @event set_group_admin
     */
    setGroupAdmin(groupId: number, userId: number, enable?: boolean): Promise<void>;

    /**
     * 群组匿名设置
     * @event set_group_anonymous
     */
    setGroupAnonymous(groupId: number, enable?: boolean): Promise<void>;

    /**
     * 设置群名片（群备注）
     * @event set_group_card
     */
    setGroupCard(groupId: number, userId: number, card?: string): Promise<void>;

    /**
     * 设置群名
     * @event set_group_name
     */
    setGroupName(groupId: number, groupName: string): Promise<void>;

    /**
     * 退出群组
     * @event set_group_leave
     */
    setGroupLeave(groupId: number, isDismiss?: boolean): Promise<void>;

    /**
     * 设置群组专属头衔
     * @event set_group_special_title
     */
    setGroupSpecialTitle(groupId: number, userId: number, specialTitle?: string, duration?: number): Promise<void>;

    /**
     * 处理加好友请求
     * @event set_friend_add_request
     */
    setFriendAddRequest(flag: string, approve?: boolean, remark?: string): Promise<void>;

    /**
     * 处理加群请求／邀请
     * @event set_group_add_request
     */
    setGroupAddRequest(flag: string, subType: 'add' | 'invite', approve?: boolean, reason?: string): Promise<void>;

    /**
     * 获取登录号信息
     * @event get_login_info
     */
    getLoginInfo(): Promise<{user_id: number; nickname: string}>;

    /**
     * 获取陌生人信息
     * @event get_stranger_info
     */
    getStrangerInfo(userId: number, noCache?: boolean): Promise<{
        user_id: number;
        nickname: string;
        sex: 'male' | 'female' | 'unknown';
        age: number;
    }>;

    /**
     * 获取好友列表
     * @event get_friend_list
     */
    getFriendList(): Promise<Array<{
        user_id: number;
        nickname: string;
        remark: string;
    }>>;

    /**
     * 获取群信息
     * @event get_group_info
     */
    getGroupInfo(groupId: number, noCache?: boolean): Promise<{
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }>;

    /**
     * 获取群列表
     * @event get_group_list
     */
    getGroupList(): Promise<Array<{
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }>>;

    /**
     * 获取群成员信息
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
     * 获取群成员列表
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
     * 获取群荣誉信息
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
     * 获取 Cookies
     * @event get_cookies
     */
    getCookies(domain?: string): Promise<{cookies: string}>;

    /**
     * 获取 CSRF Token
     * @event get_csrf_token
     */
    getCsrfToken(): Promise<{token: number}>;

    /**
     * 获取 QQ 相关接口凭证
     * @event get_credentials
     */
    getCredentials(domain?: string): Promise<{cookies: string; csrf_token: number}>;

    /**
     * 获取语音
     * @event get_record
     */
    getRecord(file: string, outFormat: string): Promise<{file: string}>;

    /**
     * 获取图片
     * @event get_image
     */
    getImage(file: string): Promise<{file: string}>;

    /**
     * 检查是否可以发送图片
     * @event can_send_image
     */
    canSendImage(): Promise<{yes: boolean}>;

    /**
     * 检查是否可以发送语音
     * @event can_send_record
     */
    canSendRecord(): Promise<{yes: boolean}>;

    /**
     * 获取运行状态
     * @event get_status
     */
    getStatus(): Promise<{
        online: boolean;
        good: boolean;
    }>;

    /**
     * 获取版本信息
     * @event get_version_info
     */
    getVersionInfo(): Promise<{
        app_name: string;
        app_version: string;
        protocol_version: string;
    }>;

    /**
     * 重启 OneBot 实现
     * @event set_restart
     */
    setRestart(delay?: number): Promise<void>;

    /**
     * 清理缓存
     * @event clean_cache
     */
    cleanCache(): Promise<void>;
}

export interface ApiResponseMap {
    'send_private_msg': { message_id: number };
    'send_group_msg': { message_id: number };
    'send_msg': { message_id: number };
    'delete_msg': void;
    'get_msg': {
        time: number;
        message_type: string;
        message_id: number;
        real_id: number;
        sender: PrivateSender | GroupSender;
        message: string | Message[];
    };
    'get_forward_msg': { message: Message[] };
    'send_like': void;
    'set_group_kick': void;
    'set_group_ban': void;
    'set_group_anonymous_ban': void;
    'set_group_whole_ban': void;
    'set_group_admin': void;
    'set_group_anonymous': void;
    'set_group_card': void;
    'set_group_name': void;
    'set_group_leave': void;
    'set_group_special_title': void;
    'set_friend_add_request': void;
    'set_group_add_request': void;
    'get_login_info': { user_id: number; nickname: string };
    'get_stranger_info': {
        user_id: number;
        nickname: string;
        sex: Sex;
        age: number;
    };
    'get_friend_list': Array<{
        user_id: number;
        nickname: string;
        remark: string;
    }>;
    'get_group_info': {
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    };
    'get_group_list': Array<{
        group_id: number;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }>;
    'get_group_member_info': {
        group_id: number;
        user_id: number;
        nickname: string;
        card: string;
        sex: Sex;
        age: number;
        area: string;
        join_time: number;
        last_sent_time: number;
        level: string;
        role: Role;
        unfriendly: boolean;
        title: string;
        title_expire_time: number;
        card_changeable: boolean;
    };
    'get_group_member_list': Array<{
        group_id: number;
        user_id: number;
        nickname: string;
        card: string;
        sex: Sex;
        age: number;
        area: string;
        join_time: number;
        last_sent_time: number;
        level: string;
        role: Role;
        unfriendly: boolean;
        title: string;
        title_expire_time: number;
        card_changeable: boolean;
    }>;
    'get_group_honor_info': {
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
    };
    'get_cookies': { cookies: string };
    'get_csrf_token': { token: number };
    'get_credentials': { cookies: string; csrf_token: number };
    'get_record': { file: string };
    'get_image': { file: string };
    'can_send_image': { yes: boolean };
    'can_send_record': { yes: boolean };
    'get_status': { online: boolean; good: boolean };
    'get_version_info': {
        app_name: string;
        app_version: string;
        protocol_version: string;
    };
    'set_restart': void;
    'clean_cache': void;
}
