var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {


  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%m-%d-%Y").parse;
  var parseTime = d3.time.format("%I:%M:%S %p").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.time.scale()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.sunrise)); });

  var svg = d3.select("#visualisation")
      .data(array)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  x.domain(d3.extent(array, function(d) { return parseDate(d.date); }));
  y.domain(d3.extent(array, function(d) { return parseTime(d.sunrise); }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(array)
      .attr("class", "line")
      .attr("d", line);



    }
  }
});