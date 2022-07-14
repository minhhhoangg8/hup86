var get_data = require('./daohaitac/get_data');
var get_top  = require('./daohaitac/get_top');
var name_hu  = require('./daohaitac/name_hu');
var setChedo = require('./daohaitac/setChedo');

module.exports = function(client, data) {
	if (void 0 !== data.get_data) {
		get_data(client)
	}
	if (void 0 !== data.name_hu) {
		name_hu(client, data.name_hu)
	}
	if (void 0 !== data.get_top) {
		get_top(client, data.get_top)
	}
	if (void 0 !== data.chedo) {
		setChedo(client, data.chedo);
	}
}
