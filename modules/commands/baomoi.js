const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

module.exports.config = {
  name: "baomoi",
  version: "1.0.0",
  hasPermission: 0,
  credits: "DongDev",
  description: "Đọc báo",
  commandCategory: "Tiện ích",
  usages: "[]",
  cooldowns: 5,
  images: [],
};

module.exports.run = async function ({ api, event }) {
  try {
    const { data } = await axios.get(`https://baomoi.com/tin-moi.epi`);
    const $ = cheerio.load(data);
    const nextDataScript = $('script#__NEXT_DATA__').html();
    
    const jsonData = nextDataScript ? JSON.parse(nextDataScript) : null;
    const content = jsonData?.props?.pageProps?.resp?.data?.content?.items[0];
  
    if (content) {
      const postTimestamp = content.date;
      
      const timeAgo = (t) => {
        const duration = moment.duration(moment().tz('Asia/Ho_Chi_Minh') - moment(t * 1000));
        if (duration.asHours() >= 1) {
          return '⏰ Thời gian đăng: ' + duration.hours() + ' giờ trước';
        } else if (duration.asMinutes() >= 1) {
          return '⏰ Thời gian đăng: ' +  duration.minutes() + ' phút trước';
        } else {
          return '⏰ Thời gian đăng: ' +  duration.seconds() + ' giây trước';
        }
      };

      const originalUrl = content.url;
      const convertedUrl = originalUrl.replace(/#.*$/, '');
      const img = (await axios.get(content.thumbL, { responseType: "stream" })).data;

      const message = `[ Báo Mới - Tin Tức Mới Nhất ]\n──────────────────\n\n🌾 Tiêu đề: ${content.title}\n📝 Mô tả: ${content.description}\n──────────────────\n${timeAgo(postTimestamp)}\n👤 Người đăng: ${content.publisher.name}\n📎 Link bài viết: https://baomoi.com${convertedUrl}\n\n📌 Bạn có thể lên trang web https://baomoi.com nếu muốn xem nhiều tin tức hơn nhé`;

      api.sendMessage({ body: message, attachment: img }, event.threadID, event.messageID);  
    } else {
      console.log('❎ Không tìm thấy dữ liệu');
    }
 } catch (error) {
  }
};