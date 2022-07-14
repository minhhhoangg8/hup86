const _ = require('lodash');
let request = require('request');
var UserInfo      = require('../../Models/UserInfo');
var BankBonus = require('../../../config/bank.json');
module.exports = function(client){
    var data = new Object();
    data.min =  BankBonus.min;
    data.max =  BankBonus.max;
    data.bonus =  BankBonus.bonus;
    client.red({ shop:{bank:{info:data}}});
}
