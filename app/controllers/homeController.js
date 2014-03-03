(function(app) {

    var homeController = function($scope, $http, travelService, automatrService, chartService) {       
        $scope.temprature = automatrService.getTemprature();
        $scope.brightness = automatrService.getBrightness();
        $scope.lightswitchToggle = automatrService.lightswitch();
        $scope.environmentLog = automatrService.environmentLog();
        $scope.monitoredStop = automatrService.monitoredStop();
        $scope.lightswitchToggle.$bind($scope, 'lightToggle');
        $scope.selectedDeparture = -1;
        $scope.tempratureChartConfig = { loading: true };
        $scope.brightnessChartConfig = { loading: true };

        $scope.selectDeparture = function($index, $item) {
            $scope.selectedDeparture = $index;
            travelService.setSubscription($scope.monitoredStop, $scope.selectedStop, $item);
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
            $scope.selectedDeparture = -1;
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

        $scope.temprature.$on('loaded', function (data) {
            $scope.thermometerChartConfig = chartService.createThermometerConfig(data);
        });

        $scope.environmentLog.$on('loaded', function (data) {
            $scope.tempLog = _.chain(data)
                .filter(function (item) {
                    return item.temprature !== undefined;
                })
                .map(function (item) {
                return item.temprature;
            }).value();
            $scope.brightnessLog = _.chain(data)
                .filter(function (item) {
                    return item.brightness !== undefined 
                })
                .map(function (item) {
                return item.brightness;
            }).value();
            $scope.tempratureChartConfig = chartService.createEnvironmentChartConfig('Temperature', 'spline', $scope.tempLog, '#910000', "°C");
            $scope.brightnessChartConfig = chartService.createEnvironmentChartConfig('Brightness', 'spline', $scope.brightnessLog, '#2f7ed8');
            
            $scope.environmentLog.$on('child_added', function (child) {
                var snapshot = child.snapshot.value;
                if(snapshot.temprature) {
                    $scope.tempratureChartConfig.series[0].data.push({x: snapshot.temprature.timestamp, y: parseFloat(snapshot.temprature.value)});
                    $scope.thermometerChartConfig.series[0].data = [parseFloat(snapshot.temprature.value)];
                }
                if(snapshot.brightness) {
                    $scope.brightnessChartConfig.series[0].data.push({x: snapshot.brightness.timestamp, y: snapshot.brightness.value});
                }
            });
        });       
    };

app.controller("homeController", ['$scope', '$http', 'travelService', 'automatrService', 'chartService', homeController]);
    
}(angular.module("ctrlrApp")))

