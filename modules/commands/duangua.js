 const axios = require("axios");
module.exports.config = {
  name: "duangua",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Araxy XD",
  description: "",
  commandCategory: "Trò Chơi",
  usages: "",
  cooldowns: 5
};
module.exports.run = async ({ api, event, Threads, args, Currencies }) => {
  const { threadID, messageID, senderID } = event;
  const chose = ["đen", "đỏ", "vàng", "xanh", "hồng", "tím"]
  if (!chose.includes(args[0])) {
    return api.sendMessage('𝐁𝐚̣𝐧 𝐡𝐚̃𝐲 𝐜𝐡𝐨̣𝐧 𝐦𝐚̀𝐮 𝐜𝐮̉𝐚 𝐜𝐨𝐧 𝐧𝐠𝐮̛̣𝐚 𝐦𝐚̀ 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐜𝐮̛𝐨̛̣𝐜 🐎:\n[đen, đỏ, vàng, xanh, hồng, tím]', threadID, messageID)
  } else {
    const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
    if (moneyUser < 100) {
      return api.sendMessage('số tiền của bạn không đủ 100 để chơi', threadID, messageID)
    } else if (moneyUser < args[1]) {
      return api.sendMessage(`số tiền của bạn không đủ để chơi`, threadID, messageID)
    }
    var z = chose[Math.floor(Math.random() * chose.length)]
    const sotien = args[1]
      let imag = (await axios.get("https://i.imgur.com/6qfheJp.gif", {
        responseType: "stream"
      })).data;
  var msg = { body: 'Vui Lòng Chờ Kết Quả',
attachment: imag 
}
    api.sendMessage(msg, event.threadID, async (err, info) => {
      await new Promise(resolve => setTimeout(resolve, 5 * 1000));
    if (z == args[0]) {
      await Currencies.increaseMoney(senderID, parseInt(sotien * 2));
      return api.sendMessage(`bạn đã thắng với con ngựa ${args[0]} và nhận được số tiền ${sotien * 2}`, threadID, messageID)
    } else {
      await Currencies.decreaseMoney(senderID, parseInt(sotien));
      return api.sendMessage(`bạn đã thua và con ngựa ${z} về trước và mất số tiền ${sotien}`, threadID, messageID)
    }
  })
}
}
 