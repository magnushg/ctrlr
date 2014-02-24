(function (app) {

    var chartService = function () {
        var chartFactory = {};
        
        chartFactory.createEnvironmentChartConfig = function(name, chartType, tempLog, color, yAxis) {
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
                    color: color,
                    marker: {
                        enabled: false
                    }
                }],
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime'               
                },
                yAxis : {
                    title : {
                        text : yAxis || ''
                    }
                },                
                loading: false
                }
            }

		return chartFactory
    };

    app.factory("chartService", [chartService]);


}(angular.module("ctrlrApp")));