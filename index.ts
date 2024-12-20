import {Config, createBot} from './lib/bot';
import config from './config.json';
import {GroupMessageEvent} from './lib/common';

const bot = createBot(config as Config);
bot.init();

bot.on('message.group', async (e: GroupMessageEvent) => {
    if (e.raw_message === 'Ciallo ～(∠・ω< )⌒★!') {
        await bot.sendGroupMsg(e.group_id, 'Ciallo ～(∠・ω< )⌒★!');
    }
});
