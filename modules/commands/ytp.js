const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
  name: "ytp",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "DongDev",
  description: "Tìm kiếm video trên Youtube Porn",
  commandCategory: "Tiện ích",
  usages: "[]",
  cooldowns: 20,
  images: [],
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  
  const keyword = args.join(" ");
  if (!keyword) return api.sendMessage("⚠️ Vui lòng nhập từ khóa tìm kiếm", threadID, messageID);

  try {
    const res = await axios.get(`https://youtubeporn.pro/search?keyword=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
        'Accept-Language': 'vi, en-US;q=0.9',
        'Host': 'youtubeporn.pro',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const $ = cheerio.load(res.data);
    const videos = [];

    $('.video-list').each((index, element) => {
      const title = $(element).find('.video-list-title h4').text().trim();
      const thumb = $(element).find('.video-list-image img').attr('data-src');
      const videoUrl = $(element).find('.video-list-image a').attr('href');
      const views = $(element).find('.vp_vid_bottm span:first-child').text().trim();
      const date = $(element).find('.vp_vid_bottm span:last-child').text().trim();
      const name = $(element).find('.video-list-by span a').text().trim();
      const url = $(element).find('.video-list-by span a').attr('href');

      videos.push({ title, thumb, videoUrl, views, date, author: {name, url} });
    });

    const rdvd = Array.from({ length: 7 }, () => Math.floor(Math.random() * videos.length));
    const resultList = rdvd.map(index => videos[index]);
    
    let message = "Danh sách kết quả tìm kiếm:\n\n";
    resultList.forEach((video, index) => {
      message += `${index + 1}. ${video.title} - ${video.views} views\n`;
    });
    api.sendMessage(message+'\n\n📌 Reply (phản hồi) STT để tải video', threadID, (error, info) => {
      global.client.handleReply.push({
        type: "choosee",
        name: this.config.name,
        author: info.senderID,
        messageID: info.messageID,
        data: resultList,
      });
    }, messageID);
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tìm kiếm video:", error);
    api.sendMessage("Đã xảy ra lỗi khi tìm kiếm video. Vui lòng thử lại sau.", threadID, messageID);
  }
};

module.exports.handleReply = async function ({ event, api, handleReply, args }) {
  const { threadID: tid, messageID: mid, body } = event;

  switch (handleReply.type) {
    case 'choosee':
      const choose = parseInt(body);
      api.unsendMessage(handleReply.messageID);

      if (isNaN(choose)) {
        return api.sendMessage('⚠️ Vui lòng nhập 1 con số', tid, mid);
      }

      if (choose > handleReply.data.length || choose < 1) {
        return api.sendMessage('❎ Lựa chọn không nằm trong danh sách', tid, mid);
      }
      
      const chosenItem = handleReply.data[choose - 1];
      const url = chosenItem.videoUrl;

      try {
        const res = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
            'Accept-Language': 'vi, en-US;q=0.9',
            'Host': 'youtubeporn.pro',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
          }
        });
        const videoDetails = getVideoDetails(res.data);

        // Tạo tin nhắn thông tin chi tiết của video
        const message = `
🎬 Tiêu đề: ${videoDetails.title}
📺 Lượt xem: ${videoDetails.views}
🗂️ Thể loại: ${videoDetails.category}
💬 Bình luận: ${videoDetails.comments}
👍 Thích: ${videoDetails.like}
👎 Không thích: ${videoDetails.dislike}
👤 Tác giả: ${videoDetails.author.name}
📅 Ngày đăng: ${videoDetails.author.publishDate}
🔗 Link tác giả: ${videoDetails.author.link}
🔗 Link video: ${url},
✏️ Link xem video: ${videoDetails.videoSources[0].src}
`;

        api.sendMessage(message, tid);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy thông tin video:", error);
        api.sendMessage("Đã xảy ra lỗi khi lấy thông tin video. Vui lòng thử lại sau.", tid, mid);
      }
      
      break;
    default:
  }
};

function getVideoDetails(html) {
  const $ = cheerio.load(html);
  const videoTitle = $('.video-big-title h1').text().trim();
  const videoViews = $('#video-views-count').text().trim();
  const videoCategory = $('.watch-video-description ul li:nth-child(1) a').text().trim();
  const commentsCount = $('.comments-header').text().trim().split(' ')[0];
  const likesCount = $('#likes').text().trim();
  const dislikesCount = $('#dislikes').text().trim();
  const subscribersCount = $('.subs-amount').text().trim();
  const publisherName = $('.publisher-name a').text().trim();
  const publisherAvatar = $('.publisher-avatar img').attr('src');
  const publisherProfileLink = $('.publisher-name a').attr('href');
  const publishDate = $('.time').text().trim();
  const videoSources = getVideoSources(html);
  const videoDetails = {
    title: videoTitle,
    views: videoViews,
    category: videoCategory,
    comments: commentsCount,
    like: likesCount,
    dislike: dislikesCount,
    author: {
      name: publisherName,
      avatar: publisherAvatar,
      link: publisherProfileLink,
      subscribe: subscribersCount,
      publishDate: publishDate
    },
    videoSources: videoSources
  };
  return videoDetails;
}

function getVideoSources(html) {
  const $ = cheerio.load(html);
  const videoSources = [];
  $('video source').each((index, element) => {
    const sourceType = $(element).attr('type');
    const quality = $(element).data('quality');
    const src = $(element).attr('src');
    videoSources.push({ type: sourceType, quality, src });
  });
  return videoSources;
}