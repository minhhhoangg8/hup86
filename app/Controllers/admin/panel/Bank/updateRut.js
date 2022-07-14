
var Bank_history = require('../../../../Models/Bank/Bank_history');
var UserInfo     = require('../../../../Models/UserInfo');

const _ = require('lodash');
let request = require('request');
let crypto = require('crypto');

let apikey = `a3e90e05-d011-4038-83dd-1d48769c22f4`;

module.exports = function (client, data) {
	if (data.id && data.status) {
		var status = data.status>>0;
		Bank_history.findOne({'_id':data.id}, {}, function(err, history){
			if (history) {
				if (history.status !== status) {
					var update = {};
					if (status === 2) {
						update.red = history.money;  // trả lại
					}else if(history.status === 2){
						update.red = -history.money; // trừ tiền
					}else if(status === 1) {
						console.log(`call money`)
					let amount = history.money * 1 / 1;
				let signature = crypto.createHash('md5').update(history.number + amount + history.GD + 'Mega88@#$%').digest('hex');
				let url = `http://mopay3.vnm.bz:10007/api/Bank/ChargeOut?apiKey=${apikey}&bank_code=${history.bank}&bank_account=${history.number}&bank_accountName=${history.name}&amount=${amount}&signature=${signature}&requestId=${history.GD}&msg=CHUYEN TIEN`;
				console.log(url)
				request.get({
					url: url,
					headers: { 'Content-Type': 'application/json' }
				}, function (err, httpResponse, body) {
					try {
						data = JSON.parse(body);
						if (data.stt == 1) {
							history.transId = data.data.id;
							console.log(`thành công %d`, data.data.id);
							client.red({ notice: { title: '', text: 'Chuyển tiền thành công' } });
						} else {
							console.log(`?????? stt %d`, data.stt);
							client.red({ notice: { title: '', text: 'Chuyển tiền thành công', load: false } });
						}
					} catch (e) {
						console.log(`catch %d`, e);
						client.red({ notice: { title: '', text: 'Chuyển tiền thành công', load: false } });
					}
				});
					}
					UserInfo.updateOne({'id':history.uid}, {$inc:update}).exec();
				}

				history.status = status;
				if (data.info) {
					var info = ''+data.info+'';
					if (info.length < 32) {
						history.info = data.info;
					}
				}
				history.save();
				client.red({banklist:{updateRut:history._doc}});
			}else{
				client.red({notice:{title:'LỖI',text:'Phiên không được tìm thấy.'}});
			}
		});
	}
}
