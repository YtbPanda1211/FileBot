const p = "❤";
const a = "👍";
const {
  resolve: b
} = require("path");
const {
  existsSync: q,
  writeFileSync: j
} = require("fs-extra");
const e = b(__dirname, "data", "autokick.json");
module.exports.config = {
  name: "autokick",
  version: "1.0.0",
  credits: "NTKhang (fix by DEV NDK)",
  hasPermssion: 1,
  description: "Cảnh báo thành viên vi phạm từ ngữ",
  usages: "autokick on/off add/del list",
  commandCategory: "Box chat",
  cooldowns: 0
};
module.exports.run = async ({
  api: f,
  event: a,
  args: b
}) => {
  if (!q(e)) {
    try {
      j(e, JSON.stringify({}, null, "\t"));
    } catch (b) {
      console.log(b);
    }
  }
  const c = require("./data/autokick.json");
  const d = await f.getThreadInfo(a.threadID);
  if (!c.hasOwnProperty(a.threadID)) {
    c[a.threadID] = {
      data: {}
    };
    j(e, JSON.stringify(c, null, "\t"));
  }
  const g = c[a.threadID].data || {};
  if (!g.autoKick) {
    g.autoKick = {
      words: [],
      enables: false
    };
    j(e, JSON.stringify(c, null, "\t"));
  }
  if (b[0] == "on") {
    g.autoKick.enables = true;
    j(e, JSON.stringify(c, null, "\t"));
    return f.sendMessage("✅ Auto kick đã được bật", a.threadID, a.messageID);
  } else if (b[0] == "off") {
    g.autoKick.enables = false;
    j(e, JSON.stringify(c, null, "\t"));
    return f.sendMessage("✅ Auto kick đã được tắt", a.threadID, a.messageID);
  } else if (b[0] == "add") {
    if (!b[1]) {
      return f.sendMessage("⚠️ Vui lòng nhập từ cần thêm vào danh sách", a.threadID, a.messageID);
    }
    const i = b.slice(1).join(" ");
    let d = i.split(",").map(b => b.trim());
    d = d.filter(b => !g.autoKick.words.includes(b));
    g.autoKick.words.push(...d);
    j(e, JSON.stringify(c, null, "\t"));
    return f.sendMessage("✅ Đã thêm " + d.length + " từ vào danh sách", a.threadID, a.messageID);
  } else if (b[0] == "del") {
    const i = b.slice(1).join(" ");
    let d = i.split(",").map(b => b.trim());
    d = d.filter(b => g.autoKick.words.includes(b));
    for (const b of d) {
      g.autoKick.words.splice(g.autoKick.words.indexOf(b), 1);
    }
    j(e, JSON.stringify(c, null, "\t"));
    return f.sendMessage("✅ Đã xóa " + d.length + " từ khỏi danh sách", a.threadID, a.messageID);
  } else if (b[0] == "list") {
    let b = "📌 Danh sách từ cấm:\n";
    g.autoKick.words.forEach(c => b += " - " + c + "\n");
    return f.sendMessage(b, a.threadID, a.messageID);
  } else {
    return f.sendMessage(`[ AUTO KICK THÀNH VIÊN ]\n────────────────\n→ ${global.config.PREFIX}autokick add + từ cần cấm\n→ ${global.config.PREFIX}autokick del + từ đã cấm (xoá)\ncó thể thêm nhiều hoặc xoá nhiều cùng lúc bằng cách thêm ',' sau mỗi từ\n→ ${global.config.PREFIX}autokick list: xem danh sách từ đã cấm\n→ ${global.config.PREFIX}autokick on: bật auto kick\n→ ${global.config.PREFIX}autokick off: tắt auto kick`, a.threadID, a.messageID);
  }
};
module.exports.handleEvent = async ({
  api: b,
  event: c,
  Threads: d
}) => {
  const {
    senderID: f,
    threadID: g
  } = c;
  const h = global.data.threadInfo.get(g) || (await d.getInfo(g));
  const i = (h.adminIDs || []).find(b => b.id == f);
  const k = [b.getCurrentUserID(), ...global.config.ADMINBOT, ...global.config.NDH];
  const l = i || k.some(b => b == f);
  if (!q(e)) {
    try {
      j(e, JSON.stringify({}, null, "\t"));
    } catch (b) {
      console.log(b);
    }
  }
  const m = require("./data/autokick.json");
  if (!m.hasOwnProperty(c.threadID)) {
    m[c.threadID] = {
      data: {}
    };
    j(e, JSON.stringify(m, null, "\t"));
  }
  if (c.body && !l) {
    try {
      const f = m[c.threadID].data || {};
      if (!f.autoKick) {
        return;
      }
      if (f.autoKick.enables) {
        const d = c.body.toLowerCase().match(new RegExp("(\\s|^)(" + f.autoKick.words.map(b => b += "+").join("|") + ")(\\s|$)", "gi"));
        if (d) {
          return b.sendMessage(`⚠️ Từ cấm '${d[0]}' đã được phát hiện, Quản trị viên hãy thả cảm xúc '${p}' tin nhắn này để xóa thành viên hoặc '${a}' để hủy bỏ`, c.threadID, async (d, a) => {
            global.client.handleReaction.push({
              name: this.config.name,
              messageID: a.messageID,
              targetID: c.senderID
            });
          }, c.messageID);
        }
      }
    } catch (b) {
      console.log(b);
    }
  }
};
module.exports.handleReaction = async ({
  api: q,
  event: c,
  Threads: b,
  handleReaction: d,
  Users: e
}) => {
  const {
    targetID: f,
    messageID: g
  } = d;
  const {
    userID: h,
    threadID: i
  } = c;
  const j = global.data.threadInfo.get(i) || (await b.getInfo(i));
  const k = j.adminIDs.some(b => b.id == h);
  const l = [q.getCurrentUserID(), ...global.config.ADMINBOT, ...global.config.NDH];
  const m = k || l.some(b => b == h);
  if (!m) {
    return;
  }
  if (c.reaction == p) {
    const b = await q.getThreadInfo(c.threadID);
    return q.removeUserFromGroup(f, c.threadID, async b => {
      if (b) {
        q.sendMessage("⚠️ Không thể xóa thành viên này, thử thêm quyền Quản trị viên cho Bot và thả cảm xúc lại tin nhắn trên", c.threadID, c.messageID);
      } else {
        q.unsendMessage(g);
        const d = await e.getNameUser(h);
        const a = await e.getNameUser(f);
        q.sendMessage("📌 " + d + " đã xác nhận xóa thành viên " + a, c.threadID);
      }
    });
  } else if (c.reaction == a) {
    return q.unsendMessage(g);
  }
};