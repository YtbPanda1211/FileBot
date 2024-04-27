function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomLink(array) {
  const shuffledArray = shuffleArray([...array]);
  return shuffledArray[Math.floor(Math.random() * shuffledArray.length)];
}

module.exports.config = {
  name: 'vdnhac',
  version: '1.0.0',
  credits: 'DongDev',
  hasPermission: 0,
  description: 'Xem video nhạc tiktok remix',
  commandCategory: 'Random-Ảnh/video',
  usages: '[]',
  cooldowns: 10,
  usePrefix: false,
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

    const dataimg = require('./../../data_dongdev/datajson/vdnhac.json');
    const imageUrl = getRandomLink(dataimg);

    const imageStream = (await axios.get(imageUrl, { responseType: 'stream' })).data;
    return a.sendMessage({ body: '', attachment: imageStream }, tid, mid);
  } catch (error) {
    console.error(error);
    return a.sendMessage("❎ Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!", tid, mid);
  }
};