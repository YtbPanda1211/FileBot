const fs = require("fs-extra");

module.exports.config = {
  name: "noti",
  version: "1.4.3",
  hasPermssion: 1,
  credits: "DongDev",
  description: "Bật tắt join/leave Noti",
  commandCategory: "Box chat",
  usages: "noti dùng để bật tắt",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
  },
};

module.exports.handleReply = async function ({ api, event, args, handleReply }) {
  const { senderID, threadID, messageID, messageReply } = event;
  const { author, permssion } = handleReply;
  const tm = process.uptime(),
    Tm = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY"),
    h = Math.floor(tm / (60 * 60)),
    H = h < 10 ? "0" + h : h,
    m = Math.floor((tm % (60 * 60)) / 60),
    M = m < 10 ? "0" + m : m,
    s = Math.floor(tm % 60),
    S = s < 10 ? "0" + s : s;
  const path = __dirname + "/data/dataEvent.json";
  let data = fs.readJSONSync(path);

  if (author !== senderID) return api.sendMessage(`❎ Bạn không phải người dùng lệnh`, threadID);

  var number = args.filter((i) => !isNaN(i));
  for (const num of number) {
    switch (num) {
      case "1": {
        //---> CODE JOIN NOTI <---//
        if (permssion < 1)
          return api.sendMessage(
            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
            threadID,
            messageID
          );

        if (!data.join) data.join = [];
        let find = data.join.find((i) => i.threadID == threadID);

        if (find) find.status = !find.status ? true : false;
        else
          find = data.join.push({
            threadID,
            status: true,
          });
        fs.writeJSONSync(path, data, { spaces: 4 });
        return api.sendMessage(
          `${!find.status ? "off" : "on"} successText`,
          threadID,
          messageID
        );
      }
      break;

      case "2": {
        //---> CODE LEAVE NOTI <---//
        if (permssion < 1)
          return api.sendMessage(
            "⚠️ Bạn không đủ quyền hạn để sử dụng lệnh này",
            threadID,
            messageID
          );
        if (!data.leave) data.leave = [];
        let findDataLeave = data.leave.find((i) => i.threadID == threadID);

        if (findDataLeave) findDataLeave.status = !findDataLeave.status ? true : false;
        else
          findDataLeave = data.leave.push({
            threadID,
            status: true,
          });
        fs.writeJSONSync(path, data, { spaces: 4 });
        return api.sendMessage(
          `${!findDataLeave.status ? "off" : "on"} successText`,
          threadID,
          messageID
        );
      }
      break;

      case "4": {
        const joinNoti = data.join.find((item) => item.threadID === threadID);
        const leaveNoti = data.leave.find((item) => item.threadID === threadID);
        return api.sendMessage(
          `[ CHECK NOTI BOX ]\n────────────────────\n1. joinNoti box: ${
            joinNoti ? "Đang bật" : "Đang tắt"
          }\n2. leaveNoti box: ${leaveNoti ? "Đang bật" : "Đang tắt" }\n────────────────────\n⏳ Uptime: ${H + $ + M + $ + S}\n⏰ Time: ${Tm}\n⛔ Trên kia là các chế độ noti đã bật hoặc đang tắt`,
          threadID
        );
        break;
      }

      default: {
        return api.sendMessage(`Số bạn chọn không có trong lệnh`, threadID);
      }
    }
  }
};

module.exports.run = async ({ api, event, args, permssion, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const tm = process.uptime(),
    Tm = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY"),
    h = Math.floor(tm / (60 * 60)),
    H = h < 10 ? "0" + h : h,
    m = Math.floor((tm % (60 * 60)) / 60),
    M = m < 10 ? "0" + m : m,
    s = Math.floor(tm % 60),
    S = s < 10 ? "0" + s : s;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  return api.sendMessage(
    `[ NOTI CONFIG SETTING ]\n────────────────────\n1. Bật tắt joinNoti\n2. Bật tắt leaveNoti\n3. Check trạng thái\n────────────────────\n⏳ Uptime: ${H + $ + M + $ + S}\n⏰ Time: ${Tm}\n⛔ Reply (phản hồi) theo stt để chọn noti mà bạn muốn bật hoặc tắt`,
    threadID,
    (error, info) => {
      if (error) {
        return api.sendMessage("Đã xảy ra lỗi!", threadID);
      } else {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          permssion,
        });
      }
    }
  );
};
