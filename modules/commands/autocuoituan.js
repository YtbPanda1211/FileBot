const { exec } = require('child_process');

const weekendMessages = [
  {
    timer: '9:00:00 AM',
    saturdayMessage: [
    'Đã cuối tuần rồi sao, Zuri chúc tất cả mọi người trong box có 1 ngày cuối tuần thật vui vẻ!', 
      
    'Bận rộn cả tuần cũng có được ngày nghỉ, tớ là Zuri xin chúc tất cả mọi người có 1 ngày nghỉ hạnh phúc bên gia đình và người thân<3',

    'Tớ là Zuri xin chúc tất cả mọi người có 1 ngày nghỉ thật vui vẻ, xóa hết nỗi buồn để có 1 tuần đầy năng lượng<3',

      'Hãy làm tất cả những việc mà bạn cho là thoải mái nhất nhé,hãy xả stress để có 1 ngày mới đầy năng lượng'
    ],
    
    sundayMessage: ['Chủ Nhật rồi, chuẩn bị tâm lý để bắt đầu tuần mới thôi nào!', 
                    
                    'Chúc mọi người một Chủ Nhật thật nhiều năng lượng!']
  },
  {
    timer: '7:00:00 PM',
    saturdayMessage: ['Thời gian để relax và xả strees đã đến, thưởng thức tối Thứ Bảy thôi nào!', 'Đêm Thứ Bảy, là thời gian để tự thưởng cho mình sau 1 tuần làm việc!'],

    
    sundayMessage: ['Vào lúc 00:01 ngày đầu tuần, Hệ thống bot Zuri sẽ tự động reset data checktt của tất cả các nhóm, các bạn quản trị viên chú ý lọc thành viên nhé\n!check - để xem tất cả tương tác cuối tuần\n!check loc= <số tin nhắn muốn lọc> - để bot tự lọc thành viên nhé']
  }
];

function getWeekendMessage(isSaturday) {
  const currentMessages = weekendMessages.find(({ timer }) => timer == new Date(Date.now() + 25200000).toLocaleString().split(/,/).pop().trim());
  return currentMessages ? (isSaturday ? currentMessages.saturdayMessage : currentMessages.sundayMessage) : null;
}

function getMillisecondsUntilMonday002() {
  const now = new Date(), daysUntilMonday = (7 - now.getDay()) % 7, nextMonday002 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday, 0, 2, 0, 0);
  return nextMonday002.getTime() - now.getTime();
}

module.exports.config = {
  name: 'autocuoituan',
  version: '1.5.0',
  hasPermission: 3,
  credits: 'DongDev',
  description: 'Gửi tin nhắn tự động vào cuối tuần',
  commandCategory: 'Hệ thống',
  usages: '',
  cooldowns: 3
};

module.exports.onLoad = async ({ global, api }) => {
  setInterval(() => {
    const today = new Date().getDay();
    if (today === 6 || today === 0) {
      const isSaturday = today === 6, messageArray = getWeekendMessage(isSaturday);
      if (messageArray) {
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
        global.data.allThreadID.forEach(threadID => api.sendMessage(randomMessage, threadID));
      }
      if (today === 0) {
        // Gửi tin nhắn cho admin trước khi đặt lại dữ liệu
        const adminID = '100068096370437';
        const adminMessage = '⚠️ Hệ thống sẽ được đặt lại vào 00:02';

        const millisecondsUntil002 = getMillisecondsUntilMonday002();
        if (millisecondsUntil002 > 0) {
          setTimeout(() => {
     api.sendMessage(adminMessage, adminID);
            exec('rm -fr modules/commands/checktt/*', (error, stdout, stderr) => {
              if (error) console.error(`Lỗi khi reset dữ liệu: ${error}`);
              if (stderr) console.error(`Lỗi khi thực hiện lệnh: ${stderr}`);
              console.log('Dữ liệu tuongtac đã được reset.');
            });
            global.data.allThreadID.forEach(threadID => api.sendMessage('⚠️ Hệ thống bot sẽ được khởi động lại ngay bây giờ!', threadID, () => process.exit(1)));
          }, millisecondsUntil002);
        }
      }
    }
  }, 1000 * 60 * 60);
};

module.exports.run = function ({ }) {};