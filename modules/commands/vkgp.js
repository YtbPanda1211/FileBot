module.exports.config = {
 name: "vkgp",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Không biết",
 commandCategory: "Thông tin",
 usages: "[]",
 cooldowns: 5,
};

module.exports.run = async ({ api, event, Threads, args }) => {
 const axios = require("axios");

 let links = [
 "https://i.imgur.com/r5zcQjD.mp4"
 ];

 switch (args[0]) {
 case "add":
 if (args[1]) {
 links.push(args[1]);
 return api.sendMessage("☑️ Link đã được thêm vào modules.", event.threadID, event.messageID);
 } else {
 return api.sendMessage("⚠️ Bạn cần cung cấp một đường link để thêm vào modules.", event.threadID, event.messageID);
 }
 break;
 
 default:
 try {
 const vd = (await axios.get(links[Math.floor(Math.random() * links.length)], { responseType: "stream" })).data;
 return api.sendMessage({ body: ``, attachment: vd }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
 return api.sendMessage("❎ Không thể tải được video.", event.threadID, event.messageID);
 }
 break;
 }
};