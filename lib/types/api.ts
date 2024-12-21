import {GroupSender, PrivateSender, Role, Sex} from './events';
import {Message} from './messages';

export interface ApiResponseMap {
    // OneBot V11 standard events
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
    // go-cqhttp standard
    'send_group_forward_msg': { message_id: number, forward_id: string };
    'send_private_forward_msg': { message_id: number, forward_id: string };
    'get_essence_msg_list': Array<{
        sender_id: number;
        sender_nick: string;
        message_id: number;
        sender_time: number;
        operator_id: number;
        operator_nick: string;
        operator_time: number;
    }>;
    'set_essence_msg': void;
    'delete_essence_msg': void;
}
