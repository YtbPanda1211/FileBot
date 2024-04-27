module.exports.config = {
  name: 'tết',
  version: '1.0.0',
  credits: 'DongDev',
  hasPermission: 0,
  description: 'Xem video Tết 2024',
  commandCategory: 'Tiện ích',
  usages: '[]',
  cooldowns: 10,
  images: [],
};

module.exports.run = async ({ api: a, event: e, Users, Currencies }) => {
  try {
    const { threadID: tid, messageID: mid } = e;
    const { decreaseMoney } = Currencies;
    const axios = require('axios');
    const name = await Users.getNameUser(e.senderID);
    const $ = 500;

    let money = (await Currencies.getData(e.senderID)).money;

    if (money < $) {
      return a.sendMessage(`❎ ${name} cần ${$} để xem video, vui lòng thử lại sau!`, tid, mid);
    }
    decreaseMoney(e.senderID, $);

    const datalink = require('./../../data_dongdev/datajson/vdtet.json');
    const vdurl = datalink[Math.floor(Math.random() * datalink.length)];
    return a.sendMessage({ body: '', attachment: (await axios.get(vdurl, { responseType: "stream" })).data}, tid, mid);
  } catch (error) {
    console.error(error);
    return a.sendMessage("❎ Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", tid, mid);
  }
};