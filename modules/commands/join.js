module.exports.config = {
 name: "join",
 version: "1.0.0",
 hasPermssion: 1,
 credits: "ManhG",
 description: "Bật tắt joinNoti",
 commandCategory: "Box chat",
 usages: "[on/off]",
 cooldowns: 2
};

module.exports.languages = {
 "vi": {
 "on": "✅ Bật",
 "off": "✅ Tắt",
 "successText": "gửi tin nhắn chào mừng khi có thành viên mới tham gia nhóm chat",
 },
 "en": {
 "on": "on",
 "off": "off",
 "successText": "send a welcome message when a new member joins your chat group",
 }
}

const fs = require('fs');
const path = __dirname + '/data/dataEvent.json';

exports.onLoad = o => {
 if (!fs.existsSync(path)) fs.writeFileSync(path, '{}')
}

module.exports.run = async function ({ api, event, Threads, getText, args }) {
 if (!args[0] || (args[0] !== 'on' && args[0] !== 'off')) {
 return api.sendMessage('⚠️ Vui lòng chọn"on" hoặc "off"', event.threadID, event.messageID);
 }

 let data = JSON.parse(fs.readFileSync(path));
 const { threadID, messageID } = event;
 if (!data.join) data.join = [];
 let find = data.join.find(i => i.threadID == threadID);

 if (find) {
 find.status = args[0] === 'on' ? true : false;
 } else {
 find = data.join.push({
 threadID,
 status: args[0] === 'on' ? true : false
 });
 }

 fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
 return api.sendMessage(`${args[0] === 'on' ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};