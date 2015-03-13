var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

        var timesOfDay = [
        {hour: '12:00 am', number: 0},
        {hour: '1:00 am', number: 1},
        {hour: '2:00 am', number: 2},
        {hour: '3:00 am', number: 3},
        {hour: '4:00 am', number: 4},
        {hour: '5:00 am', number: 5},
        {hour: '6:00 am', number: 6},
        {hour: '7:00 am', number: 7},
        {hour: '8:00 am', number: 8},
        {hour: '9:00 am', number: 9},
        {hour: '10:00 am', number: 10},
        {hour: '11:00 am', number: 11},
        {hour: '12:00 pm', number: 12},
        {hour: '1:00 pm', number: 13},
        {hour: '2:00 pm', number: 14},
        {hour: '3:00 pm', number: 15},
        {hour: '4:00 pm', number: 16},
        {hour: '5:00 pm', number: 17},
        {hour: '6:00 pm', number: 18},
        {hour: '7:00 pm', number: 19},
        {hour: '8:00 pm', number: 20},
        {hour: '9:00 pm', number: 21},
        {hour: '10:00 pm', number: 22},
        {hour: '11:00 pm', number: 23}];

        xTicks = [];

        for (var i = 0; i < array.length; i++) {
          xTicks.push(i.date);
        }


  var vis = d3.select('#visualisation'),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(array, function(d) {
      return moment(d.date);
    }), d3.max(array, function(d) {
      return moment(d.date);
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(timesOfDay, function(d) {
      return d.number;
    }), d3.max(timesOfDay, function(d) {
      return d.number;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickFormat(function(d) {
        return moment(d).format("M-D-YYYY");
      })
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .tickFormat(function(d){
        return moment(d.hour).format("h:mm a")})
      .orient('left')
      .tickSubdivide(true);
 
    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);
     
    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);
    return vis;

    // 		var w = 500;
				// var h = 300;
				// var barPadding = 1;
				// 	var svg = d3.select(".deethree")
				//    			.append("svg")
	   //                      .attr("width", w + "px")
	   //                      .attr("height", h + "px");
	   //          svg.selectAll("rect")
    //            		.data(array)
    //            		.enter()
    //            		.append("rect")
    //            		.attr("x", function(d, i) {
    //                 return i * (w / array.length);
    //             	})
    //            		.attr("y", function(d) {
    //            			console.log(d);
    //                 return h - (d.sunrise * h);  //Height minus data value
    //             	})
    //            		.attr("width", w / array.length - barPadding)
    //            		.attr("height", function(d) {
    //                 return d.sunrise * 40;
    //             	});

    // 		return svg;
    	}
    }
	});