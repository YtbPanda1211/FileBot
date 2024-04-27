const axios = require('axios');
const request = require('request');
exports.config = {
  name: "cc",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "DongDev",
  description: "Capcut :)",
  commandCategory: "Box chat",
  usages: "..",
  cooldowns: 5,
};
exports.run = async function({ api, event, args, Currencies }) {
  const { threadID, messageID, senderID } = event;
  const keyword = args.join(" ");
  const data = await search(keyword);
  const eightResults = getEightResults(data);
  const message = eightResults.map(result => `Title: ${result.title}, Author: ${result.author.name}`).join('\n');
     api.sendMessage(message, threadID, messageID);
};
function getEightResults(data) {
    return data.video_templates.slice(0, 8);
};
async function search(keyword) {
  if (!keyword) throw new Error('Thiếu dữ liệu để khởi chạy chương trình');
  const options = {
            method: 'POST',
            url: 'https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/search_templates',
            headers: {
                'Host': 'edit-api-sg.capcut.com',
                'Content-Type': 'application/json',
                'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                'app-sdk-version': '48.0.0',
                 appvr: '5.8.0',
                'cookie': '_ga=GA1.1.382841626.1704093538; _clck=udqiju%7C2%7Cfi1%7C0%7C1461; passport_csrf_token=01a7a2ffdee0c9c90c25c96c74c3c30a; passport_csrf_token_default=01a7a2ffdee0c9c90c25c96c74c3c30a; passport_auth_status=fa3fafccdbf54b72a5ae969153a8367c%2C; passport_auth_status_ss=fa3fafccdbf54b72a5ae969153a8367c%2C; sid_guard=d7a0d457a8ccbd28c80d9eb4c9da3a45%7C1704093581%7C34560000%7CTue%2C+04-Feb-2025+07%3A19%3A41+GMT; uid_tt=2911adf660e32d4908db5d59a794e00a60aafee969aff391ec0b4538fe56b680; uid_tt_ss=2911adf660e32d4908db5d59a794e00a60aafee969aff391ec0b4538fe56b680; sid_tt=d7a0d457a8ccbd28c80d9eb4c9da3a45; sessionid=d7a0d457a8ccbd28c80d9eb4c9da3a45; sessionid_ss=d7a0d457a8ccbd28c80d9eb4c9da3a45; sid_ucp_v1=1.0.0-KGMwZGQ2ZDc2YzQzNzBlZjNhYThmNWFjNGFlMGVmYzY5ODNiOTA2OGEKIAiCiK_K0u2ZyWUQjc_JrAYYnKAVIAwwjc_JrAY4CEASEAMaA3NnMSIgZDdhMGQ0NTdhOGNjYmQyOGM4MGQ5ZWI0YzlkYTNhNDU; ssid_ucp_v1=1.0.0-KGMwZGQ2ZDc2YzQzNzBlZjNhYThmNWFjNGFlMGVmYzY5ODNiOTA2OGEKIAiCiK_K0u2ZyWUQjc_JrAYYnKAVIAwwjc_JrAY4CEASEAMaA3NnMSIgZDdhMGQ0NTdhOGNjYmQyOGM4MGQ5ZWI0YzlkYTNhNDU; store-idc=alisg; store-country-code=vn; store-country-code-src=uid; odin_tt=f0f86a4fba8632aac92b736a20a51eea7b68464e0e6e8f36504001c2863c987d35e356093ad7c65cc41c4ee3d011a08d37b531eec47f6ada19a8bd0780acccd0; csrf_session_id=a837de9ddb8e5a4e263bad23c1453480; ttwid=1|2P_Y7hiaQHOgRN2dfMNzFES4MewtjPWkZKughSH8Sjs|1704116592|c038d929f11a4ce2bc34850c5e38f5957b008cbef30e5103a2fbef9cceb27f05; _uetsid=0830e720a87611ee9d58776762c93b1d; _uetvid=08345970a87611eebf7e650c56cc879e; _ga_F9J0QP63RB=GS1.1.1704116587.7.1.1704116598.0.0.0; _clsk=jq6pma%7C1704116600519%7C1%7C0%7Cy.clarity.ms%2Fcollect; msToken=sj6PJlGDkuSAJAkgVRcGlc_divtmWrAboGYd-zzn3ZN1O-rAksovTw4JTyBiNyvDLgpsAyIuAuQo8pZwpv2PhhBQqhMm9Bm3q3j0Mqt8NTLo',
                'device-time': '1704116611',
                 lan: 'vi-VN',
                 loc: 'va',
                'origin': 'https://www.capcut.com',
                 pf: '7',
                 referer: 'https://www.capcut.com/',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'sign': '6edde988911c68544a053e83f0e3b814',
                'sign-ver': '1',
                // 'tdid': '',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
    data: JSON.stringify({
      'sdk_version': '86.0.0',
      'count': 20,
      'cursor': '0',
      'enter_from': 'workspace',
      'query': keyword,
      'scene': 1,
      'search_version': 2,
      'cc_web_version': 1
    }),
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error('Gãy rồi huhu...');
  }
}