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
        id: number;
    };
}

export interface ImageMessage {
    type: 'image';
    data: {
        file: string;
    };
}

export interface RecordMessage {
    type: 'record';
    data: {
        file: string;
    };
}

export interface VideoMessage {
    type: 'video';
    data: {
        file: string;
    };
}

export interface AtMessage {
    type: 'at';
    data: {
        qq: number;
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
        type: string;
        id: string;
        name: string;
    };
}

export interface AnonymousMessage {
    type: 'anonymous';
    data: {
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
