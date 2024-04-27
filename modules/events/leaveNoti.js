const axios = require("axios");
const moment = require("moment-timezone");
const fs = require('fs');

module.exports.config = {
  name: "leaveNoti",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Không biết",
  description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

const checkttPath = __dirname + '/../commands/checktt/';

module.exports.run = async function ({ api, event, Users, Threads }) {
  try {
    const { threadID } = event;
    const { mainPath } = global.client;
    const pathLeave = mainPath + '/modules/commands/data/dataEvent.json';
    const dataLeave = JSON.parse(fs.readFileSync(pathLeave));
    const findLeave = dataLeave.leave.find(i => i.threadID === threadID);

    if (findLeave) {
      if (!findLeave.status) return;
    }
    const { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    var fullYear = global.client.getTime("fullYear");
    var getHours = await global.client.getTime("hours");

    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss | DD/MM/YYYY");
    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const iduser = event.logMessageData.leftParticipantFbId;
    var getData = await Users.getData(event.author);
    var nameAuthor = typeof getData.name == "undefined" ? "" : getData.name;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "Đã tự rời khỏi nhóm" : `Đã bị Qtv kick khỏi nhóm\n👤 Người kick: ${nameAuthor}\n🔗 Link: https://www.facebook.com/profile.php?id=${event.author}`;
    if (existsSync(checkttPath + threadID + '.json')) {
      const threadData = JSON.parse(readFileSync(checkttPath + threadID + '.json'));
      const userData_week_index = threadData.week.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
      const userData_day_index = threadData.day.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
      const userData_total_index = threadData.total.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
      if (userData_total_index != -1) {
        threadData.total.splice(userData_total_index, 1);
      }
      if (userData_week_index != -1) {
        threadData.week.splice(userData_week_index, 1);
      }
      if (userData_day_index != -1) {
        threadData.day.splice(userData_day_index, 1);
      }
      writeFileSync(checkttPath + threadID + '.json', JSON.stringify(threadData, null, 4));
    }

    (typeof data.customLeave == "undefined") ? msg = "[ Thành Viên Rời Nhóm ]\n────────────────────\n👤 Name: {name}\n🔗 Link: https://www.facebook.com/profile.php?id={iduser}\n📝 {type}\n────────────────────\n⏰ Time: {time}" : msg = data.customLeave;
    var getData = await Users.getData(event.author);
    var nameAuthor = typeof getData.name == "undefined" ? "" : getData.name;
    msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{iduser}/g, iduser).replace(/\{time}/g, time).replace(/\{author}/g, nameAuthor).replace(/\{uidAuthor}/g, event.author);
    const datalink = require('./../../data_dongdev/datajson/vdgai.json');
    const vdurl =  datalink[Math.floor(Math.random() * datalink.length)];
    let streamURL = (url, ext = 'jpg') => axios.get(url, {
 responseType: 'stream',
}).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);
    const send = { body: msg, attachment: await streamURL(vdurl, 'mp4')}
     return api.sendMessage(send, threadID, async (err, info) => {
      await new Promise(resolve => setTimeout(resolve, 20 * 1000));
      return api.unsendMessage(info.messageID);
    });

  } catch (e) { 
    console.log(e);
  }
}