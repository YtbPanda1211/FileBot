module.exports.config = {
 name: "teach",
 version: "2.9.4",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Dạy bot (dùng cho lệnh sim)",
 commandCategory: "Tiện ích",
 usages: "hello => goodbye",
 cooldowns: 5,
 images: [],
 dependencies: {
 "axios": ""
 }
};

module.exports.run = async function({ api, event, args }) {
 const axios = require("axios");
 const sim = require('./../../lib/sim.js');
 var tip = args.join(" ").split(' => ');
 if (tip.length < 2 || !tip[0] || !tip[1]) {
 return api.sendMessage("Vui lòng nhập thông tin đầy đủ (ví dụ: hello => goodbye)", event.threadID, event.messageID);
}
 try {
const type = 'teach';
const data = {
  ask: tip[0],
  ans: tip[1]
};

const res = sim.simi(type, data);
   
 if (res.data.success === false) return api.sendMessage(`${res.error}`, event.threadID, event.messageID);
 return api.sendMessage(`🔰 Status: ${res.msg}\n\n✏️ Câu hỏi: ${res.data.ask}\n📝 Câu trả lời: ${res.data.ans}`, event.threadID, event.messageID);
 } catch (error) {
 return api.sendMessage("Đã xảy ra lỗi khi gửi yêu cầu.", event.threadID, event.messageID);
 }
};