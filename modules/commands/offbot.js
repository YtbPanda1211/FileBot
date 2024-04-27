module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "Des Bủh - Dựa trên demo của manhIT", /* vui lòng k sửa credit :) */
	description: "Tắt Bot",
	commandCategory: "Hệ thống",
	cooldowns: 0
        };
        
module.exports.run = async({event, api}) =>{

   const permission = ["100063470889361", ""];
    if (!permission.includes(event.senderID)) return api.sendMessage("→ [❗] 𝐗𝐢𝐧 𝐜𝐚́𝐢 𝐭𝐮𝐨̂̉𝐢 đ𝐞̂̉ 𝐨𝐟𝐟?", event.threadID, event.messageID);

api.sendMessage("→ [✨] 𝐏𝐚́𝐢 𝐏𝐚𝐢",event.threadID, () =>process.exit(0))}