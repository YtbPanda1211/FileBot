module.exports.config = {
  name: "chuyentien",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "MAVERICK",
  description: "Chuyển tiền của bản thân cho ai đó",
  commandCategory: "Box chat",
  usages: "pay @tag coins",
  cooldowns: 5,
};

module.exports.run = async ({ event, api, Currencies, args, Users }) => {
  let { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions)[0];
  if (!mention && event.messageReply) {
    if (isNaN(args[0]) == true) return api.sendMessage(`🌸𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗯𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝟭 𝗰𝗼𝗻 𝘀𝗼̂́ 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂!!🌸`, threadID, messageID);
    const coins = parseInt(args[0]);
    let balance = (await Currencies.getData(senderID)).money;
    const namePay = await Users.getNameUser(event.messageReply.senderID);
    if (coins > balance) return api.sendMessage(`🌸𝗦𝗼̂́ 𝗰𝗼𝗶𝗻𝘀 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗹𝗼̛́𝗻 𝗵𝗼̛𝗻 𝘀𝗼̂́ 𝗰𝗼𝗶𝗻𝘀 𝗯𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́!🌸`, threadID, messageID);
    return api.sendMessage({ body: '🌸Đ𝗮̃ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗰𝗵𝗼 ' + namePay + ` ${args[0]} 𝗖𝗼𝗶𝗻𝘀` }, threadID, async () => {
      await Currencies.increaseMoney(event.messageReply.senderID, coins);
      Currencies.decreaseMoney(senderID, coins)
    }, messageID);
  }
  let name = event.mentions[mention].split(" ").length
  if (!mention || !event.messageReply) return api.sendMessage('🌸𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗮𝗴 𝗵𝗼𝗮̣̆𝗰 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗰𝗼𝗶𝗻𝘀 𝗰𝗵𝗼🌸', threadID, messageID);
  else {
    if (!isNaN(args[0 + name])) {
      const coins = parseInt(args[0 + name]);
      let balance = (await Currencies.getData(senderID)).money;
      if (event.type == "message_reply") { mention[0] = event.messageReply.senderID }
      if (coins <= 0) return api.sendMessage('🌸𝗦𝗼̂́ 𝗰𝗼𝗶𝗻𝘀 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂🌸', threadID, messageID);
      if (coins > balance) return api.sendMessage('🌸𝗦𝗼̂́ 𝗰𝗼𝗶𝗻𝘀 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗹𝗼̛́𝗻 𝗵𝗼̛𝗻 𝘀𝗼̂́ 𝗰𝗼𝗶𝗻𝘀 𝗯𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́!🌸', threadID, messageID);
      else {
        return api.sendMessage({ body: '🌸Đ𝗮̃ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗰𝗵𝗼' + event.mentions[mention].replace(/@/g, "") + ` ${args[0 + name]} coins` }, threadID, async () => {
          await Currencies.increaseMoney(mention, coins);
          Currencies.decreaseMoney(senderID, coins)
        }, messageID);
      }
    } else return api.sendMessage('🌸𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗺𝘂𝗼̂́𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗰𝗵𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗵𝗮́𝗰🌸', threadID, messageID);
  }
}
