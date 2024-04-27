const fs = require("fs-extra");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "DongDev",
  description: "goibot",
  commandCategory: "Hệ thống",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event, args, Threads }) {
  const { threadID, messageID, reason } = event;
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss | DD/MM/YYYY");
  const idgr = `${event.threadID}`;
  let streamURL = (url, ext = 'jpg') => require('axios').get(url, { responseType: 'stream', }).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);
  if (
    event.body.toLowerCase() === "hetcuu" ||
    event.body.toLowerCase() === "Hetcuu" ||
    event.body.toLowerCase() === "hết cứu" ||
    event.body.toLowerCase() === "Hết cứu"
  ) {
  const url = 'https://files.catbox.moe/6cvr18.false';
 /* axios.get("https://files.catbox.moe/6cvr18.false", { responseType: "stream" })
      .then(response => {
        const voice = response.data;*/
        api.sendMessage({ body: "", attachment: await streamURL(url, 'mp3')}, threadID);
     // });
  }
};

module.exports.run = function () {};