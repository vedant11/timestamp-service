// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
	let date_format = new Date();
	res.send({ unix: date_format.getTime(), utc: date_format.toUTCString() });
});

app.get('/api/:date_str', function (req, res) {
	let date_str = req.params.date_str;
	let is_unix = !isNaN(Number(date_str)),
		date_format;
	if (!date_str.length) {
		date_format = new Date();
	} else {
		if (is_unix) date_str = Number(date_str);
		date_format = new Date(date_str);
	}
	if (date_format == 'Invalid Date') {
		res.send({ error: 'Invalid Date' });
		return;
	}
	res.send({ unix: date_format.getTime(), utc: date_format.toUTCString() });
});

// listen for requests :)
var listener = app.listen(4000, function () {
	console.log('Your app is listening on port ' + 4000);
});
