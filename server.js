var express = require("express"),
    azure = require("azure"),
    Firebase = require('firebase'),
	app = express(),
	port = process.env.PORT || 1337,
    queueName = 'lightswitcher';

app.use("/app", express.static(__dirname + "/app"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/content", express.static(__dirname + "/content"));
app.use("/template", express.static(__dirname + "/template"));

var serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedSecretIssuer=owner;SharedSecretValue=EsPNBAc0MX4wOMoatUhwAQjSSKdzHHYx7/vUtfPBCt0=');
var lightswitch = new Firebase('https://blazing-fire-9257.firebaseio.com/lightswitch');
	
app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/message', function(req, res) {	
	res.json({message:'ok'});
});

app.get('/lightswitch/:toggle', function(req, res) {
    var toggle = req.params.toggle;
    lightswitch.set(toggle);
     serviceBusService.sendQueueMessage(queueName, toggle, function(error) {
        if(!error){
            console.log('Message '+ toggle + ' sent to queue ' + queueName);
         }        
    });
})

app.listen(port);
console.log("Server started on port " + port);