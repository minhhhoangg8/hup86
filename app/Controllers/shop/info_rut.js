const _ = require('lodash');
let request = require('request');
module.exports = function(client){
    let url = `http://mm4u.cc:10007/api/Bank/getListBankCode`;
    request.get({
        url: url,
        headers: { 'Content-Type': 'application/json' }
    }, function (err, httpResponse, body) {
        try {
            data = JSON.parse(body);
            if (data.stt == 1) {
                client.red({ shop:{info_rut:data}});
            } else {
                client.red({ notice: { title: '', text: 'Hệ thống đang bận!', load: false } });
            }
        } catch (e) {
            console.log(`??????`);
            client.red({ notice: { title: '', text: 'Hệ thống đang bận!', load: false } });
        }
    });
}
