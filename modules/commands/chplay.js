const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
 name: 'chplay',
 version: '1.1.1',
 hasPermssion: 0,
 credits: 'DongDev',
 description: 'Xem info ứng dụng trên Cửa hàng Google Play ',
 commandCategory: 'Tiện ích',
 usages: '[]',
 cooldowns: 5,
 images: [],
};

module.exports.run = async function ({ api, event, args }) {
 try {
 const query = args.join(' ');

 if (!query) {
 api.sendMessage('⚠️ Vui lòng nhập tên ứng dụng để xem thông tin trên google play!', event.threadID, event.messageID);
 return;
 }

 const res = await axios.get(`https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`);

 const $ = cheerio.load(res.data);
 const appName = $('.vWM94c').text().trim();
 const developer = $('.LbQbAe').text().trim();
 const inAppPurchases = $('.SH9oqb .UIuSk').text().trim();
 const description = $('.RuAVU .omXQ6c').text().trim();
 const rating = $('.w7Iutd .TT9eCd').text().trim();
 const reviews = $('.w7Iutd .g1rdde').eq(0).text().trim();
 const contentRating = $('.g1rdde [itemprop="contentRating"] span').text().trim();
 const appLink = 'https://play.google.com' + $('.Qfxief').attr('href');
 const thumb = $('.T75of.bzqKMd').attr('src');
 const screenshot = $('.ClM7O img').attr('src');
 const img = [
 thumb,
 screenshot
 ];
 let image = [];

 for (let i = 0; i < img.length; i++) {
 const a = img[i];
 const stream = (await axios.get(a, {
 responseType: 'stream'
 })).data;
 image.push(stream);
 }

 api.sendMessage({ body: `[ INFO - App Google Play Store ]\n──────────────────\n|› Tên App: ${appName}\n|› Developer: ${developer}\n|› Mua trong ứng dụng: ${inAppPurchases}\n|› Mô tả: ${description}\n|› Đánh giá: ${rating}\n|› Lượt đánh giá: ${reviews}\n|› Đánh giá nội dung: ${contentRating}\n|› Link download: ${appLink}`, attachment: image }, event.threadID, event.messageID);
 } catch (error) {
 api.sendMessage(`❎ Lỗi khi lấy thông tin ứng dụng: ${error.message}`, event.threadID, event.messageID);
 }
};