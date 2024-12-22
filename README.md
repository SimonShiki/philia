<div align="center">

![](/Philia.png)

# Philia

## Fastly build your own QQ bot

[简体中文](/README.CN.md)

</div>

---

Philia is a plug-and-play QQ robot framework that encapsulates the OneBot V11 HTTP API and provides a simple and easy-to-use API in TypeScript form.
With Philia, you can enjoy:

1. Ready-to-use experience, install the package or directly edit the source code of this repo to quickly build your own QQ robot.
2. Elegant development experience, enjoy intimate TypeScript completion and relatively complete JSDoc.
3. Concise design, with no functions other than interacting with the robot, allows you to focus on implementing business logic.

## Quick start

### Method 1: Use npm package

First, install a package:

```bash
npm install philia-onebot
```

Then create a new file, such as index.js:

``` javascript
import { createBot } from 'philia-onebot';

const bot = createBot({
  host: '127.0.0.1',
  port: 5700,
  mode: 'ws',
  access_token: 'hadleyForEvad!!'
});

bot.init();

bot.on('message.group', async e => {
    if (e.raw_message === 'Ciallo ～(∠・ω< )⌒★!') {
        await bot.sendGroupMsg(e.group_id, 'Ciallo ～(∠・ω< )⌒★!');
    }
});
```

Just run it with node at the end!

### Method 2: Use this repository as a template

As above, edit the code in index.ts, copy `config.example.json` to `config.json`, do a simple configuration, then run `yarn start`.