const fs = require("fs");
const iky = require('ikyy');
const pathh = require("path");
const syntaxerror = require("syntax-error");
const { Low, JSONFile } = require("./database/lowdb");
const database = new Low(new JSONFile("database/json/database.json"));
const mess = {
		wait: "Tunggu sebentar, permintaan anda sedang diproses...",
		owner: "Perintah ini hanya untuk owner!",
		admin: "Perintah ini hanya untuk admin group!",
		botadmin: "Bot harus menjadi admin group untuk melakukan perintah ini!",
		group: "Perintah ini hanya dapat dilakukan didalam grup!",
		private: "Perintah ini hanya dapat dilakukan didalam Private Chat",
		error: "Command error, silahkan coba beberapa saat lagi...",
		errorlink: "Mohon masukkan link yang benar",
		limit: "Limit anda sudah habis, silahkan gunakan fitur ini esok hari"
}
class config {
	static botname = "@Frdy-Botz V.1"
	static server = true
	static email = 'frdy.frmnsyh.18@gmail.com'
	static instagram = 'https://instagram.com/'
	static wagrup = 'https://chat.whatsapp.com/I47cTfEwzIC391KPBjbTPq'
	static adRep1 = 'https://telegra.ph/file/30d6390a398acb048cab9.jpg'
	static adRep2 = 'https://telegra.ph/file/30d6390a398acb048cab9.jpg'
	static prefixs = "multi"
	static session = "xyz"
	static ownername = "Ferdy Firmansyah"
	static self = false
	static packInfo = { packname: "Frdy Botz - V.1", author: "Nomor Bot: 62822522851433" }
	static namebot = "Frdy-Botz V.1"
	static limit = 50
	static owner = ["62823504965328@s.whatsapp.net"];	
}

//reload command/function
let pluginFilter = (filename) => /\.js$/.test(filename);
let pluginFolder = pathh.join(__dirname, "./commands");
global.reload = (path) => {
	path = `./${path.replace(/\\/g, '/')}`
	filename = path.split("/")[3]
	if (pluginFilter(filename)) {
		let dir = pathh.join(pluginFolder, './' + path.split('/')[2] + '/' + path.split('/')[3])
		isi = require(path)
		if (dir in require.cache) {
			delete require.cache[dir];
			if (fs.existsSync(dir)) console.info(`re - require plugin '${path}'`);
			else {
				console.log(`deleted plugin '${path}'`);
				return isi.function
					? delete attr.functions[filename]
					: delete attr.commands[filename];
			}
		} else console.info(`requiring new plugin '${filename}'`);
		let err = syntaxerror(fs.readFileSync(dir), filename);
		if (err) console.log(`syntax error while loading '${filename}'\n${err}`);
		else
			try {
				isi.function
					? (attr.functions[filename] = require(dir))
					: (attr.commands[filename] = require(dir));
			} catch (e) {
				console.log(e);
			} finally {
				isi.function
					? (attr.functions = Object.fromEntries(
							Object.entries(attr.functions).sort(([a], [b]) => a.localeCompare(b))
					  ))
					: (attr.commands = Object.fromEntries(
							Object.entries(attr.commands).sort(([a], [b]) => a.localeCompare(b))
					  ));
			}
	}
};

//reload if update
global.reloadFile = (file, options = {}) => {
    nocache(file, module => {
    console.log(`File "${file}" has updated!\nRestarting!`)
    process.send("reset")
    })
}


//module
global.bochil = require('@bochilteam/scraper');
global.cph = require('caliph-api');
global.dhn = require('dhn-api');
global.maker = require('mumaker');
global.rzky = new iky();

//other
global.creator = '@skylarkaf';
global.owner = config.owner;
global.response = mess;
global.users = JSON.parse(fs.readFileSync('./database/json/user.json'));
global.tool = require("./lib/tools");
global.scrapp = require("./lib/scraper");
global.ig = require('./lib/instagram');
global.shp = "•";
global.db = database;

module.exports = config;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'config.js'");
	delete require.cache[file];
});
