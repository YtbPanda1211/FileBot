const cheerio = require("cheerio");
const axios = require("axios");

module.exports.config = {
  name: 'search',
  version: '1.1.1',
  hasPermission: 0,
  credits: 'DongDev',
  description: 'Tìm kiếm ảnh trên google',
  commandCategory: 'Tiện Ích',
  usages: '[]',
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  if (!args || args.length === 0) {
    api.sendMessage("Vui lòng nhập từ khóa tìm kiếm.", event.threadID, event.messageID);
    return;
  }

  const keyword = args.join(" ");
  const options = {
    url: "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(keyword),
    method: "GET",
    headers: {
      "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
    }
  };

  try {
    const response = await axios(options);

    if (response.status === 200) {
      const data = [];
      const $ = cheerio.load(response.data);
      $('div.bRMDJf.islir').each((index, el) => {
        const imageUrl = $(el).find('img.rg_i.Q4LuWd').attr('src');
        if (imageUrl) {
          data.push(imageUrl);
        }
      });

      if (data.length > 0) {
        api.sendMessage(`${data.join("\n")}`, event.threadID, event.messageID);
      } else {
        api.sendMessage("Không tìm thấy ảnh.", event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("Đã xảy ra lỗi khi tìm kiếm ảnh.", event.threadID, event.messageID);
  }
};
