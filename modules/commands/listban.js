module.exports.config = {
  name: "listban",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ManhG",
  description: "Xem danh sách ban của nhóm hoặc của người dùng",
  commandCategory: "Admin",
  usages: "[thread/user]",
  cooldowns: 5,
  images: [],
};
module.exports.handleReply = async function ({ api, args, Users, handleReply, event, Threads }) {
  const { threadID, messageID } = event;
  let name = await Users.getNameUser(event.senderID);
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  switch (handleReply.type) {
    case "unbanthread":
      {
        var arrnum = event.body.split(" ");
        var msg = "";
        var uidS = "";
        var strS = "";
        var modules = "===== [ UNBAN THREAD ] =====\n──────────────────\n"
        var nums = arrnum.map(n => parseInt(n));
        for (let num of nums) {
          var myString = handleReply.listBanned[num - 1];
          var str = myString.slice(3);
          let uidK = myString.split(":");
          const uid = (uidK[uidK.length - 1]).trim();

          const data = (await Threads.getData(uid)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Threads.setData(uid, { data });
          var typef = global.data.threadBanned.delete(uid, 1);
          msg += typef + ' ' + myString + "\n";
          uidS += ' ' + uid + "\n";
          strS += ' ' + str + "\n";
        }
        //console.log(modules, msg);
        api.sendMessage(`=== [ Thông Báo Từ Admin ] ===\n──────────────────\n📌 Thông báo từ Admin ${name}\n🔎 Nhóm: ${strS} vừa được gỡ ban\n\n📜 Có thể sử dụng bot ngay bây giờ`, uidS, () =>
          api.sendMessage(`${global.data.botID}`, () =>
            api.sendMessage(`📌 Thực thi unban [true/false]\n──────────────────\n\n${msg}`, event.threadID, () =>
              api.unsendMessage(handleReply.messageID))));
      }
      break;

    case 'unbanuser':
      {
        var arrnum = event.body.split(" ");
        var msg = "";
        var uidS = "";
        var strS = "";
        var modules = "===== [ UNBAN USER ] =====\n──────────────────\n"
        var nums = arrnum.map(n => parseInt(n));

        for (let num of nums) {
          var myString = handleReply.listBanned[num - 1];
          var str = myString.slice(3);
          let uidK = myString.split(":");
          const uid = (uidK[uidK.length - 1]).trim();

          const data = (await Users.getData(uid)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(uid, { data });
          var typef = global.data.userBanned.delete(uid, 1);
          msg += typef + ' ' + myString + "\n";
          uidS += ' ' + uid + "\n";
          strS += ' ' + str + "\n";

        }
        api.sendMessage(`📌 Thực thi unban [true/false]\n──────────────────\n\n${msg}`, event.threadID, () =>
          api.unsendMessage(handleReply.messageID));
      }
      break;
  }
};

module.exports.run = async function ({ event, api, Users, args, Threads }) {
  const { threadID, messageID } = event;
  var listBanned = [], listbanViews = [];
  i = 1, j = 1;
  var dataThread = [];
  switch (args[0]) {
    case "thread":
    case "t":
    case "-t":
      {
        const threadBanned = global.data.threadBanned.keys();
 for (const singleThread of threadBanned) {
          const nameT = await global.data.threadInfo.get(singleThread).threadName || "Tên không tồn tại";
          const reason = await global.data.threadBanned.get(singleThread).reason;
          const date = await global.data.threadBanned.get(singleThread).dateAdded;
          var modules = "ThreadBan: "
          listBanned.push(`${i++}. ${nameT}\n🔰 TID: ${singleThread}`);
          
          listbanViews.push(`${j++}. ${nameT}\n🔰 TID: ${singleThread}\n📋 Lí do: ${reason}\n⏰ Time ban: ${date}`);
          
        };

        return api.sendMessage(listbanViews.length != 0 ? api.sendMessage(`=== [ LISTBAN THREAD ] ===\n──────────────────\n📝 Hiện tại gồm có ${listbanViews.length} nhóm bị ban\n\n${listbanViews.join("\n\n")}`+"\n\n📌 Reply (phản hồi) tin nhắn này + số thứ tự, có thể rep nhiều số, cách nhau bằng dấu cách nếu muốn unban thread tương ứng", threadID, (error, info) => {
            client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: 'unbanthread',
              listBanned
            });
          },
          messageID
        ) : "Không có nhóm nào bị ban 😻", threadID, messageID);
      }
    case "user":
    case "u":
    case "-u":
      {
        const userBanned = global.data.userBanned.keys();
        var modules = "UserBan: "
 for (const singleUser of userBanned) {
          const name = global.data.userName.get(singleUser) || await Users.getNameUser(singleUser);

          const reason = await global.data.userBanned.get(singleUser).reason;
          const date = await global.data.userBanned.get(singleUser).dateAdded;

          listbanViews.push(`${i++}. ${name} \n🔰 UID: ${singleUser}\n📋 Lí do: ${reason}\n⏰ Time ban: ${date}`);

          listBanned.push(`${j++}. ${name} \n📌 UID: ${singleUser}`);
    }
        return api.sendMessage(listbanViews.length != 0 ? api.sendMessage(`=== [ LISTBAN USER ] ===\n──────────────────\n📝 Hiện tại có ${listbanViews.length} người dùng bị ban\n\n${listbanViews.join("\n\n")}`+"\n\n📌 Reply (phản hồi) tin nhắn này + số thứ tự, có thể rep nhiều số, cách nhau bằng dấu cách nếu muốn unban user tương ứng",
          threadID, (error, info) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: 'unbanuser',
              listBanned
            });
          },
          messageID
        ) : "Không có người dùng bị ban 😻", threadID, messageID);
      }

    default:
      {
        return global.utils.throwError(this.config.name, threadID, messageID);
      }
  }
}