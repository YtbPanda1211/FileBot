module.exports.config = {
	name: 'hunter', // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: '1.1.1', // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: 'DungUwU', // Công nhận module sở hữu là ai
	description: 'A Hunter Game', // Thông tin chi tiết về lệnh
	commandCategory: 'Game', // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: '', // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
		'axios': '',
		'fs': '',
		'canvas': ''
	},
	envConfig: {
		userToken: 'D7tTFhgD',
		adminToken: 'ZkSy3UsT'
	}
};

module.exports.languages = {
	'vi': {
		'menu': `
		=== [ HUNTER ] ===
		1. Đăng Ký
		2. Tài Khoản Của Bạn
		3. Bảng Xếp Hạng
		4. Tấn công
		5. Vũ Khí
		» Phản hồi tin nhắn này lựa chọn của bạn.
		`,
		'invalid_option': 'Lựa chọn không hợp lệ.',
		'register_success': 'Đăng ký thành công!\nBạn nhận được knife-F!',
		'already_registered': 'Bạn đã đăng ký từ trước!',
		'invalid_token': 'Token không hợp lệ, vui lòng liên hệ Admin!',
		'profile': '=== [ HUNTER PROFILE ] ===\nTên: %1\nVũ Khí: %2\nPhi Tiêu: %3\nSức Mạnh: %4\nThắng: %5\nThua: %6',
		'user_not_exist': 'Bạn chưa đăng ký!',
		'cannot_get_info': 'Không thể lấy thông tin, vui lòng thử lại sau',
		'leaderboard': '=== [ BẢNG XẾP HẠNG ] ===\n\n%1\nThứ hạng của bạn: %2',
		'no_user_in_thread': 'Không có người chơi nào trong nhóm này cả',
		'no_user': 'Không tìm thấy người dùng nào trong csdl.',
		'prepare_game': '=== [ MATCH FOUND ] ===\n\nNgười chơi 1: %1 (%2)\nNgười chơi 2: %3 (%4)\n\n» Để bắt đầu, cả hai phải cùng thả cảm xúc vào tin nhắn này!',
		'game_canceled': 'Game đã bị hủy bỏ vì cả 2 bên đã không thả cảm xúc vào tin nhắn này đúng thời hạn.',
		'game_start': 'Trò Chơi Bắt Đầu!!\nThợ Săn: %1 (%2)\nNạn Nhân: %3 (%4)\nĐang tính toán kết quả...',
		'hunter_win': 'Thợ săn chiến thắng và lấy được %1% số tiền từ số dư của nạn nhân!',
		'victim_win': 'Nạn nhân đã tự bảo vệ bản thân và lấy được %1% số tiền từ số dư của thợ săn!',
		'weapon_menu': '=== [ Vũ Khí ] ===\n\n1. Vũ Khí của bạn\n2. Cửa hàng vũ khí\n\n» Phản hồi tin nhắn này lựa chọn của bạn.',
		'weapon_info': 'Tên: %1\nPhi Tiêu: %2\nSức Mạnh: %3',
		'no_weapon_available': 'Hiện không có vũ khí nào khả dụng.',
		'weapons': '=== [ CỬA HÀNG VŨ KHÍ ] ===\n%1\n» Phản hồi tin nhắn này vũ khí bạn muốn mua theo số',
		'not_enough_money': 'Số dư của bạn không đủ để mua.',
		'weapon_bought': 'Mua thành công %1.\nSức mạnh của bạn đã được nâng lên %2.',
		'buying_shuriken': '» Phản hồi tin nhắn này số phi tiêu bạn muốn mua.\n» Số phi tiêu có thể mua: %1',
		'shuriken_bought': 'Mua thành công %1 phi tiêu.\nTổng số phi tiêu hiện có của bạn là: %2',
	},
	'en': {
		'menu': `
		=== [ HUNTER ] ===
		1. Register
		2. Your Profile
		3. Leaderboard
		4. Attack
		5. Weapon
		» Reply with the number of the option you want to choose.
		`,
		'invalid_option': 'Invalid option. Please try again.',
		'register_success': 'Successfully registered!\nYou received a knife-F!',
		'already_registered': 'You have already registered!',
		'invalid_token': 'Invalid Token, contact admin!',
		'profile': '=== [ HUNTER PROFILE ] ===\nName: %1\nWeapon: %2\nShuriken(s): %3\nPower: %4\nWin: %5\nLose: %6',
		'user_not_exist': 'You have not registered yet!',
		'cannot_get_info': 'Cannot get information, please try again later!',
		'leaderboard': '=== [ LEADERBOARD ] ===\n\n%1\nYour Rank: %2',
		'no_user_in_thread': 'There is no registered user in this thread.',
		'no_user': 'Not found any user in the database.',
		'prepare_game': '=== [ MATCH FOUND ] ===\n\nPlayer 1: %1 (%2)\nPlayer 2: %3 (%4)\n\n» For the game to start, both of you must react this message!',
		'game_canceled': 'Game canceled because both of the player did not react this message in time.',
		'game_start': 'Hunter Game Started!\nHunter: %1 (%2)\nVictim: %3 (%4)\nCalculating...',
		'hunter_win': 'The hunter won and got %1% of all money from victim\'s balance!',
		'victim_win': 'The victim has protected him/herself and got %1% of all money from the hunter\'s balance!',
		'weapon_menu': '=== [ WEAPON ] ===\n\n1. My weapon\n2. Weapons Shop\n\n» Reply with the number of the option you want to choose.',
		'weapon_info': 'Name: %1\nShuriken(s): %2\nPower: %3',
		'no_weapon_available': 'There is no weapon available in the shop.',
		'weapons': '=== [ WEAPONS SHOP ] ===\n%1\n» Reply with the number of the weapon you want to buy.',
		'not_enough_money': 'You do not have enough money to buy this weapon.',
		'weapon_bought': 'You have successfully bought %1.\nYour Power has been increased to %2.',
		'buying_shuriken': '» Please reply with the number of the shuriken you want to buy.\n» Buyable shuriken(s): %1',
		'shuriken_bought': 'You have successfully bought %1 shuriken(s).\nYou now have %2 shuriken(s).',
	}
}


