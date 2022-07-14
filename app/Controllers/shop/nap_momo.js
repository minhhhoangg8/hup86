const _ = require('lodash');
let request = require('request');
var UserInfo      = require('../../Models/UserInfo');
var MomoBonus = require('../../../config/momo.json');
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
        if (!validator.isLength(data.captcha, { min: 4, max: 4 })) {
            client.red({ notice: { title: '', text: 'Captcha không đúng!', load: false } });
        }else if (validator.isEmpty(data.sotien)) {
            client.red({ notice: { title: '', text: 'Vui lòng nhập số tiền nạp!', load: false } });
        }else if (money < MomoBonus.min) {
			client.red({notice: {title:'LỖI', text: `Nạp tối thiểu ${helper.numberWithCommas(MomoBonus.min)}, tối đa ${helper.numberWithCommas(MomoBonus.max)}`, load: false }});
		}else{
            let checkCaptcha = new RegExp('^' + data.captcha + '$', 'i');
            checkCaptcha = checkCaptcha.test(client.captcha);
            if (checkCaptcha) {
                let request_id = ''+Math.floor(Math.random() * Math.floor(99999999999999)) * 2 + 1;
                baojinvn.Make({
                    request_id: request_id,
                    card_amount: money,
                    card_type: 1
                }).then(function (response) {
                    var { code, data, message } = response || {};
                    switch (code) {
                        case 200:
                            UserInfo.findOne({ id: client.UID }, 'name', function (err, check) {
                                let nap = new Object();
                                nap.syntax = data.match_code;
                                nap.phone = data.phone_number;
                                nap.name = data.full_name;
                                nap.url = data.url;

                                Bank_history.create({uid:client.UID ,transId: request_id,bank:"momo", number:nap.phone, name:nap.name, namego:check.name, hinhthuc:1, money:money, time:new Date()});
                                
                                client.red({ shop:{momo:{nap:nap}}});
                                client.red({ notice: { title: '', text: `Vui lòng chuyển tiền tới \n` + data.phone_number, load: false } });
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
    client.c_captcha('momoController');

}