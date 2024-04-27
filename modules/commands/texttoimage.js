let KEY = "trial", 
stream_url = url=>require('axios').get(url, {
    responseType: 'stream',
}).then(res=>res.data).catch(e=>undefined);
module.exports ={
	config: {
		name: 'texttoimage',
		version: '1.0.1', 
		credits: 'Lê Minh Tiến',
		hasPermssion: 0,
		usages: '[text]',
		description: 'Vẽ ảnh thông qua văn bản',
		commandCategory: 'Tiện ích',
		images: [], 
		cooldowns: 0
	},
handleReply: async (o) => {
let _ = o.handleReply, send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID), s = Date.now();
if (isNaN(o.event.body)) return send('⚠️ Không nhập gì khác ngoài số') 
send('🔄 Style '+o.event.body+' Vui Lòng Chờ..... ') 
try {
require('axios').get(`https://1.t-ai.repl.co/${KEY}?prompt=${_.t}&style_id=${o.event.body}&type=generate`).then(async (res) => {
send({body:'✅ Vẽ ảnh hoàn tất\n'+'📝 Nội dung: '+_.t+'\n⏳ Thời gian thực thi '+Math.floor((Date.now() - s)/1000)+'s', attachment: await stream_url(res.data[0])})
})
} catch(e) {
console.log(e) 
return send('❎ Đã xảy ra lỗi!')}
}, 
run: async (o) => {
 let send = (a, b)=>o.api.sendMessage(a, o.event.threadID, b, b == 0?undefined: o.event.messageID), a = o.args.join(' ');
if (!a) return send('Chưa Nhập Văn Bản Cần Tạo Ảnh!')
send('📝 Bạn Đã Chọn Prompt Là: '+a+'\n📌 Reply (phản hồi) tin nhắn này kèm style tương ứng(1 -> 3)', (e, i) =>
global.client.handleReply.push({
	name: "texttoimage", 
        messageID: i.messageID,
        t: a,
	})) 
    }
}