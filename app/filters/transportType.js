(function(app) {
     var transportTypeMap = {};

    transportTypeMap[0] = 'Bus';
    transportTypeMap[1] = 'Ferry';
    transportTypeMap[2] = 'Train';
    transportTypeMap[3] = 'Tram';
    transportTypeMap[4] = 'Metro';
    
    var transportType = function() {
        return function(input) {
            return transportTypeMap[input];
        };
    };

    app.filter('transportType', transportType);
}(angular.module("ctrlrApp")))