module.exports.config = {
	name: "ip",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Xem thông tin ip của bạn hoặc ip khác", 
	commandCategory: "Tiện ích",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
 const timeStart = Date.now();
 
 const axios = require("axios");
 if (!args[0]) {api.sendMessage("Vui lòng nhập ip bạn muốn kiểm tra",event.threadID, event.messageID);}
 else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
 if (infoip.status == 'fail')
 {api.sendMessage(`Đã xảy ra lỗi: ${infoip.message}`, event.threadID, event.messageID)}
 else {
 /////////////////
 //////////////////
 api.sendMessage({body:`
 [ CHECK ĐỊA CHỈ IP ]
 ────────────────
🗺️ Châu lục: ${infoip.continent}
🏳️ Quốc gia: ${infoip.country}
🎊 Mã QG: ${infoip.countryCode}
🕋 Khu vực: ${infoip.region}
⛱️ Vùng/Tiểu bang: ${infoip.regionName}
🏙️ Thành phố : ${infoip.city}
🛣️ Quận/Huyện: ${infoip.district}
📮 Mã bưu chính: ${infoip.zip}
🧭 Latitude: ${infoip.lat}
🧭 Longitude: ${infoip.lon}
⏱️ Timezone: ${infoip.timezone}
👨‍✈️ Tên tổ chức: ${infoip.org}
💵 Currency unit: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.masageID);}
 } 
	}