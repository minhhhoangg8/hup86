
// Router HTTP / HTTPS
let mobile = require('is-mobile');
module.exports = function(app, redT) {
	// Home
	app.get('/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/landing/');
		} else {
			return res.redirect('/landing/');
		}
	});
	app.get('/landing/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/landing/');
		} else {
			return res.render('index');
		}
	});
	app.get('/landing/', function(req, res) {
		if (mobile({ua:req})){
			return res.render('index_mobile');
		} else {
			return res.redirect('/landing/');
		}
	});

	// Android
	app.get('/download/android', function(req, res) {
		return res.render('download/android');
	});

	// Admin
	app.get('/68ClubA/', function(req, res) {
		return res.render('admin');
	});

	// Fanpage
	app.get('/fanpage/', function(req, res) {
		return require('./routes/fanpage/redirect')(res);
	});

	// Help IOS
	app.get('/help/ios/', function(req, res) {
		return res.render('help/ios');
	});

	//Telegram
	app.get('/telegram/', function(req, res) {
		return require('./routes/telegram/redirect')(res);
	});
	
	app.get('/telegrambot/', function(req, res) {
		return require('./routes/telegrambot/redirect')(res);
	});
	
	app.get('/zalo/', function(req, res) {
		return require('./routes/zalo/redirect')(res);
	});
	
	app.get('/livechat/', function(req, res) {
		return require('./routes/livechat/redirect')(res);
	});
	
	app.post('/3994141F3A758CF06260EC771B2A02A1', function(req, res) {
        return require('./app/Controllers/shop/nap_the_callback')(req,res);
    });
	
	app.post('/5a1b0308f1233ecf37447f44e64', function(req, res) {
        return require('./app/Controllers/shop/dogiang88/callbackbaojin')(req,res);
    });


    app.get('/a90cfa209b31094acc16417f4623d6d3xx3x', function(req, res) {
        return require('./app/Controllers/shop/momocallback')(req,res);
    });

    app.get('/a90cfa209b31094acc16417f4623d6d3x3x', function(req, res) {
        return require('./app/Controllers/shop/bankcallback')(req,res);
    });
	//app.get('/autobankz', function(req, res) {
    //    return require('./app/Controllers/shop/autocallback')(req,res);
    //});

	// Sign API
	//require('./routes/api')(app, redT);  // load routes API
};
