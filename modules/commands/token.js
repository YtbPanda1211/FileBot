const deviceID = require('uuid');
const adid = require('uuid');
const totp = require('totp-generator');
const axios = require('axios');

async function tokens(username, password, twofactor = '0', _2fa) {
    if (!username || !password) {
        return {
            status: false,
            message: 'Vui lòng nhập đủ thông tin!',
        };
    }

 try {
      var form = {
          adid: adid.v4(),
          email: username,
          password: password,
          format: 'json',
          device_id: deviceID.v4(),
          cpl: 'true',
          family_device_id: deviceID.v4(),
          locale: 'en_US',
          client_country_code: 'US',
          credentials_type: 'device_based_login_password',
          generate_session_cookies: '1',
          generate_analytics_claim: '1',
          generate_machine_id: '1',
          currently_logged_in_userid: '0',
          irisSeqID: 1,
          try_num: "1",
          enroll_misauth: "false",
          meta_inf_fbmeta: "NO_FILE",
          source: 'login',
          machine_id: randomString(24),
          meta_inf_fbmeta: '',
          fb_api_req_friendly_name: 'authenticate',
          fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
          api_key: '882a8490361da98702bf97a021ddc14d',
          access_token: '350685531728%7C62f8ce9f74b12f84c123cc23437a4a32'
      }
      form.sig = encodesig(sort(form))
      var options = {
          url: 'https://b-graph.facebook.com/auth/login',
          method: 'post',
          data: form,
          transformRequest: [
              (data, headers) => {
                  return require('querystring').stringify(data)
              },
          ],
          headers: {
              'content-type': 'application/x-www-form-urlencoded',
              "x-fb-friendly-name": form["fb_api_req_friendly_name"],
              'x-fb-http-engine': 'Liger',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'cookie': 'datr=gSKMY_7juf1_ZoFLi-iVvTdm; sb=Wu8WZBbMfDtpKKBUsQR_hLiV; wd=1876x963; locale=vi_VN; c_user=100009139645596; xs=3%3ABzUy4TwAOy9kcQ%3A2%3A1691843516%3A-1%3A11477; fr=0bS3Id0xgii2NF8P5.AWUJ7UZMOXoL37-vu8_WleVudWI.Bk13tv.CD.AAA.0.0.Bk14Dx.AWXxHk0Q_I0; presence=C%7B%22lm3%22%3A%22g.6411535885532183%22%2C%22t3%22%3A%5B%7B%22o%22%3A0%2C%22i%22%3A%22g.8321062807935493%22%7D%5D%2C%22utc3%22%3A1691845586342%2C%22v%22%3A1%7D'
          }
      }
        const response = await axios.request(options);

        const accessToken = response.data.access_token;

        const convertedToken = await convertToken(accessToken);
        const convertedCookies = await convertCookie(response.data.session_cookies);

        return {
            status: true,
            message: 'Lấy thông tin thành công!',
            data: {
                access_token: response.data.access_token,
                access_token_eaad6v7: convertedToken,
                cookies: convertedCookies,
                session_cookies: response.data.session_cookies.map((e) => {
                    return {
                        key: e.name,
                        value: e.value,
                        domain: "facebook.com",
                        path: e.path,
                        hostOnly: false
                    };
                }),
            },
        };

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 401) {
            return {
                status: false,
                message: error.response.data.error.message,
            };
        }

        if (twofactor === '0' && (!_2fa || _2fa === "0")) {
            return {
                status: false,
                message: 'Vui lòng nhập mã xác thực 2 lớp!',
            };
        }

        try {
            const _2faCode = (_2fa !== "0") ? _2fa : totp(decodeURI(twofactor).replace(/\s+/g, '').toLowerCase());
          
            form.twofactor_code = _2faCode;
            form.encrypted_msisdn = "";
            form.userid = error.response.data.error.error_data.uid;
            form.machine_id = error.response.data.error.error_data.machine_id;
            form.first_factor = error.response.data.error.error_data.login_first_factor;
            form.credentials_type = "two_factor";
            form.sig = encodesig(sort(form));

            options.data = form;

            const responseAfterTwoFactor = await axios.request(options);

            const accessTokenAfterTwoFactor = responseAfterTwoFactor.data.access_token;
            const convertedTokenAfterTwoFactor = await convertToken(accessTokenAfterTwoFactor);
            const convertedCookiesAfterTwoFactor = await convertCookie(responseAfterTwoFactor.data.session_cookies);

            return {
            status: true,
            message: 'Lấy thông tin thành công!',
            data: {
                    access_token: responseAfterTwoFactor.data.access_token,
                    access_token_eaad6v7: convertedTokenAfterTwoFactor,
                    cookies: convertedCookiesAfterTwoFactor,
                    session_cookies: responseAfterTwoFactor.data.session_cookies.map((e) => {
                        return {
                            key: e.name,
                            value: e.value,
                            domain: "facebook.com",
                            path: e.path,
                            hostOnly: false
                        };
                    }),
                },
        };

        } catch (e) {
            return {
                status: false,
                message: 'Mã xác thực 2 lớp không hợp lệ!',
            };
        }
    }
}

