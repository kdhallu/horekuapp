var express = require("express");
var bodyParser = require("body-parser");
var app = express();


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
	console.log('fullfilment called');
	res.json({{
	  "textToSpeech": "this is text to speech",
	  "ssml": "this is ssml",
	  "displayText": "this is display text"
	});
});