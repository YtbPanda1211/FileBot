module.exports.config = {
 name: 'stk',
 version: '1.0.0',
 credits: 'DongDev',
 hasPermssion: 0,
 description: 'Số tài khoản Admin',
 commandCategory: 'Thông tin',
 usages: 'stk',
 images: [],
 cooldowns: 5
};
module.exports.run = async function ({ api, event, Users, Threads, Currencies }) {
 const { threadID, messageID, senderID } = event;
 const axios = require('axios');
 const { FB_ADMIN, ZALO_ADMIN } = global.config;
 const idad = '100068096370437';
 var link = [
"https://i.imgur.com/AlzAvMb.jpeg",
"https://i.imgur.com/fKtfxZ0.jpeg",
"https://i.imgur.com/URJlrFF.jpeg"
];
let image = [];
for(let i = 0; i < 3; i++) {
 const stream = (await axios.get(link[i], {
 responseType: "stream"
 })).data;
 image.push(stream);
};
 return api.sendMessage({body: `👤 𝐀𝐝𝐦𝐢𝐧: Phạm Minh Đồng\n🌐 𝐋𝐢𝐧𝐤 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${FB_ADMIN}\n📎 𝐙𝐚𝐥𝐨: ${ZALO_ADMIN}\n───────────\n\n💳 𝐌𝐁 𝐁𝐀𝐍𝐊: 0000046623411\n🔐 𝐌𝐎𝐌𝐎: 0372699746\n💳 𝐀𝐆𝐑𝐈𝐁𝐀𝐍𝐊: 3509205125563\n💵 𝐌𝐈𝐑𝐀𝐈 𝐁𝐀𝐍𝐊: 071106 (tiền ảo)\n────────────────────`, attachment: image }, event.threadID, async (err, info) => {
 await new Promise(resolve => setTimeout(resolve, 30 * 1000));
 return api.unsendMessage(info.messageID);
 }, event.messageID);
 }