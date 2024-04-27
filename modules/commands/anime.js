module.exports.config = {
 name: 'anime',
 version: '1.0.0',
 credits: 'DongDev',
 hasPermssion: 0,
 description: 'Xem ảnh anime',
 commandCategory: 'Tiện ích',
 usages: 'anime',
 cooldowns: 10,
 usePrefix: false,
};

module.exports.run = async ({ api, event, Users, Currencies }) => {
 try {
 const { threadID } = event;
 const { decreaseMoney } = Currencies;
 const urlAPI = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
 const apiKey = "DongDevVip_1572349423";
 const axios = require('axios');
 const name = await Users.getNameUser(event.senderID);
 var so = ["1","2","3","4","5","6"];
  const dongdev = so[Math.floor(Math.random() * so.length)];
  const imageUrls = await Promise.all(
Array.from({ length: parseInt(dongdev) }, async () => {
  const res = await axios.get(`${urlAPI}/images/anime?apikey=${apiKey}`);
  return res.data.data;
}));
const img = await Promise.all(
imageUrls.map(async (url) => {
  return (await axios({
    url,
    method: "GET",
    responseType: "stream"
  })).data;
}));
 const cost = 500;
 let money = (await Currencies.getData(event.senderID)).money;

 if (money < cost) {
 return api.sendMessage(`❎ ${name} cần ${cost}$ để xem ảnh, vui lòng thử lại sau!`, event.threadID, event.messageID);
 }
 decreaseMoney(event.senderID, cost);
 return api.sendMessage({ body: ``, attachment: img }, event.threadID, event.messageID);
 } catch (error) {
 console.log(error);
 return api.sendMessage("❎ Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", event.threadID, event.messageID);
 }
};