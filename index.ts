import {Config, createBot} from './lib';
import config from './config.json';

const bot = createBot(config as Config);
bot.init();

bot.on('message.group', async e => {
    if (e.raw_message === 'Ciallo ～(∠・ω< )⌒★!') {
        await e.reply('Ciallo ～(∠・ω< )⌒★!');
    }
});
