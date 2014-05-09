(function (app) {
	var configService = function() {
		var configFactory = {};

		configFactory.baseConfig = {
			firebaseEnvironment: "automatr-test"
		}

		return configFactory;
	}	 
	app.factory("configService", [configService]);

}(angular.module("ctrlrApp")));