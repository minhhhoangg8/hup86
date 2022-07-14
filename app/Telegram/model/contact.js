
let telegram = require('../../Models/Telegram');
let Phone    = require('../../Models/Phone');
let UserInfo = require('../../Models/UserInfo');
let helpers  = require('../../Helpers/Helpers');

module.exports = function(redT, id, contact) {
	let phoneCrack = helpers.phoneCrack(contact);
	if (phoneCrack) {
		Phone.findOne({'phone':phoneCrack.phone}, 'uid region phone', function(err, check1){
			if (check1) {
				try {
					telegram.create({'form':id, 'phone':phoneCrack.phone, 'uid': check1.uid}, function(err, cP){
						phoneCrack = null;
						
					UserInfo.findOne({id: check1.uid},'veryphone veryold',function (err,ussss){
						if(!!ussss){	
					
					
							if(ussss.veryphone == false){
					
					
								if (!!cP) {
									UserInfo.findOneAndUpdate({id:check1.uid}, {$set:{veryphone:true,veryold:true}, $inc:{red:50000}}).exec(function(err, info){
										if(!!info){
											let opts = {
											parse_mode: 'markdown',
											reply_markup: {
												keyboard: [
													[{text: 'OTP'}],
												],
												resize_keyboard: true,
											}
										};
											redT.telegram.sendMessage(id, '_XÁC THỰC THÀNH CÔNG_\nChào Mừng *'+info.name+'*, bạn đã được nhận 50K. Chúc các bạn chơi game vui vẻ!...\n\n*HƯỚNG DẪN*\n\nNhập:\n*OTP*:           Lấy mã OTP miễn phí.\n', opts);
											if (void 0 !== redT.users[check1.uid]) {
												redT.users[check1.uid].forEach(function(client){
													client.red({notice:{title:'THÀNH CÔNG', text: 'Xác thực thành công.!\nChúc các bạn may mắn tại VIN99 CLUB...'}, user:{red:info.red*1+50000, phone:helpers.cutPhone(check1.region+check1.phone), veryphone:true}});
												});
											}
											redT = null;
											id = null;
										}
									});
								}else{
									redT.telegram.sendMessage(id, '_Thao tác thất bại_', {parse_mode: 'markdown',reply_markup: {resize_keyboard: true}});
									redT = null;
									id = null;
								}
								
							}else{
								
									redT.telegram.sendMessage(id, 'Bạn đã đăng ký số điện thoại rồi!', {parse_mode:'markdown',reply_markup:{resize_keyboard:true}});
									redT = null;
									phoneCrack = null;
									id = null;		
							}	
						
						}
						
					})	
						
					});
				} catch (error) {
					redT.telegram.sendMessage(id, '_Thao tác thất bại_', {parse_mode: 'markdown',reply_markup: {resize_keyboard: true}});
					redT = null;
					id = null;
					phoneCrack = null;
				}
			}else{
				redT.telegram.sendMessage(id, 'Số điện thoại này chưa được đăng ký. Vui lòng đăng ký tại _VIN99_', {parse_mode:'markdown',reply_markup:{resize_keyboard:true}});
				redT = null;
				phoneCrack = null;
				id = null;
			}
		});
	}
}
