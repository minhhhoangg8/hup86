
let ingame  = require('./XocXoc/ingame');
let outgame = require('./XocXoc/outgame');
let cuoc    = require('./XocXoc/cuoc');
let history = require('./XocXoc/history');

module.exports = function(client, data){
	if (!!data.ingame) {
		ingame(client);
	}
	if (!!data.outgame) {
		outgame(client);
	}
	if (!!data.cuoc) {
		cuoc(client, data.cuoc);
	}
	if (!!data.chat) {
		TaiXiu.chat(client, data.chat);	
	}
	if (!!data.log) {
		history(client, data.log);
	}
	if (!!data.getLogChat) {
		getLogChat(client);	
	}
	client = null;
	data   = null;
};
