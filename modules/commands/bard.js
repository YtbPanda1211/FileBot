const axios = require("axios");

const COOKIE = "fQizKYPawuL1PXVm2Ws7bp9d6gBUIFmVhGehXO3w49pwRI9J611k0-XQgo0Jsjop-ZfhOA.";

module.exports.config = {
 name: "bard",
 version: "1.0.4",
 hasPermission: 0,
 credits: "DongDev",
 description: "Google Bard AI chat",
 commandCategory: "Tiện ích",
 usages: "[]",
 cooldowns: 5,
 usePrefix: false,
 images: [],
};

async function getBard(api, event, args, Users, cookie) {
 const headers = {
 "Host": "bard.google.com",
 "X-Same-Domain": "1",
 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
 "Origin": "https://bard.google.com",
 "Referer": "https://bard.google.com/",
 'Cookie': `__Secure-1PSID=${cookie}`
 };

 const req = axios.create({ headers });

 try {
 const resp = await req.get("https://bard.google.com/");

 if (resp.status !== 200) {
 throw new Error(`${resp.status}`);
 }

 const name = await Users.getNameUser(event.senderID);
 const mentions = [{ tag: name, id: event.senderID }];
 const [, at] = resp.data.match(/SNlM0e":"(.*?)"/);
 const reqdata = [[`hello my name is ${name} and here's my question: ${args.join(" ")}` || `hello my name is ${name}`], null, ['c_2d6e5d40d49e04c7']];
 const reqbody = {
 'f.req': JSON.stringify([null, JSON.stringify(reqdata)]),
 at
 };

 const params = {
 bl: 'boq_assistant-bard-web-server_20230419.00_p1',
 _reqid: event.senderID,
 rt: 'c',
 };

 const respData = await req.post("https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate", require("qs").stringify(reqbody), { params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

 console.log('Dữ liệu phản ứng:', respData.data); // Ghi log dữ liệu phản ứng để gỡ lỗi

 const respParsed = JSON.parse(respData.data.split('\n')[3]);

 // Chỉnh sửa logic xử lý phản ứng tại đây dựa trên cấu trúc phản ứng thực tế
 // Ví dụ: const responseData = respParsed[0][2].data || 'Nội dung mặc định';

 // Tiếp tục xử lý respParsed và trả về dữ liệu cần thiết
 return respParsed;
 } catch (error) {
 throw new Error(`❎ Bard lỗi ời: ${error.message}`);
 }
}

module.exports.run = async function ({ api, event, args, Users }) {
 try {
 const respParsed = await getBard(api, event, args, Users, COOKIE);

 // Tiếp tục xử lý respParsed và gửi phản ứng
 const responseData = respParsed[0][2].data || 'Nội dung mặc định';
 const message = `📝 𝙶𝚘𝚘𝚐𝚕𝚎 𝙱𝚊𝚛𝚍 𝙰𝙸 𝙲𝚑𝚊𝚝 👾:\n\n${responseData}\n─────────────────\n🔐 𝙱𝚢 𝙳𝚘𝚗𝚐𝙳𝚎𝚟`;

 const name = await Users.getNameUser(event.senderID);
 const mentions = [{ tag: name, id: event.senderID }];

 api.sendMessage({ body: message, mentions }, event.threadID, event.messageID);
 } catch (error) {
 api.sendMessage(error.message, event.threadID, event.messageID);
 }
};