const { createReadStream, unlinkSync } = require("fs-extra");

module.exports.config = {
 name: "screenshot",
 version: "1.0.0",
 hasPermission: 0,
 credits: "Đội Mirai",
 description: "Chụp màn hình một trang web nào đó",
 commandCategory: "Tiện ích",
 usages: "[url trang web] [kích thước]", // Sử dụng kích thước thay vì width và crop
 cooldowns: 5,
 dependencies: {
 "fs-extra": "",
 "path": "",
 }
};

module.exports.run = async ({ event, api, args }) => {
 if (!args || args.length < 2) {
 return api.sendMessage("⚠️ Vui lòng cung cấp URL và kích thước. Sử dụng: [url trang web] [kích thước]", event.threadID, event.messageID);
 }

 const url = args[0];
 const requestedSize = args[1]; // Kích thước tương đương với tỉ lệ hình ảnh

 // Định nghĩa khai báo sẵn cho kích thước và crop
 const availableSizes = {
 "1": '1080x1920',
 "2": '1920x1080',
 "3": '1000x1000',
 "4": '800x1240',
 "5": '1920x1000',
 };

 if (!availableSizes[requestedSize]) {
 return api.sendMessage("⚠️ Kích thước không hợp lệ. Các kích thước khả dụng: 1, 2, 3, 4, 5", event.threadID, event.messageID);
 }

 const size = availableSizes[requestedSize];

 try {
 const filePath = __dirname + `/cache/screenshot.png`;
 await global.utils.downloadFile(`https://api.screenshotmachine.com/?key=ca867a&url=${url}&dimension=${size}&cacheLimit=0&delay=400`, filePath);
 api.sendMessage({ attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath));
 } catch (error) {
 return api.sendMessage("❎ Không tìm thấy URL này hoặc định dạng không đúng!", event.threadID, event.messageID);
 }
};