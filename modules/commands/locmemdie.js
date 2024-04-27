module.exports.config = {
  name: "locmemdie",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "DongDev",
  description: "Lọc người dùng Facebook",
  commandCategory: "Box chat",
  usages: "",
  cooldowns: 150
};

module.exports.run = async function({ api, event }) {
    var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
    var success = 0, fail = 0;
    var arr = [];
    for (const e of userInfo) {
        if (e.gender == undefined) {
            arr.push(e.id);
        }
    };
    adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
    if (arr.length == 0) {
  return api.sendMessage(`⚠️ Nhóm bạn không có người dùng nào bị bay acc`, event.threadID);
    }
    else {
 api.sendMessage(`⚠️ Phát hiện nhóm bạn có ${arr.length} người dùng fb, tiến hành lọc`, event.threadID, function () {
            if (!adminIDs) {
 api.sendMessage(`⚠️ Bot cần quyền Qtv, vui lòng thêm rồi thử lại`, event.threadID);
            } else {
   api.sendMessage(`⚠️ Bắt đầu lọc...`, event.threadID, async function() {
                    for (const e of arr) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(e), event.threadID);   
                            success++;
                        }
                        catch {
                            fail++;
                        }
                    }
  api.sendMessage(`⚠️ Đã lọc xong ${success} người dùng fb`, event.threadID, function() {
                if (fail != 0) return api.sendMessage(`⚠️ Lọc thất bại ${fail} người dùng fb`, event.threadID);
                    });
                })
            }
        })
    }
}
