this.config = {
    name: "rnamebot",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "CatalizCS",
    description: "Đổi biệt danh của bot ở toàn bộ box!",
    commandCategory: "Admin",
    usages: "[nickname]",
    cooldowns: 2,
    images: [],
};

this.run = async ({ event, api, global, args, Threads, client }) => {
    const custom = args.join(" "),
        allThread = await Threads.getAll(["threadID"]),
        idBot = api.getCurrentUserID();
    var threadError = [],
        count = 0;
    if (custom.length != 0) {
        for (const idThread of allThread) {
            await new Promise(resolve => setTimeout(resolve, 500));
            api.changeNickname(custom, idThread.threadID, idBot, (err) => {
                if (err) threadError.push(idThread.threadID);
            });
            count++;
        }
        api.sendMessage(`✅ Đã đổi tên thành công cho ${count} nhóm`, event.threadID, () => {
            if (threadError.length !== 0) api.sendMessage(`❎ Không thể đổi tên tại ${threadError.length} nhóm`, event.threadID, event.messageID);
        });
    } else {
        for (const idThread of allThread) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const threadSetting = client.threadSetting.get(idThread.threadID) || {};
            api.changeNickname(`『 ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX} 』 ⪼ ${(!global.config.BOTNAME) ? "𝑼𝒎𝒆 𝑺𝒆𝒊𝒌𝒐" : global.config.BOTNAME}`, 
                idThread.threadID, idBot, (err) => {
                    if (err) threadError.push(idThread.threadID);
                });
            count++;
        }
        api.sendMessage(`✅ Đã đổi tên thành công cho ${count} nhóm`, event.threadID, () => {
            if (threadError.length !== 0) api.sendMessage(`❎ Không thể đổi tên tại ${threadError.length} nhóm`, event.threadID, event.messageID);
        });
    }
}