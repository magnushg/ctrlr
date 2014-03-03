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
                loading: false,
                credits: {
		    		enabled: false
  				}
                }                
            }

            chartFactory.createThermometerConfig = function(temperature) {
            	return { 
            		options : {
            		
            		chart: {
		        	type: 'gauge',
			        plotBackgroundColor: null,
			        plotBackgroundImage: null,
			        plotBorderWidth: 0,
			        plotShadow: false
		    	},
		    	   pane: {
				        startAngle: -150,
				        endAngle: 150
	    			}
	    		},	    
			    title: {
			        text: ''
			    },	       
			    // the value axis
			    yAxis: {
			        min: -30,
			        max: 50,
			        
			        minorTickInterval: 'auto',
			        minorTickWidth: 1,
			        minorTickLength: 10,
			        minorTickPosition: 'inside',
			        minorTickColor: '#666',
			
			        tickPixelInterval: 30,
			        tickWidth: 2,
			        tickPosition: 'inside',
			        tickLength: 10,
			        tickColor: '#666',
			        labels: {
			            step: 2,
			            rotation: 'auto'
			        },
			        title: {
			            text: '°C'
			        },
			        plotBands: [{
			            from: -30,
			            to: 0,
			            color: '#257ef2' // blue
			        }, {
			            from: 0,
			            to: 50,
			            color: '#ec0117' // red
			        }]        
			    },
			
			    series: [{
			        name: 'temperature',
			        data: [parseFloat(temperature.value)],
			        tooltip: {
			            valueSuffix: '°C'
			        }
			    }],
			    credits: {
		    	enabled: false
  			},	
		}
    }

		return chartFactory
    };

    app.factory("chartService", [chartService]);


}(angular.module("ctrlrApp")));