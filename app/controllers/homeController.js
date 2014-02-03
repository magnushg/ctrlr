(function(app) {
   
var homeController = function($scope, $http) {
    //$scope.stops = [];
    $scope.loading = false;
    $scope.search = function() {
        $scope.selectedIndex = 0;
        $scope.loading = true;
        var url = 'http://reis.trafikanten.no/ReisRest/Place/Autocomplete/' + $scope.searchText + '?linesAndCoordinates=true&callback=JSON_CALLBACK'
        $http.jsonp(url).then(function(response) {
  				    $scope.stops = mapStops(response.data);
                    console.log($scope.stops);
                    $scope.loading = false;                    
                    });
       }


    $scope.temprature = _.random(17, 25);
    $scope.lightToggle = false;
    $scope.selectedIndex = 0;
  
    $scope.itemClicked = function ($index) {
        $scope.selectedIndex = $index;
    };

    $scope.lighswitch = function () {
        $scope.lightToggle = !$scope.lightToggle;  
        $http.get('lightswitch/' + $scope.lightToggle);
    }
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
                district: stop.District,
                lines: _.map(stop.Lines, function(line) {
                    return {
                        lineId: line.LineID,
                        lineName: line.LineName,
                        transportationType: line.Transportation,
                        transportation: line.Transportation
                    };
                })
            }
        })
        .value();
}

app.controller("homeController", ['$scope', '$http', homeController]);
    
}(angular.module("ctrlrApp")))

