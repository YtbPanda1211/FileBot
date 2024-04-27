const fs = require('fs');
const path = require('path');

module.exports.config = {
 name: "cookie",
 version: "1.0.1",
 hasPermission: 3,
 credits: "DongDev",
 description: "Thay cookie siêu nhanh",
 commandCategory: "Admin",
 usages: "[]",
 cooldowns: 5,
 images: [],
};

module.exports.run = async ({ api: a, event: e, args: q }) => {
 const { threadID: tid, messageID: mid } = e;
 const filePath = path.join(__dirname, './../../acc.json');

 if (!q.length) {
 a.sendMessage('⚠️ Vui lòng nhập cookie để thay đổi', tid, mid);
 return;
 }

 try {
 const jsonData = fs.readFileSync(filePath, 'utf-8');
 const data = JSON.parse(jsonData);
 data.cookie = q.join(" ");
 const updatedJsonData = JSON.stringify(data, null, 2);
 fs.writeFileSync(filePath, updatedJsonData);

 a.sendMessage('☑️ Cookie đã được thay đổi thành công',tid, mid);
 } catch (error) {
 console.error('Error:', error);
 a.sendMessage('❎ Có lỗi xảy ra khi thay đổi cookie', tid, mid);
 }
};