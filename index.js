var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// Import the appropriate service and chosen wrappers
const {
  dialogflow,
  Image,
} = require('actions-on-google')

// Create an app instance
const dfInstance = dialogflow()


// Register handlers for Dialogflow intents

dfInstance.intent('Default Welcome Intent', conv => {
  conv.ask('Hi, how is it going?')
  conv.ask(`Here's a picture of a cat`)
  conv.ask(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }))
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var server = app.listen(process.env.PORT || 8080, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get("/", function(req, res){
	console.log('api called')
	res.json({status:"true", message:"server running"})
})

app.post("/fulfillment", function(req, res) {
    res.json({
  "textToSpeech": 'This is response from webserver',
  "ssml": "ssm i dont know",
  "displayText": "this is display text"
});
});