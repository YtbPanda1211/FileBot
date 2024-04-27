const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { loadImage, createCanvas } = require('canvas');

// Hàm để tạo hiệu ứng tròn cho hình ảnh
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
  name: "cardinfov2",
  version: "1.0.1",
  hasPermission: 0,
  credits: "DongDev",
  description: "Card info Facebook v2",
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
    const gender = resp.data.gender === 'male' ? 'Nam' : resp.data.gender === 'female' ? 'Nữ' : 'Không công khai'
    const relationship_status = resp.data.relationship_status || "Không có dữ liệu";
    var birthday = resp.data.birthday || "Không công khai";
    const follower = resp.data.subscribers?.summary?.total_count || "Không công khai";
    const hometown = resp.data.hometown?.name || "Không có dữ liệu";
    const location = resp.data.location?.name || 'Không có dữ liệu';
    const love = resp.data.love?.name || 'Không có dữ liệu';

    // Tạo thư mục 'cache' nếu chưa tồn tại
    const cacheFolder = path.join(__dirname, '/cache');
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }

    // Tạo đường dẫn file cho hình ảnh
    const pathImg = path.join(cacheFolder, `cardinfo.png`);
    const pathAvata = path.join(cacheFolder, 'avtuserrd.png');

    // Tải về và xử lý hình ảnh avatar
    const getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
    const avataruser = await circle(pathAvata);

    // Tải hình ảnh background
    const bg = (
      await axios.get(encodeURI(`https://imgur.com/kSfS1wX.png`), {
        responseType: "arraybuffer",
      })
    ).data;

    // Tải hình ảnh cơ bản
    const baseImage = await loadImage(bg);
    const baseAvata = await loadImage(avataruser);
    
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");

    // Vẽ hình ảnh background
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // Vẽ hình ảnh cơ bản và avatar
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvata, 50, 130, 270, 270);

    const fontsInfo = 22;
    const fontsLink = 23;

    ctx.font = `${fontsInfo}px Play-Bold`;
    ctx.fillStyle = "#D3D3D3";
    ctx.textAlign = "start";
    ctx.fillText(`Full Name : ${name}`, 410, 172);
    ctx.fillStyle = "#99CCFF";
    ctx.fillText(`Giới tính: ${gender}`, 410, 208);
    ctx.fillStyle = "#FFFFE0";
    ctx.fillText(`Followers: ${follower} followers`, 410, 244);
    ctx.fillStyle = "#FFE4E1";
    ctx.fillText(`Mối quan hệ: ${relationship_status}`, 410, 281);
    ctx.fillStyle = "#9AFF9A";
    ctx.fillText(`Birthday: ${birthday}`, 410, 320);
    ctx.fillStyle = "#FF6A6A";
    ctx.fillText(`Location: ${location}`, 410, 357);
    ctx.fillStyle = "#EEC591";
    ctx.fillText(`UID Facebook: ${uid}`, 410, 397);

    ctx.font = `${fontsLink}px Play-Bold`;
    ctx.fillStyle = "#FFBBFF";
    ctx.fillText(`Link Facebook: ${link_profile}`, 30, 450);

    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);

    // Chuẩn bị tin nhắn và gửi
    const msg = {
      body: `
😻==「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗖𝗨𝗧𝗘 」==😻
──────────────────
👤 Tên: ${name}
🎎 Giới tính: ${gender}
🔰 Lượt Theo dõi: ${follower}
💖 Mối quan hệ: ${relationship_status}
🎂 Sinh nhật: ${birthday}
🌍 Vị trí: ${location}
🔗 UID: ${uid}
🌐 Link Fb: ${link_profile}
──────────────────
👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
      attachment: fs.createReadStream(pathImg)
    };

    api.sendMessage(msg, event.threadID);
  } catch (error) {
    console.error('Lỗi khi tải hình ảnh:', error);
    api.sendMessage(`Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.`, event.threadID);
  }
};