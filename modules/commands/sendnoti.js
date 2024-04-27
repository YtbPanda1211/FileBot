module.exports.config = {
    name: "sendnoti",
    version: "1.2.8",
    hasPermssion: 2,
    credits: "DongDev",
    description: "Gửi tin nhắn đến toàn bộ nhóm và reply để phản hồi",
    commandCategory: "Admin",
    usages: "text",
    cooldowns: 2
};

const request = require("request");
const fse = require("fs-extra");
const imageDownload = require("image-downloader");
const moment = require("moment-timezone");
const fullTime = () => moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");

module.exports.run = async ({ api, event, Users }) => {
    const { threadID: tid, messageID: mid, senderID: sid, attachments: atms, messageReply: mR, type, body, args } = event;
    const allTid = global.data.allThreadID || [];
    const atm = await type == "message_reply" ? mR.attachments : atms.length != 0 ? atms : "nofile";
    const content = !args[1] ? "chỉ có tệp" : body.slice(body.indexOf(args[1]));

    if (!args[1] && atm == "nofile") return api.sendMessage(`❎ Vui lòng nhập nội dung`, tid, mid);

    const msg = `[ THÔNG BÁO ADMIN ]\n───────────────────\n[👤] →⁠ Admin: ${(await Users.getData(sid)).name}\n[🌐] →⁠ Link Fb: https://www.facebook.com/profile.php?id=${event.senderID}\n[🗺️] →⁠ Từ: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName : 'Cuộc trò chuyện riêng với bot '}\n───────────────────\n\n[💬] →⁠ Nội dung: ${content}\n───────────────────\n[⏰] →⁠ Time: ${fullTime()}\n[👉] →⁠ Reply (phản hồi) tin nhắn này để gửi về admin`;

    const uwu = atm == "nofile" ? msg : {
        body: msg,
        attachment: await downloadAttachments(atm)
    };

    let c1 = 0,
        c2 = 0;

    for (const idT of allTid) {
        const promise = new Promise(async (resolve1, reject1) => {
            await api.sendMessage(uwu, idT, async (e, i) => {
                if (e) reject1(++c2);
                else resolve1(++c1);

                return global.client.handleReply.push({
                    name: module.exports.config.name,
                    messageID: i.messageID,
                    author: sid,
                    type: "userReply"
                });
            });
        });
    }

    promise.then(async (r) => api.sendMessage(`☑️ Gửi thông báo thành công tới ${r} nhóm`, tid, mid)).catch(async (err) => api.sendMessage(`❎ Không thể gửi thông báo tới ${err} nhóm`, tid, mid));
};

module.exports.handleReply = async ({ api, event, handleReply: h, Users, Threads }) => {
    const { threadID: tid, messageID: mid, senderID: sid, attachments: atms, body, type } = event;
    const { ADMINBOT } = global.config;

    switch (h.type) {
        case "userReply": {
            const atm = atms.length != 0 ? atms : "nofile";
            const msg = `[ USER REPLY ]\n───────────────────\n[👤] →⁠ User: ${(await Users.getData(sid)).name}\n[🏘️] →⁠ Nhóm: ${(await Threads.getData(tid)).threadInfo.threadName}\n[⏰] →⁠ Time: ${fullTime()}\n\n[📝] →⁠ Nội dung: ${atm == "nofile" ? body : "Chỉ có tệp tới bạn"}\n\n───────────────────\n[👉] →⁠ Reply tin nhắn này nếu muốn phản hồi tới User`;
            const uwu = atm == "nofile" ? msg : {
                body: msg,
                attachment: await downloadAttachments(atm)
            };

            let c1 = 0,
                c2 = 0;

            for (const idA of ADMINBOT) {
                const promise = new Promise(async (resolve1, reject1) => {
                    await api.sendMessage(uwu, idA, async (e, i) => {
                        if (e) reject1(++c2);
                        else resolve1(++c1);

                        return global.client.handleReply.push({
                            name: module.exports.config.name,
                            messageID: i.messageID,
                            author: h.author,
                            idThread: tid,
                            idMessage: mid,
                            idUser: sid,
                            type: "adminReply"
                        });
                    });
                });
            }

            promise.then(async (r1) => api.sendMessage(`[📨] →⁠ Phản hồi thành công tới Admin ${(await Users.getData(h.author)).name} và ${+r1 - 1} Admin khác`, tid, mid)).catch(async (err) => api.sendMessage(`❎ Không thể phản hồi tới ${err} Admin`, tid, mid));

            break;
        }

        case "adminReply": {
            const atm = atms.length != 0 ? atms : "nofile";
            const msg = `[ ADMIN REPLY ]\n───────────────────\n[👤] →⁠ Admin: ${(await Users.getData(sid)).name}\n[⏰] →⁠ Time: ${fullTime()}\n\n[📝] →⁠ Nội dung: ${atm == "nofile" ? body : "Chỉ có tệp tới bạn"}\n───────────────────\n[👉] →⁠ Reply tin nhắn này nếu muốn phản hồi về Admin`;
            const uwu = atm == "nofile" ? msg : {
                body: msg,
                attachment: await downloadAttachments(atm)
            };

            await api.sendMessage(uwu, h.idThread, async (e, i) => {
                if (e) return api.sendMessage(`Error`, tid, mid);
                else api.sendMessage(`[📨] →⁠ Phản hồi thành công tới User ${(await Users.getData(h.idUser)).name} tại nhóm ${(await Threads.getData(h.idThread)).threadInfo.threadName}`, tid, mid);

                return global.client.handleReply.push({
                    name: module.exports.config.name,
                    messageID: i.messageID,
                    author: sid,
                    type: "userReply"
                });
            }, h.idMessage);

            break;
        }
    }
};

const downloadAttachments = async (attachments) => {
    const arr = [];

    for (let i = 0; i < attachments.length; i++) {
        const nameUrl = request.get(attachments[i].url).uri.pathname;
        const namefile = attachments[i].type !== "audio" ? nameUrl : nameUrl.replace(/\.mp4/g, ".m4a");
        const path = __dirname + "/cache/" + namefile.slice(namefile.lastIndexOf("/") + 1);

        await imageDownload.image({
            url: attachments[i].url,
            dest: path
        });

        arr.push(fse.createReadStream(path));
        fse.unlinkSync(path);
    }

    return arr;
};