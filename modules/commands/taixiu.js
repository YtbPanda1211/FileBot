module.exports.config = {
  name: "taixiu",
  version: "6.9.3",
  hasPermssion: 0,
  credits: "Yae Miko & Mod by DongDev",
  description: "Tài xỉu trên hệ thống Bot Zuri đa dạng nhiều kiểu",
  commandCategory: "Game",
    usages: "[tài/xỉu/b3gn/b2gn/cs/ct] [số tiền]",
    cooldowns: 5
};
const axios = require('axios');
var bdsd = true;
var tilethang = 2;
var tilethangb3dn = 10;
var tilethangb2dn = 5;
var timedelay = 2;
var haisogiong = 2;
var basogiong = 3;
var motsogiong = 1;
function replace(int){
    var str = int.toString();
    var newstr = str.replace(/(.)(?=(\d{3})+$)/g,'$1,');
    return newstr;
}
function getImage(number){
    switch (number){
      case 1: return "https://i.imgur.com/cmdORaJ.jpg";
      case 2: return "https://i.imgur.com/WNFbw4O.jpg";
      case 3: return "https://i.imgur.com/Xo6xIX2.jpg";
      case 4: return "https://i.imgur.com/NJJjlRK.jpg";
      case 5: return "https://i.imgur.com/QLixtBe.jpg";
      case 6: return "https://i.imgur.com/y8gyJYG.jpg";
    }
}
function getRATE(tong){
    if(tong == 4) var rate = 40;
    if(tong == 5) var rate = 35;
    if(tong == 6) var rate = 33.33;
    if(tong == 7) var rate = 25;
    if(tong == 8) var rate = 20;
    if(tong == 9) var rate = 16.66;
    if(tong == 10) var rate = 14.28;
    if(tong == 11) var rate = 12.5;
    if(tong == 12) var rate = 11.11;
    if(tong == 13) var rate = 10;
    if(tong == 14) var rate = 9.09;
    if(tong == 15) var rate = 8.33;
    if(tong == 16) var rate = 7.69;
    if(tong == 17) var rate = 7.14;
    return rate
}
module.exports.run = async function ({ event, api, Currencies, Users, args }) {
 try{
    const moment = require("moment-timezone");
    const format_day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss");
    const { increaseMoney , decreaseMoney } = Currencies;
    const { threadID, messageID, senderID } = event;
    var name = await Users.getNameUser(senderID);
    var money = (await Currencies.getData(event.senderID)).money;
    var bet = parseInt((args[1] == "allin" ? money : args[1]));
    var input = args[0];
    var tong = parseInt(args[2])
    if(!input) return api.sendMessage("[ ❗ ] 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗻𝗵𝗮̣̂𝗽 𝘁𝗮̀𝗶/𝘅𝗶̉𝘂/𝗯𝗼̣̂ 𝟯 𝗴𝗶𝗼̂́𝗻𝗴 𝗻𝗵𝗮𝘂/𝗯𝗼̣̂ 𝟮 𝗴𝗶𝗼̂́𝗻𝗴 𝗻𝗵𝗮𝘂/𝗰𝘂̛𝗼̛̣𝗰 𝘁𝗼̂̉𝗻𝗴/𝗰𝘂̛𝗼̛̣𝗰 𝘀𝗼̂́", threadID, messageID);
    if(!bet) return api.sendMessage("Bạn Không Đủ Tiền", threadID, messageID);
    if(bet < 1000) return api.sendMessage("[ 💸 ] 𝗕𝗮̣𝗻 𝗰𝗮̂̀𝗻 𝗰𝘂̛𝗼̛̣𝗰 𝘁𝗼̂́𝗶 𝘁𝗵𝗶𝗲̂̉𝘂 𝗹𝗮̀ 𝟭𝟬𝟬𝟬$", threadID, messageID);
    if(bet > money) return api.sendMessage("[ 💸 ] 𝗕𝗮̣𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝘁𝗶𝗲̂̀𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝘂̛𝗼̛̣𝗰", threadID, messageID);
    if(input == "tài" || input == "Tài" || input == '-t') var choose = 'tài'
    if(input == "xỉu" || input == "Xỉu" || input == '-x') var choose = 'xỉu'
    if(input == 'b3gn' || input == 'bbgn' || input == 'btgn') var choose = 'b3gn'
    if(input == 'b2gn' || input == 'bdgn' || input == 'bhgn') var choose = 'b2gn'
    if(input == 'cuoctong' || input == 'ct') var choose = 'cuoctong'
    if(input == 'cuocso' || input == 'cs') var choose = 'cuocso'
    var tag = ['tài','xỉu','b3gn','b2gn','cuoctong','cuocso']
    if(!tag.includes(choose)) return api.sendMessage('[ ❗ ] 𝗕𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝘀𝗮𝗶 𝗹𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻, 𝗵𝗮̃𝘆 𝗰𝗵𝗼̣𝗻 𝘁𝗮̀𝗶/𝘅𝗶̉𝘂/𝗯𝟯𝗴𝗻/𝗯𝟮𝗴𝗻/𝗰𝘁/𝗰𝘀', threadID, messageID)
    if(choose == 'cuoctong' && (tong < 4 || tong > 17)) return api.sendMessage("[ 💸 ] 𝗧𝗼̂̉𝗻𝗴 𝗰𝘂̛𝗼̛̣𝗰 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂", threadID, messageID);
    if(choose == 'cuocso' && (tong < 1 || tong > 6)) return api.sendMessage("[ ❗ ] 𝗦𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗼̛̣𝗽 𝗹𝗲̣̂ ?", threadID, messageID);
    const number = [], img = [], bodem = 0;
   api.sendMessage("[ 🎲 ] - Bot đang lắc...", threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 7 * 1000));
      return api.unsendMessage(info.messageID);
          }, messageID);
    for(let i = 1; i < 4; i++){
    var n = Math.floor(Math.random() * 6 + 1) 
    number.push(n)
    var img_ = (await axios.get(encodeURI(getImage(n)), { responseType: 'stream' })).data;
    img.push(img_)
     await new Promise(resolve => setTimeout(resolve, timedelay * 1000))
}
var total = number[0] + number[1] + number[2];
if(choose == 'cuocso'){
    if(number[0] == tong || number[1] == tong || number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * motsogiong
    }
    if(number[1] == tong && number[2] == tong || number[0] == tong && number[2] == tong || number[0] == tong && number[1] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * haisogiong
    }
    if(number[0] == tong && number[1] == tong && number[2] == tong){
        var ans = `${tong}`
        var result = 'win'
        var mn = bet * basogiong
    }
    if(number[0] != tong && number[1] != tong && number[2] != tong){
        var ans = `${tong}`
        var result = 'lose'
        var mn = bet
    }   
}
if(choose == 'cuoctong'){
    if(total == tong){
        var ans = "cược tổng"
        var result = 'win'
        var mn = bet * parseInt((getRATE(tong)))
    } else {
        var ans = `${total}`
        var result = 'lose'
        var mn = bet
    }
}
if(choose == 'b3gn' ){
    if(number[0] == number[1] && number[1] == number[2]) {
        var ans = "bộ ba đồng nhất"
        var result = 'win'
        var mn = bet * tilethangb3dn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
    }
}
if(choose == 'b2gn'){
    if(number[0] == number[1] || number[1] == number[2] || number[0] == number[2]) {
        var ans = "bộ hai đồng nhất"
        var result = 'win'
        var mn = bet * tilethangb2dn
    } else {
        var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
        var result = 'lose'
        var mn = bet
    }
}
if(choose == 'tài' || choose == 'xỉu') {
if(number[0] == number[1] && number[1] == number[2]){
var ans = "bộ ba đồng nhất"
} else {
var ans = (total >= 11 && total <= 18 ? "tài" : "xỉu") 
}
if(number[0] == number[1] && number[1] == number[2]) {
    var result = 'lose'
    var mn = bet
}
if(ans == choose) {
    var result = 'win'
    var mn = bet * tilethang
} else {
    var result = 'lose'
    var mn = bet
   }
}
       if(result =='lose'){
    Currencies.decreaseMoney(senderID, mn)
} else if(result == 'win'){
    Currencies.increaseMoney(senderID, mn)
}
  var msg = `=======〘 𝐊𝐄̂́𝐓 𝐐𝐔𝐀̉ 〙=======` 
            + '\n' +
            `◈ 𝐓𝐢𝐦𝐞: ${format_day}`
            + '\n' +
            `◈🧸 𝐏𝐥𝐚𝐲𝐞𝐫: ${name}`
            + '\n' +
            `◈🎲 𝐋𝐮̛̣𝐚 𝐂𝐡𝐨̣𝐧: ${choose}`
            + '\n' +
            `◈💰 𝐓𝐢𝐞̂̀𝐧 𝐂𝐮̛𝐨̛̣𝐜: ${replace(bet)}`
            + '\n' +
            `▭▭▭▭▭▭▭▭▭▭▭▭▭▭`            
            + '\n' +
            `◈🎲 𝐋𝐚̂̀𝐧 𝐋𝐚̆́𝐜 𝐓𝐡𝐮̛́ 𝟏: ${number[0]}`
            + '\n' + 
            `◈🎲 𝐋𝐚̂̀𝐧 𝐋𝐚̆́𝐜 𝐓𝐡𝐮̛́ 𝟐: ${number[1]}`
            + '\n' +
            `◈🎲 𝐋𝐚̂̀𝐧 𝐋𝐚̆́𝐜 𝐓𝐡𝐮̛́ 𝟑: ${number[2]}`
            + '\n' +
            `▭▭▭▭▭▭▭▭▭▭▭▭▭▭`
            + '\n' +
            `➾🎲 𝐁𝐨𝐭 𝐋𝐚̆́𝐜 𝐑𝐚: ${ans}`
            + '\n' +
            `➾🔎 𝐓𝐨̂̉𝐧𝐠 𝐏𝐨𝐢𝐧𝐭: ${total}`
            + '\n' +
            `➾🤑 𝐊𝐞̂́𝐭 𝐐𝐮𝐚̉: ${(result == 'win' ? 'Thắng' : 'Thua')}`
            + '\n' +
            `➾📌 𝐌𝐨𝐧𝐞𝐲: ${(result == 'win' ? '+' : '-')} ${replace(Math.floor(mn))}$`
            + '\n' +
            `➾🛎️ 𝐓𝐫𝐚̣𝐧𝐠 𝐓𝐡𝐚́𝐢: ${(result == 'win' ? 'Đã Trả Thưởng' : 'Đã Trừ Tiền')}`
         api.sendMessage({body: msg, attachment: img }, threadID, messageID);
} catch(e){
    console.log(e);
  }
}