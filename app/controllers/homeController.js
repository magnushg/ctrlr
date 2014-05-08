(function(app) {

    var homeController = function($scope, $http, travelService, automatrService, chartService) {       
        $scope.temperature = automatrService.gettemperature();
        $scope.brightness = automatrService.getBrightness();
        $scope.proximity = automatrService.getProximity();
        $scope.lightswitchToggle = automatrService.lightswitch();
        $scope.environmentLog = automatrService.environmentLog();
        $scope.lightswitchToggle.$bind($scope, 'lightToggle');
        $scope.temperatureChartConfig = { loading: true };
        $scope.brightnessChartConfig = { loading: true };

        $scope.lightswitch = function() {            
            $scope.lightToggle = !$scope.lightToggle;
        };

        $scope.temperature.$on('loaded', function (data) {
            $scope.thermometerChartConfig = chartService.createThermometerConfig(data);
        });

        $scope.environmentLog.$on('loaded', function (data) {
            $scope.tempLog = _.chain(data)
                .filter(function (item) {
                    return item.temperature !== undefined;
                })
                .map(function (item) {
                return item.temperature;
            }).value();
            $scope.brightnessLog = _.chain(data)
                .filter(function (item) {
                    return item.brightness !== undefined 
                })
                .map(function (item) {
                return item.brightness;
            }).value();
            $scope.temperatureChartConfig = chartService.createEnvironmentChartConfig('Temperature', 'spline', $scope.tempLog, '#910000', "°C");
            $scope.brightnessChartConfig = chartService.createEnvironmentChartConfig('Brightness', 'spline', $scope.brightnessLog, '#2f7ed8');
            
            $scope.environmentLog.$on('child_added', function (child) {
                var snapshot = child.snapshot.value;
                if(snapshot.temperature) {
                    $scope.temperatureChartConfig.series[0].data.push({x: snapshot.temperature.timestamp, y: parseFloat(snapshot.temperature.value)});
                    $scope.thermometerChartConfig.series[0].data = [parseFloat(snapshot.temperature.value)];
                }
                if(snapshot.brightness) {
                    $scope.brightnessChartConfig.series[0].data.push({x: snapshot.brightness.timestamp, y: snapshot.brightness.value});
                }
            });
        });       
    };

app.controller("homeController", ['$scope', '$http', 'travelService', 'automatrService', 'chartService', homeController]);
    
}(angular.module("ctrlrApp")))

