(function(app) {

    var homeController = function($scope, $http, travelService, automatrService) {       
        $scope.temprature = automatrService.getTemprature();
        $scope.brightness = automatrService.getBrightness();
        $scope.lightswitchToggle = automatrService.lightswitch();
        $scope.lightswitchToggle.$bind($scope, 'lightToggle');
        $scope.selectedDeparture = -1;

        $scope.selectDeparture = function($index, $item) {
            $scope.selectedDeparture = $index;

        };

        $scope.lightswitch = function() {            
            $scope.lightToggle = !$scope.lightToggle;
        };

         $scope.getLocation = function(val) {
            return travelService.getLocation(val).then(function(res) {
                return travelService.mapStops(res.data);
            });
        };

        $scope.stopSelected = function($item) {
            $scope.selectedStop = $item;
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

app.controller("homeController", ['$scope', '$http', 'travelService', 'automatrService', homeController]);
    
}(angular.module("ctrlrApp")))

