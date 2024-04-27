module.exports.config = {
 name: "console",
 version: "1.1.0",
 hasPermssion: 3,
 credits: "DongDev",
 description: "Làm cho console đẹp hơn + mod chống spam lag console",
 commandCategory: "Admin",
 usages: "console",
 cooldowns: 30
};
const chalk = require("chalk");
var job = ["00FF00", "1E90FF", "8FBC8F", "00CED1", "7FFF00"];
var mdong = job[Math.floor(Math.random() * job.length)];
var donq = job[Math.floor(Math.random() * job.length)];
var isConsoleDisabled = false,
 num = 0,
 max = 15,
 timeStamp = 0;
function disableConsole(cooldowns) {
 console.log(chalk.hex("#" + mdong)(`    ══╦═══════════════════════════════╦══
      ║       ANTI LAG CONSOLE        ║
╔═════╩═══════════════════════════════╩═════╗
║  Bật Chế Độ Chống Lag Console Trong 30s   ║
╚═══════════════════════════════════════════╝`));
 isConsoleDisabled = true;
 setTimeout(function () {
 isConsoleDisabled = false;
console.log(chalk.hex("#" + donq)(`    ══╦═══════════════════════════════╦══
      ║       ANTI LAG CONSOLE        ║
╔═════╩═══════════════════════════════╩═════╗
║      Đã Tắt Chế Độ Chống Lag Console      ║
╚═══════════════════════════════════════════╝`));
   }, cooldowns * 1000);
}
module.exports.handleEvent = async function ({
  api,
  args,
  Users,
  event
}) {
  let {
    messageID,
    threadID,
    senderID,
    mentions,
    isGroup
  } = event;
  try {
 const dateNow = Date.now();
 // if (dateNow - timeStamp < this.config.cooldowns * 1000) return;
 if (isConsoleDisabled) {
 return;
 }
 const l = require("chalk");
 const moment = require("moment-timezone");
 var n = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM/YYYY");
    const cc = process.uptime(),
      anh = Math.floor(cc / (60 * 60)),
      la = Math.floor((cc % (60 * 60)) / 60),
      mdong = Math.floor(cc % 60);
    var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066", "7900FF", "93FFD8", "CFFFDC", "FF5B00", "3B44F6", "A6D1E6", "7F5283", "A66CFF", "F05454", "FCF8E8", "94B49F", "47B5FF", "B8FFF9", "42C2FF", "FF7396"];
    var random = job[Math.floor(Math.random() * job.length)]
    var random1 = job[Math.floor(Math.random() * job.length)]
    var random2 = job[Math.floor(Math.random() * job.length)]
    var random3 = job[Math.floor(Math.random() * job.length)]
    var random4 = job[Math.floor(Math.random() * job.length)]
    var random5 = job[Math.floor(Math.random() * job.length)]
    var random6 = job[Math.floor(Math.random() * job.length)]
    var random7 = job[Math.floor(Math.random() * job.length)]
    var random8 = job[Math.floor(Math.random() * job.length)]
    const o = global.data.threadData.get(event.threadID) || {};
    if (typeof o.console !== "undefined" && o.console == true) {
      return;
    }
    if (event.senderID == global.data.botID) {
      return;
    }
    num++
    const threadInfo = isGroup ? await api.getThreadInfo(event.threadID) : null;
    const groupName = isGroup ? threadInfo.threadName || "Nonmae" : null;
    const userName = await Users.getNameUser(event.senderID);
    const content = event.body || "Ảnh, video hoặc kí tự đặc biệt";
    const hasAttachment = event.attachments && event.attachments.length > 0;
    if (isGroup) {
      console.log(chalk.hex("#" + random5)(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`) + `\n` + chalk.hex("#" + random)(`┣[🌸]➤ Tên nhóm: ${groupName}`) + `\n` + chalk.hex("#" + random5)(`┣[🔰]➤ ID nhóm: ${event.threadID}`) + `\n` + chalk.hex("#" + random6)(`┣[👤]➤ Tên người dùng: ${userName}`) + `\n` + chalk.hex("#" + random1)(`┣[🌐]➤ ID người dùng: ${event.senderID}`) + `\n` + chalk.hex("#" + random2)(`┣[💬]➤ Nội dung: ${content}`));
if (hasAttachment) {
        const attachmentType = event.attachments[0].type;
        const attachmentTypesMap = {
          "sticker": "Nhãn dán",
          "animated_image": "Gif",
          "video": "Video",
          "photo": "Ảnh",
          "audio": "Âm thanh"
        };
        console.log(chalk.hex("#" + random3)(`┣[📎]➤ Đính kèm: ${attachmentTypesMap[attachmentType] || "Không xác định"}`));
      }
      console.log(chalk.hex("#" + random3)(`┣[⏰]➤ Thời gian: ${n}`) + `\n` + chalk.hex("#" + random7)(`┣[⏳]➤ Bot online được: ${anh} giờ ${la} phút ${mdong} giây`) + `\n` + chalk.hex("#" + random4)(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`) + `\n` + chalk.hex("#" + random8)(`======= [ Phạm Minh Đồng ] ========`));
    } else {
      console.log(chalk.hex("#" + random5)(`Nhận tin nhắn riêng:`));
      console.log(chalk.hex("#" + random2)(`Từ: ${userName} (ID: ${senderID})`));
      console.log(chalk.hex("#" + random3)(`Nội dung: ${content}`));
   if (hasAttachment) {
        const attachmentType = event.attachments[0].type;
        const attachmentTypesMap = {
          "sticker": "Nhãn dán",
          "animated_image": "Gif",
          "video": "Video",
          "photo": "Ảnh",
          "audio": "Âm thanh"
        };
        console.log(chalk.hex("#" + random3)(`┣[📎]➤ Đính kèm: ${attachmentTypesMap[attachmentType] || "Không có"}`));
      }
      console.log(chalk.hex("#" + random7)(`Thời gian: ${n}`));
    }
     timeStamp = dateNow;
 if(Date.now() - timeStamp > 1000) num = 0
 if(Date.now() - timeStamp < 1000){
 if(num >= max){
 num = 0
 disableConsole(this.config.cooldowns);
      }
    }
 } catch (e) {
 console.log(e);
    }
};
module.exports.run = async function ({
 api: a,
 args: b,
 Users: c,
 event: d,
 Threads: e,
 utils: f,
 client: g
}) {};