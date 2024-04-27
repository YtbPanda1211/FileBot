const fs = require('fs');

module.exports.config = {
    name: "allfile",
    version: "1.0.0",
    hasPermission: 0,
    credits: "DongDev",
    description: "Hiển thị danh sách tệp và thư mục trong thư mục hiện tại.",
    usage: "",
    commandCategory: "Admin",
    cooldowns: 5
};

// Hàm mở thư mục và gửi danh sách file và folder
function openFolder(api, event, path) {
    const { readdirSync, statSync } = fs;
    const read = readdirSync(path);
    let txt = '';
    let count = 0;
    const array = [];

    for (const i of read) {
        const dest = `${path}/${i}`;
        const info = statSync(dest);
        const size = info.isDirectory() ? getFolderSize(dest) : info.size;

        txt += `${++count}. ${info.isFile() ? '📄' : info.isDirectory() ? '📁' : ''} - ${i}(${convertBytes(size)})\n`;
        array.push({
            dest,
            info
        });
    }

    txt += '\n--> Reply [Open|Del|View] + STT.';
    api.sendMessage(txt, event.threadID, (err, data) => {
        global.client.handleReply.push({
            name: 'file',
            messageID: data.messageID,
            author: event.senderID,
            data: array
        });
    }, event.messageID);
}

// Hàm chuyển đổi kích thước tệp thành đơn vị đọc được
function convertBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}

// Hàm lấy kích thước của thư mục
function getFolderSize(path) {
    const stats = fs.statSync(path);
    if (!stats.isDirectory()) {
        return stats.size;
    }
    const items = fs.readdirSync(path);
    let size = 0;
    items.forEach(item => {
        size += getFolderSize(`${path}/${item}`);
    });
    return size;
}

// Hàm xử lý khi reply
module.exports.handleReply = async function ({ event, api, handleReply, args }) {
    const { threadID: tid, messageID: mid } = event;

    if (!handleReply || !handleReply.data) {
        return; // Tránh xử lý khi handleReply hoặc data không tồn tại
    }

    switch (handleReply.name) {
        case 'file':
            const arg = args[0]; // Lấy giá trị args
            const choose = parseInt(arg); // Chuyển đổi thành số nguyên
            api.unsendMessage(handleReply.messageID);

            if (isNaN(choose) || choose <= 0 || choose > handleReply.data.length) {
                return api.sendMessage('⚠️ Lựa chọn không hợp lệ.', tid, mid);
            }

            const chosenItem = handleReply.data[choose - 1];
            const dest = chosenItem.dest;
            const info = chosenItem.info;

            if (info.isDirectory()) {
                openFolder(api, event, dest); // Mở thư mục nếu là thư mục
            } else {
                // Xử lý khi là tệp
                api.sendMessage(`Bạn đã chọn tệp: ${dest}`, tid, mid);
            }
            break;

        default:
            break;
    }
};

// Hàm chạy khi gọi lệnh
module.exports.run = async function({ event, api }) {
    const directoryPath = './'; // Đường dẫn thư mục bạn muốn kiểm tra
    openFolder(api, event, directoryPath);
};