const hunterAPI = 'https://Ryanair-Hello-Word-Api-Hunter.chauminhtri2022.repl.co';
const hunterBanner = 'https://i.ibb.co/3CqkfyS/banner.jpg';

module.exports.onLoad = async function () {
	await global.nodemodule['axios'].get("https://raw.githubusercontent.com/RFS-ADRENO/mirai-modules/main/version.json").then(res => {
		if (res.data["hunter_x055"] != this.config.version);
	});
	if (!global.client.hasOwnProperty('hunterDU')) global.client.hunterDU = [];
	
}

module.exports.handleReply = async function ({ api, event, getText, Users, Threads, Currencies, handleReply }) {
	if (!global.client.hasOwnProperty('hunterDU')) global.client.hunterDU = [];
	const { threadID, messageID, senderID, body } = event;
	const { author, type, step } = handleReply;
	const { get, post } = global.nodemodule['axios'];
	if (!body) return;
	const chosenIndex = parseInt(body);
	if (isNaN(chosenIndex) || chosenIndex < 1) return api.sendMessage(getText('invalid_option'), threadID, messageID);
	if (type == 'menu') {
		if (chosenIndex > 5) return api.sendMessage(getText('invalid_option'), threadID, messageID);
		else if (chosenIndex == 1) {
			const info = {
				userID: senderID,
				accessToken: global.configModule[this.config.name].userToken
			};
			post(hunterAPI + '/register', info)
				.then(async res => {
					if (res.data.data) {
						try {
							const weaponImage = (await get(res.data.image, { responseType: 'stream' })).data;
							api.sendMessage({
								body: getText('register_success'),
								attachment: weaponImage
							}, threadID, messageID);
						} catch (e) {
							return api.sendMessage(getText('connot_get_info'), threadID, messageID);
						}
					} else {
						api.sendMessage(getText('register_failed'), threadID, messageID);
					}
				})
				.catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		} else if (chosenIndex == 2) {
			get(hunterAPI + `/info?userID=${senderID}&accessToken=${global.configModule[this.config.name].adminToken}`)
				.then(async (res) => {
					const user = res.data.data;
					let userName = await Users.getNameUser(senderID);
					if (user) {
						try {
							const userPower = user.weapon.power + (user.shuriken ? 15 : 0);
							const msg = getText('profile', userName, user.weapon.name, user.shuriken, userPower, user.win, user.lose);
							const weaponImage = (await get(user.weapon.image, { responseType: 'stream' })).data;
							return api.sendMessage({
								body: msg,
								attachment: weaponImage
							}, threadID, messageID);
						} catch (err) {
							return api.sendMessage(getText('connot_get_info'), threadID, messageID);
						}
					} else {
						return api.sendMessage(getText('connot_get_info'), threadID, messageID);
					}
				})
				.catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		} else if (chosenIndex == 3) {
			get(hunterAPI + `/list?accessToken=${global.configModule[this.config.name].adminToken}`)
				.then(async (res) => {
					let msg = null;

					let allUsers = res.data.data;
					let scores = await allUsers.map(async (user) => {
						return {
							userID: user.userID,
							name: await Users.getNameUser(user.userID),
							score: (user.win * 3) - (user.lose),
							win: user.win,
							lose: user.lose
						}
					});
					scores = await Promise.all(scores);
					scores.sort((a, b) => {
						if (a.score > b.score) return -1;
						if (a.score < b.score) return 1;
						return a.name.localeCompare(b.name);
					});
					console.log(scores)
					if (scores.length == 0) {
						return api.sendMessage(getText('no_user'), threadID, messageID);
					}
					let userRank = scores.findIndex(user => user.userID == senderID) + 1;
					scores = scores.slice(0, 10);
					let top_10 = '';
					scores.forEach((user, index) => {
						top_10 += `${index + 1}. ${user.name} - ${user.score}\n`;
					})
					msg = getText('leaderboard', top_10, userRank);
					return api.sendMessage(msg, threadID, messageID);
				})
				.catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		} else if (chosenIndex == 4) {
			try {
				await get(hunterAPI + `/info?userID=${senderID}&accessToken=${global.configModule[this.config.name].adminToken}`);
			} catch (e) {
				return api.sendMessage(this.getErrorMessage(getText, e), threadID, messageID);
			}
			const participantIDs = (await Threads.getInfo(threadID)).participantIDs;
			get(hunterAPI + `/list?accessToken=${global.configModule[this.config.name].adminToken}`)
				.then(async (res) => {
					let msg = null;

					const allUsers = res.data.data.filter(user => participantIDs.includes(user.userID) && user.userID != senderID);
					if (allUsers.length == 0) return api.sendMessage(getText('no_user_in_thread'), threadID, messageID);

					const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
					const _1ST_PLAYER = {
						userID: senderID,
						name: await Users.getNameUser(senderID)
					};
					const _2ND_PLAYER = {
						userID: randomUser.userID,
						name: await Users.getNameUser(randomUser.userID)
					}


					const random = Math.random();
					let hunter = _1ST_PLAYER;
					let victim = _2ND_PLAYER;
					if (random > 0.5) {
						hunter = _2ND_PLAYER;
						victim = _1ST_PLAYER;
					}

					msg = getText('prepare_game', _1ST_PLAYER.name, _1ST_PLAYER.userID, _2ND_PLAYER.name, _2ND_PLAYER.userID);
					return api.sendMessage({
						body: msg,
						mentions: [
							{
								tag: _1ST_PLAYER.name,
								id: _1ST_PLAYER.userID
							},
							{
								tag: _2ND_PLAYER.name,
								id: _2ND_PLAYER.userID
							}
						]
					}, threadID, (err, info) => {
						global.client.hunterDU.push(info.messageID);
						global.client.handleReaction.push({
							name: this.config.name,
							messageID: info.messageID,
							hunter,
							victim,
							hunterConfirm: false,
							victimConfirm: false
						});
						setTimeout(() => {
							if (global.client.hunterDU.some(id => id == info.messageID)) {
								global.client.hunterDU.splice(global.client.hunterDU.indexOf(info.messageID), 1);
								api.unsendMessage(info.messageID, () => {
									api.sendMessage(getText('game_canceled'), threadID, messageID);
								});
							}
						}, 2 * 60 * 1000);
					}, messageID);

				})
				.catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		} else {
			return api.sendMessage(getText('weapon_menu'), threadID, (err, info) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: info.messageID,
					type: 'weapon_menu'
				});
			}, messageID);
		}
	} else if (type == 'weapon_menu') {
		if (chosenIndex > 2) return api.sendMessage(getText('invalid_option'), threadID, messageID);
		else if (chosenIndex == 1) {
			get(hunterAPI + `/info?userID=${senderID}&accessToken=${global.configModule[this.config.name].adminToken}`)
				.then(async (res) => {
					const user = res.data.data;
					if (user) {
						try {
							const userPower = user.weapon.power + (user.shuriken ? 15 : 0);
							const msg = getText('weapon_info', user.weapon.name, user.shuriken, userPower);
							const weaponImage = (await get(user.weapon.image, { responseType: 'stream' })).data;
							return api.sendMessage({
								body: msg,
								attachment: weaponImage
							}, threadID, messageID);
						} catch (err) {
							return api.sendMessage(getText('connot_get_info'), threadID, messageID);
						}
					} else {
						return api.sendMessage(getText('connot_get_info'), threadID, messageID);
					}
				})
				.catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		} else {
			get(hunterAPI + `/weapons?accessToken=${global.configModule[this.config.name].userToken}`)
				.then(res => {
					const weapons = res.data;
					get(hunterAPI + `/info?userID=${senderID}&accessToken=${global.configModule[this.config.name].adminToken}`)
						.then(async res => {
							const userWeapon = res.data.data.weapon;
							const userShuriken = res.data.data.shuriken;
							const filteredWeapons = weapons.filter(weapon => weapon.id > userWeapon.id);
							if (userShuriken >= 20) filteredWeapons.splice(filteredWeapons.findIndex(weapon => weapon.id == 6), 1);

							if (filteredWeapons.length == 0) return api.sendMessage(getText('no_weapon_available'), threadID, messageID);

							const allWeaponsImages = [];
							for (const weapon of filteredWeapons) {
								try {
									const weaponImage = (await get(weapon.image, { responseType: 'stream' })).data;
									allWeaponsImages.push(weaponImage);
								} catch (e) {
									filteredWeapons.splice(filteredWeapons.indexOf(weapon), 1);
								}
							}
							let list = filteredWeapons.map((weapon, index) => {
								return `\n${index + 1}. ${weapon.name}\n 💥 ${weapon.power}\n 💵 ${weapon.cost}$\n`;
							})
							let msg = getText('weapons', list.join(''));
							return api.sendMessage(msg, threadID, (err, info) => {
								global.client.handleReply.push({
									name: this.config.name,
									messageID: info.messageID,
									author: senderID,
									weapons: filteredWeapons,
									userShuriken,
									type: 'weapon_buy'
								});
							}, messageID)
						})
						.catch(err => {
							return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
						});
				}).catch(err => {
					return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
				});
		}
	} else {
		if (senderID != author) return;
		const { weapons, userShuriken, shuriken } = handleReply;
		const { money } = await Currencies.getData(senderID);
		var weaponCost = null,
			chosenWeapon = null,
			info = {
				userID: senderID,
				accessToken: global.configModule[this.config.name].userToken
			};

		if (step == 'shuriken') {
			if (chosenIndex > (20 - userShuriken)) return api.sendMessage(getText('invalid_option'), threadID, messageID);
			weaponCost = chosenIndex * shuriken.cost;

			info.weaponID = 6;
			info.amount = chosenIndex;
		} else {
			if (chosenIndex > weapons.length) return api.sendMessage(getText('invalid_option'), threadID, messageID);
			chosenWeapon = weapons[chosenIndex - 1];
			weaponCost = chosenWeapon.cost;

			if (chosenWeapon.id == 6) {
				api.unsendMessage(handleReply.messageID);
				return api.sendMessage(getText("buying_shuriken", (20 - userShuriken)), threadID, (err, info) => {
					if (err) return api.sendMessage(getText('connot_get_info'), threadID, messageID);
					global.client.handleReply.push({
						name: this.config.name,
						messageID: info.messageID,
						type: 'weapon_buy',
						step: 'shuriken',
						author: senderID,
						userShuriken,
						weapons,
						shuriken: chosenWeapon
					});
				}, messageID);
			}

			info.weaponID = chosenWeapon.id;
		}


		if (weaponCost > money) return api.sendMessage(getText('not_enough_money'), threadID, messageID);
		await Currencies.decreaseMoney(senderID, weaponCost);
		post(hunterAPI + '/buy', info)
			.then(async res => {
				try {
					let msg = null;
					api.unsendMessage(handleReply.messageID);
					if (step == 'shuriken') {
						msg = getText('shuriken_bought', chosenIndex, res.data.shuriken.amount);
					} else {
						const weaponImage = (await get(res.data.weapon.image, { responseType: 'stream' })).data;
						msg = {
							body: getText('weapon_bought', res.data.weapon.name, res.data.weapon.power),
							attachment: weaponImage
						}
					}
					return api.sendMessage(msg, threadID, messageID);
				} catch (e) {
					return api.sendMessage(getText('connot_get_info'), threadID, messageID);
				}
			})
			.catch(async err => {
				await Currencies.increaseMoney(senderID, weaponCost);
				return api.sendMessage(this.getErrorMessage(getText, err), threadID, messageID);
			});
	}
}

