const axios = require('axios');

module.exports.config = {
  name: 'llama',
  version: '1.0',
  hasPermission: 0,
  credits: 'Aleister Crowley',
  description: 'Tạo văn bản phản hồi bằng LLaMA 2 70B',
  usePrefix: true,
  commandCategory: 'Công cụ',
  usages: 'llama {prompt}',
  cooldowns: 0,
  images: [],
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { messageID, messageReply } = event;
    let prompt = args.join(' ');

    if (messageReply) {
      const repliedMessage = messageReply.body;
      prompt = `${repliedMessage} ${prompt}`;
    }

    if (!prompt) {
      return api.sendMessage('⚠️ Vui lòng cung cấp một câu hỏi để tạo văn bản phản hồi.\n\nllama {prompt}\nVí dụ: llama Khái niệm Kardashev là gì?\n', event.threadID, messageID);
    }

    const llamaApi = `https://llama.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}`;

    const response = await axios.get(llamaApi);

    if (response.data && response.data.response) {
      const generatedText = response.data.response;
      api.sendMessage({ body: generatedText, attachment: null }, event.threadID, messageID);
    } else {
      console.error('Phản hồi từ API không chứa dữ liệu dự kiến:', response.data);
      api.sendMessage('❎ Đã xảy ra lỗi trong quá trình tạo văn bản phản hồi. Vui lòng thử lại sau.', event.threadID, messageID);
    }
  } catch (error) {
    console.error('Lỗi:', error);
    api.sendMessage('❎ Đã xảy ra lỗi trong quá trình tạo văn bản phản hồi. Vui lòng thử lại sau.', event.threadID, messageID);
  }
};
