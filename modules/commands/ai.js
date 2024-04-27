const axios = require('axios');

let chatHistory = [];

async function handleGPTQuestion(api, conversation) {
 try {
 const response = await axios.get(`https://sumiproject.io.vn/gpt4?q=${conversation}`);
 const result = response.data.data.gpt4;
 return result;
 } catch (error) {
 console.error(error);
 return "❎ Đã xảy ra lỗi khi xử lý yêu cầu, không thể lưu lịch sử chat quá lâu hoặc đoạn chat quá dài";
 }
}

module.exports = {
 config: {
 name: "ai",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "DongDev",
 description: "AI Chat Gpt 3.5",
 commandCategory: "Box chat",
 usages: "[question]",
 cooldowns: 5,
 images: [],
 },

 handle: async function({ args, event, api }) {
 if (event.type === "message_reply") {
 await this.handleReply({ event, api });
 } else {
 await this.run({ args, event, api });
 }
 },

 handleReply: async function({ event, api }) {
 const newQuestion = event.body;
 const conversation = chatHistory.map(item => (item.chat));
 conversation.push(newQuestion);
 const result = await handleGPTQuestion(api, conversation);
 api.sendMessage({ body: result }, event.threadID, async (error, info) => {
 if (error) return console.error(error);
 client.handleReply.push({
 name: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 chat: newQuestion
 });
 const replyItem = {
 name: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 chat: result
 };
 chatHistory.push(replyItem);
 }, event.messageID);
 },

 run: async function({ args, event, api }) {
 const initialQuestion = args.join(' ');
 chatHistory = [];
 const result = await handleGPTQuestion(api, initialQuestion);
 api.sendMessage({ body: result }, event.threadID, async (error, info) => {
 if (error) return console.error(error);
 client.handleReply.push({
 name: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 chat: initialQuestion
 });
 const chatItem = {
 name: this.config.name,
 messageID: info.messageID,
 author: event.senderID,
 chat: initialQuestion
 };
 chatHistory.push(chatItem);
 }, event.messageID);
 }
};