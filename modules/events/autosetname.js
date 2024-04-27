const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

module.exports.config = {
    name: "autosetname",
    eventType: ["log:subscribe"],
    version: "1.0.3",
    credits: "D-Jukie",
    description: "Tự động set biệt danh thành viên mới"
};

module.exports.run = async function({ api, event, Users }) {
    const threadID = event.threadID;

    const pathData = require(process.cwd() + "/modules/commands/data/autosetname.json");
    const dataJson = fs.readFileSync(pathData, "utf-8");
    const threadData = JSON.parse(dataJson).find(item => item.threadID === threadID);

    if (!threadData || (!threadData.nameUser && threadData.timejoin === false)) return;

    const setName = threadData.nameUser;

    for (const info of event.logMessageData.addedParticipants) {
        const idUser = info.userFbId;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const userInfo = await api.getUserInfo(idUser);
        const name = userInfo[idUser].name;

        let formattedName;
        if (!setName && threadData.timejoin === true) {
            formattedName = name + " (" + moment().format("HH:mm:ss | DD/MM/YYYY") + ")";
        } else if (threadData.timejoin === true) {
            formattedName = setName + " " + name + " (" + moment().format("HH:mm:ss | DD/MM/YYYY") + ")";
        } else if (setName && threadData.timejoin === false) {
            formattedName = setName + " " + name;
        } else {
            formattedName = name;
        }

        if (formattedName !== name) {
            await api.changeNickname(formattedName, threadID, idUser);
        }
    }

    api.sendMessage("✅ Thực thi auto setname cho thành viên mới!", threadID, event.messageID);
};