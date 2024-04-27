module.exports.config = {
	name: "zalgo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Converts your text to Zalgo",
	commandCategory: "game",
	usages: "zalgo <text>",
	cooldowns: 5,
  depndencies: {
    "to-zalgo": ""
  },

};

module.exports.run = ({ api, event, args }) => {
  const Zalgo = require("to-zalgo");
  return api.sendMessage(Zalgo(args.join(" ")), event.threadID, event.messageID);
}