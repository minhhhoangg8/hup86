
let AutoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
let mongoose      = require('mongoose');

let Schema = new mongoose.Schema({
	name: {type: String, required: true, index: true},
	bet:  {type: Number, default: 0},              // Mức cược
	win:  {type: Number, default: 0},              // Tiền thắng
	type: {type: Number, default: 0, index: true}, // Loại được ăn lớn nhất trong phiên
	kq:   [],
	time: {type: Date,   default: new Date()},
});

Schema.plugin(AutoIncrement.plugin, {modelName:'mPoker_red', field:'id'});

module.exports = mongoose.model('mPoker_red', Schema);
