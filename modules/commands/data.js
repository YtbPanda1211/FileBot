module.exports.config = {
    name: "data",
    version: "0.0.1",
    hasPermssion: 3,
    credits: "DongDev",
    description: "System database",
    commandCategory: "Admin",
    cooldowns: 5,
    images: [],
};

module.exports.run = async ({ event, api, args, Currencies }) => {
    const { threadID, messageID } = event;
    return api.sendMessage(`[ SYSTEM DATABASE ]\n──────────────────\n1. Reset money tv trong nhóm \n2. Reset exp/tinnhan của nhóm\n3. Load data tv trong nhóm\n4. Load data all box trên hệ thống\n5. Load data all người dùng trên hệ thống\n\n📌 Reply (phản hồi) STT để thực hiện yêu cầu`, threadID, (error, info) => {
        global.client.handleReply.push({
            type: "choosee",
            name: module.exports.config.name,
            author: event.senderID,
            messageID: info.messageID
        });
    }, messageID);
};

module.exports.handleReply = async function ({
    event,
    Users,
    api,
    Threads,
    handleReply,
    Currencies,
    __GLOBAL
}) {
    const { threadID } = event;

    switch (handleReply.type) {
        case "choosee": {
            switch (event.body.toLowerCase()) {
                case "1": {
                    api.unsendMessage(handleReply.messageID);
                    const data = await api.getThreadInfo(threadID);
                    for (const user of data.userInfo) {
                        var currenciesData = await Currencies.getData(user.id)
                        if (currenciesData != false) {
                            var money = currenciesData.money;
                            if (typeof money != "undefined") {
                                money = 0;
                                await Currencies.setData(user.id, { money });
                            }
                        }
                    }
                    return api.sendMessage("☑️ Đã reset số money thành viên trong nhóm về 0", threadID);
                }
                case "2": {
                    api.unsendMessage(handleReply.messageID);
                    const data = await api.getThreadInfo(threadID);
                    for (const user of data.userInfo) {
                        var currenciesData = await Currencies.getData(user.id)
                        if (currenciesData != false) {
                            var exp = currenciesData.exp;
                            if (typeof exp != "undefined") {
                                exp = 0;
                                await Currencies.setData(user.id, { exp });
                            }
                        }
                    }
                    return api.sendMessage("☑️ Đã reset số exp/tinnhan của nhóm về 0", threadID);
                }
                case "3": {
                    const { setData } = Users;
                    var { participantIDs } = await Threads.getInfo(threadID) || await api.getThreadInfo(threadID);
                    for (const id of participantIDs) {
                        let data = await api.getUserInfo(id);
                        let userName = data[id].name;
                        await Users.setData(id, { name: userName, data: {} });
                    }
                    api.unsendMessage(handleReply.messageID);
                    return api.sendMessage(`☑️ Đã cập nhật dữ liệu các thành viên trong nhóm`, threadID);
                }
                case "4": {
                    api.unsendMessage(handleReply.messageID);
                    const { setData } = Threads;
                    var inbox = await api.getThreadList(100, null, ['INBOX']);
                    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                    const lengthGroup = list.length;
                    for (var groupInfo of list) {
                        var threadInfo = await api.getThreadInfo(groupInfo.threadID);
                        await Threads.setData(groupInfo.threadID, { threadInfo });
                    }
                    return api.sendMessage(`☑️ Đã cập nhật dữ liệu của ${lengthGroup} nhóm`, threadID);
                }
 case "5": {
api.unsendMessage(handleReply.messageID);
                    const { setData } = Users;
                    var threads = await api.getThreadList(100, null, ['INBOX']);
                    for (const thread of threads) {
                        var { participantIDs } = await Threads.getInfo(thread.threadID) || await api.getThreadInfo(thread.threadID);
                        for (const id of participantIDs) {
                            let data = await api.getUserInfo(id);
                            let userName = data[id].name;
                            await Users.setData(id, { name: userName, data: {} });
                            loadedUsers++;
                            console.log(`Loaded user ${loadedUsers}: ${userName} (${id})`);
                        }
                    }
                    return api.sendMessage(`👉 Đã load thành công ${loadedUsers} người dùng vào tất cả các nhóm.`, threadID);
                }
                default:
                    const choose = parseInt(event.body);
                    if (isNaN(event.body)) return api.sendMessage("❎ Vui lòng nhập một con số", threadID);
                    if (choose > 10 || choose < 1) return api.sendMessage("❎ Lựa chọn không nằm trong danh sách", threadID);
            }
        }
    }
};