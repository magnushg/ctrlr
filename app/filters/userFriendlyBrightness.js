(function(app) {
   var brigthness = function() {
        return function(input) {
            switch (true) {
            	case (input <= 15):
            		return "dark";
            	case (input <= 200):
            		return "dim";
            	case (input <= 500):
            		return "light";
            	case (input <= 800):
            		return "bright";
            	case (input > 800):
            		return "very bright";
            	default:
            		return "No value";
            }
        };
    };

    app.filter('userFriendlyBrightness', brigthness);
}(angular.module("ctrlrApp")))