(function (app) {

    var travelService = function ($http) {
        var travelFactory = {};
        travelFactory.getLocation = function (val) {
            return $http.jsonp('http://reis.trafikanten.no/ReisRest/Place/Autocomplete/' + val, {
              params: {
                callback: 'JSON_CALLBACK'
               }});
        };

        travelFactory.getRealtimeData = function(id) {
            return $http.jsonp('http://reis.trafikanten.no/ReisRest/RealTime/GetRealTimeData/' + id, {
                params: {
                    callback: 'JSON_CALLBACK'
            }});
        };

        travelFactory.mapDepartures = function(departures) {
            return _.map(departures.data, function(departure) {
                return {
                    name: departure.PublishedLineName,
                    destination: departure.DestinationDisplay,
                    destinationRef: departure.DestinationRef,
                    direction: departure.DirectionName,
                    expectedArrival: calculateExpectedTimeString(departure.ExpectedArrivalTime),
                    vehicleMode: departure.VehicleMode
                }
            });
        };

        travelFactory.mapStops = function(stops) {
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
            };

        travelFactory.setSubscription = function ($monitoredStop, $item) {
        	$monitoredStop.$set({stop: {destinationRef: $item.destinationRef, destination: $item.destination, name: $item.name, direction: $item.direction, expectedArrival: $item.expectedArrival}});

        	/*setInterval(function () {
        		$monitoredStop.$set({stop: {destinationRef: $item.destinationRef, destination: $item.destination, name: $item.name, direction: $item.direction, expectedArrival: $item.expectedArrival}});
        	}, 10000)*/
        }

        function calculateExpectedTimeString(actualTime) {
            var diffFromNow = moment(actualTime).diff(moment(), 'minutes');

            if(diffFromNow === 0) {
                return 'Nå'
            }

            return diffFromNow > 10 ? moment(actualTime).format() : diffFromNow + ' min';
        }
        return travelFactory;
    };

    app.factory("travelService", ["$http",travelService]);


}(angular.module("ctrlrApp")));