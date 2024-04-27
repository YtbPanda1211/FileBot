const axios = require('axios');

module.exports.config = {
 name: "chuky",
 version: "1.0.1",
 hasPermission: 0,
 credits: "DongDev",
 description: "Tạo ảnh chữ ký",
 commandCategory: "Edit-img",
 usages: "[]",
 usePrefix: false,
 cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
 try {
 if (args.length === 0) {
 api.sendMessage(`⚠️ Vui lòng nhập nội dung để tạo ảnh\nvd: chuky 1 | 2006 | DongDev`, event.threadID);
 return;
 }

 const [type, age, name] = args.join(" ").split(" | ");
 const res = await axios.get(`https://apibot.pmd06.repl.co/bannertc?kieu=${type}&age=${age}&name=${name}`, {
 responseType: 'stream'
 });

 api.sendMessage({ attachment: res.data }, event.threadID, event.messageID);
 } catch (error) {
 console.error('Lỗi khi tải hình ảnh:', error);
 api.sendMessage(`Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.`, event.threadID);
 }
};