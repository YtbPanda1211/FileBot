const fs = require("fs");

module.exports.config = {
 name: "antiqtv",
 version: "1.1.2",
 hasPermssion: 1,
 credits: "DongDev",
 description: "Chống cướp admin box.",
 commandCategory: "Box chat",
 usages: "[]",
 cooldowns: 5,
 dependencies: {
 "fs-extra": ""
 }
};

module.exports.onLoad = function () {
 let path = __dirname + "/data/antiqtv.json";
 if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
};

module.exports.run = async function ({ api, event }) {
 const dataAnti = __dirname + '/data/antiqtv.json';
 const info = await api.getThreadInfo(event.threadID);
 if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
 return api.sendMessage('❎ Bot cần quyền quản trị viên để có thể thực thi lệnh', event.threadID, event.messageID);
 let data = JSON.parse(fs.readFileSync(dataAnti)); // Fixed: dataA to data
 const { threadID, messageID } = event;
 if (!data[threadID]) {
 data[threadID] = true;
 api.sendMessage(`☑️ Bật thành công chế độ Antiqtv`, threadID, messageID);
 } else {
 data[threadID] = false;
 api.sendMessage(`☑️ Tắt thành công chế độ Antiqtv`, threadID, messageID);
 }
 fs.writeFileSync(dataAnti, JSON.stringify(data, null, 4));
};