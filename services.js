var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

        // var timesOfDay = [
        // {hour: '00:00'},
        // {hour: '01:00'},
        // {hour: 02:00},
        // {hour: 03:00},
        // {hour: 04:00},
        // {hour: 05:00},
        // {hour: 06:00},
        // {hour: 07:00},
        // {hour: },
        // {hour: },
        // {hour: },
        // {hour: '11:00 am'},
        // {hour: '12:00 pm'},
        // {hour: '1:00 pm'},
        // {hour: '2:00 pm'},
        // {hour: '3:00 pm'},
        // {hour: '4:00 pm'},
        // {hour: '5:00 pm'},
        // {hour: '6:00 pm'},
        // {hour: '7:00 pm'},
        // {hour: '8:00 pm'},
        // {hour: '9:00 pm'},
        // {hour: '10:00 pm'},
        // {hour: 24:00}];

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
    WIDTH = 1000,
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

    yRange = d3.time.scale().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([moment({hour: 0}), moment({hour: 24})]),

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