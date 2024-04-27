module.exports.config = {
  name: "cu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Thắng",
  description: "Random ảnh ciu to :v",
  commandCategory: "Lệnh 18+",
  usages: "cu",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/mIeyUij.jpg",
"https://i.imgur.com/eqdjsGw.jpg",
"https://i.imgur.com/dLxGG94.jpg",
"https://i.imgur.com/aN6inBt.jpg",
"https://i.imgur.com/hw7pXD2.jpg",
"https://i.imgur.com/K8ciUTu.jpg",
"https://i.imgur.com/8Z6o1pD.jpg",
"https://i.imgur.com/rHttDOf.jpg",
"https://i.imgur.com/YNlPJM3.jpg",
"https://i.imgur.com/zC9fSQb.jpg",
"https://i.imgur.com/CCzJ7Ed.jpg",
"https://i.imgur.com/qC4Up3F.jpg",
"https://i.imgur.com/YS3dXlP.jpg",
"https://i.imgur.com/ytxWrmJ.jpg",
"https://i.imgur.com/tRc1XT3.jpg",
"https://i.imgur.com/Zp4txBx.jpg",
"https://i.imgur.com/KJMP3WL.jpg",
"https://i.imgur.com/L0jLnr3.jpg",
"https://i.imgur.com/vOBZwmb.jpg",
"https://i.imgur.com/lrVrlZb.jpg",
"https://i.imgur.com/4Hv2MHa.jpg",
"https://i.imgur.com/ONKyUTW.jpg",
"https://i.imgur.com/IQaANze.jpg",
"https://i.imgur.com/HI5fxMF.jpg",
"https://i.imgur.com/G0PZP0q.jpg",
"https://i.imgur.com/QVI0kDx.jpg",
"https://i.imgur.com/1jy8Pg6.jpg",
"https://i.imgur.com/0QiD6Bh.jpg",
"https://i.imgur.com/5DyoUid.jpg",
"https://i.imgur.com/Z9BtRCM.jpg",
"https://i.imgur.com/yHcBwow.jpg",
"https://i.imgur.com/1UdfG0k.png",
"https://i.imgur.com/DgXJCc8.jpg",
"https://i.imgur.com/Y5fXxyg.jpg",
"https://i.imgur.com/64FWN7D.jpg",
"https://i.imgur.com/q6KQiEU.jpg",
"https://i.imgur.com/lmLouxB.jpg",
     ];
     var callback = () => api.sendMessage({body:`𝗕𝗼̂́ 𝗧𝗶𝗲̂𝗻 𝗦𝘂̛, 𝗖𝗼𝗻 𝗚𝗮́𝗶 𝗠𝗮̀ 𝗗𝗮̂𝗺 𝗖𝗵𝘂́𝗮 😤`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };