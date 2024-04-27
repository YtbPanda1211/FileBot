/*
 - Module made by litch-san.
 - No edit credits.
 - Đừng cố decode !
 */
module.exports.config = {
    name: "slot",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "litch-san and thanh of PhanDuy",
    description: "Đánh bạc bằng hình thức hoa quả",
    commandCategory: "Game",
    usages: "slot [nho/dưa/táo/777/dâu/đào] + số tiền cược lưu ý số tiền cược phải trên 50$",
    cooldowns: 5,
  };

 module.exports.run = async function({ api, event, args, Currencies, getText, permssion }) {
    try {
      const { threadID, messageID, senderID } = event;
      const { getData, increaseMoney, decreaseMoney } = Currencies;
      const request = require('request');
      const axios = require('axios');
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
      const slotItems = ["nho", "duahau", "tao", "777", "dau","dao"];
      const money = (await getData(senderID)).money;
      if (isNaN(args[1]) == true) return api.sendMessage(`❎ Số cược mà bạn nhập phải là 1 con số hợp lệ\nVí dụ: ${global.config.PREFIX}${this.config.name} dưa 100`, threadID, messageID);
      var moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 50) return api.sendMessage('❎ Số tiền đặt cược không được dưới 50$', threadID, messageID);
      if (moneyBet > money) return api.sendMessage('❎ Bạn không đủ tiền', threadID, messageID);
      var number = [], list = [], listimg = [], win = false;
      var slot1 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var slot2 = slotItems[Math.floor(Math.random() * slotItems.length)];
      var slot3 = slotItems[Math.floor(Math.random() * slotItems.length)];
      // ARGS
      let content = args[0];
      var content1;
      if (content =='nho' || content == '🍇') {
        content1 = 'nho';
      }
      else if (content =='dưa' || content == "🍉" ) {
        content1 = 'duahau';
      }
      else if (content =='táo' || content =='🍏') {
        content1 = 'tao';
      }
      else if (content =='777' || content =='➐') {
        content1 = '777';
      }
      else if (content =='dâu' || content =='🍓') {
        content1 = 'dau';
      }
      else if (content =='đào' || content =='🍑') {
        content1 = 'dao';
      }
      else {
        return api.sendMessage(`❎ Số cược mà bạn nhập phải là 1 con số hợp lệ\nVí dụ: ${global.config.PREFIX}${this.config.name} dưa 100`, threadID, messageID);
      }
      // request
      if (!existsSync(__dirname + '/cache/777.jpg')) {
        request('https://i.imgur.com/GEhZME2.jpg').pipe(createWriteStream(__dirname + '/cache/777.jpg'));
      }
      if (!existsSync(__dirname + '/cache/dao.jpg')) {
        request('https://i.imgur.com/LJ5cQ2c.jpg').pipe(createWriteStream(__dirname + '/cache/dao.jpg'));
      }
      if (!existsSync(__dirname + '/cache/dau.jpg')) {
        request('https://i.imgur.com/nvo1y4M.jpg').pipe(createWriteStream(__dirname + '/cache/dau.jpg'));
      }
      if (!existsSync(__dirname + '/cache/duahau.jpg')) {
        request('https://i.imgur.com/h0zgZAC.jpg').pipe(createWriteStream(__dirname + '/cache/duahau.jpg'));
      }
      if (!existsSync(__dirname + '/cache/nho.jpg')) {
        request('https://i.imgur.com/cWvSVtu.jpg').pipe(createWriteStream(__dirname + '/cache/nho.jpg'));
      }
      if (!existsSync(__dirname + '/cache/tao.jpg')) {
        request('https://i.imgur.com/ZwnjAuf.jpg').pipe(createWriteStream(__dirname + '/cache/tao.jpg'));
      }
      if (!existsSync(__dirname + '/cache/slot.gif')) {
        request('https://i.imgur.com/Gt44LD7.gif').pipe(createWriteStream(__dirname + '/cache/slot.gif'));
      }
      //icon
      // slot 1
      if (slot1 == 'nho') {
        var slot1 = 'nho';
        var slot_1 = __dirname + '/cache/nho.jpg';
      }
      else if (slot1 == 'dưahấu') {
        var slot1 = 'duahau';
        var slot_1 = __dirname + '/cache/duahau.jpg';
      }
      else if (slot1 == 'táo') {
        var slot1 = 'tao';
        var slot_1 = __dirname + '/cache/tao.jpg';
      }
      else if (slot1 == '777') {
        var slot1 = '777';
        var slot_1 = __dirname + '/cache/777.jpg';
      }
      else if (slot1 == 'dâu') {
        var slot1 = 'dau';
        var slot_1 = __dirname + '/cache/dau.jpg';
      }
      else if (slot1 == 'đào') {
        var slot1 = 'dao';
        var slot_1 = __dirname + '/cache/dao.jpg';
      }
      // slot 2
      if (slot2 == 'nho') {
        var slot2 = 'nho';
        var slot_2 = __dirname + '/cache/nho.jpg';
      }
      else if (slot2 == 'dưahấu') {
        var slot2 = 'duahau';
        var slot_2 = __dirname + '/cache/duahau.jpg';
      }
      else if (slot2 == 'táo') {
        var slot2 = 'tao';
        var slot_2 = __dirname + '/cache/tao.jpg';
      }
      else if (slot2 == '777') {
        var slot2 = '777';
        var slot_2 = __dirname + '/cache/777.jpg';
      }
      else if (slot2 == 'dâu') {
        var slot2 = 'dau';
        var slot_2 = __dirname + '/cache/dau.jpg';
      }
      else if (slot2 == 'đào') {
        var slot2 = 'dao';
        var slot_1 = __dirname + '/cache/dao.jpg';
      }
      // slot 3
      if (slot3 == 'nho') {
        var slot3 = 'nho';
        var slot_3 = __dirname + '/cache/nho.jpg';
      }
      else if (slot3 == 'dưahấu') {
        var slot3 = 'duahau';
        var slot_3 = __dirname + '/cache/duahau.jpg';
      }
      else if (slot3 == 'táo') {
        var slot3 = 'tao';
        var slot_3 = __dirname + '/cache/tao.jpg';
      }
      else if (slot3 == '777') {
        var slot3 = '777';
        var slot_3 = __dirname + '/cache/777.jpg';
      }
      else if (slot3 == 'dâu') {
        var slot3 = 'dau';
        var slot_3 = __dirname + '/cache/dau.jpg';
      }
      else if (slot3 == 'đào') {
        var slot3 = 'dao';
        var slot_3 = __dirname + '/cache/dao.jpg';
      }
      // array slot
      list.push(slot1);
      list.push(slot2);
      list.push(slot3);
      // array img
      listimg.push(createReadStream(__dirname + '/cache/' + slot1 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + slot2 + '.jpg'))
      listimg.push(createReadStream(__dirname + '/cache/' + slot3 + '.jpg'))
      //ICON 
      //icon 1
      if (slot1 == 'nho') {
        var icon1 = '🍇';
      }
      else if (slot1 == 'duahau') {
        var icon1 = '🍉'
      }
      else if (slot1 == 'tao') {
        var icon1 = '🍏';
      }
      else if (slot1 == '777') {
        var icon1 = '➐';
      }
      else if (slot1 == 'dau') {
        var icon1 = '🍓';
      }
      else if (slot1 == 'dao') {
        var icon1 = '🍑';
      }
      // icon 2
      if (slot2 == 'nho') {
        var icon2 = '🍇';
      }
      else if (slot2 == 'duahau') {
        var icon2 = '🍉'
      }
      else if (slot2 == 'tao') {
        var icon2 = '🍏';
      }
      else if (slot2 == '777') {
        var icon2 = '➐';
      }
      else if (slot2 == 'dau') {
        var icon2 = '🍓';
      }
      else if (slot2 == 'dao') {
        var icon2 = '🍑';
      }
      // icon 3
      if (slot3 == 'nho') {
        var icon3 = '🍇';
      }
      else if (slot3 == 'duahau') {
        var icon3 = '🍉'
      }
      else if (slot3 == 'tao') {
        var icon3 = '🍏';
      }
      else if (slot3 == '777') {
        var icon3 = '➐';
      }
      else if (slot3 == 'dau') {
        var icon3 = '🍓';
      }
      else if (slot3 == 'dao') {
        var icon3 = '🍑';
      }
      // sendMessage
      api.sendMessage({
        body: 'Đang quay...',
        attachment: createReadStream(__dirname + '/cache/slot.gif')
      }, threadID, (err, info) => {
        if (err) return api.sendMessage(err, threadID, messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
          var check = list.findIndex(i => i.toString() == content1);
          var check2 = list.includes(content1);
          //console.log(check);
          //console.log(icon1 + icon2 + icon3);
          if (check >= 0 || check2 == true) {
            return api.sendMessage({
              body: `Quay được: ${icon1} | ${icon2} | ${icon3}\nChúc mừng bạn đã thắng +${moneyBet * 3}$`,
              attachment: listimg
            }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 3), messageID);
          }
          else if (check < 0 || check2 == false) {
            return api.sendMessage({
              body: `Quay được: ${icon1} | ${icon2} | ${icon3}\nBạn đã thua -${moneyBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$`,
              attachment: listimg
            }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
          }
          else {
            return api.sendMessage('⚠️', threadID, messageID);
          }
        }, 3000);
      }, messageID);
    }
    catch (err) {
      console.error(err);
      return api.sendMessage(err, event.threadID, event.messageID);
    }
      }