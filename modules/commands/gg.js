module.exports.config = {
    name: 'gg',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Xem hình ảnh bằng từ khóa trên google',
    commandCategory: 'Thành viên',
    usages: '[số ảnh] + [từ khóa]',
    cooldowns: 3
};
const {
    get
} = require('axios')
module.exports.run = async function({
    api, event, args
}) {
    try {
        var l = isNaN(args[0])?1: (args[0] > 50?50: args[0]),
        s = args.join(' ');
        s = isNaN(args[0])?s: s.replace(l, '');
        const res = await get(`https://API-1.last-namename.repl.co/crawl/yahoo-image?s=${encodeURI(s)}&f=6`);
        if (res.data.status != 200) return api.sendMessage(res.data.message, event.threadID, event.messageID);
        const attachment = [],
        index = [],
        u = res.data.data;
        l = l > u.count?u.count: l;
        do {
            const n = Math.floor(Math.random()*l);
            if (!index.includes(n)) index.push(n);
        } while (index.length != l);
        for (const i of index)try {
            const res_ = await get(u.url_image[i], {
                responseType: 'stream'
            });
            if (res_.status == 200) attachment.push(res_.data);
        }catch {
            continue;
        };
        api.sendMessage({
            body:`🌐====「 𝗚𝗢𝗢𝗚𝗟𝗘 」====🌐\n━━━━━━━━━━━━━━━━━━\n→ 𝗔̉𝗻𝗵 𝗯𝗼𝘁 𝘁𝗶̀𝗺 đ𝘂̛𝗼̛̣𝗰 𝘁𝗿𝗲̂𝗻 𝗴𝗼𝗼𝗴𝗹𝗲\n━━━━━━━━━━━━━━━━━━\n${res.data.message} `, attachment
        }, event.threadID, event.messageID);
    }catch(e) {
        api.sendMessage(`${e}`, event.threadID, event.messageID)};
};