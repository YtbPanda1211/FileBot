const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
 name: 'changeapp',
 version: '1.0.0',
 hasPermssion: 3,
 credits: 'DongDev',
 description: 'Thay appstate max speed',
 commandCategory: 'Admin',
 usages: '[]',
 cooldowns: 5,
 images: [],
};

module.exports.run = async ({ api, event }) => {
 try {
 const { configPath } = global.client;
 const config = require(configPath);
 const { threadID, senderID } = event;

 api.sendMessage(`📝 Status config: ${config.APPSTATEPATH}\n\n1. fbstate.json\n2. appstate.json\n\n📌 Reply (phản hồi) STT + appstate để thay đổi appstate vào tệp tương ứng`, threadID, (error, info) => {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: senderID,
 permssion: module.exports.config.hasPermssion,
 });
 });
 } catch (error) {
 console.error('Error in run:', error);
 api.sendMessage('❎ Đã xảy ra lỗi trong quá trình xử lý lệnh!', event.threadID);
 }
};

module.exports.handleReply = async function ({ api, event, args, handleReply }) {
 const { senderID, threadID, messageID } = event;
 const { author, permssion } = handleReply;

 api.unsendMessage(handleReply.messageID);

 if (author !== senderID) {
 return api.sendMessage('❎ Bạn không phải người dùng lệnh', threadID, messageID);
 }

 try {
 switch (args[0]) {
 case '1': {
 const filePathCase1 = path.join(__dirname, './../../fbstate.json');
 const cookiesData = JSON.parse(args.slice(1).join(' '));

 if (!cookiesData.length) {
 return api.sendMessage('❎ Dữ liệu cookies không hợp lệ!', threadID, messageID);
 }

 if (permssion < 3) {
 return api.sendMessage("⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này", threadID, messageID);
 }

 const cookiesJson = JSON.stringify(cookiesData, null, 2);
 fs.writeFileSync(filePathCase1, cookiesJson, 'utf-8');
 api.sendMessage('☑️ Thay đổi appstate thành công!\n🔄 Tiến Hành Khởi Động Lại Bot!', threadID, () => process.exit(1));
 break;
 }

 case '2': {
 const filePathCase2 = path.join(__dirname, './../../appstate.json');
 const cookiesData = JSON.parse(args.slice(1).join(' '));

 if (!cookiesData.length) {
 return api.sendMessage('❎ Dữ liệu cookies không hợp lệ!', threadID, messageID);
 }

 if (permssion < 3) {
 return api.sendMessage("⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này", threadID, messageID);
 }

 const cookiesJson = JSON.stringify(cookiesData, null, 2);
 fs.writeFileSync(filePathCase2, cookiesJson, 'utf-8');
 api.sendMessage('☑️ Thay đổi appstate thành công!\n🔄 Tiến Hành Khởi Động Lại Bot!', threadID, () => process.exit(1));
 break;
 }

 default: {
 return api.sendMessage('❎ Số bạn chọn không có trong lệnh', threadID, messageID);
 }
 }
 } catch (error) {
 console.error('Error in handleReply:', error);
 api.sendMessage('❎ Đã xảy ra lỗi trong quá trình xử lý phản hồi!', threadID);
 }
};