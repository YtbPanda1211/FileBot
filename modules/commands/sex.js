const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

function search_vd(data) {
 const videoInfo = {};
 videoInfo.title = data.find('span.text-sm').text().trim();
 const link = data.find('a').attr('href');
 videoInfo.link = link ? `https://www.sex.com${link}` : '';
 const videoUrl = data.find('video').attr('src');
 videoInfo.videoUrl = videoUrl || '';
 const thumb = data.find('img').attr('src');
 videoInfo.thumb = thumb || '';
 const duration = data.find('time.drop-shadow-text').text().trim();
 videoInfo.duration = duration || '';
 const view = data.find('svg + span').text().trim();
 videoInfo.view = view || '';
 return videoInfo;
}

module.exports.config = {
 name: 'sex',
 version: '1.0.0',
 hasPermssion: 2,
 credits: 'DongDev',
 description: 'Tìm kiếm phim trên web :)))',
 commandCategory: 'Tiện ích',
 usages: '[]',
 cooldowns: 20,
 images: [],
};

module.exports.run = async function ({ api, event, args }) {
 const query = args.join(" ").trim();
 const { threadID, messageID } = event;

 if (!query) {
 api.sendMessage("⚠️ Vui lòng nhập từ khóa tìm kiếm", threadID, messageID);
 return;
 }

 const res = await axios.get(`https://www.sex.com/fr/videos?search=${encodeURIComponent(query)}`, {
 'Content-Type': 'application/json',
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
 'Accept-Language': 'en-US,vi-VN;q=0.9',
 });
 const html = res.data;
 const $ = cheerio.load(html);
 const videos = [];

 $('[data-testid="video-card"]').slice(0, 6).each((index, data) => {
 const datavd = search_vd($(data));
 videos.push(datavd);
 });

 if (videos.length === 0) {
 api.sendMessage(`❎ Không tìm thấy kết quả cho từ khóa "${query}"`, threadID, messageID);
 return;
 }

 const messages = videos.map((item, index) => {
 return `\n${index + 1}. 📝 Tiêu đề: ${item.title}\n🔎 Lượt xem: ${item.view}`;
 });

 const listMessage = `📝 Danh sách tìm kiếm của từ khóa: ${query}\n${messages.join("\n")}\n\n📌 Reply (phản hồi) theo STT tương ứng để tải video\n📜 Lưu ý video bot tải chỉ là preview nên sẽ dài khoảng 10 giây, nếu bạn muốn xem phim thì bấm vào link video để xem nhé`;

 api.sendMessage(listMessage, threadID, (error, info) => {
 global.client.handleReply.push({
 type: "choosee",
 name: module.exports.config.name,
 author: info.senderID,
 messageID: info.messageID,
 videos: videos,
 });
 });
};

module.exports.handleReply = async function ({ event, api, handleReply, args }) {
 const { threadID: tid, messageID: mid, body } = event;

 switch (handleReply.type) {
 case 'choosee':
 const choose = parseInt(body);
 api.unsendMessage(handleReply.messageID);

 if (isNaN(choose)) {
 return api.sendMessage('⚠️ Vui lòng nhập 1 con số', tid, mid);
 }

 if (choose > 6 || choose < 1) {
 return api.sendMessage('❎ Lựa chọn không nằm trong danh sách', tid, mid);
 }

 const chosenItem = handleReply.videos[choose - 1];
 api.sendMessage({
 body: `[ VIDEO SEX DOWNLOAD - 18+ ]\n────────────────────\n[📝] → Tiêu đề: ${chosenItem.title}\n[⏳] → Thời lượng: ${chosenItem.duration} giây\n[🔎] → Lượt xem: ${chosenItem.view}\n[📎] → Link video: ${chosenItem.link}\n────────────────────\n[⏰] → Time: ${moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss")}`,
 attachment: (await axios.get(chosenItem.videoUrl, { responseType: 'stream' })).data
 }, tid);
 break;
 default:
 }
};