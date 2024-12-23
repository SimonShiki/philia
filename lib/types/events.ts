import {Message} from './messages';

export interface BaseEvent {
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

export interface PrivateMessageEvent extends BaseEvent {
    post_type: 'message';
    message_type: 'private';
    sub_type: 'friend' | 'group' | 'other';
    message_id: number;
    user_id: number;
    message: string | Message[];
    raw_message: string;
    font: number;
    /**
     * The fields in sender are provided on a best-effort basis, i.e., it is not guaranteed that every field
     * will be present, nor is it guaranteed that the ones that are present will be exactly correct
     * (the cache may expire). Especially for anonymous messages, this field is not informative.
     */
    sender: Partial<PrivateSender>;
    reply (message: string | Message[], autoEscape?: boolean): Promise<void>;
}

export type Sex = 'male' | 'female' | 'unknown';

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
    /**
     * The fields in sender are provided on a best-effort basis, i.e., it is not guaranteed that every field
     * will be present, nor is it guaranteed that the ones that are present will be exactly correct
     * (the cache may expire). Especially for anonymous messages, this field is not informative.
     */
    sender: Partial<GroupSender>;
    reply(message: string | Message[], atSender?: boolean, autoEscape?: boolean): Promise<void>;
    recall(): Promise<void>;
    kick(): Promise<void>;
    ban(duration: number): Promise<void>;
}

export interface Anonymous {
    id: number;
    name: string;
    flag: string;
}

export type Role = 'owner' | 'admin' | 'member';

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
    /**
     * File size in bytes.
     */
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
    approve(remark?: string): Promise<void>;
    reject(): Promise<void>;
}

export interface GroupRequestEvent extends BaseEvent {
    post_type: 'request';
    request_type: 'group';
    group_id: number;
    user_id: number;
    comment: string;
    flag: string;
    approve(): Promise<void>;
    reject(reason?: string): Promise<void>;
}

export type RequestEvent = FriendRequestEvent | GroupRequestEvent;

export type OneBotEvent = MessageEvent | MetaEvent | NoticeEvent | RequestEvent;
