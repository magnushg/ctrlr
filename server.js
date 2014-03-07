var express = require("express"),
    azure = require("azure"),
    Firebase = require('firebase'),
	app = express(),
	port = process.env.PORT || 1337;
    

app.use("/app", express.static(__dirname + "/app"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/content", express.static(__dirname + "/content"));
app.use("/template", express.static(__dirname + "/template"));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/message', function(req, res) {	
	res.json({message:'ok'});
});

app.post('/instaMsg', function (req, res) {
    var insta = new Firebase("https://automatr.firebaseio.com/monitoredStop".format(firebaseName));
    insta.update({written: "OK"});
});


app.listen(port);
console.log("Server started on port " + port);