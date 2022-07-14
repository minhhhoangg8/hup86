const _ = require('lodash');
let request = require('request');
var UserInfo      = require('../../Models/UserInfo');
var BankingBonus = require('../../../config/banking.json');
var body = {"stt":1,"msg":"OK","data":[
    {"code":4,"name":"Techcombank"},
    {"code":5,"name":"VietcomBank"},
    {"code":6,"name":"TPBank"},
    {"code":7,"name":"ACBBank"},
    {"code":8,"name":"OCBBank"},
    {"code":9,"name":"MSBBank"},
    {"code":10,"name":"MBBank"},
    {"code":11,"name":"BIDV"},
    {"code":12,"name":"ViettinBank"},
    {"code":13,"name":"VPBank"}
    ]};
    
module.exports = function(client){
    if (body.stt == 1) {
        client.red({ shop:{banking:{info2:body.data}}});
    } else {
        client.red({ notice: { title: '', text: 'Hệ thống ngân hàng đang bảo trì!', load: false } });
    }

var data = new Object();
data.min =  BankingBonus.min;
data.max =  BankingBonus.max;
data.bonus =  BankingBonus.bonus;
client.red({ shop:{banking:{info:data}}});
}
