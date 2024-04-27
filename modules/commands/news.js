module.exports.config = {
 name: "news",
 version: "1.0.1",
 hasPermission: 0,
 credits: "Mirai Team",
 description: "Tin tức trên vnexpress.net",
 commandCategory: "Tiện ích",
 usages: "[từ khóa]",
 cooldowns: 5,
 usePrefix: false,
 dependencies: {
 "axios": "",
 "cheerio": "",
 "https": ""
    }
};

module.exports.run = async function({ api, event, args }) {
 const axios = require("axios");
 const https = require("https");
 const cheerio = require("cheerio");
 let url = "https://timkiem.vnexpress.net/?q=";
 const q = args.join(" ");
 if (!q) return api.sendMessage(`Hãy nhập từ khóa bạn muốn tìm kiếm`, event.threadID, event.messageID);

 function certificate({ url }) {
 return new Promise(async function(resolve, reject) {
 try {
 const data = (await axios({
   url: url,
   method: "GET",
   headers: {
 'Content-Type': 'application/json'
 },
   responseType: "",
   httpsAgent: new https.Agent({
     rejectUnauthorized: false 
      })
 })).data;
 resolve(data);
     } catch (e) {
 reject(e);
          }
     });
 }

 url = url + encodeURIComponent(q);
 const data = await certificate({ url });
 const $ = cheerio.load(data);

 if (!$('h3.title-news').eq(0).text()) return api.sendMessage(`Không có kết quả nào với từ khóa của bạn`, event.threadID, event.messageID);
 for (let e = 0; e < 3; e++) {
 const title = JSON.stringify($('h3.title-news').eq(e).text()).replace(/\\n|\\t|\"/g, "");
 const desc = $('p.description').eq(e).text();
 const link = $('h3.title-news a').eq(e).attr('href');
api.sendMessage(`${title}\n\n${desc}\n${link}`, event.threadID, event.messageID);
 await new Promise(resolve => setTimeout(resolve, 1000));
    }
};