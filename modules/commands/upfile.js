class DongDev {
 get config() {
 return {
 name: "upfile",
 version: "1.1.2",
 hasPermssion: 3,
 credits: "Lỏ",
 description: "Up file",
 commandCategory: "Hệ thống",
 usages: "",
 cooldowns: 5
     };
 }
async run({ event, api, args, Users }) {
 const domain = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
 const axios = require('axios');
 const fs = require('fs');
 const contents = args.join(" ");
 if (!contents) {
 return api.sendMessage('Thiếu dữ liệu', event.threadID, event.messageID);
 }
 if (event.messageReply || args.join(" ").startsWith("http")) {
 const url = args.join(" ").startsWith("http") ? args.join(" ").match(/http(s)?:\/\/(.*)(\s|$)/g)?.[0] : event.messageReply.body.match(/http(s)?:\/\/(.*)(\s|$)/g)?.[0];
 if (!url) {
 return api.sendMessage('Không tìm thấy link', event.threadID, event.messageID);
 }
 const res = await axios.get(url, { responseType: 'arraybuffer' });
 const fileName = args.join(" ").match(/(\s|)(.*?)\.(.*)/g)?.[0].trim();
 if (!fileName) {
 return api.sendMessage('Không tìm thấy tên file', event.threadID, event.messageID);
 }
 fs.writeFileSync(__dirname + `/${fileName}`, Buffer.from(res.data, 'utf-8'));
 return api.sendMessage(`Đã lưu file ${fileName}`, event.threadID, event.messageID);
 }
 else if (contents.endsWith(".js")) {
 const data = fs.readFile(
 `${__dirname}/${contents}`,
 "utf-8",
 async (err, data) => {
 if (err) return api.sendMessage(`Lệnh ${contents} không tồn tại`, event.threadID, event.messageID);
 axios.post(`${domain}/upfile`, {
 data: data,
 type: "code"
 }).then(function (response) {
 console.log(response.data);
 return api.sendMessage(`Kết quả: ${domain}/raw/` + response.data.code, event.threadID, event.messageID);
      });
 });
 return;
      } else {
 axios.post(`${domain}/upfile`, {
 data: contents,
 type: "code"
 }).then(function (response) {
 return api.sendMessage(`Kết quả: ${domain}/raw/` + response.data.code, event.threadID, event.messageID);
       });
     }
   }
}
module.exports = new DongDev();