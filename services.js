var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

  var times = [{hours: "12:00:00 am"},
  {hours: "01:00:00 am"},
  {hours: "02:00:00 am"},
  {hours: "03:00:00 am"},
  {hours: "04:00:00 am"},
  {hours: "05:00:00 am"},
  {hours: "06:00:00 am"},
  {hours: "07:00:00 am"},
  {hours: "08:00:00 am"},
  {hours: "09:00:00 am"},
  {hours: "10:00:00 am"},
  {hours: "11:00:00 am"},
  {hours: "12:00:00 pm"},
  {hours: "01:00:00 pm"},
  {hours: "02:00:00 pm"},
  {hours: "03:00:00 pm"},
  {hours: "04:00:00 pm"},
  {hours: "05:00:00 pm"},
  {hours: "06:00:00 pm"},
  {hours: "07:00:00 pm"},
  {hours: "08:00:00 pm"},
  {hours: "09:00:00 pm"},
  {hours: "10:00:00 pm"},
  {hours: "11:00:00 pm"}];


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

  var sunsetLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.sunset)); });

  var astroBeginLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.astroTwilightBegin)); });

  var astroEndLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.astroTwilightEnd)); });

  var nauticalBeginLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.nauticalTwilightBegin)); });

  var nauticalEndLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.nauticalTwilightEnd)); });

  var solarNoonLine = d3.svg.line()
      .x(function(d) { return x(parseDate(d.date)); })
      .y(function(d) { return y(parseTime(d.solarNoon)); });

  var svg = d3.select("#visualisation")
      .data(array)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  x.domain(d3.extent(array, function(d) { return parseDate(d.date); }));
  y.domain(d3.extent(times, function(d) { return parseTime(d.hours); }));

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

  svg.append("path")
      .datum(array)
      .attr("class", "line")
      .attr("d", line);

  svg.append("path")
      .datum(array)
      .style("stroke", "red")
      .attr("class", "line")
      .attr("d", sunsetLine);

  svg.append("path")
      .datum(array)
      .style("stroke", "green")
      .attr("class", "line")
      .attr("d", astroBeginLine);

  svg.append("path")
      .datum(array)
      .style("stroke", "purple")
      .attr("class", "line")
      .attr("d", astroEndLine);

  svg.append("path")
      .datum(array)
      .style("stroke", "orange")
      .attr("class", "line")
      .attr("d", nauticalBeginLine);

  svg.append("path")
      .datum(array)
      .style("stroke", "black")
      .attr("class", "line")
      .attr("d", nauticalEndLine);

  svg.append("path")
      .datum(array)
      .style("stroke", "brown")
      .attr("class", "line")
      .attr("d", solarNoonLine);



    }
  }
});