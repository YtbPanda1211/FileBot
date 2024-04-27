const { loadImage, createCanvas } = require("canvas");
const request = require('request');
const fs = require("fs"), axios = require("axios");
const Canvas = require("canvas");

async function circle(imagePath) {
  const img = await loadImage(imagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  // Vẽ hình tròn
  ctx.beginPath();
  ctx.arc(img.width / 2, img.height / 2, img.width / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Vẽ hình ảnh bên trong hình tròn
  ctx.drawImage(img, 0, 0, img.width, img.height);

  return canvas.toBuffer();
}

module.exports.config = {
  name: "cardinfov5",
  version: "1.0.1",
  hasPermission: 0,
  credits: "DongDev",
  description: "Thông tin thẻ Facebook v5",
  commandCategory: "Edit-img",
  usages: "cardinfo fb",
  usePrefix: false,
  cooldowns: 5
};

module.exports.run = async ({ api, event, Users, Threads, args }) => {
  try {
    const token = global.config.ACCESSTOKEN;
    let id;

    if (Object.keys(event.mentions).length > 0) {
      id = Object.keys(event.mentions)[0].replace(/\&mibextid=ZbWKwL/g, '');
    } else {
      id = args[0] !== undefined ? (isNaN(args[0]) ? await global.utils.getUID(args[0]) : args[0]) : event.senderID;
      if (event.type === "message_reply") {
        id = event.messageReply.senderID;
      }
    }

    const resp = await axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,updated_time,work,education,likes,created_time,work,posts,hometown,username,family,timezone,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`);
    const name = resp.data.name;
    const uid = resp.data.id;
    const link_profile = resp.data.link;
    const avatar = `https://graph.facebook.com/${id}/picture?width=1500&height=1500&access_token=2712477385668128%7Cb429aeb53369951d411e1cae8e810640`;
    const gender = resp.data.gender === 'male' ? 'Nam' : resp.data.gender === 'female' ? 'Nữ' : 'Không công khai';
    const relationship_status = resp.data.relationship_status || "Không có dữ liệu";
    var birthday = resp.data.birthday || "Không công khai";
    const follower = resp.data.subscribers?.summary?.total_count || "Không công khai";
    const hometown = resp.data.hometown?.name || "Không có dữ liệu";
    const location = resp.data.location?.name || 'Không có dữ liệu';
    const love = resp.data.love?.name || 'Không có dữ liệu';

    const fontsLink = 20;
    const fontsInfo = 28;
    const colorName = "#00FF00";
    let pathImg = __dirname + `/cache/cardinfo.png`;
    let pathAvata = __dirname + `/cache/avtuserrd.png`;
 let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/zET6S0F.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));
/*-----------------download----------------------*/        
/*---------------------------------------------*/
let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 71, 65, 300, 300);
/////////////////////////////////////
ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 50;
  ctx.fillText(`${gender}`, 555, 208);
  ctx.fillText(`${follower}`, 555, 244);
  ctx.fillText(`${love}`, 555, 281);
  ctx.fillText(`${birthday}`, 555, 320);
  ctx.fillText(`${location}`, 555, 357);
  ctx.fillText(`${uid}`, 555, 397);
  ctx.fillText(`${link_profile}`, 180, 468);
  ctx.font = `${fontsLink}px Play-Bold`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 100;  
  ctx.fillText(`Tên: ${name}`, 450, 170);
  ctx.beginPath();
const imageBuffer = canvas.toBuffer();
fs.writeFileSync(pathImg, imageBuffer);
  //  fs.removeSync(pathAvt1);

////////////////////////////////////
  
var msg = {body:`
🧸===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🧸
──────────────────
👤 Tên: ${name}
🎎 Giới tính: ${gender}
🔰 Lượt Theo dõi: ${follower}
💖 Mối quan hệ: ${love}
🎂 Sinh nhật: ${birthday}
🌍 Vị trí: ${location}
🔗 UID: ${uid}
🌐 Link Fb: ${link_profile}
──────────────────
👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg)}
    
    api.sendMessage(msg, event.threadID);
  } catch (error) {
    console.error('Lỗi khi tải hình ảnh:', error);
    api.sendMessage(`Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.`, event.threadID);
  }
};