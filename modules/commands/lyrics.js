const axios = require('axios');

module.exports.config = {
 name: "lyrics",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Công cụ tìm lời bài hát",
 commandCategory: "Tiện ích",
 usages: "[title]",
 cooldowns: 5
};

module.exports.run = async function ({ api, args, event, messageReply }) {
 const urlAPI = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
 const apiKey = "DongDevVip_1572349423";
 
 if (!args.length && (!event.messageReply || !event.messageReply.body)) {
 return api.sendMessage("⚠️ Vui lòng nhập tên bài hát hoặc reply tin nhắn có chứa tên bài hát", event.threadID, event.messageID);
 }
 const titles = event.type === "message_reply" ? event.messageReply.body : args.join(" ");
try {
 const resp = await axios.get(`${urlAPI}/lyrics?title=${titles}`);
 const { title, artist, lyrics } = resp.data;
 const message = `[ LỜI BÀI HÁT ]\n────────────────────\n📌 Bài hát: ${title}\n👤 Tác giả: ${artist}\n📝 Lời bài hát: ${lyrics}`;

 api.sendMessage(message, event.threadID, event.messageID);
 } catch (error) {
 api.sendMessage("❎ Có lỗi xảy ra khi tìm lời bài hát. Vui lòng thử lại sau.", event.threadID);
 }
};