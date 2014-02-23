(function(app) {

    var homeController = function($scope, $http, travelService, automatrService) {       
        $scope.temprature = automatrService.getTemprature();
        $scope.brightness = automatrService.getBrightness();
        $scope.lightswitchToggle = automatrService.lightswitch();
        $scope.environmentLog = automatrService.environmentLog();
        $scope.monitoredStop = automatrService.monitoredStop();
        $scope.lightswitchToggle.$bind($scope, 'lightToggle');
        $scope.selectedDeparture = -1;

        $scope.selectDeparture = function($index, $item) {
            $scope.selectedDeparture = $index;
            $scope.monitoredStop.$set({stop: {destinationRef: $item.destinationRef, destination: $item.destination, name: $item.name, direction: $item.direction}});
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

        $scope.environmentLog.$on('loaded', function(data) {
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
            $scope.tempratureChartConfig = $scope.createEnvironmentChartConfig('Temperature', 'spline', $scope.tempLog, '#2f7ed8');
            $scope.brightnessChartConfig = $scope.createEnvironmentChartConfig('Brightness', 'spline', $scope.brightnessLog, '#910000');
            
            $scope.environmentLog.$on('child_added', function (child) {
                var snapshot = child.snapshot.value;
                if(snapshot.temprature) {
                    $scope.tempratureChartConfig.series[0].data.push({x: snapshot.temprature.timestamp, y: parseFloat(snapshot.temprature.value)});
                }
                if(snapshot.brightness) {
                    $scope.brightnessChartConfig.series[0].data.push({x: snapshot.brightness.timestamp, y: snapshot.brightness.value});
                }
            });
        });       
       
        $scope.createEnvironmentChartConfig = function(name, chartType, tempLog, color) {
            return {
                options: {
                    chart: {
                        zoomType: 'x'
                    }
                },
                series: [{
                    name: name,
                    data: _.map(tempLog, function (logItem) {
                        return {x: logItem.timestamp, y: parseFloat(logItem.value)};
                    }),
                    pointStart: _.first(tempLog).timestamp,
                    type: chartType,
                    color: color
                }],
                title: {
                    text: name + ' log'
                },
                xAxis: {
                    type: 'datetime'               
                },
                loading: false
                }
            }
    };

app.controller("homeController", ['$scope', '$http', 'travelService', 'automatrService', homeController]);
    
}(angular.module("ctrlrApp")))

