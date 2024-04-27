module.exports.config = {
 name: "vkbp",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "DongDev",
	description: "admin bot",
	commandCategory: "Thông tin",
	usages: "Prefix",
	cooldowns: 5,
};
module.exports.run = async ({ api, event, Threads }) => {
 const axios = require("axios");
 const link = [
 "https://i.imgur.com/r5zcQjD.mp4"
 ];
const img = (await axios.get(link[Math.floor(Math.random() * link.length)], { responseType: "stream" })).data;
 return api.sendMessage({body:``, attachment: img }, event.threadID, event.messageID);
}