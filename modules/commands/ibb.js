const axios = require("axios");
const fs = require("fs");

function stringify(obj, t) {
  let box = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let a = t ? t + "[" + i + "]" : i;
      let n = obj[i];
      let enc = typeof n === 'object' && n !== null ? stringify(n, a) : encodeURIComponent(a) + "=" + encodeURIComponent(n);
      box.push(enc);
    }
  }
  return box.join("&");
}

function regAuthToken() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://vi.imgbb.com/',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
    })
      .then((res) => res.data)
      .then((res) => {
        resolve(/\.obj\.config\.auth_token="(\w+)";/g.exec(res)[1]);
      })
      .catch(reject);
  });
}

function imgbbCreateURL(url) {
  return new Promise((resolve, reject) => {
    regAuthToken()
      .then((token) => {
        axios({
          method: "POST",
          url: "https://imgbb.com/json",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
          },
          data: stringify({
            source: url,
            type: "url",
            action: "upload",
            timestamp: Date.now(),
            auth_token: token
          })
        })
          .then((res) => res.data)
          .then((res) => {
            resolve(res.image.url);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

module.exports.config = {
  name: "ibb",
  version: "1.0.0",
  hasPermission: 0,
  description: "lấy url imgbb trên message",
  credits: "Sam",
  commandCategory: "Tiện ích",
  usages: "[reply]",
  cooldowns: 5,
  images: [],
  usePrefix: false,
};

module.exports.run = async ({ api, event }) => {
  const { type, messageReply, threadID } = event;
  let msg = "";

  try {
    if (type === "message_reply") {
      if (messageReply.attachments.length < 1) {
        msg += "Vui lòng chỉ reply ảnh";
      } else {
        for (let obj of messageReply.attachments) {
          var imgbbURL = (obj.type === "photo" || obj.type === "animated_image") ? await imgbbCreateURL(obj.url) : "[Function: imgbbError]";
          msg += `"${imgbbURL}",\n`;
        }
      }
    } else {
      msg += "Vui lòng reply ảnh";
    }

    await api.sendMessage(msg, event.threadID, event.messageID);
  } catch (e) {
    console.log(e);
    await api.sendMessage(`Đã xảy ra lỗi\n${e}`, threadID);
  }
};
