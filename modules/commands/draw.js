const axios = require('axios');

const urlAPI = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
const apiKey = "DongDevVip_1572349423";

module.exports.config = {
 name: "draw",
 version: "1.0.0",
 hasPermission: 0,
 credits: "DongDev",
 description: "Draw image to anime",
 commandCategory: "Tiện ích",
 usages: "[Reply to an image] or [Provide image link as argument]",
 cooldowns: 5,
 dependencies: {
 "tinyurl": ""
 }
};

module.exports.run = async ({ api, event, args }) => {
 try {
 const { messageReply, threadID } = event;

 let imgLink;

 if (event.type === "message_reply") {
 imgLink = await global.nodemodule["tinyurl"].shorten(messageReply.attachments[0].url);
 } else if (args.length > 0) {
 imgLink = args[0];
 } else {
 return api.sendMessage("❌ Bạn phải reply một hình ảnh hoặc cung cấp một link ảnh", event.threadID, event.messageID);
 }

 const drawResponse = await axios.get(`${urlAPI}/draw?url=${imgLink}`);
 const animeLink = drawResponse.data.data.url;

 // Get the image data as a stream
 const imageData = await axios.get(animeLink, { responseType: 'stream' });
 const imgData = imageData.data;

 // Send the image with a message
 api.sendMessage({ body: `[ DRAW IMAGE TO ANIME ]\n────────────────────`, attachment: imgData }, event.threadID, event.messageID);
 } catch (error) {
 console.error("Error:", error);
 api.sendMessage("⚠️ Đã xảy ra lỗi khi xử lý ảnh", event.threadID, event.messageID);
 }
};