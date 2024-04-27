module.exports.config = {
 name: "doiacc",
 version: "1.0.0",
 hasPermssion: 3,
 credits: "BraSL and Quất",
 description: "Đổi acc bot nhanh max speed",
 commandCategory: "Admin",
 usages: "system",
 cooldowns: 0,
 images: [],
};

const {
 exec
} = require('child_process');
const eval = require('eval')
const path = require('path');
const fs = require('fs')

module.exports.run = async function({
 api,
 event,
 args
}) {
 const {
 configPath
 } = global.client;
 const config = require(configPath);
 try {
 if (config.APPSTATEPATH === 'fbstate.json') {
 config.APPSTATEPATH = 'appstate.json';
 } else {
 config.APPSTATEPATH = 'fbstate.json';
 }

 fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');

 return api.sendMessage("📌 Nhận lệnh thay acc ☑️\n🔄 Đang tiến hành đăng nhập acc khác...\n⏳ Bot sẽ khởi động lại sau vài giây", event.threadID, () => eval("module.exports = process.exit(1)", true), event.messageID);
 }catch(e) {
 console.log(e)
 }
};