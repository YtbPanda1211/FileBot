module.exports.config = {
 name: 'vdcos',
 version: '1.0.0',
 credits: 'DongDev',
 hasPermssion: 0,
 description: 'Xem video gái cosplay tiktok',
 commandCategory: 'Tiện ích',
 usages: 'vdcosplay',
 cooldowns: 10,
 usePrefix: false,
};

module.exports.run = async ({ api, event, Users, Threads, Currencies }) => {
try {
 var { threadID, messageID } = event;
 const { increaseMoney , decreaseMoney } = Currencies;
 const urlAPI = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
 const apiKey = "DongDevVip_1572349423";
 const axios = require('axios');
 const name = await Users.getNameUser(event.senderID);
 let uid = event.senderID;
 let $ = 500;
 let money = (await Currencies.getData(event.senderID)).money;
 if(money < $) return api.sendMessage(`❎ ${name} cần ${$}$ để xem video, vui lòng thử lại sau!`, event.threadID, event.messageID);
 Currencies.decreaseMoney(event.senderID, $);
 return api.sendMessage({body:``, attachment: (await axios({ url: (await axios(`${urlAPI}/images/vdcosplay?apikey=${apiKey}`)).data.data,
   method: "GET",
   responseType: "stream" })).data }, event.threadID, event.messageID);
} catch (error) {
   console.log(error);
 return api.sendMessage("❎ Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", event.threadID, event.messageID);
   }
};