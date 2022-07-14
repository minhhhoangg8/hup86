var infoBongDa = require('../../../Models/BongDa/BongDa');
var phienBongDa = require('../../../Models/BongDa/BongDa');

var cuocBongDa = require('../../../Models/BongDa/BongDa_cuoc');
var UserInfo = require('../../../Models/UserInfo');
let get_phien = require('./get_phien');
var Helper = require('../../../Helpers/Helpers');

module.exports = function (client, data) {
    if (!!data && !!data.bet) {
        let bet = data.bet * 1;
        let tongTien = 0;
        if (data.SelectOne == false && data.SelectTwo == false && data.SelectThree == false) {
            client.red({ notice: { title: "HUP86 CLUB", text: 'Chọn ít nhất một cửa để đặt cược!' } });
            tongTien = 0;
        } else {
            if (bet < 1000) {
                client.red({ notice: { title: "HUP86 CLUB", text: 'Tiền cược phải ít nhất 1.000 RIK!' } });
            } else {
                if (data.SelectOne && data.SelectTwo && data.SelectThree == true) {
                    tongTien += bet * 3;
                } else {
                    if (data.SelectOne == true) {
                        tongTien += bet * 1;
                    }
                    if (data.SelectTwo == true) {
                        tongTien += bet * 1;
                    }
                    if (data.SelectThree == true) {
                        tongTien += bet * 1;
                    }
                }

                UserInfo.findOne({ id: client.UID }, 'red name', function (err, user) {
                    if (!!user && user.red >= tongTien) {
                        infoBongDa.findOne({ 'phien': data.phien }, function (err2, bongda) {
                            if (!!bongda) {
                                //check time
                                let banDate = new Date();
                                banDate.setHours(bongda.date * 1, bongda.phut * 1, 0, 0);
                                let timeCL = banDate - new Date();
                                if (timeCL > 0) {
                                    client.red({ notice: { title: "HUP86 CLUB", text: 'Đã hết thời gian cược' } });
                                }else if (bongda.status) {
                                    client.red({ notice: { title: "HUP86 CLUB", text: 'Đã hết thời gian cược' } });
                                } else {
                                    cuocBongDa.create({ 'uid': client.UID, 'name': user.name, 'phien': data.phien, 'bet': bet, 'selectOne': data.SelectOne, 'selectTwo': data.SelectTwo, 'selectThree': data.SelectThree, 'thanhtoan': false, 'win': false, 'betwin': '0', 'time': new Date() }, function (err, info) {
                                        if (info) {
                                            get_phien(client, info.phien);
                                            //console.log('Tổng tiền cược: ' + tongTien);
                                            client.red({ notice: { title: "HUP86 CLUB", text: 'Cược thành công!' }, user: { red: user.red - tongTien } });
                                            user.red -= tongTien;
                                            user.save();
                                            user = null;
                                            tongTien = null;
                                        }
                                        else {
                                            throw (err);
                                            client.red({ notice: { title: "HUP86 CLUB", text: err } });
                                        }
                                    });
                                }
                            }else{
                                client.red({ notice: { title: "HUP86 CLUB", text: 'Dữ liệu không đúng...' } });
                            }
                        });
                    } else {
                        client.red({ notice: { title: "HUP86 CLUB", text: 'Bạn không đủ tiền cược!' } });
                    }
                });
            }
        }
    } else {
        client.red({ notice: { title: "HUP86 CLUB", text: 'Dữ liệu không đúng...' } });
    }
}