this.handleReply = async function ({ event, api, handleReply, args }) {
    const { threadID: tid, messageID: mid, body } = event;

    switch (handleReply.type) {
        case 'choosee':
            const choose = parseInt(body);
            api.unsendMessage(handleReply.messageID);

            if (isNaN(choose)) {
                return api.sendMessage('⚠️ Vui lòng nhập 1 con số', tid, mid);
            }

            const optionsCount = handleReply.dataaa.option.length;
            if (choose < 1 || choose > optionsCount) {
                return api.sendMessage('❎ Lựa chọn không nằm trong danh sách', tid, mid);
            }

            // Lấy thông tin về đáp án đã chọn
            const chosenItem = handleReply.dataaa.option[choose - 1];
            const correctAnswer = handleReply.dataaa.correct;
            
            // Kiểm tra xem đáp án đã chọn có đúng không
            if (chosenItem === correctAnswer) {
                return api.sendMessage('🎉 Chính xác! Bạn đã trả lời đúng!', tid, mid);
            } else {
                return api.sendMessage('❌ Sai rồi! Đáp án đúng là: ' + correctAnswer, tid, mid);
            }

        default:
            return;
    }
};

this.config = {
    name: "dovui",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "DongDev",
    description: "Game đố vui, không vui thì thôi",
    commandCategory: "Game",
    usages: "",
    cooldowns: 5
};

this.run = async ({ api: { sendMessage: send }, event: { threadID: tid, messageID: mid } }) => {
    const axios = require('axios');

    try {
        // Gửi yêu cầu lấy dữ liệu từ API
        const response = await axios.get(`https://hoanghao.me/api/game/dovui`);

        // Lấy thông tin từ dữ liệu trả về
        const question = response.data.data.question;
        const options = response.data.data.option;

        // Tạo tin nhắn cho người chơi
        let replyMessage = `📝 Câu hỏi: ${question}\n────────\n`;
        for (let i = 0; i < options.length; i++) {
            replyMessage += `  ${i + 1}. ${options[i]}\n`;
        }
        replyMessage += "\n📌 Reply theo stt để theo đáp án để trả lời câu hỏi";

        // Gửi tin nhắn cho người chơi và lưu thông tin để xử lý sau này
        send(replyMessage, tid, async (error, info) => {
            if (!error) {
                // Lưu thông tin cho việc xử lý sau này
                global.client.handleReply.push({
                    type: "choosee",
                    name: this.config.name,
                    author: info.senderID,
                    messageID: info.messageID,
                    dataaa: response.data.data,
                });
            } else {
                console.error("Đã xảy ra lỗi khi gửi tin nhắn:", error);
            }
        });
    } catch (error) {
        // Xử lý lỗi nếu không thể lấy được dữ liệu từ API
        console.error("Đã xảy ra lỗi:", error);
        send("Bot đang gặp sự cố, vui lòng thử lại sau!", tid);
    }
};