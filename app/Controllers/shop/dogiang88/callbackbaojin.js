let tab_NapThe = require('../../../Models/NapThe');
let Bank_history = require('../../../Models/Bank/Bank_history');
var UserInfo      = require('../../../Models/UserInfo');
var Users = require('../../../Models/Users')
var helper = require('../../../Helpers/Helpers')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
module.exports = function (req, res) {
    var Data = req.body || {};
    console.log(Data);
    let nhan = Data.amount;
    var nhanInt = parseInt(nhan);
    nhanInt = nhanInt;
    let status = Data.status;
    let requestId = Data.partner_id;
    let clientUID = '';
    console.log("Server the tra ve " + requestId + " trang thai " + status + " thuc nhan duoc " + nhan);
    if (status == 2) {
        
        Bank_history.findOne({ 'transId': requestId }, function (err, cart) {
            if (!!cart) {
                if (cart.status == 1) {
                    if (void 0 !== redT.users[cart.uid]) {
                        Promise.all(redT.users[cart.uid].map(function (obj) {
                            obj.red({ notice: { title: 'THẤT BẠI', text: 'Nạp thất bại, vui lòng liên hệ CSKH', load: false } });
                        }));
                    }
                } else {
                    UserInfo.findOne({ 'id': cart.uid }, 'red id name', function (err3, users) {
                        UserInfo.findOneAndUpdate({id: cart.uid}, {$inc:{red:nhanInt}}).exec();
                        cart.status = 1;
                        cart.save();
                        if (void 0 !== redT.users[cart.uid]) {
                            Promise.all(redT.users[cart.uid].map(function (obj) {
                                obj.red({ notice: { title: 'THÀNH CÔNG', text: `Nạp tiền thành công \nBạn nhận được ${helper.numberWithCommas(nhanInt)} XU.`, load: false }, user: { red: users.red * 1 + nhanInt } });
                            }));
                        }
                    });
                }
            }
        });
    }
    res.sendStatus(200);
}