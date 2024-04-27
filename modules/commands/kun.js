module.exports.config = {
    name: "kun",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Dũngkon",
    description: "Tạo ảnh sữa kun cho em",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
    if(this.config.credits !== 'Dũngkon') return api.sendMessage('Đã bảo đừng thay credits rồi mà không nghe, thay lại credits ngay không là đéo dùng được đâu nha', event.threadID, event.messageID);
    const moment = require("moment-timezone");
    const axios = require('axios').default;
    var list_id = [];
    const push = [];
    push.push(Date.now());
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

    const [
        username,
        gender
    ] = args.join(" ").trim().split(" | ");

    if (!username || username.length > 13) return api.sendMessage(`Vui lòng nhập tên tối đa 13 ký tự`, event.threadID, event.messageID);
  if (!gender || gender < 0 || gender > 1) return api.sendMessage(`Giới tính (0 gái 1 nam)`, event.threadID, event.messageID);

    api.sendMessage(`Đang Tạo Ảnh Cho Người Dùng ${(await Users.getData(event.senderID)).name}`, event.threadID , (err, info)  => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

    const { data } = await axios.get(`https://9bce-1-53-248-94.ngrok-free.app/kun?username=${encodeURIComponent(username)}&gender=${encodeURIComponent(gender)}`, { responseType: 'stream' });

    api.sendMessage({
        body: `Ảnh của bạn đây ${(await Users.getData(event.senderID)).name}\nThời gian xử lý: ${Math.floor((Date.now() - push[0]) / 1000)} giây`,
        mentions: [
            {
                tag: (await Users.getData(event.senderID)).name,
                id: event.senderID,
            },
        ],
        attachment: data
    }, event.threadID, event.messageID);
}