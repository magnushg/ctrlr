var express = require("express"),
    azure = require("azure"),
    Firebase = require('firebase'),
	app = express(),
	port = process.env.PORT || 1337;
    

app.use("/app", express.static(__dirname + "/app"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/content", express.static(__dirname + "/content"));
app.use("/template", express.static(__dirname + "/template"));

var lightswitch = new Firebase('https://blazing-fire-9257.firebaseio.com/lightswitch');
	
app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/message', function(req, res) {	
	res.json({message:'ok'});
});

app.listen(port);
console.log("Server started on port " + port);