var app = angular.module("sunrise-times.services", ['ui.bootstrap'])
	.factory('dthreeService', function(){
    return {
    	makeGraph: function(array) {

        var d3Dates = [];

        for (var i = 0; i < array.length; i++) {
          d3Dates.push(array[i].date);
        }

        function dateChanger(date) {
          var splitDate = date.split("-");
          if (splitDate[0].length === 1) {
            var index0 = ["0",splitDate[0]].join("");
          } else {
            var index0 = splitDate[0];
          }
          if (splitDate[1].length === 1) {
            var index1 = ["0",splitDate[0]].join("");
          } else {
            var index1 = splitDate[1];
          }

          return [index0, index1, splitDate[2]].join("-");
        };

        function toTime(time) {
          var splitTime = time.split(":");
          if (splitTime[0].length === 1) {
            var index0 = ["0",splitTime[0]].join("");
          } else {
            var index0 = splitTime[0];
          }
          if (splitTime[1].length === 1) {
            var index1 = ["0",splitTime[0]].join("");
          } else {
            var index1 = splitTime[1];
          }
          var splitInd2 = splitTime[2].split(" ");
          if (splitInd2[0].length === 1) {
            var lastIndex = ['0',splitInd2[0]," ", splitInd2[1]].join("");
          } else {
            var lastIndex = splitInd2.join(" ");
          }

          return [index0, index1].join(":") + ":" + lastIndex;
        };

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
          return d3.time.format("%m-%d-%Y").parse(dateChanger(d.date));
        }),
        d3.max(array, function(d) {
          return d3.time.format("%m-%d-%Y").parse(dateChanger(d.date));
        })
      ]),

    yRange = d3.time.scale().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
      d3.min(array, function(d) {
        return d3.time.format("%I:%M:%S %p").parse(toTime(d.sunrise))
      }),
      d3.max(array, function(d) {
        console.log(d3.time.format("%I:%M:%S %p").parse(toTime(d.sunrise)));
        return d3.time.format("%I:%M:%S %p").parse(toTime(d.sunrise));
      })
    ]),

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

    var valueline = d3.svg.line()
      .interpolate("linear")
      .x(function(d) {
        return d3.time.format("%m-%d-%Y").parse(dateChanger(d.date));
      })
      .y(function(d) {
        // var time = moment(d.sunrise).format("-MM-YYYY hh:mm:ss");
        console.log(d3.time.format("%I:%M:%S %p").parse(toTime(d.sunrise)));
        return d3.time.format("%I:%M:%S %p").parse(toTime(d.sunrise)); 
      });
 
    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);
     
    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);
      
    vis.append('svg:path')
      .attr('d', valueline(array))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'black');
    return vis;
    	}
    }
	});