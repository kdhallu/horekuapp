var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const {dialogflow} = require('actions-on-google');

let http = require('follow-redirects').https;

const designFlow = dialogflow();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(process.env.PORT || 234, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get("/", function(req, res){
	console.log('api called');
	res.json({status:"true", message:"server running"})
})

app.post("/fullfilment", function(req, res) {
	
	let options = {
		host: 'www.google.com',
		path: '/trigger/',
		headers: {
			'Content-Type': 'application/json',
			'Environment-id': '59218',
			'Authorization': 'Bearer asdfasdfsad'
		},
		method: 'POST'
	};

	var req = http.request(options, function(httpResponse) {
		console.log('Status: ' + httpResponse.statusCode);
		console.log('Headers: ' + JSON.stringify(httpResponse.headers));
		httpResponse.setEncoding('utf8');
		httpResponse.on('data', function (body) {
			console.log('response from server' + JSON.parse(body).message)
			
			let responseObj={
				 "fulfillmentText": JSON.parse(body).message,
				 "fulfillmentMessages":[
					{
						"text": {
							"text": [
								"Hello I m Responding to intent"
							]
						}
					}
				]
				,"source":""
			}
	
	
			res.json(responseObj);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e);
	});
	// write data to request body
	req.write(JSON.stringify({email: "kdhallu", period: "2020-05-01"}));
	req.end();
});
