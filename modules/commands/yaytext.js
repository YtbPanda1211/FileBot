module.exports.config = {
 name: "yaytext",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Tạo font chữ",
 commandCategory: "Tiện ích",
 usages: "",
 cooldowns: 5,
};

module.exports.run = async ({ event, api, args }) => {
 const axios = require('axios');
 const tip = args.join(" ");
 if (!tip || tip.length === 0) {
 return api.sendMessage("⚠️ Vui lòng nhập nội dung để có thể tạo font chữ!", event.threadID, event.messageID);
 }

 const apiUrl = `https://thenamk3.net/api/font-text.json?text=${tip}&apikey=bGCz9cFa`;

 try {
 const response = await axios.get(apiUrl);
 const data = response.data;

 let message = '';

 data.forEach((item, index) => {
 message += `${index + 1}. 📝 Font: ${item.name} | ${item.result}\n─────────\n`;
 });

 api.sendMessage(`[ YAYTEXT CREATE FONT ]\n────────────────────\n` + message, event.threadID, event.messageID);
 } catch (error) {
 console.error('Lỗi khi lấy dữ liệu từ API:', error);
 }
};