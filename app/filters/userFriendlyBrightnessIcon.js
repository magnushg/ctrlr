(function(app) {
   var brigthnessIcon = function() {
        return function(input) {
            switch (true) {
            	case (input < 10):
            		return "fa-star-o";
            	case (input < 200):
            		return "fa-moon-o";
            	case (input < 500):
            		return "fa-lightbulb-o";
            	case (input < 800):
            		return "fa-sun-o";
            	case (input > 800):
            		return "fa-sun-o";
            	default:
            		return "No value";
            }
        };
    };

    app.filter('userFriendlyBrightnessIcon', brigthnessIcon);
}(angular.module("ctrlrApp")))