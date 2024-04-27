const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

module.exports.config = {
 name: 'heovl',
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
 api.sendMessage("⚠️ Vui lòng nhập từ khóa để tìm kiếm", threadID, messageID);
 return;
 }

 try {
 const res = await axios.request({
 method: 'GET',
 url: `https://heovl.io/search/${encodeURIComponent(query)}`,
 headers: {
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
 'Cookie': 'mysite=1; _ga=GA1.1.1245448125.1706156906; UBGLAI63GV=izenn.1706156906; __PPU___PPU_SESSION_URL=%2Fsearch; _ga_49VC8CBQF8=GS1.1.1706156905.1.1.1706156915.0.0.0; __vn_cpvx_b_1328_cpv_plan_ids=%7C208%7C%7C218%7C%7C223%7C; __vn_cpvx_b_1328_cpv_plan_uids=%7C13884%7C; bnState_1852039={"impressions":2,"delayStarted":0}; useragent=TW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDEwOyBLKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIwLjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2; _uafec=Mozilla%2F5.0%20(Linux%3B%20Android%2010%3B%20K)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F120.0.0.0%20Mobile%20Safari%2F537.36;',
 'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
 'Content-Type': 'application/json',
 },
 });

 const html = res.data;
 const $ = cheerio.load(html);
 const infovd = [];

 $('.video-box').each((index, element) => {
 const title = $(element).find('a[title]').attr('title');
 const thumbget = $(element).find('img.lazyload').attr('data-srcset');
 const thumburl = thumbget ? thumbget.split(',').map(entry => entry.trim().split(' ')[0]) : [];
 const thumb = thumburl[0] || '';
 const view = $(element).find('.view-onl').text().trim();
 const link = 'https://heovl.io' + $(element).find('a[title]').attr('href');

 infovd.push({
 title,
 thumb,
 view,
 link,
 });
 });

 if (infovd.length === 0) {
 api.sendMessage(`❎ Không tìm thấy kết quả cho từ khóa "${query}"`, threadID, messageID);
 return;
 }

 const messages = infovd.map((item, index) => {
 return `\n${index + 1}. 📝 Tiêu đề: ${item.title}\n🔎 Lượt xem: ${item.view}`;
 });

 const listMessage = `📝 Danh sách tìm kiếm của từ khóa: ${query}\n${messages.join("\n")}\n\n📌 Reply (phản hồi) theo STT tương ứng để tải video`;

 api.sendMessage(listMessage, threadID);
 } catch (error) {
 console.error("Lỗi khi tìm kiếm:", error);
 api.sendMessage(`❌ Có lỗi xảy ra khi tìm kiếm. ${error.message || "Vui lòng thử lại sau."}`, threadID, messageID);
 }
};