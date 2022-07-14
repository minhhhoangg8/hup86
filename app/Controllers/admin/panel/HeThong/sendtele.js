let telegram = require('../../../../Models/Telegram');
let UserInfo        = require('../../../../Models/UserInfo');

module.exports = function (client, data) {
    if (!!data) {
		console.log(data)
        let msg = data.msg;
        let nickname = data.nickname;
        UserInfo.findOne({ name: nickname }, {}, function (err2, data) {
            if (data) {
                telegram.findOne({ uid: data.id }, 'form', function (err, teles) {
                    if (teles) {
                        redT.telegram.sendMessage(teles.form, msg, { parse_mode: 'markdown', reply_markup: { remove_keyboard: true } });
                        client.red({ notice: { title: 'Thành công', text: 'Gửi tin nhắn tới ' + nickname + ' thành công !' } });
                    }
                });
            } else {
                client.red({ notice: { title: 'Thất bại', text: 'Người dùng chưa đăng ký telegram' } });
            }
        });
    } else {
        client.red({ notice: { title: 'Thất bại', text: 'Dữ liệu không đúng' } });
    }

}
