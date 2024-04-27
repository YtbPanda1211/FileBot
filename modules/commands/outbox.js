module.exports.config = {
  name: "outbox",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "DũngUwU",
  description: "out box",
  commandCategory: "Hệ Thống",
  usages: "[tid]",
  cooldowns: 10,
  usePrefix: false
};

module.exports.run = async function({ api, event, args }) {
  const permission = ["100068096370437"];
  if (!permission.includes(event.senderID))
  return api.sendMessage("Co con cac", event.threadID, event.messageID);
  var id;
  if (!args.join(" ")) {
    id = event.threadID;
  } else {
    id = parseInt(args.join(" "));
  }
  return api.setMessageReaction("☑️", event.messageID, (err) => {}, true)
api.removeUserFromGroup(api.getCurrentUserID(), id)
}