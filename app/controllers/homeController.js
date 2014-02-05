(function(app) {

    var homeController = function($scope, $http) {
        $scope.loading = false;

        $scope.temprature = _.random(17, 25);
        $scope.lightToggle = false;
        $scope.selectedIndex = 0;

        $scope.itemClicked = function($index) {
            $scope.selectedIndex = $index;
        };

        $scope.lighswitch = function() {
            $scope.lightToggle = !$scope.lightToggle;
            $http.get('lightswitch/' + $scope.lightToggle);
        };

         $scope.getLocation = function(val) {
            return $http.jsonp('http://reis.trafikanten.no/ReisRest/Place/Autocomplete/' + val, {
              params: {
                callback: 'JSON_CALLBACK'
               }
            }).then(function(res) {
                return mapStops(res.data);
            });
        };

        $scope.stopSelected = function($item) {
            return $http.jsonp('http://reis.trafikanten.no/ReisRest/RealTime/GetRealTimeData/' + $item.id, {
                params: {
                    callback: 'JSON_CALLBACK'
                }})
                .then(function(departures) {
                    if(departures.data.length > 0 ) {
                        $scope.departuresHeading = 'Real time departures';
                        $scope.departures = mapDepartures(departures);
                    }
                    else {
                        $scope.departuresHeading = 'No Real time data';
                        $scope.departures = {};
                    }
                });
        };
    };

function mapDepartures(departures) {
    return _.map(departures.data, function(departure) {
        return {
            name: departure.PublishedLineName,
            destination: departure.DestinationDisplay,
            expectedArrival: calculateExpectedTimeString(departure.ExpectedArrivalTime),
            vehicleMode: departure.VehicleMode
        }
    });
}

function calculateExpectedTimeString(actualTime) {
    var diffFromNow = moment(actualTime).diff(moment(), 'minutes');

    if(diffFromNow === 0) {
        return 'Nå'
    }

    return diffFromNow > 10 ? moment(actualTime).format() : diffFromNow + ' min';
}

function mapStops(stops) {
    return _.chain(stops)
        .filter(function(stop) {
            return stop.Type === 0;
        })
        .map(function(stop) {
            return {
                id: stop.ID,
                name: stop.Name,
                district: stop.District
            };
        })
        .value();
}

app.controller("homeController", ['$scope', '$http', homeController]);
    
}(angular.module("ctrlrApp")))

