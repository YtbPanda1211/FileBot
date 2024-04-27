const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
 name: "vdvip",
 version: "1.0.1",
 hasPermission: 2,
 credits: "Tnam Procoder lỏ",
 description: "Xem video vip có 18+",
 commandCategory: "Tiện ích",
 usages: "vdvip",
 usePrefix: false,
 cooldowns: 10,
};

module.exports.run = async ({ api, event }) => {
 try {
 const urlAPI = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
 const apiKey = "DongDevVip_1572349423";
 const time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');

 api.sendMessage({
 body: `🤩===[ 𝗩𝗜𝗗𝗘𝗢 𝗩𝗜𝗣 𝟭𝟴+ ]===🤩\n━━━━━━━━━━━━━━━━━━━\n→ 𝗩𝗶𝗱𝗲𝗼 𝘀𝗶𝗲̂𝘂 𝘃𝗶𝗽 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 đ𝗮̂𝘆\n→ 𝗟𝘂̛𝘂 𝘆́! 𝗵𝗮̃𝘆 𝗴𝗼̛̃ 𝘃𝗶𝗱𝗲𝗼 𝘀𝗮𝘂 𝗸𝗵𝗶 𝘅𝗲𝗺 𝘅𝗼𝗻𝗴, 𝘁𝗿𝗮́𝗻𝗵 𝗱𝗶𝗲 𝗮𝗰𝗰 𝗯𝗼𝘁 😂\n→ 𝗧𝗶𝗺𝗲: ${time}.`,
 attachment: (await axios({ url: (await axios(`https://vdvip.trickertnam.repl.co/vdvip/php`)).data.data,
 method: "GET",
 responseType: "stream" })).data
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error("Lỗi trong quá trình chạy vdvip:", error);
 }
};