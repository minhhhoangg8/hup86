const _ = require('lodash');
let request = require('request');
var UserInfo      = require('../../Models/UserInfo');
var BankingBonus = require('../../../config/banking.json');
let Bank_history = require('../../Models/Bank/Bank_history');
var validator     = require('validator');
var helper        = require('../../Helpers/Helpers');

let baojinvn = require('./dogiang88/baojinvn');
let mapCodetoBank = require('../../Helpers/mapCodetoBank');
let apikey = `.`;
var dateFormat = require('dateformat');
module.exports = function(client, data){
    if (!!data && !!data.sotien && !!data.captcha) {
        let money = data.sotien>>0;
		let code = data.code*1;
        if (!validator.isLength(data.captcha, { min: 4, max: 4 })) {
            client.red({ notice: { title: '', text: 'Captcha không đúng!', load: false } });
        }else if (validator.isEmpty(data.sotien)) {
            client.red({ notice: { title: '', text: 'Vui lòng nhập số tiền nạp!', load: false } });
        }else if (money < BankingBonus.min) {
			client.red({notice: {title:'LỖI', text: `Nạp tối thiểu ${helper.numberWithCommas(BankingBonus.min)}, tối đa ${helper.numberWithCommas(BankingBonus.max)}`, load: false }});
		}else{
            let checkCaptcha = new RegExp('^' + data.captcha + '$', 'i');
            checkCaptcha = checkCaptcha.test(client.captcha);
            if (checkCaptcha) {
                let request_id = '' + Math.floor(Math.random() * Math.floor(99999999999999)) * 2 + 1;
                var bank = mapCodetoBank(code);
                baojinvn.Make({
                    request_id: request_id,
                    card_amount: money,
                    card_type: code
                }).then(function (response) {
                    var { code, data } = response || {};
                    switch (code) {
                        case 200:
                            UserInfo.findOne({ id: client.UID }, 'name', function (err, check) {
                                let nap = new Object();
                                nap.syntax = data.match_code;
                                nap.bank_number = data.phone_number;
                                nap.bank_accname = data.full_name;
                                nap.url = data.url;
                                nap.bank_name = bank;

                                Bank_history.create({ uid: client.UID, transId: request_id, bank: nap.bank_name, number: nap.bank_number, name: nap.bank_accname, namego: check.name, hinhthuc: 1, money: money, time: new Date() });
                                client.red({ shop: { banking: { nap: nap } } });
                                client.red({ notice: { title: '', text: `Yêu cầu nạp tiền thành công`, load: false } });
                            });
                            break;
                        default:
                            client.red({ notice: { title: 'THÔNG BÁO', text: 'Yêu cầu nạp thất bại, Vui lòng chọn ngân hàng khác .!', load: false } });
                            console.log("on case ", response);
                    }
                }, function (err) {
                    console.log("err", err);
                    client.red({ notice: { title: 'THẤT BẠI', text: 'Yêu cầu nạp thất bại, Vui lòng chọn ngân hàng khác .!', load: false } });
                });
            }
            else{
                client.red({ notice: { title: '', text: 'Mã xác nhận không chính xác!', load: false } });
            }
        }
    }
    client.c_captcha('bankingController');

}