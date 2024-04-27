const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const endPointMyApi = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/crawl`;
const emojiToSendMessage = "❤";
const emojiToPushApi = "👍";

module.exports.config = {
  name: "crawl",
  credits: "NTKhang",
  hasPermission: 2,
  description: "Nhập/crawl dữ liệu từ một API",
  usages: "< số lần > < key1,key2... > < filename > < url >",
  commandCategory: "Hệ thống",
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;

  try {
    let [limit, key, fileName, url] = args;
    if (!limit || !key || !fileName || !url)
      return api.sendMessage("[ 𝗖𝗥𝗔𝗪𝗟𝗦 ] - Sai cú pháp", threadID, messageID);

    const folderName = path.dirname(fileName);
    fileName = path.basename(fileName);

    if (isNaN(limit))
      return api.sendMessage("[ 𝗖𝗥𝗔𝗪𝗟𝗦 ] - Giới hạn phải là số", threadID, messageID);

    url = url.replace(/,/g, ".");
    const pendings = Array.from({ length: limit }, () => axios.get(url));
    const data = await Promise.allSettled(pendings);

    let success = 0;
    let failed = 0;
    let newData = [];
    
    const keys = key.split(',');
    const firstKey = keys[0];

    for (const item of data) {
      if (item.status === "fulfilled") {
        const value = keys.reduce((acc, k) => {
          acc[k] = item.value.data[k];
          return acc;
        }, {});

        if (newData.some(e => e[firstKey] === value[firstKey])) {
          success++;
          continue;
        }

        success++;
        newData.push(value);
      } else {
        failed++;
      }
    }

    if (keys.length === 1)
      newData = newData.map(e => e[firstKey]);

    const msg = `🖨=== [ 𝐂𝐀̀𝐎 𝐃𝐀𝐓𝐀 ] ===🖨\n━━━━━━━━━━━━━━\n\n✅ 𝗧𝗵𝘂̛̣𝗰 𝗵𝗶𝗲̂𝗻 𝗰𝗮̀𝗼 𝗱𝗮𝘁𝗮 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n📌 𝗔𝗱𝗱: ${newData.length}\n🔥 𝗧𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴: ${success}\n❌ 𝗧𝗵𝗮̂́𝘁 𝗯𝗮̣𝗶: ${failed}\n📝 𝗥𝗲𝗮𝗰𝘁𝗶𝗼𝗻 "${emojiToSendMessage}" 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗴𝘂̛̉𝗶 𝗳𝗶𝗹𝗲 𝘃𝗲̂̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗿𝗶𝗲̂𝗻𝗴 𝗵𝗼𝗮̣̆𝗰 "${emojiToPushApi}" 𝗻𝗲̂́𝘂 𝗽𝘂𝘀𝗵 𝘃𝗮̀𝗼 𝗔𝗣𝗜`;
    
    return api.sendMessage(msg, threadID, async (err, info) => {
      global.client.handleReaction.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: senderID,
        data: newData,
        fileName,
        folderName
      });
    }, messageID);
  } catch (e) {
    console.log(e);
    return api.sendMessage("Có lỗi xảy ra khi thực hiện lệnh", threadID, messageID);
  }
};

module.exports.handleReaction = async ({ api, event, handleReaction }) => {
  const { fileName, folderName, author, data } = handleReaction;

  if (event.userID !== author) return;

  if (event.reaction === emojiToSendMessage) {
    try {
      const runMockyResponse = await axios.post("https://api.mocky.io/api/mock", {
        status: 200,
        content: data,
        content_type: "application/javascript",
        charset: "UTF-8",
        secret: "PhamMinhDong",
        expiration: "never"
      });

      const successMessage = `📝 𝗙𝗶𝗹𝗲 ${runMockyResponse.data.link} 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗻𝗲̀`;
      
      api.sendMessage(successMessage, event.userID, (err) => {
        if (err) {
          console.log(err);
          const errorMessage = "[ 𝗖𝗥𝗔𝗪𝗟𝗦 ] - Có lỗi xảy ra";
          api.sendMessage(errorMessage, event.threadID, event.messageID);
        } else {
          const continueMessage = `📝 𝗚𝘂̛̉𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗳𝗶𝗹𝗲 𝘃𝗲̂̀ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗿𝗶𝗲̂𝗻𝗴`;
          api.sendMessage(continueMessage, event.threadID, event.messageID);
        }
      });
    } catch (error) {
      console.log(error);
      const errorMessage = "[ 𝗖𝗥𝗔𝗪𝗟𝗦 ] - Có lỗi xảy ra";
      api.sendMessage(errorMessage, event.threadID, event.messageID);
    }
  } else if (event.reaction === emojiToPushApi) {
    try {
      await axios({
        url: endPointMyApi,
        method: "POST",
        data: {
          content: JSON.stringify(data, null, 2),
          folder: folderName,
          fileName
        }
      });

      const successMessage = "✅ 𝗣𝘂𝘀𝗵 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗱𝗮𝘁𝗮 𝘃𝗮̀𝗼 𝗔𝗣𝗜";
      api.sendMessage(successMessage, event.threadID, event.messageID);
    } catch (e) {
      console.log(e);
      const errorMessage = "❌ 𝗫𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗸𝗵𝗶 𝗽𝘂𝘀𝗵 𝗱𝗮𝘁𝗮 𝘃𝗮̀𝗼 𝗔𝗣𝗜";
      api.sendMessage(errorMessage, event.threadID, event.messageID);
    }
  }
};