module.exports.handleReaction = async function ({ api, event, getText, Currencies, handleReaction }) {
	if (!global.client.hasOwnProperty('hunterDU')) global.client.hunterDU = [];
	const { post } = global.nodemodule['axios'];
	const { threadID, userID, messageID } = event;
	const { hunter, victim } = handleReaction;
	const { userID: hunterID, name: hunterName } = hunter;
	const { userID: victimID, name: victimName } = victim;
	if (userID == hunterID || userID == victimID) {
		if (userID == hunterID) {
			handleReaction.hunterConfirm = !handleReaction.hunterConfirm;
		} else {
			handleReaction.victimConfirm = !handleReaction.victimConfirm;
		}
		if (handleReaction.hunterConfirm && handleReaction.victimConfirm) {
			api.unsendMessage(handleReaction.messageID);
			global.client.hunterDU.splice(global.client.hunterDU.indexOf(messageID), 1);

			const { writeFileSync, createReadStream, unlinkSync } = global.nodemodule['fs'];
			let imagePath = __dirname + `/cache/${Date.now()}_${userID}_hunter.png`;
			let imageBuffer = await this.generatePicture(hunterID, victimID);//this will be a buffer
			writeFileSync(imagePath, Buffer.from(imageBuffer, 'utf8'));

			return api.sendMessage({
				body: getText('game_start', hunterName, hunterID, victimName, victimID),
				attachment: createReadStream(imagePath)
			}, threadID, () => {
				unlinkSync(imagePath);
				const info = {
					accessToken: global.configModule[this.config.name].userToken,
					hunterID,
					victimID
				}
				post(hunterAPI + '/fight', info)
					.then(async res => {
						await new Promise(resolve => setTimeout(resolve, 3000));
						let msg = '',
							winnerID = '',
							loserID = '';

						const percentMoneyStolen = Math.random() * 0.4 + 0.2;
						const { result } = res.data;
						if (result == 0) {
							msg = getText('hunter_win', Math.floor(percentMoneyStolen * 100));
							winnerID = hunterID;
							loserID = victimID;
						} else {
							msg = getText('victim_win', Math.floor(percentMoneyStolen * 100));
							winnerID = victimID;
							loserID = hunterID;
						}

						const loserMoney = Math.floor((await Currencies.getData(loserID)).money * percentMoneyStolen);
						await Currencies.increaseMoney(winnerID, loserMoney);
						await Currencies.decreaseMoney(loserID, loserMoney);

						return api.sendMessage(msg, threadID);
					})
					.catch(err => {
						return api.sendMessage(this.getErrorMessage(getText, err), threadID);
					});
			})
		}
	}
}


