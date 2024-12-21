import {Message} from '../common';

// CQ code escape mapping
const CQ_ESCAPE_MAP = {
    '&': '&amp;',
    '[': '&#91;',
    ']': '&#93;',
    ',': '&#44;'
};

// CQ code unescape mapping
const CQ_UNESCAPE_MAP = {
    '&amp;': '&',
    '&#91;': '[',
    '&#93;': ']',
    '&#44;': ','
};

/**
 * Escape CQ code special characters
 */
function escape (str: string, isParam = false): string {
    let result = str.replace(/[&[\]]/g, match => CQ_ESCAPE_MAP[match]);
    if (isParam) {
        result = result.replace(/,/g, CQ_ESCAPE_MAP[',']);
    }
    return result;
}

/**
 * Unescape CQ code special characters
 */
function unescape (str: string): string {
    return str.replace(/&amp;|&#91;|&#93;|&#44;/g, match => CQ_UNESCAPE_MAP[match]);
}

/**
 * Parse CQ code string to Message objects
 */
export function parseCQCode (message: string): Message[] {
    const result: Message[] = [];
    const regex = /\[CQ:([^,\]]+)(?:,([^\]]+))?\]/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(message)) !== null) {
        // Add plain text message
        if (match.index > lastIndex) {
            const text = message.slice(lastIndex, match.index);
            if (text) {
                result.push({
                    type: 'text',
                    data: {text: unescape(text)}
                });
            }
        }

        // Parse CQ code
        const type = match[1];
        const params = match[2] ? match[2].split(',') : [];
        const data: Record<string, any> = {};

        // Parse parameters
        params.forEach(param => {
            const [key, ...values] = param.split('=');
            data[key] = unescape(values.join('='));
        });

        result.push({type, data} as Message);
        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < message.length) {
        result.push({
            type: 'text',
            data: {text: unescape(message.slice(lastIndex))}
        });
    }

    return result;
}

/**
 * Convert Message objects to CQ code string
 */
export function stringifyCQCode (messages: Message[]): string {
    return messages.map(msg => {
        if (msg.type === 'text') {
            return escape(msg.data.text);
        }

        const params = Object.entries(msg.data)
            .map(([key, value]) => `${key}=${escape(String(value), true)}`)
            .join(',');

        return `[CQ:${msg.type}${params ? `,${params}` : ''}]`;
    }).join('');
}
