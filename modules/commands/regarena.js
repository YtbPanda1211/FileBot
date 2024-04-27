module.exports.config = {
 name: "regarena",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "NemG",
 description: "NemG",
 commandCategory: "Công cụ",
 usages: "NemG",
 cooldowns: 5,
 dependencies: {"axios": ""}
};

module.exports.run = async ({ api, event, args }) => {
 const axios = global.nodemodule["axios"];
 let query = args.join(" ");
 try {
 const res = await axios.get(`https://thenamk3.net/api/reg-garena.json?soluong=${query}&apikey=3wHcCPnR`);
 const { status, checks, } = res.data.result;
 if (status === "Thành Công") {
 const resultString = `Tạo Tài Khoản Garena\nStatus: ${status}\nTài Khoản:\n${checks}\nSố lượng tài khoản đã tạo: ${query}`;
 return api.sendMessage(resultString, event.threadID, event.messageID);
 } else {
 return api.sendMessage(`Status: ${status}`, event.threadID, event.messageID);
 }
 } catch (error) {
 console.error("Lỗi LoL:", error);
 return api.sendMessage("An error occurred while fetching data.", event.threadID, event.messageID);
 }
}