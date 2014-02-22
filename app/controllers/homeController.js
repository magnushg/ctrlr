(function(app) {

    var homeController = function($scope, $http, travelService, automatrService) {       
        $scope.temprature = automatrService.getTemprature();
        $scope.brightness = automatrService.getBrightness();
        $scope.lightswitchToggle = automatrService.lightswitch();
        $scope.environmentLog = automatrService.environmentLog();
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
                    return item.brightness !== undefined;
                })
                .map(function (item) {
                return item.brightness;
            }).value();
            $scope.createTempChartConfig($scope.tempLog);
            $scope.createBrightnessChartConfig($scope.brightnessLog);
        });

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

        $scope.createTempChartConfig = function(tempLog) {
            $scope.tempratureChartConfig = {
            options: {
                chart: {
                    type: 'spline'
                }
            },
            series: [{
                name: "temprature",
                data: _.map(tempLog, function(logItem) {
                    return parseFloat(logItem.value);
                })
            }],
            title: {
                text: 'Temprature log'
            },

            loading: false
            }
        }

        $scope.createBrightnessChartConfig = function(brightnessLog) {
            $scope.brightnessChartConfig = {
            options: {
                chart: {
                    type: 'spline'
                }
            },
            series: [{
                name: "brightness",
                color: '#910000',
                data: _.map(brightnessLog, function(logItem) {
                    return parseFloat(logItem.value);
                })
            }],
            title: {
                text: 'Brightness log'
            },

            loading: false
            }
        }

    };

app.controller("homeController", ['$scope', '$http', 'travelService', 'automatrService', homeController]);
    
}(angular.module("ctrlrApp")))

