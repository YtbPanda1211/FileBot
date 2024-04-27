const axios = require("axios");

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports.config = {
  name: 'down',
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Quất",
  description: "tải link",
  commandCategory: "Công cụ",
  usages: "/down + link",
  cooldowns: 0,
  images: [],
};

module.exports.run = async function({ api, event, args }) {
  const i = (url) => axios.get(url, { responseType: "stream" }).then((r) => r.data);

  const links = event.type === 'message_reply' ? event.messageReply.body.split('\n') : args.join(' ').split('\n');
  
  const validLinks = [];
  const invalidLinks = [];
  const audioLinks = [];
  const videoLinks = [];
  const mediaLinks = [];

  links.forEach((link, index) => {
    if (!isValidUrl(link)) {
      invalidLinks.push(index + 1);
    } else {
      validLinks.push(link);

      if (link.endsWith('.mp3')) audioLinks.push(link);
      else if (link.endsWith('.mp4')) videoLinks.push(link);
      else if (link.endsWith('.gif') || link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png')) mediaLinks.push(link);
      else invalidLinks.push(index + 1);
    }
  });

  if (invalidLinks.length > 0) {
    const errorMessage = `Link thứ ${invalidLinks.join(', ')} không đúng định dạng. Đang loại bỏ...`;
    api.sendMessage({ body: errorMessage, attachment: [] }, event.threadID);
  }

  const getAttachments = async (links) => Promise.all(links.map(async link => await i(link)));
  
  const [audioAttachments, videoAttachments, mediaAttachments] = await Promise.all([
    getAttachments(audioLinks),
    getAttachments(videoLinks),
    getAttachments(mediaLinks)
  ]);

  const successfulDownloads = audioAttachments.filter(Boolean).length + videoAttachments.filter(Boolean).length + mediaAttachments.filter(Boolean).length;

  api.sendMessage({
    body: `Đang tải ${successfulDownloads} link...`,
    attachment: []
  }, event.threadID);

  const sendAttachments = async (attachments, successMessage) => {
    for (const attachment of attachments) {
      api.sendMessage({ body: successMessage, attachment: [attachment] }, event.threadID);
    }
  };

  sendAttachments(audioAttachments, 'Đã tải thành công 1 âm thanh');
  sendAttachments(videoAttachments, 'Đã tải thành công 1 video.');
  
  if (mediaAttachments.length > 0) {
    let mediaMessage = `Đã tải thành công ${mediaAttachments.length} ảnh và gif`;
    api.sendMessage({ body: mediaMessage, attachment: mediaAttachments }, event.threadID);
  }
}
