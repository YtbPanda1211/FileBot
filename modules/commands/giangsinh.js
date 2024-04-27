const axios = require('axios');

module.exports.config = {
 name: "giangsinh",
 version: "1.0.1",
 hasPermission: 0,
 credits: "DongDev",
 description: "Merry Christmas",
 commandCategory: "Edit-img",
 usages: "[]",
 usePrefix: false,
 cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
try {
 if (args.length === 0) {
 api.sendMessage(`⚠️ Vui lòng nhập nội dung để tạo ảnh`, event.threadID);
 return;
 }
 const keyword = args.join(" ");
 const res = await axios.get(`https://apibot.pmd06.repl.co/giangsinh?text=${keyword}`, {
 responseType: 'stream'
 });
 api.sendMessage({ attachment: res.data }, event.threadID, event.messageID);
 } catch (error) {
 console.error('Lỗi khi tải hình ảnh:', error);
 api.sendMessage(`Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.`, event.threadID);
 }
};