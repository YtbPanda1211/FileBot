module.exports.config = {
  name: "trai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Thắng",
  description: "Random ảnh trai",
  commandCategory: "Random-Ảnh/video",
  usages: "trai",
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
"https://i.imgur.com/RugqIsE.jpg",
"https://i.imgur.com/Zg8gCRi.jpg",
"https://i.imgur.com/QSOo3hN.jpg",
"https://i.imgur.com/Q12izpx.jpg",
"https://i.imgur.com/4pa7ThF.jpg",
"https://i.imgur.com/gmZQoqe.jpg",
"https://i.imgur.com/g2HOtF6.jpg",
"https://i.imgur.com/yl7A6Ns.jpg",
"https://i.imgur.com/eaDOZnC.jpg",
"https://i.imgur.com/VFspbfW.jpg",
"https://i.imgur.com/RP1tpFz.jpg",
"https://i.imgur.com/cJErkOY.jpg",
"https://i.imgur.com/fOaL1RC.jpg",
"https://i.imgur.com/mDrBofk.jpg",
"https://i.imgur.com/ffu0IQV.jpg",
"https://i.imgur.com/xkoPbyl.jpg",
"https://i.imgur.com/uQ30ady.jpg",
"https://i.imgur.com/QPIce66.jpg",
"https://i.imgur.com/gH0Qwte.jpg",
"https://i.imgur.com/eoVIliQ.jpg",
"https://i.imgur.com/jCOlQPw.jpg",
"https://i.imgur.com/3wOuBgV.jpg",
"https://i.imgur.com/Cl64w7g.jpg",
"https://i.imgur.com/vi90Mtb.jpg",
"https://i.imgur.com/7QeSlYO.jpg",
"https://i.imgur.com/khII2UE.jpg",
"https://i.imgur.com/VrNREYM.jpg",
"https://i.imgur.com/pmLUEcX.jpg",
"https://i.imgur.com/blDv1A2.jpg",
"https://i.imgur.com/1j8CNAM.jpg",
"https://i.imgur.com/3oPVFG3.jpg",
"https://i.imgur.com/qPSJTEF.jpg",
"https://i.imgur.com/MvjXMnC.jpg",
"https://i.imgur.com/jcQJvuY.jpg",
"https://i.imgur.com/okvL0Ly.jpg",
"https://i.imgur.com/AmY8uZH.jpg",
"https://i.imgur.com/WIbcx59.jpg",
"https://i.imgur.com/J0fqMYW.jpg",
"https://i.imgur.com/RSNmZDW.jpg",
"https://i.imgur.com/m8bCWJR.jpg",
"https://i.imgur.com/txI312W.jpg",
"https://i.imgur.com/pwa9Qxj.jpg",
"https://i.imgur.com/hutrUcx.jpg",
"https://i.imgur.com/GOuzwUe.jpg",
"https://i.imgur.com/LYkV9VF.jpg",
"https://i.imgur.com/ufFpS22.jpg",
"https://i.imgur.com/HnBfMR0.jpg",
     ];
     var callback = () => api.sendMessage({body:`𝗕𝗼̛́𝘁 𝗠𝗲̂ 𝗧𝗿𝗮𝗶 𝗟𝗮̣𝗶 -.-`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };