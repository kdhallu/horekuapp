var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const {dialogflow} = require('actions-on-google');

const designFlow = dialogflow();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(process.env.PORT || 8080, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get("/", function(req, res){
	console.log('api called');
	res.json({status:"true", message:"server running"})
})

app.post("/fullfilment", function(req, res) {
	
	let response = "Webhook actually called. I hope you win hackathon";//Default response from the webhook to show it’s working
	let responseObj={
		 "fulfillmentText":response
		,"fulfillmentMessages":[
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