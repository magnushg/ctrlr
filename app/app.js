var transportTypeMap = {};

transportTypeMap[0] = 'Walking',
transportTypeMap[1] = 'AirportBus',
transportTypeMap[2] = 'Bus',
transportTypeMap[4] = 'Bus',
transportTypeMap[5] = 'Boat',
transportTypeMap[6] = 'Train',
transportTypeMap[7] = 'Tram',
transportTypeMap[8] = 'Metro'

function SearchCtrl($scope) {
    //$scope.stops = [];
    $scope.loading = false;
    $scope.search = function() {
        $scope.selectedIndex = 0;
        $scope.loading = true;
        var url = 'http://reis.trafikanten.no/ReisRest/Place/Autocomplete/' + $scope.searchText + '?linesAndCoordinates=true'
        $.ajax({
  			    dataType: "jsonp",
  			    url: url,  			
  			    success: function(data) {
  				    $scope.stops = mapStops(data);
                    console.log($scope.stops);
                    $scope.loading = false;
                    $scope.$apply();                    
  			    }});
       }



    $scope.selectedIndex = 0;

    $scope.itemClicked = function ($index) {
        $scope.selectedIndex = $index;
    };
}

function mapStops(stops) {
   return _.chain(stops)
            .filter(function (stop) {
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
                                transportation: transportTypeMap[line.Transportation]
                            }
                        })
                }})
            .value() 
}

var map;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(60.3920969, 5.32812829999999),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }

