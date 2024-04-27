const axios = require("axios");

module.exports.config = {
 name: "spdl",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "DongDev",
 description: "tìm kiếm nhạc trên Spotify",
 commandCategory: "Tiện ích",
 usages: "[]",
 images: [],
 cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
 const query = args.join(" ");

 if (!query) {
 return api.sendMessage("Baka 🗿 vui lòng cung cấp tên bài hát.", event.threadID);
 }

 const SearchapiUrl = `https://for-devs.onrender.com/api/spsearch?apikey=fuck&query=${encodeURIComponent(query)}`;

 try {
 const response = await axios.get(SearchapiUrl);
 const Rishad = response.data.slice(0, 6);

 if (Rishad.length === 0) {
 return api.sendMessage("❎ Không tìm thấy bài hát cho truy vấn đã cho.", event.threadID);
 }

 const trackInfo = Rishad.map((track, index) =>
 `${index + 1}. ${track.title}\nNghệ sĩ: ${track.artists}\nThời lượng: ${track.duration}\nBài hát: ${track.url}`
 ).join("\n\n");

 const thumbnails = Rishad.map((track) => track.thumbnail);

 let image = [];

 for (let i = 0; i < thumbnails.length; i++) {
 const a = thumbnails[i];
 const stream = (await axios.get(a, {
 responseType: "stream"
 })).data;
 image.push(stream);
 }

 const replyMessage = {
 body: `${trackInfo}\n\nHãy trả lời với số bài hát để chọn.`,
 attachment: image
 };

 api.sendMessage(replyMessage, event.threadID, (error, info) => {
 global.client.handleReply.push({
 type: "choose",
 name: module.exports.config.name,
 author: info.senderID,
 messageID: info.messageID,
 tracks: Rishad,
 currentIndex: 6,
 originalQuery: query,
 });
 });
 } catch (error) {
 console.error(error);
 api.sendMessage("Lỗi: " + error, event.threadID);
 }
};

module.exports.handleReply = async function ({ api, handleReply, args, event }) {
 const userInput = args[0].toLowerCase();
 const { tracks, currentIndex, originalQuery } = handleReply;

 if (!isNaN(userInput) && userInput >= 1 && userInput <= tracks.length) {
 const selectedTrack = tracks[userInput - 1];
 api.unsendMessage(handleReply.messageID);

 const downloadingMessage = await api.sendMessage(`✅ Đang tải xuống bài hát "${selectedTrack.title}"`, event.threadID);

 const SpdlApiUrl = 'https://for-devs.onrender.com/api/spotifydl?apikey=fuck&url=' + encodeURIComponent(selectedTrack.url);

 try {
 const apiResponse = await axios.get(SpdlApiUrl);

 if (apiResponse.data.id) {
 const {
 artists,
 title,
 album,
 releaseDate,
 downloadUrl
 } = apiResponse.data;

 let streamURL = (url, ext = 'mp3') => require('axios').get(url, {
 responseType: 'stream',
 }).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);

 const form = {
 body: `🎶 Đang phát:\n\n👤 Nghệ sĩ: ${artists}\n🎵 Tiêu đề: ${title}\n📀 Album: ${album}\n📅 Ngày phát hành: ${releaseDate}`,
 attachment: await streamURL(downloadUrl, 'mp3')
 };

 api.sendMessage(form, event.threadID);
 } else {
 api.sendMessage("Xin lỗi, nội dung Spotify không thể được tải xuống.", event.threadID);
 }
 } catch (error) {
 console.error(error);
 api.sendMessage("Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn.", event.threadID);
 }

 api.unsendMessage(downloadingMessage.messageID);
 }
};