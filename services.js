var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {
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