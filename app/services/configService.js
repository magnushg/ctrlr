(function (app) {
	var configService = function() {
		var configFactory = {};

		configFactory.baseConfig = {
			firebaseEnvironment: "automatr"
		}

		return configFactory;
	}	 
	app.factory("configService", [configService]);

}(angular.module("ctrlrApp")));