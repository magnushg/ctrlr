(function (app) {

    var automatrService = function ($firebase, configService) {
        var automatrFactory = {};
        var firebaseName = configService.baseConfig.firebaseEnvironment;

        var lightswitchRef = new Firebase("https://{0}.firebaseio.com/lightswitch".format(firebaseName));
        var coffeeRef = new Firebase("https://{0}.firebaseio.com/coffee".format(firebaseName));
        var temperatureRef = new Firebase("https://{0}.firebaseio.com/temperature".format(firebaseName));
        var proximityRef = new Firebase("https://{0}.firebaseio.com/proximity".format(firebaseName));
        var brightnessRef = new Firebase("https://{0}.firebaseio.com/brightness".format(firebaseName));
        var logRef = new Firebase("https://{0}.firebaseio.com/environmentLog".format(firebaseName));
        var monitoredStopRef = new Firebase("https://{0}.firebaseio.com/monitoredStop".format(firebaseName)); 
        
        automatrFactory.gettemperature = function () {
        	return $firebase(temperatureRef);
        };

        automatrFactory.getBrightness = function () {
            return $firebase(brightnessRef);
        };

        automatrFactory.getProximity = function () {
            return $firebase(proximityRef);
        };

        automatrFactory.lightswitch = function () {
            return $firebase(lightswitchRef);
        };

        automatrFactory.coffeeToggle = function () {
            return $firebase(coffeeRef);
        };

        automatrFactory.environmentLog = function () {
        	return $firebase(logRef);
        };

        automatrFactory.monitoredStop = function () {
        	return $firebase(monitoredStopRef);
        }

		return automatrFactory
    };

    app.factory("automatrService", ["$firebase", "configService", automatrService]);


}(angular.module("ctrlrApp")));