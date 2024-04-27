module.exports.config = {
    name: "pokemon",
    version: "2.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Nuôi pokemon, chiến đấu tăng lực chiến!",
    commandCategory: "Trò Chơi",
    usages: "[]",
    cooldowns: 0,
    dependencies: {
        "gifencoder": ""
    },
    envConfig: {
        APIKEY: ""
    }
};
 
module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const axios = require("axios");
 
    const dir = __dirname + `/pokemon/`;
    const dirCache = __dirname + `/pokemon/cache/`;
    const dirData = __dirname + `/pokemon/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, { recursive: true });
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, { recursive: true });
    if (!fs.existsSync(dir + "pokemon.json")) (await axios({
            url: "https://api-test.d-jukie.repl.co/backupPoke",
            method: 'GET',
            responseType: 'stream'
        })).data.pipe(fs.createWriteStream(dir + "pokemon.json"));
 
    return;
}
 
module.exports.handleEvent = async function({ api, event, Currencies }) {
    function fixed(number) {
        var num = parseInt(number)
        return num.toFixed(0)
    }
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;
    if(!global.pokemon) return
        const gameThread = global.pokemon.get(threadID) || {};
    if (!gameThread) return;
    if(gameThread.start != true) return;
    if (!gameThread.player.find(i => i.userID == senderID)) return;
    var s, q;
    var s = gameThread.player.findIndex(i => i.userID == senderID);
    var q = gameThread.player[s];
    if(body.toLowerCase() == 'my pokemon') {
        const user = require('./pokemon/datauser/' + `${senderID}.json`);
        if (q.choose.status == true) return api.sendMessage('⚠ 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗵𝗼̣𝗻 𝗿𝗼̂̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗵𝗼𝗻 𝗹𝗮̣𝗶 !', threadID, messageID);
        var msg = `🔍 𝐒𝐨̂́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
        var ii = 0;
        for (let i of user.pet) {
            msg += `[${++ii}]. ${i.name} - ${i.coins}$\n👾 𝐓𝐲𝐩𝐞: ${i.type}\n🧡 𝐇𝐏: ${fixed(i.HP)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${fixed(i.Attack)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${fixed(i.Defense)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${fixed(i.Speed)}\n📌 𝐒𝐤𝐢𝐥𝐥: ${i.skill.join(', ')}\n\n`
        }
        msg += '𝐍𝐡𝐨̛́ 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐜𝐮̉𝐚 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐛𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐜𝐡𝐨̣𝐧 !'
        api.sendMessage(msg, senderID)
        return api.sendMessage('𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐨̛́𝐢 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐭𝐮̛𝐨̛𝐧𝐠 𝐮̛́𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭 !', threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "playerSolo",
                pet: user.pet
            })
        }, messageID);
    }
}
module.exports.run = async ({ api, event, args, Users }) => {
    function fixed(number) {
        var num = parseInt(number)
        return num.toFixed(0)
    }
    const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync, existsSync, createReadStream, readdirSync } = require("fs-extra")
    const pathA = require("path");
    const axios = require("axios")
    const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
    switch (args[0]) {
        case "register":
        case "-r": { 
            if (!existsSync(path)) {
                const obj = {};
                obj.name = (await Users.getData(senderID)).name;
                obj.ID = senderID;
                obj.pet = [];
                obj.foods = [];
                obj.solo = {}
                obj.solo.win = 0
                obj.solo.lose = 0
                obj.solo.draw = 0
                writeFileSync(path, JSON.stringify(obj, null, 4));
                return api.sendMessage("=======[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]========\n⚔️𝐍𝐡𝐚̣̂𝐧 𝐧𝐮𝐨̂𝐢 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠⚔️", threadID, messageID);
            }
            else return api.sendMessage("=======[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]========\n⚔️𝐁𝐚̣𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐦𝐚̣̆𝐭 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀ 𝐬𝐨̛ 𝐫𝐨̂̀𝐢⚔️", threadID, messageID);
            break;
        }
        case 'rank': {
            const data = readdirSync(__dirname + `/pokemon/datauser`);
            const dem = [];
            for (let i of data) {
                dem.push(require(`./pokemon/datauser/${i}`))
            }
            dem.sort((a, b) => b.solo.win - a.solo.win)
            var msg = '=[ 𝐓𝐎𝐏 𝐑𝐀𝐍𝐊 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]=\n'
            for( let i = 0; i < dem.length; i++) {
                if(i < 15) {
                    msg += `🎀 𝐍𝐚𝐦𝐞: ${dem[i].name}\n🐺 𝐒𝐨̂́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧: ${dem[i].pet.length}\n🔰 𝐖𝐢𝐧: ${dem[i].solo.win}\n📛 𝐋𝐨𝐬𝐞: ${dem[i].solo.lose}\n👾 𝐃𝐫𝐚𝐰: ${dem[i].solo.draw}\n\n`
                }
            }
            return api.sendMessage(msg, threadID, messageID);
            break;
        }
        case 'info':
        case '-i': {
            if (!existsSync(path)) { return api.sendMessage('🔍 Bạn chưa đăng kí nuôi pokemon!', threadID, messageID); }
            const pathPoke = require("./pokemon/datauser/" + senderID + '.json');
            var name = pathPoke.name,
                ID = pathPoke.ID,
                pet = pathPoke.pet.length,
                foods = pathPoke.foods.length,
                win = pathPoke.solo.win,
                lose = pathPoke.solo.lose
            return api.sendMessage(`=======[ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑 ]=======\n\n👤 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗻𝘂𝗼̂𝗶 𝗣𝗼𝗸𝗲𝗺𝗼𝗻: ${name}\n🔍 𝗜𝗗: ${ID}\n⏳ 𝗦𝗼̂́ 𝗣𝗼𝗸𝗲𝗺𝗼𝗻: ${pet}\n🛍 𝗧𝘂́𝗶 𝘁𝗵𝘂̛́𝗰 𝗮̆𝗻: ${foods}\n🔰 𝗦𝗼̂́ 𝘁𝗿𝗮̣̂𝗻 𝘁𝗵𝗮̆́𝗻𝗴: ${win}\n📛 𝗦𝗼̂́ 𝘁𝗿𝗮̣̂𝗻 𝘁𝗵𝘂𝗮: ${lose}\n\n👉 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 '👍' 𝘃𝗮̀𝗼 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗣𝗼𝗸𝗲𝗺𝗼𝗻 𝗵𝗶𝗲̣̂𝗻 𝗰𝗼́.`, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "infoPoke",
                })
            }, messageID);
        }
        case 'shop':
        case '-s': {
            if (!existsSync(path)) { return api.sendMessage('🔍Bạn chưa đăng kí nuôi pokemon!', threadID, messageID); }
            const pathPoke = require("./pokemon/pokemon.json");
            const picture = (await axios.get(`https://i.imgur.com/kN64xMW.jpg`, { responseType: "stream"})).data
  const { threadID, messageID } = event;
   return api.sendMessage({body: "======[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]======\n\n🍗 𝟭/ 𝗠𝘂𝗮 𝘁𝗵𝘂̛́𝗰 𝗮̆𝗻 𝗰𝗵𝗼 𝗣𝗼𝗸𝗲𝗺𝗼𝗻.\n🦄 𝟮/ 𝗕𝗮́𝗻 𝗣𝗼𝗸𝗲𝗺𝗼𝗻.\n🔥 𝟯/ 𝗖𝘂̛𝗼̛̀𝗻𝗴 𝗵𝗼́𝗮 𝘀𝘂̛́𝗰 𝗺𝗮̣𝗻𝗵. (𝗯𝗼̉ 𝗿𝗮 𝟳𝟬𝟬𝟬𝟬$ 𝘀𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 đ𝗲̂̉ 𝘁𝗮̆𝗻𝗴 𝟰𝟬% 𝘀𝘂̛́𝗰 𝗺𝗮̣𝗻𝗵 𝗰𝗵𝗼 𝟭 𝗽𝗼𝗸𝗲𝗺𝗼𝗻).\n💌 𝟰/ 𝗠𝘂𝗮 𝗿𝘂̛𝗼̛𝗻𝗴 𝗵𝗲𝘅𝘁𝗲𝗰𝗵 𝗿𝗮 𝗻𝗴𝗮̂̃𝘂 𝗻𝗵𝗶𝗲̂𝗻 𝟭 𝗽𝗼𝗸𝗲𝗺𝗼𝗻.\n\n🧐 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗼̛́𝗶 𝗹𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻.",attachment: (picture)
        }, threadID, (_error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "shop",
                    path: pathPoke
                })
            }, messageID);
        }
        case 'list':
        case '-l': {
            if (!existsSync(path)) { return api.sendMessage('🔍Bạn chưa đăng kí nuôi pokemon!', threadID, messageID); }
            const listPoke = require("./pokemon/pokemon.json");
            var list = [], index = 0;
            for (let i of listPoke) {
                index++
                var msg = `🔍 𝐈𝐃: ${index}\n🕵️‍♀️ 𝐍𝐚𝐦𝐞𝐏𝐨𝐤𝐞: ${i.name} - ${fixed(i.coins)}$\n🧡 𝐇𝐏: ${fixed(i.power.HP)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${fixed(i.power.Attack)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${fixed(i.power.Defense)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${fixed(i.power.Speed)}\n\n`;
                list.push(msg)
            }
            var page = 1;
            page = parseInt(args[1]) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var data = "== 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ==\n\n";
            var numPage = Math.ceil(list.length / limit);
              for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= list.length) break;
                  let poke = list[i];                  
                  data += poke;
              }
            data += `» 𝐓𝐫𝐚𝐧𝐠 ${page}/${numPage}--\n» 𝐃𝐮̀𝐧𝐠 ->${this.config.name} 𝐬𝐨̂́ 𝐭𝐫𝐚𝐧𝐠`
            data += `\n» 𝐑𝐞𝐩𝐥𝐲 𝐈𝐃 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 𝐯𝐞̂̀ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n`
            return api.sendMessage(data, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "pokemon",
                })
            }, messageID);
        }
        case 'bag': 
        case '-b': {
            if (!existsSync(path)) { return api.sendMessage('🔍Bạn chưa đăng kí nuôi pokemon!', threadID, messageID); }
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            var msg = `👾 𝐒𝐨̂́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
            var ii = 0;
            var iii = 0;
            for (let i of user.pet) {
                msg += `[${++ii}]. ${i.name} - ${fixed(i.coins)}$\n👑 𝐓𝐲𝐩𝐞: ${(i.type)}\n🧡 𝐇𝐏: ${fixed(i.HP)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${fixed(i.Attack)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${fixed(i.Defense)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${fixed(i.Speed)}\n\n`
            }
            msg += '🍕 𝐒𝐨̂́ 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́: ' + user.foods.length + '\n'
            for (let i of user.foods) {
                msg += `[${++iii}]. ${i.name}\n🧡 𝐇𝐏: ${i.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n👑 𝐓𝐲𝐩𝐞: ${i.type}\n\n`
            }
            msg += '𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐧𝐨̂́𝐢 𝟐 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣: 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 + 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐜𝐡𝐨 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐚̆𝐧 (𝗰𝘂̀𝗻𝗴 𝗵𝗲̣̂ 𝘁𝗮̆𝗻𝗴 𝟭𝟯𝟬% 𝘀𝘂̛́𝗰 𝗺𝗮̣𝗻𝗵)'
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "petFoods",
                    pet: user.pet,
                    food: user.foods
                })
            }, messageID);
        }
        case 'search':
        case 'find':
        case '-f': {
            const stringSimilarity = require('string-similarity');
            var listPoke = require("./pokemon/pokemon.json");
            var msg = [], image = [];
            for (let id of listPoke) { 
                msg.push(id.name)
            } 
            var s = args.join(" ").slice(parseInt(args[0].length))         
            var checker = stringSimilarity.findBestMatch(s, msg)
            if (checker.bestMatch.rating >= 1) { var search = checker.bestMatch.target }
            var s = checker.bestMatch.target
            var findPoke = listPoke.find(c => c.name == s)
            let pokemon = (await axios.get(findPoke.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemonfind.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemonfind.png"));
            var message = {body: `🔍 𝐓𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦:\n🕵️‍♀️ 𝐍𝐚𝐦𝐞: ${findPoke.name}\n💳 𝐈𝐃: ${findPoke.ID + 1}\n👑 𝐓𝐲𝐩𝐞: ${findPoke.type}\n🧡 𝐇𝐏: ${findPoke.power.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${findPoke.power.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${findPoke.power.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝:   ${findPoke.power.Speed}\n💰 𝐂𝐨𝐢𝐧𝐬: ${findPoke.coins}$\n💬 𝐌𝐨̂ 𝐭𝐚̉: ${findPoke.description}\n👉 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 '👍' 𝐯𝐚̀𝐨 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐮𝐚 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐚̀𝐲 !`, attachment: image};
            return api.sendMessage(message, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'buyPokemon',
                    ID: findPoke.ID
                })
            }, messageID);
        }
        case 'solo': {
            if (!existsSync(path)) { return api.sendMessage('🔍Bạn chưa đăng kí nuôi pokemon!', threadID, messageID); }
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            if(user.pet.length == 0) return api.sendMessage('🔍 𝐁𝐚̣𝐧 𝐜𝐨́ 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚 !', threadID, messageID)
            if (!global.pokemon) global.pokemon = new Map();
            var gameThread = global.pokemon.get(threadID);
            switch (args[1]) {
                case 'create':
                case '-c': {
                    if (global.pokemon.has(threadID)) return api.sendMessage('⚠ 𝐍𝐡𝐨́𝐦 𝐛𝐚̣𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐦𝐚𝐩 𝐬𝐨𝐥𝐨 𝐤𝐡𝐚́𝐜 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐭𝐡𝐞̂𝐦, 𝐯𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐡𝐮̉𝐲 𝐦𝐚𝐩 𝐭𝐫𝐮̛𝐨̛́𝐜 !', threadID, messageID);
                    var name = await Users.getNameUser(senderID);
                    global.pokemon.set(threadID, { box: threadID, start: false, author: senderID, number: 0, player: [{ name, userID: senderID, choose: { status: false, msg: null } }] });
                    return api.sendMessage({body:`==[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 𝐒𝐎𝐋𝐎 ]==\n\n🎉 𝐇𝐨𝐚̀𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐭𝐚̣𝐨 𝐦𝐚𝐩 𝐏𝐊, 𝐬𝐭𝐚𝐫𝐭 𝐤𝐡𝐢 𝐜𝐨́ 𝟐 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚.\n👤𝟏/𝟐 𝐩𝐥𝐚𝐲𝐞𝐫\n👉 𝐉𝐨𝐢𝐧: 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐬𝐨𝐥𝐨 𝐣𝐨𝐢𝐧/-𝐣`, attachment: createReadStream(__dirname + `/noprefix/pokemonpk.jpg`)}, threadID, messageID);
                } 
                case 'join':
                case '-j': {
                    if (!global.pokemon.has(threadID)) return api.sendMessage('⚠ Nhóm này hiện tại chưa có map đấu nào, vui lòng tạo để tham gia!', threadID, messageID);
                    if (gameThread.start == true) return api.sendMessage('⚠ Map đấu ở nhóm này đã bắt đầu!', threadID, messageID);
                    if (gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('⚠Bạn đã tham gia trước đó!', threadID, messageID);
                    var name = await Users.getNameUser(senderID);
                    gameThread.player.push({ name, userID: senderID, choose: { status: false, msg: null } });
                    if(gameThread.player.length > 2) return api.sendMessage('⚠ Số người tham gia vào map này đã đủ!', threadID, messageID);
                    gameThread.start = true;
                    global.pokemon.set(threadID, gameThread);
                    api.sendMessage('🎉 𝐓𝐡𝐚𝐦 𝐠𝐢𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠.\n👤𝟐/𝟐 𝐩𝐥𝐚𝐲𝐞𝐫\n🔥 𝐒𝐭𝐚𝐫𝐭 𝐦𝐚𝐩 𝐬𝐨𝐥𝐨 𝐬𝐚𝐮 𝟓𝐬', threadID, messageID);
                    setTimeout(() => { return api.sendMessage('👾 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 "𝐦𝐲 𝐩𝐨𝐤𝐞𝐦𝐨𝐧" 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐫𝐚 𝐜𝐡𝐢𝐞̂́𝐧 𝐭𝐫𝐮̛𝐨̛̀𝐧𝐠 !', threadID, messageID)}, 5000);
                    return
                }
                case "end":
                case "end":
                case "-e": {
                    if (!gameThread) return api.sendMessage('⚠ Nhóm này hiện tại chưa có map đấu nào để có thể hủy!', threadID, messageID);
                    if (gameThread.author != senderID) return api.sendMessage('⚠Bạn không thể hủy map đấu do người khác tạo ra!', threadID, messageID);
                    global.pokemon.delete(threadID);
                    return api.sendMessage('🎉 𝐗𝐨𝐚́ 𝐦𝐚𝐩 𝐬𝐨𝐥𝐨 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 !', threadID, messageID); 
                }
                default: {
                    return api.sendMessage('[=𝐂𝐇𝐈𝐄̂́𝐍 𝐓𝐑𝐔̛𝐎̛̀𝐍𝐆 𝐏𝐎𝐊𝐄𝐌𝐎𝐍=]\n👉Tạo trận đấu: create/-c\n👉Tham gia: join/-j\n👉Kết thúc trận: end/-e', threadID, messageID);
                }
            }
        }
        case 'support': {
            return api.sendMessage('[====SUPPORT===]\n1. Liên hệ mua APIKEY!\n2. Đóng góp ý tưởng, yêu cầu tính năng!\n3. Nhận GIFCODE\n4. Nhập GIFTCODE', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "spadmin"
                })
            }, messageID);
        }
        default: { 
            return api.sendMessage({body:`[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\n\n👤 𝗧𝗮̣𝗼 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻: register/-r\n📜 𝗟𝗶𝘀𝘁 𝗽𝗼𝗸𝗲𝗺𝗼𝗻: list/-l\n📌 𝗜𝗻𝗳𝗼 𝘂𝘀𝗲𝗿: info/-i\n💸 𝗖𝘂̛̉𝗮 𝗵𝗮̀𝗻𝗴: shop/-s\n🎒 𝗕𝗮 𝗹𝗼̂: bag/-b\n🔍 𝗧𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺: search/find/-f\n⚔ 𝗖𝗵𝗶𝗲̂́𝗻 𝘁𝗿𝘂̛𝗼̛̀𝗻𝗴: solo -c/-j/-e\n💬 𝗛𝗼̂̃ 𝘁𝗿𝗼̛̣, 𝗴𝗶𝗳𝘁𝗰𝗼𝗱𝗲: 𝘀𝘂𝗽𝗽𝗼𝗿𝘁`, attachment: createReadStream(__dirname + `/noprefix/pokemon.png`)}, threadID, messageID);
        };
    }
}
module.exports.handleReply = async ({ event, api, Currencies, handleReply, Users }) => {
    function fixed(number) {
        var num = parseInt(number)
        return num.toFixed(0)
    }
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID, senderID } = event;
    const axios = require("axios")
    const { readFileSync, writeFileSync, existsSync, createReadStream, unlinkSync, writeFile } = require("fs-extra")
    switch (handleReply.type) {
        case 'infoPet': {
            var image = [];
            var choosePet = handleReply.user.pet[parseInt(body) - 1]
            let pokemon = (await axios.get(choosePet.images, { responseType: "arraybuffer" } )).data;
                writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
                image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `${choosePet.name} - ${choosePet.coins}$\n👑 𝐓𝐲𝐩𝐞: ${choosePet.type}\n🧡 𝐇𝐏: ${choosePet.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${choosePet.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${choosePet.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${choosePet.Speed}\n📌 𝐒𝐤𝐢𝐥𝐥: ${choosePet.skill.join(', ')}\n\n`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'spadmin': {
            switch (body) {
                case '1':
                case '2': {
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage('👉 Vui lòng reply tin nhắn này kèm nội dung để gửi tin nhắn tới admin game!', threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "message"
                        })
                    }, messageID);
                }
                case '3': {
                    var res = await axios.get(`https://api-test.d-jukie.repl.co/giftcode?type=get`);
                    if(res.data.msg == false) return api.sendMessage('Hôm nay không có GIFTCODE', threadID, messageID);
                    return api.sendMessage('👉GIFCODE TÂN THỦ!:\n' + res.data.msg, threadID, messageID);
                }
                case '4': {
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage('👉Vui lòng reply tin nhắn này với nội dung là GIFTCODE bạn nhận được từ admin!', threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "giftcode"
                        })
                    }, messageID);
                }
            }
        }
        case 'message': {
            var res = await axios.get(`https://api-test.d-jukie.repl.co/message?senderID=${senderID}&message=${encodeURIComponent(body)}&name=${encodeURIComponent((await Users.getData(senderID)).name)}`);
            api.unsendMessage(handleReply.messageID)
            if(res.data.msg != true) return api.sendMessage('💬Gửi tin nhắn đến admin game thất bại!', threadID, messageID);
            return api.sendMessage('💬Gửi tin nhắn đến admin game thành công!', threadID, messageID);
        }
        case 'giftcode': {
            var res = await axios.get(`https://api-test.d-jukie.repl.co/giftcode?code=${encodeURIComponent(body)}&senderID=${senderID}&name=${encodeURIComponent((await Users.getData(senderID)).name)}`);
            if(res.data.msg == false) return api.sendMessage('🧡SAI GIFCODE, VUI LÒNG CHỜ CODE MỚI!', threadID, messageID);
            if(res.data.msg == 'fail') return api.sendMessage('🧡Bạn đã nhận rồi nên không thể nhận tiếp!', threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            var rd = listPoke[Math.floor(Math.random() * listPoke.length)]; 
            var image = [];
            if(user.pet.includes(rd)) {
                return api.sendMessage(`❌Bạn mở trúng ${rd.name} nhưng bạn đã sở hữu rồi nên mất code❌`, threadID, messageID);
            }
            user.pet.push({
                name: rd.name,
                type: rd.type,
                HP: rd.power.HP,
                Attack: rd.power.Attack,
                Defense: rd.power.Defense,
                Speed: rd.power.Speed,
                coins: 0,
                images: rd.images
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(rd.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `🧡GIFTCODE TÂN THỦ!\n☑️Bạn mở trúng ${rd.name}.\nType: ${rd.type}\n🔍Chỉ số: \n🧡HP: ${rd.power.HP}\n🗡Attack: ${rd.power.Attack}\n🛡Defense: ${rd.power.Defense}\n⚡️Speed: ${rd.power.Speed}\n💰Coins: 0$\n☑️Đã thêm pokemon vào kho đồ của bạn!`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'pokemon': {
            if (isNaN(body)) return api.sendMessage("[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if (parseInt(body) > 809 || parseInt(body) < 1) return api.sendMessage("[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            var image = [], 
                listPoke = require("./pokemon/pokemon.json"),
                name = '🕵️‍♀️ 𝐓𝐞̂𝐧: ' + listPoke[parseInt(body) -1].name,
                HP = '🧡 𝐌𝐚́𝐮: ' + listPoke[parseInt(body) -1].power.HP,
                Attack = '🗡 𝐓𝐚̂́𝐧 𝐜𝐨̂𝐧𝐠: ' + listPoke[parseInt(body) -1].power.Attack,
                Defense = '🛡 𝐏𝐡𝐨̀𝐧𝐠 𝐭𝐡𝐮̉: ' + listPoke[parseInt(body) -1].power.Defense,
                Speed = '⚡️ 𝐒𝐩𝐞𝐞𝐝: ' + listPoke[parseInt(body) -1].power.Speed,
                description = '💬 𝐌𝐨̂ 𝐭𝐚̉: ' + listPoke[parseInt(body) -1].description,
                coins = '💰 𝐂𝐨𝐢𝐧𝐬: ' + listPoke[parseInt(body) -1].coins;
            let pokemon = (await axios.get(listPoke[parseInt(body) -1].images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `${name}\n${HP}\n${Attack}\n${Defense}\n${Speed}\n${description}\n${coins}$\n\n👉 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 '👍' 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐮𝐚 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐚̀𝐲 !`, attachment: image}
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'buyPokemon',
                    ID: parseInt(body) -1
                })
            }, messageID);
        }
        case 'shop': {
            if (isNaN(body)) return api.sendMessage("=======[ 𝐏𝐄𝐓 𝐅𝐎𝐎𝐃 ]=======\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if (parseInt(body) > 4 || parseInt(body) < 1) return api.sendMessage("=======[ 𝐏𝐄𝐓 𝐅𝐎𝐎𝐃 ]=======\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            switch (body) {
                case "1": {
                    return api.sendMessage(`=======[ 𝐏𝐄𝐓 𝐅𝐎𝐎𝐃 ]=======\n\n🍖 𝗧𝗵𝘂̛́𝗰 𝗮̆𝗻 𝗰𝗵𝗼 𝗣𝗼𝗸𝗲𝗺𝗼𝗻:\n🔥 𝟭. 𝗛𝗲̣̂ 𝗳𝗶𝗿𝗲\n⚡ 𝟮. 𝗛𝗲̣̂ 𝗲𝗹𝗲𝗰𝘁𝗿𝗶𝗰𝗶𝘁𝘆\n🍄 𝟯. 𝗕𝗶̀𝗻𝗵 𝘁𝗵𝘂̛𝗼̛̀𝗻𝗴\n🌿 𝟰. 𝗛𝗲̣̂ 𝗴𝗿𝗮𝘀𝘀/𝗯𝘂𝗴𝘀\n🗻 𝟱. 𝗛𝗲̣̂ 𝘀𝗼𝗶𝗹/𝘀𝘁𝗼𝗻𝗲\n💦 𝟲. 𝗛𝗲̣̂ 𝘄𝗮𝘁𝗲𝗿\n\n📱 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐒𝐒𝐓 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 !`, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_type",
                        })
                    }, messageID);
                }
                case "2": {
                    const user = require('./pokemon/datauser/' + `${senderID}.json`);
                    var msg = `====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 𝐒𝐄𝐋𝐋 ]====\n\n👾 𝐒𝐨̂́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
                    var ii = 0;
                    for (let i of user.pet) {
                        msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳 𝐓𝐲𝐩𝐞: ${i.type}\n🧡 𝐇𝐏: ${i.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n\n`
                    }
                    msg += '𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐤𝐞̀𝐦 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐛𝐚́𝐧 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 !'
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage(msg, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_sell",
                        })
                    }, messageID);
                }
                case "3": {
                    const user = require('./pokemon/datauser/' + `${senderID}.json`);
                    var msg = `==[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 𝐔𝐏𝐆𝐑𝐀𝐃𝐄 ]==\n\n🔍 𝐂𝐡𝐨̣𝐧 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐦𝐮𝐨̂́𝐧 𝐜𝐮̛𝐨̛̀𝐧𝐠 𝐡𝐨́𝐚\n`
                    var ii = 0;
                    for (let i of user.pet) {
                        msg += `[${++ii}]. ${i.name} - ${fixed(i.coins)}$\n🐳 𝐓𝐲𝐩𝐞: ${i.type}\n🧡 𝐇𝐏: ${fixed(i.HP)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${fixed(i.Attack)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${fixed(i.Defense)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${fixed(i.Speed)}\n💰 𝐂𝐨𝐢𝐧𝐬: ${fixed(i.coins)}$\n\n`
                    }
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage(msg, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_buff",
                        })
                    }, messageID);
                }
                case "4": {
                    return api.sendMessage(`===[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 𝐂𝐇𝐄𝐒𝐓 ]===\n\n📦 𝗖𝗮́𝗰 𝗹𝗼𝗮̣𝗶 𝗿𝘂̛𝗼̛𝗻𝗴 𝗱𝗮̀𝗻𝗵 𝗰𝗵𝗼 𝗯𝗮̣𝗻:\n[𝟭]. 𝗥𝘂̛𝗼̛𝗻𝗴 𝘁𝗵𝘂̛𝗼̛̀𝗻𝗴 (𝟱𝟬𝟬𝟬$/𝟭 𝗻𝗴𝗮̀𝘆 𝟯 𝗹𝗮̂̀𝗻)\n[𝟮]. 𝗥𝘂̛𝗼̛𝗻𝗴 𝘁𝘂𝘆𝗲̣̂𝘁 𝗽𝗵𝗮̂̉𝗺 (𝟭𝟬𝟬𝟬𝟬$/𝟯 𝗻𝗴𝗮̀𝘆 𝟭 𝗹𝗮̂̀𝗻)\n[𝟯]. 𝗥𝘂̛𝗼̛𝗻𝗴 𝗩𝗜𝗣 (𝟮𝟬𝟬𝟬𝟬$/𝟯 𝗻𝗴𝗮̀𝘆 𝟭 𝗹𝗮̂̀𝗻)\n[𝟰]. 𝗥𝘂̛𝗼̛𝗻𝗴 𝗙𝗥𝗘𝗘 (𝟭 𝘁𝘂𝗮̂̀𝗻/𝟭 𝗹𝗮̂̀𝗻)\n\n👉 𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐚̀ 𝐜𝐡𝐨̣𝐧 𝐫𝐚 𝐬𝐮̛̣ 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 !`, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_box",
                        })
                    }, messageID);
                }
            }
        }
        case "choose_type": {
            if (isNaN(body)) return api.sendMessage("[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if (parseInt(body) > 6 || parseInt(body) < 1) return api.sendMessage("[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            var fire = ['𝐑𝐞𝐝 𝐒𝐭𝐞𝐰 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍓', '𝐁𝐥𝐮𝐞 𝐒𝐨𝐝𝐚 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍾', '𝐘𝐞𝐥𝐥𝐨𝐰 𝐂𝐮𝐫𝐫𝐲 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍹', '𝐌𝐨𝐮𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐢𝐧𝐠 𝐃𝐢𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🌽', '𝐇𝐨𝐭 𝐏𝐨𝐭 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍖']
            var electric = ['𝐖𝐚𝐭𝐭 𝐚 𝐑𝐢𝐬𝐨𝐭𝐭𝐨 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🥒', '𝐋𝐢𝐠𝐡𝐭-𝐚𝐬-𝐀𝐢𝐫 𝐂𝐚𝐬𝐬𝐞𝐫𝐨𝐥𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍍', '𝐌𝐨𝐮𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐢𝐧𝐠 𝐃𝐢𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍑']
            var nor = ['𝐕𝐞𝐠𝐠𝐢𝐞 𝐒𝐦𝐨𝐨𝐭𝐡𝐢𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🥗', '𝐁𝐫𝐚𝐢𝐧 𝐅𝐨𝐨𝐝 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍣', '𝐏𝐥𝐚𝐢𝐧 𝐂𝐫𝐞𝐩𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍑', '𝐕𝐞𝐠𝐠𝐢𝐞 𝐒𝐦𝐨𝐨𝐭𝐡𝐢𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🥙']
            var co = ['𝐒𝐥𝐮𝐝𝐠𝐞 𝐒𝐨𝐮𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍲', '𝐕𝐞𝐠𝐠𝐢𝐞 𝐒𝐦𝐨𝐨𝐭𝐡𝐢𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🥙', '𝐌𝐨𝐮𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐢𝐧𝐠 𝐃𝐢𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🌽']
            var dat = ['𝐌𝐮𝐝 𝐏𝐢𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍪', '𝐕𝐞𝐠𝐠𝐢𝐞 𝐒𝐦𝐨𝐨𝐭𝐡𝐢𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🥙', '𝐋𝐢𝐠𝐡𝐭-𝐚𝐬-𝐀𝐢𝐫 𝐂𝐚𝐬𝐬𝐞𝐫𝐨𝐥𝐞 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍍', '𝐒𝐭𝐨𝐧𝐞 𝐒𝐨𝐮𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍯']
            var water = ['𝐁𝐥𝐮𝐞 𝐒𝐨𝐝𝐚 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍾', '𝐘𝐞𝐥𝐥𝐨𝐰 𝐂𝐮𝐫𝐫𝐲 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🍹', '𝐌𝐨𝐮𝐭𝐡 𝐖𝐚𝐭𝐞𝐫𝐢𝐧𝐠 𝐃𝐢𝐩 𝐚 𝐥𝐚 𝐂𝐮𝐛𝐞 🌽']
            var msg = [];
            var coins = 500
            if(body == 1) {
                msg += '🔥 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐥𝐮̛̉𝐚\n'
                for (let i in fire) { msg += `${parseInt(i) + 1}. ${fire[i]} - ${parseInt(i)*1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: fire,
                        typePoke: 'Fire'
                    })
                }, messageID);
            }
            if(body == 2) {
                msg += '⚡ 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐞𝐥𝐞𝐜𝐭𝐫𝐢𝐜𝐢𝐭𝐲\n'
                for (let i in electric) { msg += `${parseInt(i) + 1}. ${electric[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: electric,
                        typePoke: 'Electric'
                    })
                }, messageID);
            }
            if(body == 3) {
                msg += '🍄 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐛𝐢̀𝐧𝐡 𝐭𝐡𝐮̛𝐨̛̀𝐧𝐠\n'
                for (let i in nor) { msg += `${parseInt(i) + 1}. ${nor[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: nor,
                        typePoke: 'Normal'
                    })
                }, messageID);
            }
            if(body == 4) {
                msg += '🍀/🐛 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐜𝐨̉/𝐬𝐚̂𝐮\n'
                for (let i in co) { msg += `${parseInt(i) + 1}. ${co[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: co,
                        typePoke: 'Grass'
                    })
                }, messageID);
            }
            if(body == 5) {
                msg += '🗻 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐬𝐨𝐢𝐥/𝐬𝐭𝐨𝐧𝐞\n'
                for (let i in dat) { msg += `${parseInt(i) + 1}. ${dat[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: dat,
                        typePoke: 'Ground'
                    })
                }, messageID);
            }
            if(body == 6) {
                msg += '💧 𝐓𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ 𝐧𝐮̛𝐨̛́𝐜\n'
                for (let i in water) { msg += `${parseInt(i) + 1}. ${water[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: water,
                        typePoke: 'Water'
                    })
                }, messageID);
            }           
        }
        case 'choose_foods': {
            if (isNaN(body)) return api.sendMessage("[====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]====]\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            let balance = (await Currencies.getData(senderID)).money;
            if(balance < parseInt(body) * 1000) return api.sendMessage('Bạn không có đủ tiền để mua thức ăn này\n💰Giá: ' + (parseInt(body) * 1000) + '$', threadID, messageID);
            Currencies.setData(senderID, options = { money: balance - parseInt(body) * 1000 })
            var typ = handleReply.tpy
            var choose = typ[parseInt(body) - 1]
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            user.foods.push({
                name: choose,
                type: handleReply.typePoke,
                HP: fixed(parseInt(body) * 4),
                Attack: fixed(parseInt(body) * 4),
                Defense: fixed(parseInt(body) * 4),
                Speed: fixed(parseInt(body) * 4),
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage('🛍️ 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠: ' + choose + ` - ${(parseInt(body) * 1000)}$\n🧡 𝐇𝐏: ${fixed(parseInt(body) * 4)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${fixed(parseInt(body) * 4)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${fixed(parseInt(body) * 4)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${fixed(parseInt(body) * 4)}\n🐳 𝐓𝐲𝐩𝐞: ${handleReply.typePoke}`, threadID, messageID)
        }
        case 'petFoods': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            var pet = handleReply.pet,
                foods = handleReply.food,
                choose = body.split(" ")
            if (parseInt(choose[0]) > pet.length || parseInt(choose[1]) > foods.length || parseInt(choose[0]) < 1 || parseInt(choose[1]) < 1) return api.sendMessage("[=====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]=====]\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            if(pet[parseInt(choose[0])-1].type.indexOf(foods[parseInt(choose[1])-1].type) !== -1) {
                var HP = ((foods[parseInt(choose[1])-1].HP) * 1.3).toFixed(1)
                var Attack = ((foods[parseInt(choose[1])-1].Attack) * 1.3).toFixed(1)
                var Defense = ((foods[parseInt(choose[1])-1].Defense) * 1.3).toFixed(1)
                var Speed = ((foods[parseInt(choose[1])-1].Speed) * 1.3).toFixed(1)
                var coins = 5000
            } else {
                var HP = (foods[parseInt(choose[1])-1].HP)
                var Attack = (foods[parseInt(choose[1])-1].Attack)
                var Defense = (foods[parseInt(choose[1])-1].Defense)
                var Speed = (foods[parseInt(choose[1])-1].Speed)
                var coins = 2500
            }
                pet[parseInt(choose[0])-1].HP = (pet[parseInt(choose[0])-1].HP + HP)
                pet[parseInt(choose[0])-1].Attack = (pet[parseInt(choose[0])-1].Attack + Attack)
                pet[parseInt(choose[0])-1].Defense = (pet[parseInt(choose[0])-1].Defense + Defense)
                pet[parseInt(choose[0])-1].Speed = (pet[parseInt(choose[0])-1].Speed + Speed)
                pet[parseInt(choose[0])-1].coins = (pet[parseInt(choose[0])-1].coins + coins)
                const index = user.foods.findIndex(item => item.name == foods[parseInt(choose[1])-1].name);
                var name = foods[index].name
                user.foods.splice(index, 1);
                writeFileSync(path, JSON.stringify(user, null, 2));
                api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`${pet[parseInt(choose[0])-1].name} 𝐜𝐡𝐨 𝐩𝐞𝐭 𝐚̆𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${name}\n🔍 𝐂𝐡𝐢̉ 𝐬𝐨̂́ 𝐩𝐞𝐭 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢:\n🧡 𝐇𝐏: ${(pet[parseInt(choose[0])-1].HP)}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${(pet[parseInt(choose[0])-1].Attack)}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${(pet[parseInt(choose[0])-1].Defense)}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${(pet[parseInt(choose[0])-1].Speed)}`, threadID, messageID)
        }
        case 'choose_sell': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const pokeSell = user.pet[parseInt(body)-1].name
            const index = user.pet.findIndex(item => item.name == pokeSell);
            const name = user.pet[index].name
            const coins = user.pet[index].coins
            user.pet.splice(index, 1);
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            let balance = (await Currencies.getData(senderID)).money;
            Currencies.setData(senderID, options = { money: balance + parseInt(coins) })
            return api.sendMessage(`💰 𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐛𝐚́𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${name} 𝐯𝐨̛́𝐢 𝐠𝐢𝐚́ ${coins}$`, threadID, messageID);
        }
        case 'choose_buff': {
            let balance = (await Currencies.getData(senderID)).money;
            if(balance < 70000) return api.sendMessage('Bạn không có đủ tiền để mua pokemon này\n💰Giá: ' + 50000 + '$', threadID, messageID);
            Currencies.setData(senderID, options = { money: balance - 70000 })
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const pokeSell = user.pet[parseInt(body)-1].name
            const index = user.pet.findIndex(item => item.name == pokeSell);
            var poke = user.pet[index]
                poke.HP = (poke.HP + poke.HP * 40/100).toFixed(1)
                poke.Attack = (poke.Attack + poke.Attack * 40/100).toFixed(1)
                poke.Defense = (poke.Defense + poke.Defense * 40/100).toFixed(1)
                poke.Speed = (poke.Speed + poke.Speed * 40/100).toFixed(1)
                poke.coins = (poke.coins + poke.coins * 20/100).toFixed(1)
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`💹 𝐂𝐮̛𝐨̛̀𝐧𝐠 𝐡𝐨́𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${poke.name}\n🔍 𝐂𝐡𝐢̉ 𝐬𝐨̂́ 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢:\n🧡 𝐇𝐏: ${poke.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${poke.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${poke.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${poke.Speed}\n💰 𝐂𝐨𝐢𝐧𝐬: ${poke.coins}$`, threadID, messageID);
        }
        case 'choose_box': {
            let balance = (await Currencies.getData(senderID)).money;
            if(body == 1) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.PRO) > 0) {
                    var time = cooldown - (Date.now() - data.PRO),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 5000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 5000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 5000 })
                var msg = '📦 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐫𝐮̛𝐨̛𝐧𝐠 𝐭𝐡𝐮̛𝐨̛̀𝐧𝐠 (𝟓𝟎𝟎𝟎$)\𝐧👉𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "👍" 𝐯𝐚̀𝐨 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐨̛̉ 𝐧𝐨́'
                    api.unsendMessage(handleReply.messageID)
 
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 0.5,
                        money: 5000
                    })
                }, messageID);
            }
            if(body == 2) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.ULTRA) > 0) {
                    var time = cooldown - (Date.now() - data.ULTRA),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 10000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 10000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 10000 })
                var msg = '🗳 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐫𝐮̛𝐨̛𝐧𝐠 𝐭𝐮𝐲𝐞̣̂𝐭 𝐩𝐡𝐚̂̉𝐦 (𝟏𝟎𝟎𝟎𝟎$)\𝐧👉 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "👍" 𝐯𝐚̀𝐨 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐨̛̉ 𝐧𝐨́'
                    api.unsendMessage(handleReply.messageID)
 
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 1,
                        money: 10000
                    })
                }, messageID);
            }
            if(body == 3) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.MEGA) > 0) {
                    var time = cooldown - (Date.now() - data.MEGA),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 20000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 20000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 20000 })
                var msg = '💎 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐫𝐮̛𝐨̛𝐧𝐠 𝐕𝐈𝐏 (𝟐𝟎𝟎𝟎𝟎$)\𝐧👉 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "👍" 𝐯𝐚̀𝐨 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐨̛̉ 𝐧𝐨́'
                    api.unsendMessage(handleReply.messageID)
 
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 1.5,
                        money: 20000
                    })
                }, messageID);
            }
            if(body == 4) {
                const cooldown = 86400000 * 7
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.FREE) > 0) {
                    var time = cooldown - (Date.now() - data.FREE),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                var msg = '💣 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐫𝐮̛𝐨̛𝐧𝐠 𝐅𝐑𝐄𝐄 𝟑 𝐧𝐠𝐚̀𝐲/𝟏 𝐥𝐚̂̀𝐧 (𝟎$)\𝐧👉 𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 "👍" 𝐯𝐚̀𝐨 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐦𝐨̛̉ 𝐧𝐨́'
                    api.unsendMessage(handleReply.messageID)
 
                return api.sendMessage(msg, threadID, async (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 0.4,
                        money: 0
                    })
                }, messageID);
            }
        }
        case 'playerSolo': {
            var author = handleReply.author
            var name = (await Users.getData(author)).name
            if (isNaN(body)) return api.sendMessage("[=====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]=====]\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if(parseInt(body) > handleReply.pet.length || parseInt(body) < 1) return api.sendMessage("[=====[ 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 ]=====]\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            var pet = handleReply.pet[parseInt(body) -1]
            api.unsendMessage(handleReply.messageID)
            var image = [];
            var gameThread = global.pokemon.get(threadID) || {};
            var s = gameThread.player.findIndex(i => i.userID == senderID);
            var q = gameThread.player[s];
            gameThread.player.splice(s, 1);
            gameThread.player.push({ name: q.name, userID: senderID, choose: { status: true, msg: { name: pet.name ,type: pet.type, HP: pet.HP, Attack: pet.Attack, Defense: pet.Defense, Speed: pet.Speed, skill: pet.skill, images: pet.images } } });
                gameThread.number = gameThread.number + 1;
                global.pokemon.set(threadID, gameThread);
                let pokemon = (await axios.get(pet.images, { responseType: "arraybuffer" } )).data;
                writeFileSync( __dirname + `/pokemon/cache/${gameThread.number}.png`, Buffer.from(pokemon, "utf-8") );
                image.push(createReadStream(__dirname + `/pokemon/cache/${gameThread.number}.png`));
                var msg = { body: `🎉 ${name} 𝐯𝐮̛̀𝐚 𝐜𝐡𝐨̣𝐧 ${pet.name}\n⚔️ 𝐓𝐲𝐩𝐞: ${pet.type}\n📋 𝐂𝐡𝐢̉ 𝐬𝐨̂́:\n🧡 𝐇𝐏: ${pet.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${pet.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${pet.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${pet.Speed}\n📌 𝐒𝐤𝐢𝐥𝐥: ${pet.skill.join(', ')}`, attachment: image }
                api.sendMessage(msg, senderID)
            api.sendMessage(name + ' 𝐯𝐮̛̀𝐚 𝐡𝐨𝐚̀𝐧 𝐭𝐚̂́𝐭 𝐯𝐢𝐞̣̂𝐜 𝐜𝐡𝐨̣𝐧 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 🎐', threadID, messageID)
            if(gameThread.number != 2) return;
            if(gameThread.number == 2) {
                setTimeout(() => {
                    var msg = [], i = 1;
                    for (let user of gameThread.player) {
                        var data = user.choose.msg
                        msg += `「 👤 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢 ${i++} 」: ${user.name}\n👾 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐱𝐮𝐚̂́𝐭 𝐭𝐫𝐚̣̂𝐧: ${data.name}\n⚔️ 𝐓𝐲𝐩𝐞: ${data.type}\n👉 𝐂𝐚́𝐜 𝐜𝐡𝐢̉ 𝐬𝐨̂́ 𝐜𝐨̛ 𝐛𝐚̉𝐧:\n🧡 𝐇𝐏: ${data.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${data.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${data.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${data.Speed}\n📌 𝐒𝐤𝐢𝐥𝐥: ${data.skill.join(', ')}\n\n`
                    }
                    api.sendMessage(msg, threadID, messageID);
                }, 5000);
                var map = [
                        'Bản đồ trên không', 
                        'Bản đồ trên mặt nước', 
                        'Bản đồ núi lửa', 
                        'Bản đồ mưa (có sấm)', 
                        'Bản đồ trong rừng', 
                        'Bản đồ núi đá', 
                        'Bản đồ băng tuyết', 
                        'Bản đồ sương mù', 
                        'Bản đồ Mê cung',
                        'Bản đồ ma quái',
                        'Bản đồ vũ trụ',
                        'Bản đồ cao nguyên xanh'
                        ];
                var rdMap = map[Math.floor(Math.random() * map.length)];   
                setTimeout(() => {
                    if(map[0] == rdMap) var buffType = 'Flying, Fire, Normal';
                    if(map[1] == rdMap) var buffType = 'Water, Electric, Ghost';
                    if(map[2] == rdMap) var buffType = 'Fire, Water, Dragon';
                    if(map[3] == rdMap) var buffType = 'Electric, Water, Grass';
                    if(map[4] == rdMap) var buffType = 'Bug, Grass, Fire';
                    if(map[5] == rdMap) var buffType = 'Ground, Rock, Electric';
                    if(map[6] == rdMap) var buffType = 'Ice, Steel, Psychic';
                    if(map[7] == rdMap) var buffType = 'Steel, Ghost, Rock';
                    if(map[8] == rdMap) var buffType = 'Dark, Ghost, Grass';
                    if(map[9] == rdMap) var buffType = 'Ground, Steel, Rock';
                    if(map[10] == rdMap) var buffType = 'Flying, Dragon, Dark';
                    if(map[10] == rdMap) var buffType = 'Bug, Ice, Flying';
                    if(map[11] == rdMap) var buffType = 'Poison, Normal, Dark';
                    api.sendMessage(`🔮──── •☣️• ────🔮\n「 𝐑𝐀𝐍𝐃𝐎𝐌 𝐌𝐀𝐏 」- ${rdMap} 🏟️\n💪 𝐓𝐚̆𝐧𝐠 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 𝐜𝐡𝐨 𝐡𝐞̣̂ '${buffType}\n🔮──── •☣️• ────🔮'`, threadID);
                    setTimeout(() => {
                        var user_1 = gameThread.player[0]
                        var user_2 = gameThread.player[1]
                        var image = [];
                        if(buffType.indexOf(user_1.choose.msg.type) !== -1) {
                            var search = gameThread.player.findIndex(i => i.userID == user_1.userID);
                            var index = gameThread.player[search].choose.msg;
                                index.HP = fixed(index.HP + index.HP * 40/100);
                                index.Attack = fixed(index.Attack + index.Attack * 40/100);
                                index.Defense = fixed(index.Defense + index.Defense * 40/100);
                                index.Speed = fixed(index.Speed + index.Speed * 40/100);
                                global.pokemon.set(threadID, gameThread);
                            var poke_1 = gameThread.player[search] || {};
                            api.sendMessage(`👤 ${poke_1.name}\n🗺️ 𝐌𝐀𝐏 𝐏𝐊 𝐁𝐔𝐅𝐅 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 𝐜𝐡𝐨 ${poke_1.choose.msg.name}\n🧡 𝐇𝐏: ${poke_1.choose.msg.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${poke_1.choose.msg.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${poke_1.choose.msg.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${poke_1.choose.msg.Speed}`, threadID);
                        }
                        if(buffType.indexOf(user_2.choose.msg.type) !== -1) {
                            var search = gameThread.player.findIndex(i => i.userID == user_2.userID);
                            var index = gameThread.player[search].choose.msg;
                                index.HP = fixed(index.HP + index.HP * 40/100);
                                index.Attack = fixed(index.Attack + index.Attack * 40/100);
                                index.Defense = fixed(index.Defense + index.Defense * 40/100);
                                index.Speed = fixed(index.Speed + index.Speed * 40/100);
                                global.pokemon.set(threadID, gameThread);
                            var poke_2 = gameThread.player[search] || {};
                            api.sendMessage(`👤 ${poke_2.name}\n🗺️ 𝐌𝐀𝐏 𝐏𝐊 𝐁𝐔𝐅𝐅 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 𝐜𝐡𝐨 ${poke_2.choose.msg.name}\n🧡 𝐇𝐏: ${poke_2.choose.msg.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${poke_2.choose.msg.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${poke_2.choose.msg.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${poke_2.choose.msg.Speed}`, threadID);
                        }
                        //---------->canvas<-----------//
                        var skill = pet.skill
                        setTimeout( async function () {
                            var { loadImage, createCanvas, Canvas } = require("canvas");
                            var Canvas = require("canvas");
                            var fs = require("fs-extra");
                            if(!existsSync(__dirname+'/pokemon/cache/Bangers-Regular.ttf')) { 
                                let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1tD8kgjXszN_amDVUPwbGdlT6PJxDRhYq&export=download`, { responseType: "arraybuffer" })).data;
                                writeFileSync(__dirname+"/pokemon/cache/Bangers-Regular.ttf", Buffer.from(getfont, "utf-8"));
                            };
                            var backgoundP = (await axios.get('https://i.imgur.com/fIiQ3nQ.jpg', { responseType: "arraybuffer" })).data;
                            writeFileSync(__dirname + "/cache/backgound.png", Buffer.from(backgoundP, "utf-8") );
                            var pokemonF = (await axios.get(user_1.choose.msg.images, { responseType: "arraybuffer" } )).data; 
                            writeFileSync(__dirname + "/cache/pokemonF.png", Buffer.from(pokemonF, "utf-8") );
                            var pokemonS = (await axios.get(user_2.choose.msg.images, { responseType: "arraybuffer" } )).data; 
                            writeFileSync(__dirname + "/cache/pokemonS.png", Buffer.from(pokemonS, "utf-8") );
                            var loadBackgound = await loadImage(__dirname + "/cache/backgound.png");
                            var loadPokeF = await loadImage(__dirname + "/cache/pokemonF.png");
                            var loadPokeS = await loadImage(__dirname + "/cache/pokemonS.png");
                            var canvas = createCanvas(loadBackgound.width, loadBackgound.height);
                            Canvas.registerFont(__dirname + `/pokemon/cache/Bangers-Regular.ttf`, { family: "Bangers-Regula" });
                            var ctx = canvas.getContext("2d");
                                ctx.drawImage(loadBackgound, 0, 0, canvas.width, canvas.height);
                                ctx.drawImage(loadPokeF, 251, 196, 400, 400);
                                ctx.drawImage(loadPokeS, 1279, 196, 400, 400);
                                ctx.font = "55px Bangers-Regula";
                                ctx.fillStyle = "#0000BB";
                                ctx.textAlign = "center";
                                ctx.fillText(user_1.choose.msg.name, 392, 790);
                                ctx.fillText(user_2.choose.msg.name, 1516, 790);
                            var imageBuffer = canvas.toBuffer();
                            writeFileSync(__dirname + "/cache/backgound.png", imageBuffer);
                            api.sendMessage({body: `[== 𝐏𝐎𝐊𝐄𝐌𝐎𝐍 𝐒𝐎𝐋𝐎 ==]\n🧡${user_1.choose.msg.name} ⚔️ ${user_2.choose.msg.name}🧡`, attachment: createReadStream(__dirname + "/cache/backgound.png")},threadID)
                            setTimeout( async function () {
                                var content = [user_1.choose.msg.images, 'https/://i.imgur.com/LH5R3IX.png', user_2.choose.msg.images, 'https://i.imgur.com/SfTPzSU.png', 'https://i.imgur.com/pPR2ghw.png']
                                var GIFEncoder = require('gifencoder');
                                var encoder = new GIFEncoder(500, 500);
                                encoder.start();
                                var canvas = createCanvas(500, 500);
                                var ctx = canvas.getContext('2d');
                                var i = 0;
                                for(let id of content) {
                                  encoder.setRepeat(-1);  
                                  encoder.setDelay(1000); 
                                  encoder.setQuality(10);
                                  try { 
                                    var pathPokeGif = (__dirname+`/cache/poke${i++}.png`)
                                    var imagee = (await axios.get(id, { responseType: 'arraybuffer' })).data; 
                                    writeFileSync(pathPokeGif, Buffer.from(imagee, 'utf-8'));
                                    let baseImage = await loadImage(pathPokeGif);
                                    ctx.shadowColor = '#FFFF00';
                                    ctx.shadowBlur = 60;
                                    ctx.shadowOffsetX = 0;
                                    ctx.shadowOffsetY = 0;
                                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                                    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
                                    encoder.addFrame(ctx);
                                    unlinkSync(pathPokeGif)
                                  } 
                                  catch(e) { continue }
                                }
                                encoder.finish();
                                const path = __dirname + '/pokemon/cache/abc.gif'
                                const buf = encoder.out.getData();
                                writeFile(path, buf)
                                setTimeout( function () {
                                    api.sendMessage({body: '⚔️ 𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉ 𝐏𝐊 𝐬𝐞̃ 𝐜𝐨́ 𝐬𝐚𝐮 𝐠𝐢𝐚̂𝐲 𝐥𝐚́𝐭 !', attachment: createReadStream(path)}, threadID)
                                    var index_1 = poke_1 || user_1
                                    var index_2 = poke_2 || user_2
                                    var name_1 = index_1.name
                                    var name_2 = index_2.name
                                    var TB_1 = index_1.choose.msg.HP + index_1.choose.msg.Attack + index_1.choose.msg.Defense + index_1.choose.msg.Speed
                                    var TB_2 = index_2.choose.msg.HP + index_2.choose.msg.Attack + index_2.choose.msg.Defense + index_2.choose.msg.Speed
                                    setTimeout( async function () {
                                        var imageee = [];
                                        const pathA = require("path");
                                        global.pokemon.delete(threadID);
                                        if(TB_1 > TB_2) {
                                            let pokemon = (await axios.get(index_1.choose.msg.images, { responseType: "arraybuffer" } )).data;
                                            writeFileSync( __dirname + `/pokemon/cache/nguoichoi1.png`, Buffer.from(pokemon, "utf-8") );
                                            imageee.push(createReadStream(__dirname + `/pokemon/cache/nguoichoi1.png`));
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var find = user_1.pet.find(i => i.name == index_1.choose.msg.name)
                                                find.HP = (find.HP + find.HP * 5/100);
                                                find.Attack = (find.Attack + find.Attack * 5/100);
                                                find.Defense = (find.Defense + find.Defense * 5/100);
                                                find.Speed = (find.Speed + find.Speed * 5/100);
                                                find.coins = (find.coins + find.coins * 5/100);
                                            var win = user_1.solo
                                                win.win = win.win + 1
                                            var find = user_2.pet.find(i => i.name == index_2.choose.msg.name)
                                                find.HP = (find.HP - find.HP * 5/100);
                                                find.Attack = (find.Attack - find.Attack * 5/100)
                                                find.Defense = (find.Defense - find.Defense * 5/100);
                                                find.Speed = (find.Speed - find.Speed * 5/100);
                                                find.coins = (find.coins - find.coins * 5/100);
                                            var lose = user_2.solo
                                                lose.lose = lose.lose + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            var msg = {body: `[=== 𝐊𝐄̂́𝐓 𝐐𝐔𝐀̉ 𝐒𝐎𝐋𝐎 ===]\n\n🎉 ${index_1.choose.msg.name} 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 ${name_1} 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐢𝐞̂́𝐧 𝐭𝐡𝐚̆́𝐧𝐠𝐠𝐠 !\n💸 𝗧𝗮̂́𝘁 𝗰𝗮̉ 𝗰𝗵𝗶̉ 𝘀𝗼̂́ 𝗰𝗼̛ 𝗯𝗮̉𝗻 𝗰𝘂̉𝗮 𝗽𝗼𝗸𝗲𝗺𝗼𝗻 𝘁𝗵𝗮̆́𝗻𝗴 𝗻𝗮̀𝘆 𝘁𝗮̆𝗻𝗴 𝗹𝗲̂𝗻 𝟱%, 𝗻𝗴𝘂̛𝗼̛̣𝗰 𝗹𝗮̣𝗶 𝘁𝗵𝗶̀ 𝘀𝗲̃ 𝗯𝗶̣ 𝘁𝗿𝘂̛̀ 𝟱% !`, attachment: imageee}
                                            return api.sendMessage(msg, threadID);
                                        } 
                                        else if(TB_1 < TB_2) { 
                                            let pokemon = (await axios.get(index_2.choose.msg.images, { responseType: "arraybuffer" } )).data;
                                            writeFileSync( __dirname + `/pokemon/cache/nguoichoi2.png`, Buffer.from(pokemon, "utf-8") );
                                            imageee.push(createReadStream(__dirname + `/pokemon/cache/nguoichoi2.png`));
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var find = user_2.pet.find(i => i.name == index_2.choose.msg.name)
                                                find.HP = (find.HP + find.HP * 5/100);
                                                find.Attack = (find.Attack + find.Attack * 5/100);
                                                find.Defense = (find.Defense + find.Defense * 5/100);
                                                find.Speed = (find.Speed + find.Speed * 5/100);
                                                find.coins = (find.coins + find.coins * 5/100);
                                            var win = user_2.solo
                                                win.win = win.win + 1
                                            var find = user_1.pet.find(i => i.name == index_1.choose.msg.name)
                                                find.HP = (find.HP - find.HP * 5/100);
                                                find.Attack = (find.Attack - find.Attack * 5/100);
                                                find.Defense = (find.Defense - find.Defense * 5/100);
                                                find.Speed = (find.Speed - find.Speed * 5/100);
                                                find.coins = (find.coins - find.coins * 5/100);
                                            var lose = user_1.solo
                                                lose.lose = lose.lose + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            var msg = {body: `[=𝐊𝐄̂́𝐓 𝐐𝐔𝐀̉ 𝐒𝐎𝐋𝐎=]\n\n🎉 ${index_2.choose.msg.name} 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗵𝗼̛𝗶 ${name_2} 𝐝𝐚̀𝐧𝐡 𝐜𝐡𝐢𝐞̂́𝐧 𝐭𝐡𝐚̆́𝐧𝐠𝐠𝐠 !\n💸 𝗧𝗮̂́𝘁 𝗰𝗮̉ 𝗰𝗵𝗶̉ 𝘀𝗼̂́ 𝗰𝗼̛ 𝗯𝗮̉𝗻 𝗰𝘂̉𝗮 𝗽𝗼𝗸𝗲𝗺𝗼𝗻 𝘁𝗵𝗮̆́𝗻𝗴 𝗻𝗮̀𝘆 𝘁𝗮̆𝗻𝗴 𝗹𝗲̂𝗻 𝟱%, 𝗻𝗴𝘂̛𝗼̛̣𝗰 𝗹𝗮̣𝗶 𝘁𝗵𝗶̀ 𝘀𝗲̃ 𝗯𝗶̣ 𝘁𝗿𝘂̛̀ 𝟱% !`, attachment: imageee}
                                            return api.sendMessage(msg, threadID);
                                        } 
                                        else {
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var win = user_1.solo
                                                win.draw = win.draw + 1
                                            var win = user_2.solo
                                                win.draw = win.draw + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            return api.sendMessage('🎉 𝐂𝐚́𝐜 𝐜𝐡𝐢̉ 𝐬𝐨̂́ 𝐜𝐮̉𝐚 𝐜𝐚̉ 𝟐 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐠𝐚̂̀𝐧 𝐧𝐡𝐮̛ 𝐛𝐚̆̀𝐧𝐠 𝐧𝐡𝐚𝐮 𝐧𝐞̂𝐧 𝐭𝐫𝐚̣̂𝐧 𝐧𝐚̀𝐲 𝐡𝐨̀𝐚 !', threadID); 
                                        }
                                    }, 7000);
                                }, 2000);
                            }, 500);
                        }, 3000);
                    }, 2000);
                }, 8000);
            }
        }
    }
}
module.exports.handleReaction = async ({ api, event, handleReaction, Currencies }) => {
    if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
    const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync, existsSync, createReadStream } = require("fs-extra")
    const axios = require("axios")
    if (event.reaction != "👍") return;
    switch (handleReaction.type) {
        case 'buyPokemon': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${handleReaction.author}.json`);
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            const index = listPoke[handleReaction.ID];
            let balance = (await Currencies.getData(handleReaction.author)).money;
            if(user.pet.some(i => i.name == index.name) == true) return api.sendMessage('❌ 𝐁𝐚̣𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐚̀𝐲 𝐫𝐨̂̀𝐢', threadID, messageID);
            if(balance < parseInt(index.coins)) return api.sendMessage('𝐁𝐚̣𝐧 𝐭𝐡𝐢𝐞̂́𝐮 𝐭𝐢𝐞̂̀𝐧 𝐧𝐞̂́𝐮 𝐦𝐮𝐚 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐚̀𝐲\n💰 𝐆𝐢𝐚́: ' + index.coins + '$', threadID, messageID);
            Currencies.setData(handleReaction.author, options = { money: balance - parseInt(index.coins) })
            var skill = [], skillS = []
            for (let i of index.skill) {
                skill.push(i[0])
                skillS += i[0] + ', '
            }
            user.pet.push({
                name: index.name,
                type: index.type,
                HP: index.power.HP,
                Attack: index.power.Attack,
                Defense: index.power.Defense,
                Speed: index.power.Speed,
                coins: index.coins,
                skill: skill,
                images: index.images
            })
            var image = [];
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(index.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            api.unsendMessage(handleReaction.messageID)
            var msg = {body: `🛍️ 𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠: ${index.name} - ${index.coins}$\n🔍 𝐂𝐡𝐢̉ 𝐬𝐨̂́:\n🧡 𝐇𝐏: ${index.power.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${index.power.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${index.power.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${index.power.Speed}\n📌 𝐒𝐤𝐢𝐥𝐥: ${skillS.replace(/,\s*$/, "")}`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'infoPoke': {
            var skill = [];
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            var msg = `🔍 𝐒𝐨̂́ 𝐏𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
            var ii = 0;
            for (let i of user.pet) {
                msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳 𝐓𝐲𝐩𝐞: ${i.type}\n🧡 𝐇𝐏: ${i.HP}\n🗡 𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡 𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️ 𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n📌 𝐒𝐤𝐢𝐥𝐥: ${i.skill.join(', ')}\n\n`
            }
            api.unsendMessage(handleReaction.messageID)
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "infoPet",
                    user
                })
            }, messageID);
        }
        case 'openBox': {
            api.unsendMessage(handleReaction.messageID)
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${handleReaction.author}.json`);
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            var rd = listPoke[Math.floor(Math.random() * listPoke.length)]; 
            var image = [];
            if(user.pet.includes(rd)) {
                let balance = (await Currencies.getData(handleReaction.author)).money;
                Currencies.setData(handleReaction.author, options = { money: balance + parseInt(rd.coins) })
                return api.sendMessage(`❌Bạn mở trúng ${rd.name} nhưng bạn đã sở hữu rồi nên được hoàn tiền lại❌`, threadID, messageID);
            }
            if(handleReaction.tpy == 0.5) {
                data.PRO = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 1) {
                data.ULTRA = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 1.5) {
                data.MEGA = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 0.4) {
                data.FREE = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            var skill = [], skillS = []
            for (let i of rd.skill) {
                skill.push(i[0])
                skillS += i[0] + ', '
            }
            user.pet.push({
                name: rd.name,
                type: rd.type,
                HP: (rd.power.HP * handleReaction.tpy).toFixed(1),
                Attack: (rd.power.Attack * handleReaction.tpy).toFixed(1),
                Defense: (rd.power.Defense * handleReaction.tpy).toFixed(1),
                Speed: (rd.power.Speed * handleReaction.tpy).toFixed(1),
                skill: skill,
                coins: handleReaction.money,
                images: rd.images
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(rd.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `🎉Xin chúc mừng!\n☑️Bạn mở trúng ${rd.name}.\nType: ${rd.type}\n🔍Chỉ số: \n🧡HP: ${(rd.power.HP* handleReaction.tpy).toFixed(1)}\n🗡Attack: ${(rd.power.Attack* handleReaction.tpy).toFixed(1)}\n🛡Defense: ${(rd.power.Defense* handleReaction.tpy).toFixed(1)}\n⚡️Speed: ${(rd.power.Speed* handleReaction.tpy).toFixed(1)}\n📌Skill: ${skillS.replace(/,\s*$/, "")}\n💰Coins: ${handleReaction.money}$\n☑️Đã thêm pokemon vào kho đồ của bạn!`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
    }
}