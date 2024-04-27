const moment = require('moment');
const axios = require('axios');

module.exports.config = {
 name: "github",
 version: "1.0.0",
 hasPermission: 0,
 credits: "DongDev",
 description: "Thông tin tài khoản GitHub",
 commandCategory: "Tiện ích",
 usages: "[tên người dùng]",
 cooldowns: 5,
 images: [],
};

module.exports.run = async ({ api, event, args }) => {
 if (!args[0]) {
 api.sendMessage('⚠️Vui lòng nhập tên người dùng GitHub\nSử dụng: `github [tên người dùng]`', event.threadID, event.messageID);
 return;
 }

 const username = args.join(" ");

 try {
 const { data } = await axios.get(`https://api.github.com/users/${username}`);
 const {
 login,
 avatar_url,
 name,
 id,
 html_url,
 public_repos,
 followers,
 following,
 location,
 created_at,
 bio,
 } = data;

 const createdDate = moment(created_at).format('DD/MM/YYYY');
 const createdTime = moment(created_at).format('HH:mm:ss');

 const message = `[ INFO USER - GITHUB ]\n────────────────────\n|› Username: ${login}\n|› Name: ${name || 'Không có'}\n|› ID: ${id}\n|› Hồ sơ: ${html_url}\n|› Số kho lưu trữ: ${public_repos}\n|› Người theo dõi: ${followers}\n|› Đang theo dõi: ${following}\n|› Địa điểm: ${location || 'Không có'}\n|› Ngày tạo: ${createdDate} - ${createdTime}\n|› Bio: ${bio || 'Không có'}\n────────────────────`;

 api.sendMessage({ body: message, attachment: (await axios.get(avatar_url, { responseType: "stream" })).data }, event.threadID, event.messageID);
 } catch (error) {
 console.error('Lỗi khi truy xuất dữ liệu GitHub:', error);
 api.sendMessage('❎ Đã xảy ra lỗi khi truy xuất dữ liệu GitHub hoặc người dùng không tồn tại.', event.threadID);
 }
};