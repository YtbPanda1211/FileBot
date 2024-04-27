const axios = require('axios');

module.exports.config = {
 name: "get",
 version: "1.8.7",
 hasPermission: 0,
 credits: "DongDev",
 description: "Lấy Token/Cookies",
 commandCategory: "Tiện ích",
 usages: "[]",
 cooldowns: 3,
 usePrefix: false,
 images: [],
};

module.exports.run = async function ({ api, event }) {
 const message = event.body;
 const args = message.split(/\s+/);
 args.shift();

 if (args.length === 2) {
 const username = args[0];
 const password = args[1];

 api.sendMessage(`🕟 | Đang lấy token cho người dùng: '${username}', Vui lòng đợi...`, event.threadID);

 try {
 const response = await axios.get('https://code-merge-api-hazeyy01.replit.app/api/token', {
 params: {
 username: username,
 password: password,
 },
 });

 if (response.data.status) {
 const { access_token, access_token_eaad6v7, cookies } = response.data.data;

 api.sendMessage(`☑️ Lấy Token thành công ✨\n\n[ 🎟️ Token ]\n\n${access_token}\n\n${access_token_eaad6v7}\n\n[ 🍪 Cookies ]\n\n ${cookies}`, event.threadID);
 } else {
 api.sendMessage(`🔴 Lỗi: ${response.data.message}`, event.threadID);
 }
 } catch (error) {
 console.error("🔴 Lỗi khi lấy token", error);
 api.sendMessage("🔴 Lỗi khi lấy token, Vui lòng thử lại sau.", event.threadID);
 }
 } else {
 api.sendMessage("📝 Cách sử dụng: get [tên người dùng] [mật khẩu]", event.threadID);
 }
};