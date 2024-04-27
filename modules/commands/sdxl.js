module.exports = {
 config: {
 name: 'sdxl',
 version: '1.0.1',
 credits: 'DongDev',
 hasPermssion: 0,
 usages: '[text]',
 description: 'Vẽ ảnh thông qua văn bản',
 commandCategory: 'Tiện ích',
 images: [],
 cooldowns: 0
 },
 handleReply: async (o) => {
 let _ = o.handleReply,
 send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
 s = Date.now();
 o.api.unsendMessage(_.messageID);
 
 let styles = parseInt(o.event.body);
 if (isNaN(styles)) return send('⚠️ Nhập không hợp lệ. Vui lòng nhập một số.');
 
 send('🔄 Style ' + styles + ' Vui Lòng Chờ.....');
 
 try {
 const axios = require('axios');
 const response = await Promise.race([
 axios.get(`http://ger2-1.deploy.sbs:1792/sdxl?prompt=${encodeURIComponent(_.t)}&styles=${styles}`, { responseType: "stream" }),
 new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), 30000)) // Timeout after 30 seconds
 ]);
 
 send({
 body: '✅ Vẽ ảnh hoàn tất\n' + '📝 Nội dung: ' + _.t + '\n⏳ Thời gian thực thi ' + Math.floor((Date.now() - s) / 1000) + 's',
 attachment: response.data
 });
 } catch (e) {
 console.log(e);
 return send('❎ Đã xảy ra lỗi khi gửi yêu cầu đến API!');
 }
 },
 run: async (o) => {
 let send = (a, b) => o.api.sendMessage(a, o.event.threadID, b, b == 0 ? undefined : o.event.messageID),
 a = o.args.join(' ');
 
 if (!a) return send('Chưa Nhập Văn Bản Cần Tạo Ảnh!');
 
 send('📝 Bạn Đã Chọn Prompt Là: ' + a + '\n📌 Reply (phản hồi) tin nhắn này kèm style tương ứng(1 -> 9)', (e, i) =>
 global.client.handleReply.push({
 name: 'sdxl',
 messageID: i.messageID,
 t: a,
 }));
 }
}