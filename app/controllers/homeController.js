(function(app) {

    var homeController = function($scope, $http, $firebase, travelService) {
        var lightswitchRef = new Firebase("https://blazing-fire-9257.firebaseio.com/automatr/lightswitch");
        var tempratureRef = new Firebase("https://blazing-fire-9257.firebaseio.com/automatr/temprature");
        var brightnessRef = new Firebase("https://blazing-fire-9257.firebaseio.com/automatr/brightness");
        $scope.temprature = $firebase(tempratureRef);
        $scope.brightness = $firebase(brightnessRef);
        $scope.lightswitchToggle = $firebase(lightswitchRef);
        $scope.lightswitchToggle.$bind($scope, 'lightToggle');
        $scope.selectedIndex = 0;

        $scope.itemClicked = function($index) {
            $scope.selectedIndex = $index;
        };

        $scope.lightswitch = function() {            
            $scope.lightToggle = !$scope.lightToggle;
            lightswitchRef.update({lightswitch: $scope.lightToggle});
            //$scope.lightswitchToggle.$add({lightswitch: $scope.lightToggle});
        };

         $scope.getLocation = function(val) {
            return travelService.getLocation(val).then(function(res) {
                return travelService.mapStops(res.data);
            });
        };

        $scope.stopSelected = function($item) {
            return travelService.getRealtimeData($item.id).then(function(departures) {
                    if(departures.data.length > 0 ) {
                        $scope.departuresHeading = 'Real time departures';
                        $scope.departures = travelService.mapDepartures(departures);
                    }
                    else {
                        $scope.departuresHeading = 'No Real time data';
                        $scope.departures = {};
                    }
                });
        };
    };



function calculateExpectedTimeString(actualTime) {
    var diffFromNow = moment(actualTime).diff(moment(), 'minutes');

    if(diffFromNow === 0) {
        return 'Nå'
    }

    return diffFromNow > 10 ? moment(actualTime).format() : diffFromNow + ' min';
}

app.controller("homeController", ['$scope', '$http', '$firebase', 'travelService', homeController]);
    
}(angular.module("ctrlrApp")))

