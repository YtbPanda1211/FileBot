module.exports.config = {
  name: "ctn",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DongDev",
  description: "",
  commandCategory: "Tìm kiếm",
  usages: "[]",
  cooldowns: 0,
  usePrefix: false,
};
module.exports.run = async function ({ api:p, event:e }) {
 p.sendMessage(`Nếu mà em quá hoàn hảo thì trong gói hảo hảo đã có tôm!!\nFrom: không nói cũng biết`, e.threadID);
  }