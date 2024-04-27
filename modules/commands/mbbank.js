module.exports.config = {
    name: "mbbank",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "DongDev",
    description: "Fake bill MBBank",
    commandCategory: "Công cụ",
    usages: "",
    cooldowns: 5,
    images: [],
};

module.exports.handleReply = async ({ api, event, handleReply, Users }) => {
    const { threadID, messageID, senderID, body } = event;
    if (handleReply.content.id != senderID) return;
    const input = body.trim();
    const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
        global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
        api.unsendMessage(handleReply.messageID);
        global.client.handleReply.push({
            step: step,
            name: this.config.name,
            messageID: info.messageID,
            content: content
        })
    }, messageID);
    const send = async (msg) => api.sendMessage(msg, threadID, messageID);

    let content = handleReply.content;
    switch (handleReply.step) {
        case 1:
            content.namegui = input;
            sendC("Reply tin nhắn này để nhập stk của bạn!", 2, content);
            break;
        case 2:
            content.stk_gui = input;
            sendC("Reply tin nhắn này để nhập tên người nhận (chữ in hoa)!", 3, content);
            break;
        case 3:
            content.namenhan = input;
            sendC("Reply tin nhắn này để nhập số tiền chuyển", 4, content);
            break;
        case 4:
            content.amount = input;
            sendC("Reply tin nhắn này để nhập stk người nhận!", 5, content);
            break;
        case 5:
            content.stk = input;
            sendC("Reply tin nhắn này để nhập nội dung chuyển", 6, content);
            break;
        case 6:
            content.noidung = input;
            const axios = require("axios");
            const fs = require("fs");
            send("Đang tạo bill!");
            global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
            api.unsendMessage(handleReply.messageID);
            let c = content;
            let magiaodich = TransactionCode();
            let moment = require('moment-timezone');
            let time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss, DD/MM/YYYY");
            let timehientai = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm");
            let res = await axios.get(encodeURI(`https://sumiproject.io.vn/fakebill?forbank=mbbank&name_gui=${c.namegui}&stk_gui=${c.stk_gui}&bank=Quân Đội (MB)&code1=Quân Đội (MB)&code=MB&stk=${c.stk}&name_nhan=${c.namenhan}&amount=${c.amount}&noidung=${c.noidung}&magiaodich=${magiaodich}&time1=${time}&hinhthucck=Trong MB&thoigianhientai=${timehientai}&apikey=apikeysumi`), { responseType: "arraybuffer" })
                .catch(e => { return send("Đã có lỗi xảy ra, vui lòng gọi admin để fix !") });
            if (res.status != 200) return send("Đã có lỗi xảy ra, vui lòng thử lại sau !");
            let path = __dirname + `/cache/fakebillmbbank__${Date.now()}.png`;
            fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
            send({
                body: '',
                attachment: fs.createReadStream(path)
            }).then(fs.unlinkSync(path));
            break;
        default:
            break;
    }
}
module.exports.run = ({ api, event, args, }) => {
    const { threadID, messageID, senderID } = event;
    return api.sendMessage("Reply tin nhắn này để nhập tên của bạn (chữ in hoa)!", event.threadID, (err, info) => {
        global.client.handleReply.push({
            step: 1,
            name: this.config.name,
            messageID: info.messageID,
            content: {
                id: senderID,
                namegui: "",
                stk_gui: "",
                namenhan: "",
                amount: "",
                stk: "",
                noidung: ""
            }
        });
    }, event.messageID);
}

function TransactionCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const length = 12;
    let transactionCode = '';
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        transactionCode += characters.charAt(randomIndex);
    }
    for (let i = 0; i < length - 2; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        transactionCode += numbers.charAt(randomIndex);
    }
    return transactionCode;
}