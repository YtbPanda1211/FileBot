const axios = require('axios');
module.exports.config = {
  name: 'urlft',
  version: '1.0.0',
  credits: 'DongDev',
  hasPermission: 3,
  description: 'Lọc link ảnh bị die ( không áp dụng cho link imgur )',
  commandCategory: 'Admin',
  usages: 'url filter 404 <newUrl>',
  cooldowns: 10
};
module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  if (!args.length) {
    return api.sendMessage({ body: 'Vui lòng nhập link raw hoặc link chứa các url cần lọc' }, threadID, messageID);
  }
try {
    const apiUrl = args[0];
    const response = await axios.get(apiUrl);
    const allLinks = response.data;
    const validLinks = await Promise.all(allLinks.map(async (link) => {
    try {
       const linkResponse = await axios.head(link);
      if (linkResponse.status === 200) {
          return link;
        }
     } catch (error) {
  }
      return null;
    }));

    const filteredLinks = validLinks.filter((link) => link !== null);
    const validLinksArray = filteredLinks.map(link => link.trim());
    const validLinksJson = JSON.stringify(validLinksArray, null, 2);
  
    const mockyResponse = await axios.post(`https://api.mocky.io/api/mock`, {
      "status": 200,
      "content": validLinksJson,
      "content_type": "application/json",
      "charset": "UTF-8",
      "secret": "DongDev",
      "expiration": "never"
    });
    const mockyLink = mockyResponse.data.link;
    api.sendMessage(`Các link đã được lọc: ${mockyLink}`, threadID, messageID);
  } catch (error) {
    api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, threadID, messageID);
    console.error('Đã xảy ra lỗi:', error.message);
  }
};