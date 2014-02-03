(function(app) {
     var transportTypeMap = {};

    transportTypeMap[0] = 'Walking';
    transportTypeMap[1] = 'AirportBus';
    transportTypeMap[2] = 'Bus';
    transportTypeMap[4] = 'Bus';
    transportTypeMap[5] = 'Boat';
    transportTypeMap[6] = 'Train';
    transportTypeMap[7] = 'Tram';
    transportTypeMap[8] = 'Metro';
    
    var transportType = function() {
        return function(input) {
            return transportTypeMap[input];
        };
    };

    app.filter('transportType', transportType);
}(angular.module("ctrlrApp")))