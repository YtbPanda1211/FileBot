const cheerio = require("cheerio");
const axios = require("axios");
const host = "https://happymod.com";

module.exports.config = {
 name: "hpmod",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "DongDev",
 description: "Tìm kiếm ứng dụng apk trên Happy Mod",
 commandCategory: "Tiện ích",
 usages: "[]",
 cooldowns: 2,
 images: [],
};

module.exports.run = async ({ api, event, args }) => {
 const query = args.join(" ");

 if (!query) {
 return api.sendMessage("⚠️ Vui lòng nhập từ khóa tìm kiếm.", event.threadID, event.messageID);
 }

 const res = await axios.get(`${host}/search.html?q=${query}`);
 const html = res.data;
 const $ = cheerio.load(html);
 const appBoxes = $("body > div.container-row.clearfix.container-wrap > div.container-left > section > div.pdt-app-box");
 const results = [];

 appBoxes.slice(0, 6).each(function (index, element) {
 const link = host + $(element).find("a").attr("href");
 const title = $(element).find("a").attr("title");
 const thumb = $(element).find("img").attr("data-original");
 results.push({ title, link, thumb });
 });

 const imageLinks = results.map(item => item.thumb);
 const images = [];
 for (let i = 0; i < imageLinks.length; i++) {
 const a = imageLinks[i];
 const stream = (await axios.get(a, {
 responseType: "stream"
 })).data;
 images.push(stream);
 }

 const messages = results.map((item, index) => {
 return `\n${index + 1}. 📌 Tiêu đề: ${item.title}\n📎 Link download: ${item.link}`;
 });

 const listMessage = `📝 Danh sách tìm kiếm của từ khóa: ${query}\n${messages.join("\n")}`;

 api.sendMessage({ body: listMessage, attachment: images }, event.threadID, event.messageID);
};