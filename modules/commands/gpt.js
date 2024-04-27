module.exports.config = {
 name: "gpt",
 version: "1.0.2",
 hasPermssion: 0,
 credits: "Quất",
 description: "gpt chat AI",
 commandCategory: "Tiện ích",
 usages: "[Script]",
 cooldowns: 5,
 usePrefix: false,
}

module.exports.run = async function({ api, event:e, args, Threads, Users, Currencies, models }) {
 var axios = require('axios');
 var api_key = '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';
 var query = (e.type === 'message_reply' ? args.join(' ') + ' "' + e.messageReply.body + '"': args.join(' '));
 var encodedQuery = encodeURIComponent(query);
 var response = await axios.post('https://api.openai.com/v1/chat/completions', {
 model: 'gpt-3.5-turbo',
 messages: [{ role: 'system', content: 'Chào bạn' }, { role: 'user', content: encodedQuery }],
 }, {
 headers: {
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${api_key}`,
 }
 });
 var result = response.data.choices[0].message.content;
 try {
 const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
		const { resolve } = global.nodemodule["path"];
		var languageToSay = (["ru","en","ko","ja"].some(item => result.indexOf(item) == 0)) ? result.slice(0, content.indexOf(" ")) : global.config.language;
		var msg = (languageToSay != global.config.language) ? result.slice(3, result.length) : result;
		const path = resolve(__dirname, 'cache', `gptchat.mp3`);
		await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);
		return api.sendMessage({body: `📝 𝙶𝙿𝚃 𝟹.𝟻 𝙰𝙸 👾:\n\n${result}\n─────────────────\n🔐 𝙱𝚢 𝙳𝚘𝚗𝚐𝙳𝚎𝚟`, attachment: createReadStream(path)}, e.threadID, () => unlinkSync(path), e.messageID);
 api.sendMessage(`📝 𝙶𝙿𝚃 𝟹.𝟻 𝙰𝙸 👾:\n\n${result}\n─────────────────\n🔐 𝙱𝚢 𝙳𝚘𝚗𝚐𝙳𝚎𝚟`, e.threadID, e.messageID);
 } catch (error) {
 console.error(error);
 api.sendMessage(`📝 𝙶𝙿𝚃 𝟹.𝟻 𝙰𝙸 👾:\n\n${result}\n─────────────────\n🔐 𝙱𝚢 𝙳𝚘𝚗𝚐𝙳𝚎𝚟`, e.threadID, e.messageID);
 }
}