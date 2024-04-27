this.config = {
  name: "test",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DongDev",
  description: "",
  commandCategory: "Admin",
  usages: "..",
  cooldowns: 5,
};
this.run = async function({ api, event, args }) {
  const axios = require('axios');
  const cheerio = require('cheerio');
  let streamURL = (url, ext = 'jpg') => require('axios').get(url, { responseType: 'stream', }).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);
    const response = await axios.get(args.join(" "));
    const $ = cheerio.load(response.data);
    const jsonData = $('script#__NEXT_DATA__').html();
    const parsedData = JSON.parse(jsonData);
    const videoInfo = parsedData.props.pageProps.videoInfo.video;
    const message = `
      [ AUTODOWN SHOPPE ]

      ⩺ Tiêu đề: ${videoInfo.caption}
      ⩺ Thời lượng: ${formatTime(videoInfo.duration)}
      ⩺ Lượt thích: ${parsedData.props.pageProps.videoInfo.count.likeCount}
      ⩺ Lượt bình luận: ${parsedData.props.pageProps.videoInfo.count.commentCount}
    `;
    api.sendMessage({body:message, attachment: await streamURL(videoInfo.watermarkVideoUrl, 'mp4')}, event.threadID, event.messageID);
}
function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}