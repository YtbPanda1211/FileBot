const { join } = require("path");
const { existsSync, writeFileSync, readFileSync } = require("fs-extra");

module.exports.config = {
    "name": "autosetname",
    "version": "1.0.1",
    "hasPermssion": 1,
    "credits": "DongDev",
    "description": "Tự động setname cho thành viên mới",
    "commandCategory": "Box chat",
    "usages": "[add <name> /remove] ",
    "cooldowns": 5,
    "images": [],
}

module.exports.onLoad = () => {
    const pathData = join(__dirname, "data", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function ({ event, api, args, Users }) {
    const { threadID, messageID } = event;
    const pathData = join(__dirname, "data", "autosetname.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var name = await Users.getNameUser(event.senderID);
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: "", timejoin: false };

    const action = args[args.length - 1];

    switch (args[0]) {
        case "add": {
            let content = args.slice(1).join(" ");
            let timejoinStatus = false;

            if (content === "timeon") {
                timejoinStatus = true;
                content = "";
            }

            if (thisThread.nameUser) {
                return api.sendMessage(`❎ Nhóm đã tồn tại cấu hình tên, vui lòng xoá cấu hình cũ trước khi thêm tên mới!`, threadID, messageID);
            }

            thisThread.nameUser = content;
            thisThread.timejoin = timejoinStatus;

            api.sendMessage(`✅ Cấu hình tên thành viên mới đã được thêm!\n📝 Preview: \n› Content: ${content || "Không có"} ${name} (Thời gian tham gia: ${timejoinStatus ? 'Bật' : 'Tắt'} )`, threadID, messageID);
            break;
        }
        case "delete": {
    if (thisThread.nameUser || thisThread.timejoin) {
        thisThread.timejoin = false;
        thisThread.nameUser = "";
        api.sendMessage(`✅ Đã xóa cấu hình tên thành viên mới!`, threadID, messageID);
    } else {
        api.sendMessage(`❎ Cấu hình tên của nhóm chưa được đặt!`, threadID, messageID);
    }
    break;
}
        default: {
            return api.sendMessage(`📝 Dùng:\n» autosetname add <name> để cấu hình biệt danh cho thành viên mới\n» autosetname delete để xóa cấu hình đặt biệt danh cho thành viên mới`, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}