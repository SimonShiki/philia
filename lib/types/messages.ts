export interface TextMessage {
    type: 'text';
    data: {
        text: string;
    };
}

/**
 * go-cqhttp specific, not in OneBot standard.
 */
export interface FileMessage {
    type: 'file';
    data: {
        file: string;
        url: string;
    }
}

export interface FaceMessage {
    type: 'face';
    data: {
        /**
         * @link https://github.com/kyubotics/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8
         */
        id: number;
    };
}

export interface ImageMessage {
    type: 'image';
    data: {
        /**
         * The filename of the image.
         * You can also use absolute path (starts with `file://`), Web URL, or Base64 encoded data (starts with `base64://`) while sending.
         */
        file: string;
        /**
         * Indicates the image is a flash image. absent if not.
         */
        type?: 'flash';
        /**
         * URL of the image.
         * WARNING: If you want to send, you should use the `file` field instead.
         */
        url: string;
    };
}

export interface RecordMessage {
    type: 'record';
    data: {
        /**
         * The filename of the record.
         * You can also use absolute path (starts with `file://`), Web URL, or Base64 encoded data (starts with `base64://`) while sending.
         */
        file: string;
        magic?: 0 | 1;
        /**
         * URL of the record.
         * WARNING: If you want to send, you should use the `file` field instead.
         */
        url: string;
        /**
         * Whether to use cache, 1 by default.
         * Only valid when sent via network URL
         */
        cache?: 0 | 1;
        /**
         * Whether to download file via proxy, 1 by default.
         * Only valid when sent via network URL
         */
        proxy?: 0 | 1;
        /**
         * Only valid when sent via network URL, in seconds,
         * indicates the timeout for downloading network files, no timeout by default.
         */
        timeout?: number;
    };
}

export interface VideoMessage {
    type: 'video';
    data: {
        /**
         * The filename of the video.
         * You can also use absolute path (starts with `file://`), Web URL, or Base64 encoded data (starts with `base64://`) while sending.
         */
        file: string;
        /**
         * URL of the video.
         * WARNING: If you want to send, you should use the `file` field instead.
         */
        url: string;
        /**
         * Whether to use cache, 1 by default.
         * Only valid when sent via network URL
         */
        cache?: 0 | 1;
        /**
         * Whether to download file via proxy, 1 by default.
         * Only valid when sent via network URL
         */
        proxy?: 0 | 1;
        /**
         * Only valid when sent via network URL, in seconds,
         * indicates the timeout for downloading network files, no timeout by default.
         */
        timeout?: number;
    };
}

export interface AtMessage {
    type: 'at';
    data: {
        /**
         * `all` means all members in the group.
         */
        qq: string;
    };
}

export interface RpsMessage {
    type: 'rps';
    data: {};
}

export interface DiceMessage {
    type: 'dice';
    data: {};
}

export interface ShakeMessage {
    type: 'shake';
    data: {};
}

export interface PokeMessage {
    type: 'poke';
    data: {
        /**
         * Possible values:
         * @link https://github.com/mamoe/mirai/blob/f5eefae7ecee84d18a66afce3f89b89fe1584b78/mirai-core/src/commonMain/kotlin/net.mamoe.mirai/message/data/HummerMessage.kt#L49
         */
        type: string;
        id: string;
        name: string;
    };
}

export interface AnonymousMessage {
    type: 'anonymous';
    data: {
        /**
         * Indicates whether to continue sending if anonymity is not possible
         */
        ignore?: 0 | 1;
    };
}

export interface ShareMessage {
    type: 'share';
    data: {
        url: string;
        title: string;
        content?: string;
        image?: string;
    };
}

export interface ContactMessage {
    type: 'contact';
    data: {
        type: 'qq' | 'group';
        id: number;
    };
}

export interface LocationMessage {
    type: 'location';
    data: {
        lat: number;
        lon: number;
        title?: string;
        content?: string;
    };
}

export interface MusicMessage {
    type: 'music';
    data: CommonMusicShareData | CustomMusicShareData;
}

export interface CommonMusicShareData {
    type: 'qq' | '163' | 'xm';
    id: string;
}

export interface CustomMusicShareData {
    type: 'custom';
    url: string;
    audio: string;
    title: string;
    content?: string;
    image?: string;
}

export interface ReplyMessage {
    type: 'reply';
    data: {
        id: number;
    };
}

export interface ForwardMessage {
    type: 'forward';
    data: {
        /**
         * Merge forwarding ID, need to get specifics via `get_forward_msg` API
         */
        id: number;
    };
}

export interface NodeMessage {
    type: 'node';
    data: CommonNodeData | CustomNodeData;
}

export interface CommonNodeData {
    id: string;
}

export interface CustomNodeData {
    nickname: string;
    content: string | Message[];
    userid: string;
}

export interface XmlMessage {
    type: 'xml';
    data: {
        data: string;
    };
}

export interface JsonMessage {
    type: 'json';
    data: {
        data: string;
    };
}

export type Message = TextMessage | FaceMessage | ImageMessage | RecordMessage | VideoMessage | AtMessage |
    RpsMessage | DiceMessage | ShakeMessage | PokeMessage | AnonymousMessage | ShareMessage | ContactMessage |
    LocationMessage | MusicMessage | ReplyMessage | ForwardMessage | NodeMessage | XmlMessage | JsonMessage |
    FileMessage;
