module.exports.config = {
  name: "tamtrang",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Thắng",
  description: "Random ảnh question sad",
  commandCategory: "Random-Ảnh/video",
  usages: "tamtrang",
  cooldowns: 5,
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
"https://i.imgur.com/YD2rtpL.jpg",
"https://i.imgur.com/dcBC5iB.jpg",
"https://i.imgur.com/8HyUx6i.jpg",
"https://i.imgur.com/Ma0IpQo.jpg",
"https://i.imgur.com/qoNlrLo.jpg",
"https://i.imgur.com/ZdPKqtS.jpg",
"https://i.imgur.com/DpqOXYY.jpg",
"https://i.imgur.com/Bp3k8iv.jpg",
"https://i.imgur.com/jrH2g0F.jpg",
"https://i.imgur.com/8fTAuER.jpg",
"https://i.imgur.com/iKbOTR7.jpg",
"https://i.imgur.com/ojSRtrj.jpg",
"https://i.imgur.com/s4NhRMB.jpg",
"https://i.imgur.com/OMSQXot.jpg",
"https://i.imgur.com/P8ECrlW.jpg",
"https://i.imgur.com/kEW9Pcd.jpg",
"https://i.imgur.com/m2ZIC8d.jpg",
"https://i.imgur.com/fXS298p.jpg",
"https://i.imgur.com/Q4vS4il.jpg",
     ];
     var callback = () => api.sendMessage({body:`Đến một lúc nào đó, em không còn là thế giới của anh 💔`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };