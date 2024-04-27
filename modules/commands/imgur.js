const imgur = require("imgur");
const fs = require("fs");
const { downloadFile } = require("../../utils/index");

module.exports.config = {
 name: "imgur",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev mod noprefix",
 description: "Imgur",
 commandCategory: "Tiện ích",
 usages: "[reply]",
 cooldowns: 5,
 usePrefix: false
};
module.exports.run = async ({ api, event, Users, Threads }) => {
 const { threadID, type, messageReply, messageID } = event;
 const moment = require("moment-timezone");
 const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
const fs = require("fs");
 const ClientID = "771631e18e73452"
 if (type !== "message_reply" || messageReply.attachments.length == 0) return api.sendMessage("Bạn phải reply một video hoặc ảnh nào đó", threadID, messageID);
 imgur.setClientId(ClientID);
 const attachmentSend = [];
 async function getAttachments(attachments) {
 let startFile = 0;
 for (const data of attachments) {
 const ext = data.type == "photo" ? "jpg" :
 data.type == "video" ? "mp4" :
 data.type == "audio" ? "m4a" :
 data.type == "animated_image" ? "gif" : "txt";
 const pathSave = __dirname + `/cache/${startFile}.${ext}`
 ++startFile;
 const url = data.url;
 await downloadFile(url, pathSave);
 attachmentSend.push(pathSave);
 }
 }
 await getAttachments(messageReply.attachments);
 let msg = "", Succes = 0, Error = [];
 for (const getImage of attachmentSend) {
 try {
 const getLink = await imgur.uploadFile(getImage)
 msg += `${++Succes}/ ${getLink.link}\n`
 fs.unlinkSync(getImage)
 } catch {
 Error.push(getImage);
 fs.unlinkSync(getImage)
      }
 }
 return api.sendMessage(`☑ 𝗧𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴: ${Succes}\n❎ 𝗧𝗵𝗮̂́𝘁 𝗯𝗮̣𝗶: ${Error.length}\n\n${msg}`, event.threadID, event.messageID);
 }