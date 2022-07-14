
module.exports = function(client){
	let rongho = client.redT.rongho;
	if (rongho.clients[client.UID] === client) {
		delete rongho.clients[client.UID];

		let clients = Object.keys(rongho.clients).length+(200*(Math.floor(Math.random()*(70-50+1))+50)/100)>>0;
		Object.values(rongho.clients).forEach(function(users){
			if (client !== users) {
				users.red({rongho:{ingame:{client:clients}}});
			}
		});
	}
	rongho = null;
	client = null;
};
