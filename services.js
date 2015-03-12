var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

        var timesOfDay = [
        {time: '12:00 am'},
        {time: '1:00 am'},
        {time: '2:00 am'},
        {time: '3:00 am'},
        {time: '4:00 am'},
        {time: '5:00 am'},
        {time: '6:00 am'},
        {time: '7:00 am'},
        {time: '8:00 am'},
        {time: '9:00 am'},
        {time: '10:00 am'},
        {time: '11:00 am'},
        {time: '12:00 pm'},
        {time: '1:00 pm'},
        {time: '2:00 pm'},
        {time: '3:00 pm'},
        {time: '4:00 pm'},
        {time: '5:00 pm'},
        {time: '6:00 pm'},
        {time: '7:00 pm'},
        {time: '8:00 pm'},
        {time: '9:00 pm'},
        {time: '10:00 pm'},
        {time: '11:00 pm'}
        ];
    		var w = 500;
				var h = 300;
				var barPadding = 1;
					var svg = d3.select(".deethree")
				   			.append("svg")
	                        .attr("width", w + "px")
	                        .attr("height", h + "px");
	            svg.selectAll("rect")
               		.data(array)
               		.enter()
               		.append("rect")
               		.attr("x", function(d, i) {
                    return i * (w / array.length);
                	})
               		.attr("y", function(d) {
               			console.log(d);
                    return h - (d.sunrise * h);  //Height minus data value
                	})
               		.attr("width", w / array.length - barPadding)
               		.attr("height", function(d) {
                    return d.sunrise * 40;
                	});

    		return svg;
    	}
    }
	});