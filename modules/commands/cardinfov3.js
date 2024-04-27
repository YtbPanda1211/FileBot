const axios = require('axios');
module.exports.config = {
 name: "cardinfov3",
 version: "1.0.1",
 hasPermission: 0,
 credits: "DongDev",
 description: "Card info Facebook v3",
 commandCategory: "Edit-img",
 usages: "cardinfo fb",
 usePrefix: false,
 cooldowns: 20
};

module.exports.run = async ({ api, event, Users, Threads, args }) => {
 try {
 const token = global.config.ACCESSTOKEN;

 let id;
 if (Object.keys(event.mentions).length > 0) {
 id = Object.keys(event.mentions)[0].replace(/\&mibextid=ZbWKwL/g, '');
 } else {
 id = args[0] !== undefined ? (isNaN(args[0]) ? await global.utils.getUID(args[0]) : args[0]) : event.senderID;
 if (event.type === "message_reply") {
 id = event.messageReply.senderID;
 }
 }
 const resp = await axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,updated_time,work,education,likes,created_time,work,posts,hometown,username,family,timezone,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`);
 const name = resp.data.name;
 const uid = resp.data.id;
 const gender = resp.data.gender;
 const relationship_status = resp.data.relationship_status || "Không có dữ liệu";
 var bday = resp.data.birthday || "Không công khai";
 const follower = resp.data.subscribers?.summary?.total_count || "❎";
 const hometown = resp.data.hometown?.name || "Không có dữ liệu";
 const res = await axios.get(`https://apibot.pmd06.repl.co/fbcover/v3?name=${name}&birthday=${bday}&love=${relationship_status}&location=${resp.data.location?.name || 'Không có dữ liệu'}&hometown=${hometown}&follow=${follower}&gender=${gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Không công khai'}&uid=${uid}`, {
 responseType: 'stream'
 });
 const img = res.data;
 api.sendMessage({ body: ``, attachment: img }, event.threadID, event.messageID);
 } catch (error) {
 console.error('Lỗi khi tải hình ảnh:', error);
 api.sendMessage(`Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.`, event.threadID);
 }
};