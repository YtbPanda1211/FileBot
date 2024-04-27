const fs = require("fs-extra");
const login = require("fca-disme");
const readline = require("readline");
const totp = require("totp-generator");
const os = require('os');
const logger = require("./utils/log");
let configPath = "";
let argv = process.argv.slice(2);
if (argv.length !== 0) configPath = argv[0];
else configPath = "./acc.json";
const chalk = require('chalk');
const gradient = require('gradient-string');
const networkInterfaces = os.networkInterfaces();
const ipAddresses = [];
for (const key in networkInterfaces) {
    const interfaces = networkInterfaces[key];
    for (const interface of interfaces) {
        if (!interface.internal && interface.family === 'IPv4') {
ipAddresses.push(interface.address);
        }
    }
}
const con = require('./config.json');
const theme = con.DESIGN.Theme;
let co;
let error;
if (theme.toLowerCase() === 'blue') {
  co = gradient("#243aff", "#4687f0", "#5800d4");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'fiery') {
  co = gradient("#fc2803", "#fc6f03", "#fcba03");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'red') {
  co = gradient("red", "orange");
  error = chalk.red.bold;
} else if (theme.toLowerCase() === 'aqua') {
  co = gradient("#0030ff", "#4e6cf2");
  error = chalk.blueBright;
} else if (theme.toLowerCase() === 'pink') {
  cra = gradient('purple', 'pink');
  co = gradient("#d94fff", "purple");
} else if (theme.toLowerCase() === 'retro') {
  cra = gradient("#d94fff", "purple");
  co = gradient.retro;
} else if (theme.toLowerCase() === 'sunlight') {
  cra = gradient("#f5bd31", "#f5e131");
  co = gradient("orange", "#ffff00", "#ffe600");
} else if (theme.toLowerCase() === 'teen') {
  cra = gradient("#00a9c7", "#853858");
  co = gradient.teen;
} else if (theme.toLowerCase() === 'summer') {
  cra = gradient("#fcff4d", "#4de1ff");
  co = gradient.summer;
} else if (theme.toLowerCase() === 'flower') {
  cra = gradient("blue", "purple", "yellow", "#81ff6e");
  co = gradient.pastel;
} else if (theme.toLowerCase() === 'ghost') {
  cra = gradient("#0a658a", "#0a7f8a", "#0db5aa");
  co = gradient.mind;
} else if (theme === 'hacker') {
  cra = chalk.hex('#4be813');
  co = gradient('#47a127', '#0eed19', '#27f231');
} else {
  co = gradient("#243aff", "#4687f0", "#5800d4");
  error = chalk.red.bold;
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const option = {
  logLevel: "silent",
  forceLogin: true,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
};

const config = require(`./${configPath}`);
let email = config.EMAIL;
let password = config.PASSWORD;
let otpkey = config.OTPKEY.replace(/\s+/g, '').toLowerCase();
console.log(chalk.bold(co(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)));
logger("Đang tiến hành đăng nhập...", "┣➤ [ LOGIN - MIDONG ]");
logger("Tiến hành đăng nhập tại:", "┣➤ [ LOGIN - MIDONG ]");
logger(`Email: ${email}`, "┣➤ [ LOGIN - MIDONG ]");
logger(`Password: ${password}`, "┣➤ [ LOGIN - MIDONG ]");
logger(`Địa chỉ IP: ${ipAddresses}`, "┣➤ [ LOGIN - MIDONG ]");
login({ email, password }, option, (err, api) => {
  if (err) {
    switch (err.error) {
      case "login-approval":
        if (otpkey) err.continue(totp(otpkey));
        else {
  logger("Trạng thái: false", "┣➤ [ LOGIN - MIDONG ]");
  logger(`Vui lòng nhập mã xác minh 2 bước: `, "┣➤ [ LOGIN - MIDONG ]");
          rl.on("line", line => {
            err.continue(line);
            rl.close();
          });
        }
        break;
      default:
      console.error(err);
      process.exit(1);
    }
    return;
  }
  const json = JSON.stringify(api.getAppState());
fs.writeFileSync(`./${config.APPSTATEPATH}`, json);
  logger("Trạng thái: true", "┣➤ [ LOGIN - MIDONG ]");
  logger("Đã ghi xong appstate vào mục appstate.json", "┣➤ [ LOGIN - MIDONG ]"); 
console.log(chalk.bold(co(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)));
  process.exit(0);
});           