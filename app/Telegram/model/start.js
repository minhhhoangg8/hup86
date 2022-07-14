
let telegram = require('../../Models/Telegram');

module.exports = function(bot, id) {
	telegram.findOne({'form':id}, 'phone', function(err, data){
		if (data) {
			let opts = {
				parse_mode: 'markdown',
			    reply_markup: {
					keyboard: [
				        [{text: 'OTP'}],
				    ],
				    resize_keyboard: true,
			    }
			};
			bot.sendMessage(id, '*HƯỚNG DẪN*' + '\n\n' + 'Nhập:' + '\n' + '*OTP*:           Để lấy mã OTP miễn phí.' + '\n' + '*Rút Tiền*:  Chúc các bạn chơi game vui vẻ!.', opts);
			bot = null;
			id = null;
		}else{
			let opts = {
				parse_mode: 'markdown',
			    reply_markup: {
			      	keyboard: [
				        [{text: 'CHIA SẺ SỐ ĐIỆN THOẠI', request_contact: true}],
				    ],
				    resize_keyboard: true,
			    }
			};
			bot.sendMessage(id, '*VIN99*  Đây là lần đầu tiên bạn sử dụng App OTP. Cộng ngay 50K vào tài khoản sau khi xác thực thành công. \nVui lòng nhập START và ấn CHIA SẺ SỐ ĐIỆN THOẠI để _XÁC THỰC_ và lấy mã OTP miễn phí. Chúc các bạn chơi game vui vẻ!.', opts);
			bot = null;
			id = null;
		}
	});
}
