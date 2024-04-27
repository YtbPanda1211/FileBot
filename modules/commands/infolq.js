const cheerio = require('cheerio');
const axios = require('axios');

module.exports.config = {
  name: 'infolq',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'DongDev',
  description: 'Thông tin về tướng Liên Quân Mobile',
  commandCategory: 'Tiện ích',
  usages: '[page]',
  cooldowns: 5,
  images: [],
};

function extractEquipmentDetails($, row) {
  const description = $(row).find('td').map((index, cell) => $(cell).text().trim()).get().join(' | ');
  return { description };
}

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID } = event;
    const baseUrl = 'https://lienquan.garena.vn';
    const tuongUrl = `${baseUrl}/tuong`;

    const html = await axios.get(tuongUrl);
    const $ = cheerio.load(html.data);

    let getdata = [];

    $('.list-champion').each((index, element) => {
      const id = index + 1;
      const thumb = baseUrl + $(element).find('.heroes img').attr('src');
      const name = $(element).find('.name').text();

      getdata.push({
        id,
        name,
        thumb,
      });
    });

    let page_num_input = args[0] ? parseInt(args[0]) : 1;
    page_num_input = (page_num_input < 1) ? 1 : page_num_input;
    const itemsPerPage = 20;
    const totalItems = getdata.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const index_start = (page_num_input * itemsPerPage) - itemsPerPage;
    const bonus = index_start;
    const index_end = (index_start + itemsPerPage > totalItems) ? totalItems : index_start + itemsPerPage;
    const paginatedData = getdata.slice(index_start, index_end);

    if (paginatedData.length === 0) {
      api.sendMessage(`❎ Không tìm thấy kết quả!`, threadID, messageID);
      return;
    }

    const messages = paginatedData.map((item, index) => {
      return `|› ${bonus + index + 1}. ${item.name}`;
    });

    const listMessage = `[ LIST - Tướng Liên Quân ]\n────────────────────\n${messages.join("\n")}\n\n────────────────────\n|› 📔 Trang: [ ${page_num_input}/${totalPages} ]\n|› 📌 Reply (phản hồi) theo STT tương ứng để xem thông tin tướng`;

api.sendMessage(listMessage, threadID, (error, info) => {
  if (error) {
    console.error("❎ Lỗi khi gửi tin nhắn:", error);
  } else {
    const replyData = {
      type: "choose",
      name: module.exports.config.name,
      author: info.senderID,
      messageID: info.messageID,
      data: paginatedData,
      currentPage: page_num_input,
    };
    global.client.handleReply.push(replyData);
  }
});

  } catch (error) {
    console.error("❎ Lỗi trong quá trình tìm kiếm:", error);
    api.sendMessage(`❎ Đã xảy ra lỗi trong quá trình tìm kiếm`, threadID, messageID);
  }
};

module.exports.handleReply = async function ({ event, api, handleReply }) {
  const { threadID, body } = event;
  const baseUrl = 'https://lienquan.garena.vn';

  switch (handleReply.type) {
    case 'choose':
      const choose = parseInt(body);
      api.unsendMessage(handleReply.messageID);

      if (isNaN(choose)) {
        return api.sendMessage('⚠️ Vui lòng nhập 1 con số', threadID);
      }

      const chosenData = handleReply.data.find(item => item.id === choose);

      if (chosenData) {
        const { id, thumb } = chosenData;
        const tuongChiTietUrl = `${baseUrl}/tuong-chi-tiet/${id}`;

        try {
          const response = await axios.get(tuongChiTietUrl);
          const html = response.data;
          const $ = cheerio.load(html);

          const heroesPageTitle = $('.heroes-page .title').text();
          const skinImages = $('.skin img').map((index, element) => `${baseUrl}${$(element).attr('src')}`).get();
          const skillsArray = $('#tab-1 .name').map((index, element) => {
            const cooldownText = $(element).siblings('.txt:contains("Hồi chiêu")').text().trim();
            const cooldown = cooldownText.replace('Hồi chiêu:', '').trim();

            return {
              name: $(element).text(),
              cooldown: `Hồi chiêu: ${cooldown}`
            };
          }).get();

          const trangBiTitle = $('strong:contains("TRANG BỊ")').text();
          const trangBiImages = $('span img').map((_, el) => `${baseUrl}${$(el).attr('src')}`).get();
          const equipmentDetails = $('table tbody tr').map((_, row) => extractEquipmentDetails($, row)).get();

          let image = [];

          for (let i = 0; i < skinImages.length; i++) {
            const a = skinImages[i];
            const stream = (await axios.get(a, {
              responseType: "stream"
            })).data;
            image.push(stream);
          }

          const sk = skillsArray.map((item, index) => {
            return `|› ${index + 1}. ${item.name}\n${item.cooldown}`;
          });

          const replyMessage = `📊 Thông tin tướng đã chọn:\n- STT: ${id}\n- Tên: ${heroesPageTitle}\n- Ảnh: ${thumb}\n- Chiêu thức:\n${sk.join("\n")}\n- Trang bị:\n${equipmentDetails[0].description || ''}\n${equipmentDetails[1].description || ''}`;

          api.sendMessage(replyMessage, { attachment: image }, threadID);
        } catch (error) {
          console.error("❎ Lỗi trong quá trình lấy thông tin chi tiết:", error);
          api.sendMessage(`❎ Đã xảy ra lỗi trong quá trình lấy thông tin chi tiết`, threadID);
        }
      } else {
        api.sendMessage(`❎ Số thứ tự không hợp lệ, vui lòng chọn số trong danh sách`, threadID);
      }
      break;
    default:
  }
};