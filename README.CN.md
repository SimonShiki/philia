<div align="center">

![](/Philia.png)

# Philia

## Fastly build your own QQ bot

</div>

---

Philia 是一个开箱即用的 QQ 机器人框架，它基于 OneBot V11 标准，以 TypeScript 的形式封装了一套简单易用的 API。
使用 Philia, 你可以享受:

1. 开箱即用的体验，装包 or 直接改本仓库源码即可快速搭建自己的 QQ 机器人。
2. 优雅的开发体验，享受贴心的 TypeScript 补全以及相对完善的 JSDoc。
3. 简洁(lou)的设计，无任何与机器人交互以外的功能，让你专注于业务逻辑的实现。

## 快速开始

### 方法1: 使用 npm 包

首先，装个包:

```bash
npm install philia-onebot
```

然后新建一个文件，比如 `index.js`:

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

最后用 node 运行就好啦!

PS: 模块使用了 node 特有的模块解析方式，deno 用户请使用 `https://esm.sh/philia-onebot` 作为模块地址。

### 方法2: 把这个仓库当 Template 用

如上，改 index.ts 里的代码，把 `config.example.json` 复制一份成 `config.json`，简单配置一下然后用 `yarn start` 运行。
