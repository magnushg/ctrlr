var express = require("express"),
    azure = require("azure"),
	app = express(),
	port = process.env.PORT || 1337,
    lightswitchTopic = 'lightswitch'

app.use("/app", express.static(__dirname + "/app"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/content", express.static(__dirname + "/content"));

var serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedSecretIssuer=owner;SharedSecretValue=EsPNBAc0MX4wOMoatUhwAQjSSKdzHHYx7/vUtfPBCt0=');

serviceBusService.createTopicIfNotExists(lightswitchTopic, function(error){
    if(!error){
        // Topic was created or exists
        console.log('topic created or exists.');
    }
});
	
app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/message', function(req, res) {	
	res.json({message:'ok'});
});

app.get('/lightswitch/:toggle', function(req, res) {
    var toggle = req.params.toggle;

     serviceBusService.sendTopicMessage(lightswitchTopic, toggle, function(error) {
      if (error) {
        console.log(error);
     }
     console.log('Message '+ toggle + ' sent to topic ' + lightswitchTopic);
    });

})

app.listen(port);
console.log("Server started on port " + port);