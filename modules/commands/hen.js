const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
 name: "hen",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Tìm truyện hentai VN",
 commandCategory: "Box chat",
 usages: "..",
 cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
 try {
 if (!args[0]) return api.sendMessage("Vui lòng nhập từ khóa để tìm kiếm truyện!", event.threadID);
 
 const keyword = encodeURIComponent(args.join(" "));
 const response = await axios.get(`https://truyenhentaivn.com/?s=${keyword}&post_type=wp-manga`);
 const $ = cheerio.load(response.data);
 const result = [];

 $('.c-tabs-item__content').each((index, element) => {
 const mangaElement = $(element);
 const mangaInfo = {
 title: mangaElement.find('.post-title h3 a').text().trim(),
 link: mangaElement.find('.post-title h3 a').attr('href'),
 genres: mangaElement.find('.summary-content a').map((i, e) => $(e).text()).get(),
 status: mangaElement.find('.mg_status .summary-content').text().trim(),
 chapdau: mangaElement.find('.tab-summary .meta-item:nth-child(2) .chapter a').attr('href'), 
 latestChapter: mangaElement.find('.latest-chap .chapter a').text().trim(),
 latestChapterLink: mangaElement.find('.latest-chap .chapter a').attr('href'),
 postedOn: mangaElement.find('.post-on .font-meta').text().trim()
 };

 result.push(mangaInfo);
 });

 if (result.length === 0) return api.sendMessage("Không tìm thấy truyện nào!", event.threadID);

 const message = result.map((manga, index) => `${index + 1}. Tên: ${manga.title}\nLink: ${manga.link}\nThể loại: ${manga.genres.join(', ')}\nTrạng thái: ${manga.status}\nChap đầu tiên: ${manga.chapdau}\nChap mới nhất: ${manga.latestChapter}\nLink chap mới nhất: ${manga.latestChapterLink}\nNgày đăng: ${manga.postedOn}\n------------------------`).join("\n");
 api.sendMessage("Danh sách truyện:\n" + message, event.threadID);
 } catch (error) {
 console.error("Error:", error);
 api.sendMessage('Đã xảy ra lỗi khi crawl trang web!', event.threadID);
 }
};