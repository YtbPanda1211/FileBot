const axios = require('axios');
const qs = require('qs');

module.exports.config = {
 name: "getid",
 version: "1.0.0",
 hasPermission: 0,
 credits: "DongDev",
 description: "Lấy id của tất cả các liên kết trên Facebook",
 commandCategory: "Công cụ",
 usages: "[]",
 cooldowns: 5,
 usePrefix: false,
 images: [],
};

module.exports.run = async function({ api, event, args }) {
 try {
 if (args.length === 0) {
 api.sendMessage("❎ Vui lòng nhập một liên kết để get ID", event.threadID, event.messageID);
 return;
 }

 const url = args.join(" ");
 
 const regex = /(?:https?:\/\/)?(?:www|m\.)?(?:facebook|fb|m|.me\.facebook)\.(?:com|me|watch)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
 const regexResult = url.match(regex);

 if (!regexResult || regexResult.length < 2 || !regexResult[1]) {
 api.sendMessage("❎ Liên kết sai, vui lòng chỉ nhập liên kết facebook", event.threadID, event.messageID);
 return;
 }

 const newUrl = `https://facebook.com/${regexResult[1]}`;
 
 const options = {
 method: 'POST',
 url: 'https://id.traodoisub.com/api.php',
 headers: {
 'content-type': 'application/x-www-form-urlencoded',
 },
 data: qs.stringify({
 'link': newUrl,
 }),
 };

 const req = await axios(options);

 if (req.data.code === 400) {
 api.sendMessage("❎ Không thể lấy ID vào lúc này, vui lòng thử lại sau", event.threadID, event.messageID);
 } else {
 api.sendMessage(`☑️ Lấy ID thành công: ${req.data.id}`, event.threadID, event.messageID);
 }
 } catch (error) {
 console.error(error);
 api.sendMessage("❎ Lỗi không thể xử lý yêu cầu", event.threadID, event.messageID);
 }
};