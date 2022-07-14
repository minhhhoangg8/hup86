const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const TeleBot = require('telebot');
const bot = new TeleBot('2144468645:AAFub0cyHIPDN_9grOcly7Fe1JtUOWP27Ck'); //sửa token tại đây
const fs = require('fs');
const fileName = "./spam_1.xlsx";
var giftcode = [];
var id = [];
workbook.xlsx.readFile(fileName).then(() => {
    const ss = workbook.getWorksheet(1);
    ss.eachRow({ includeEmpty: false }, (row) => {
        id.push(row.values[1]);
        giftcode.push(row.values[2]);
        console.log(row.values[1] + row.values[2])
    });
});
var time = 0;
var n = parseInt(JSON.parse(fs.readFileSync('stt.json', "utf8")).number)
var s = 10;
var a = setInterval(function myTimer() {
    time++
    console.log(time);
    if (time > 1) {
        spam(n, n + s);
        n = n + s;
        spam(n + 1, n + s);
        n = n + s;
        console.log(n)
        fs.writeFile('stt.json', JSON.stringify({ number: n }), (err) => {
            if (err)
                console.log(err);
        });
    }
    if (time == 4050) {
        clearInterval(a);
    }
}, 5000);


async function spam(from, to) {
    for (var i = from; i < to; i++) {
        const noidung = `💢MEGA88.US - CỔNG GAME QUỐC TẾ💯
💨TRI ÂN KHÁCH HÀNG VIP💯💯💯
💨X3 NẠP ĐẦU - HOẢN TRẢ MỖI NGÀY💯
💨NAP 100K NHẬN HŨ 500K MỖI NGÀY💯
💨MEGA88.US tặng bạn giftcode 20K hết hạn sau 0h00 hôm nay: ${giftcode[i]}
💨Nhanh tay dinh ngay GIFTCODE siêu chất nhé 💯💯💯💯💯💯💯💯
➖➖➖➖➖➖➖➖`
        await bot.sendPhoto(id[i], '1.jpg', { caption: noidung })
            .then(res => {
                console.log(i + '. send : [id:' + res.chat.id + '] [first_name:' + res.chat.first_name + '] [username:' + res.chat.username + ']')
            })
            .catch(err => {
                console.log(err)
            })
    }
}