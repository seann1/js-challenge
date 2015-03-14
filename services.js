var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

        var numbers = [];
        var hours = [];
        var d3Dates = [];

        for (var i = 0; i < array.length; i++) {
          d3Dates.push(array[i].date);
        }

        // for (var i = 0; i < timesOfDay.length; i++) {
        //   numbers.push(i.number);
        //   hours.push(i.number);
        // } 


  var vis = d3.select('#visualisation'),
    WIDTH = 700,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 70
    },
    xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([
        d3.min(array, function(d) {
          return moment(d.date);
        }),
        d3.max(array, function(d) {
          return moment(d.date);
        })
      ]),
    // yRange = d3.time.scale().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
    //   d3.min(timesOfDay, function(d) {
    //     return moment(d.hour);
    //   }), 
    //   d3.max(timesOfDay, function(d) {
    //     return moment(d.hour);
    //   })]),

    yRange = d3.time.scale().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([moment({hour: 0}), moment({hour: 23})]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .ticks(d3.time.hour, 24)
      .tickFormat(function(d) {
        return moment(d).format("M-D-YYYY");
      })
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .ticks(d3.time.hour, 1)
      .tickSize(5)
      .tickFormat(d3.time.format("%I %p"))
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
    	}
    }
	});