async function convertCookie(session) {
    let cookie = "";
    for (let i = 0; i < session.length; i++) {
        cookie += `${session[i].name}=${session[i].value}; `;
    }
    return cookie;
}

async function convertToken(token) {
    return new Promise((resolve) => {
        axios.get(`https://api.facebook.com/method/auth.getSessionforApp?format=json&access_token=${token}&new_app_id=275254692598279`).then((response) => {
            if (response.data.error) {
                resolve();
            } else {
                resolve(response.data.access_token);
            }
        });
    });
}

function encodesig(string) {
    let data = '';
    Object.keys(string).forEach(function (info) {
        data += `${info}=${string[info]}`;
    });
    data = md5(data + '62f8ce9f74b12f84c123cc23437a4a32');
    return data;
}

function md5(string) {
    return require('crypto').createHash('md5').update(string).digest('hex');
}

function sort(string) {
    let sor = Object.keys(string).sort();
    let data = {};
    for (let i in sor) {
        data[sor[i]] = string[sor[i]];
    }
    return data;
}

function randomString(length) {
    length = length || 10;
    let char = 'abcdefghijklmnopqrstuvwxyz';
    char = char.charAt(Math.floor(Math.random() * char.length));
    for (let i = 0; i < length - 1; i++) {
        char += 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(36 * Math.random()));
    }
    return char;
}

module.exports.config = {
 name: "token",
 version: "1.8.7",
 hasPermission: 0,
 credits: "DongDev",
 description: "Lấy Token/Cookies/Appstate Access Facebook",
 commandCategory: "Tiện ích",
 usages: "[]",
 cooldowns: 3,
 images: [],
};

module.exports.run = async function ({ api, event }) {
 const message = event.body;
 const args = message.split(/\s+/);
 args.shift();

 if (args.length === 2) {
 const username = args[0];
 const password = args[1];
// const _2fa = args[2] || 0;

 api.sendMessage(`🕟 | Đang lấy token cho người dùng: '${username}', Vui lòng đợi...`, event.threadID, event.messageID);

try {
 const result = await tokens(username, password, _2fa = '0');

 if (result.status) {
  const { access_token, access_token_eaad6v7, cookies, session_cookies } = result.data;

 api.sendMessage(`☑️ Lấy Token thành công ✨\n\n[ 🎟️ Token ]\n\n${access_token}\n\n${access_token_eaad6v7}\n\n[ 🍪 Cookies ]\n\n ${cookies}\n\n[ 🔐 Appstate ]\n\n${JSON.stringify(session_cookies, null, 2)}`, event.threadID);
 } else {
 api.sendMessage(`❎ Lỗi: ${result.message}`, event.threadID);
 }
 } catch (error) {
 console.error("❎ Lỗi khi lấy token", error);
 api.sendMessage("❎ Lỗi khi lấy token, Vui lòng thử lại sau.", event.threadID);
 }
 } else {
 api.sendMessage("📝 Cách sử dụng: token [uid] [password] [2fa]", event.threadID, event.messageID);
 }
};