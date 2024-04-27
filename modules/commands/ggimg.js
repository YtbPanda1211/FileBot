const cheerio = require('cheerio');
const axios = require('axios');

module.exports.config = {
 name: "ggimg",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "tìm kiếm hình ảnh trên google",
 commandCategory: "Tiện ích",
 usages: "[]",
 cooldowns: 0,
 images: [],
};

module.exports.run = async function ({ api, event, args }) {
 try {
 const query = args.join(' ');
 const encodedQuery = encodeURIComponent(query);
 const numResults = parseInt(args[0]) || 5;
 const url = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`;

 const { data } = await axios.get(url);
 const $ = cheerio.load(data);

 const results = [];
 $('img[src^="https://"]').each(function () {
 results.push($(this).attr('src'));
 });

 const attachment = await Promise.all(results.slice(0, numResults).map(async (url) => {
 const response = await axios({
 method: 'GET',
 url: url,
 responseType: 'stream'
 });
 return response.data;
 }));

 api.sendMessage({ body: ``, attachment }, event.threadID);
 } catch (error) {
 console.error(error);
 api.sendMessage(`🚫 Error fetching images.`, event.threadID);
 }
};