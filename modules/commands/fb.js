module.exports.config = {
 name: "fb",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "[]",
 commandCategory: "Box chat",
 usages: "[]",
 cooldowns: 5,
 images: [],
};

const axios = require('axios');

module.exports.run = async ({ api, event, args }) => {
 const link = args.join(" ");
 const { threadID, messageID } = event;

 if (!link) {
 api.sendMessage("⚠️ Vui lòng cung cấp một liên kết hợp lệ.", threadID, messageID);
 return;
 }

 let streamURL = (url, ext = 'jpg') => require('axios').get(url, {
 responseType: 'stream',
}).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);

 try {
 const res = await axios.get(`https://thenamk3.net/api/autolink.json?link=${link}&apikey=bGCz9cFa`);
 const data = res.data.videos[1].url;
 
 api.sendMessage({ body: "", attachment: await streamURL(data, 'mp4')}, threadID, messageID);
 } catch (error) {
 console.log(error);
 api.sendMessage("❎ Đã xảy ra lỗi trong quá trình xử lý yêu cầu", threadID, messageID);
 }
};