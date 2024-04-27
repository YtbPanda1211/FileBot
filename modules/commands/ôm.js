const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "ôm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hải harin",
  description: "ôm người Bạn Muốn",
  commandCategory: "game",
  usages: "@tag",
  cooldowns: 5,
  dependencies: {"request": "","fs": "","axios": ""}
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
        const request = require('request')
                const fs = require('fs')
                  var mention = Object.keys(event.mentions)[0];
let tag = event.mentions[mention].replace("@", "");
        var link = [
          "https://i.imgur.com/IyjnH5d.gif",
             ];
   var callback = () => api.sendMessage({body: `${tag} ‎𝗢̂𝗺𝗺 𝗺𝘂̣𝘁 𝗰𝗮́𝗶 𝗻𝗲̀ 💓` , mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
  attachment: fs.createReadStream(__dirname + "/noprefix/ôm.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/noprefix/ôm.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/noprefix/ôm.gif")).on("close",() => callback());
   };