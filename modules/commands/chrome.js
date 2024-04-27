const axios = require('axios');

module.exports.config = {
 name: "chrome",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "XyryllPanget",
 description: "Tìm kiếm trên Chrome với một truy vấn cho trước",
 commandCategory: "Công cụ",
 usages: "",
 cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
 const query = args.join(' ');
 if (!query) {
 api.sendMessage("Vui lòng cung cấp một truy vấn tìm kiếm.", event.threadID);
 return;
 }

 const cx = "7514b16a62add47ae"; // Thay thế bằng ID Trình tìm kiếm Tùy chỉnh của bạn
 const apiKey = "AIzaSyAqBaaYWktE14aDwDE8prVIbCH88zni12E"; // Thay thế bằng khóa API của bạn
 const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

 try {
 const response = await axios.get(url);
 const searchResults = response.data.items.slice(0, 5);
 let message = `Top 5 kết quả cho '${query} Tìm kiếm trên Chrome':\n\n`;
 searchResults.forEach((result, index) => {
 message += `${index + 1}. ${result.title}\n${result.link}\n${result.snippet}\n\n`;
 });
 api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 api.sendMessage("Đã xảy ra lỗi khi tìm kiếm trên Chrome.", event.threadID);
 }
};