const baseVSImageURL = 'https://i.ibb.co/mc4XjjJ/image-2022-05-06-110732721.png';
module.exports.generatePicture = function (hunterID, victimID) {
	return new Promise(async (resolve, reject) => {
		try {
			const { createCanvas, loadImage } = global.nodemodule['canvas'];
			const { get } = global.nodemodule['axios'];
		
			const canvas = createCanvas(626, 438);
			const ctx = canvas.getContext('2d');
			
			const baseImage = await loadImage(baseVSImageURL);
	
			const hunterAva = await loadImage(`https://graph.facebook.com/${hunterID}/picture?width=144&height=144&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`);
			const victimAva = await loadImage(`https://graph.facebook.com/${victimID}/picture?width=144&height=144&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`);
	
			ctx.drawImage(baseImage, 0, 0);
	
			ctx.drawImage(hunterAva, 50, 145);
			ctx.drawImage(victimAva, 430, 145);
	
			resolve(canvas.toBuffer());
		} catch (err) {
			reject(err);
		}
	});

}


module.exports.getErrorMessage = (getText, error) => {
	const errorMessage = error.response ? error.response.data.message : error;
	let msg = '';
	if (errorMessage == 'Invalid Token') msg = getText('invalid_token');
	else if (errorMessage == 'Invalid User ID') msg = getText('user_not_exist');
	else if (errorMessage == 'Already registered') msg = getText('already_registered');
	else msg = getText('connot_get_info');

	return msg;
}

module.exports.run = async function ({ api, event, getText }) {
	var msg = getText('menu').replace(/\t/g, '');
	try {
		const hunterBannerData = (await global.nodemodule['axios'].get(hunterBanner, { responseType: 'stream' })).data;
		return api.sendMessage({
			body: msg,
			attachment: hunterBannerData
		}, event.threadID, (err, info) => {
			global.client.handleReply.push({
				name: this.config.name,
				messageID: info.messageID,
				type: 'menu'
			})
		})
	} catch (err) {
		return api.sendMessage(this.getErrorMessage(getText, err), event.threadID, event.messageID);
	}
  }