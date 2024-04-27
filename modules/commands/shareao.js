const axios = require('axios');
module.exports.config = {
 name: "shareao",
 version: "1.0",
 hasPermission: 0,
 credits: "DongDev",
 commandCategory: "Tiện ích",
 description: "Share Post Facebook",
 usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
 try {
 if (args.length !== 3) {
 api.sendMessage('⚠️ Số lượng đối số không hợp lệ. Sử dụng cú pháp: shareao [token] [url] [số_lượng]', event.threadID);
 return;
 }

 const accessToken = args[0];
 const shareUrl = args[1];
 const shareAmount = parseInt(args[2]);

 if (isNaN(shareAmount) || shareAmount <= 0) {
 api.sendMessage('⚠️ Số lượng chia sẻ không hợp lệ. Vui lòng cung cấp một số dương hợp lệ.', event.threadID);
 return;
 }

 const timeInterval = 1500;
 const deleteAfter = 60 * 60;

 let sharedCount = 0;
 let timer = null;

 async function sharePost() {
 try {
 const response = await axios.post(
 `https://graph.facebook.com/me/feed?access_token=${accessToken}&fields=id&limit=1&published=0`,
 {
 link: shareUrl,
 privacy: { value: 'SELF' },
 no_story: true,
 },
 {
 muteHttpExceptions: true,
 headers: {
 authority: 'graph.facebook.com',
 'cache-control': 'max-age=0',
 'sec-ch-ua-mobile': '?0',
 'user-agent':
 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
 },
 method: 'post',
 }
 );

 sharedCount++;
 const postId = response?.data?.id;

 console.log(`Số lần share: ${sharedCount}`);
 console.log(`Post ID: ${postId || 'Không xác định'}`);

 if (sharedCount === shareAmount) {
 clearInterval(timer);
 console.log('Hoàn thành việc chia sẻ bài viết.');

 if (postId) {
 setTimeout(() => {
 deletePost(postId);
 }, deleteAfter * 1000);
 }

 api.sendMessage('☑️ Đã hoàn thành chạy share', event.threadID);
 }
 } catch (error) {
 console.error('Không thể chia sẻ bài viết:', error.response.data);
 }
 }

 async function deletePost(postId) {
 try {
 await axios.delete(`https://graph.facebook.com/${postId}?access_token=${accessToken}`);
 console.log(`Bài viết đã xóa: ${postId}`);
 } catch (error) {
 console.error('Không thể xóa bài viết:', error.response.data);
 }
 }

 timer = setInterval(sharePost, timeInterval);

 setTimeout(() => {
 clearInterval(timer);
 console.log('Vòng lặp đã dừng lại.');
 }, shareAmount * timeInterval);
 } catch (error) {
 console.error('Lỗi:', error);
 api.sendMessage('Đã xảy ra lỗi: ' + error.message, event.threadID);
 }
};