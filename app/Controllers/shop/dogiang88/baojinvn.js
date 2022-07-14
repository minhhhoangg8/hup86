var RequestService = require('../../../Helpers/RequestService');
let request = require('request');
let crypto = require('crypto');
var napthe68Config = {
    urlSend: 'https://api.chinapay.live/api/pay',
    callback: 'https://hup86.club/5a1b0308f1233ecf37447f44e64',
    api_key: 'hup86club12345',
    secret_key: 'hup86club56789'

}
var { urlSend, callback, api_key, secret_key } = napthe68Config || {};
module.exports = {
    Make: function(data) {
        return new Promise(function(resolve, reject) {
            if (data) {
                var { request_id, card_amount, card_type } = data || {};
                var texthash = `${card_type+'|'+card_amount+'|'+api_key}`;
                var params = {
                    api_key: api_key,
                    trans_id: request_id,
                    amount: card_amount,
                    type_id: card_type,
                    callback: callback,
                    sign: crypto.createHmac('SHA256', secret_key).update(texthash).digest('hex')
                };
                console.log('params', params);
                RequestService.Post({
                    url: urlSend,
                    formData: params
                })
                    .then(function(dataResponse) {
                        console.log('dataResponse on make', dataResponse);
                        resolve(dataResponse);
                    }, function(err) {
                        reject(400);
                    });
            } else {
                reject(400);
                console.log('PARAMS IS EMPTY');
            }
        });
    }
};