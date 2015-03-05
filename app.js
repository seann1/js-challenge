var app = angular.module("sunrise-times", ['ui.bootstrap']);

app.controller('MainCtrl', [
	'$scope',
	function($scope){

  	$scope.open = function($event, opened) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope[opened] = true;
  	};

  	$scope.loadAddress = function() {
  		$scope.address = "350 5th Avenue";
  		$scope.city = "New York"
  		$scope.state = "NY";
  	}

		$scope.getTimes = function() {

			function init() {
				var oneWeekAgo = new Date();
				$scope.startDate = oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
				$scope.endDate = moment(new Date).format();
			}

			init();
			$("#sunrises").empty();
			var address = $scope.address + ", " + $scope.city + ", " + $scope.state;
			address = address.toString();

			var startDate = $scope.startDate;
			var startDateMilli = new Date($scope.startDate).getTime();
			var endDateMilli = new Date($scope.endDate).getTime();
			var dates = [];

			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': address}, function(results, status) {
  			if (status == google.maps.GeocoderStatus.OK)
  			{
   			  var i = 0;
	   			while (startDateMilli <= endDateMilli) {

	   				var currentDate = new Date(startDateMilli);
	   				var splitDate = moment(currentDate).format("M-D-YYYY");
	   				var dashDate = moment(currentDate).format("M/D/YYYY");
	   				var splitDashDate = moment(currentDate).format('YYYY-MM-DD');
	   				dates.push(splitDate);
	   				var latitude = results[0].geometry.location.lat();
	   				var longitude = results[0].geometry.location.lng();
	 					var sunriseurl = "http://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + splitDashDate + "&callback=mycallback";
			   		var response = $.ajax({
											    		url: sunriseurl,
											    		dataType: "JSONP",
											    		success: function(data) {
												    			function toTimeZone(time) {
												    				if ($("#zone").val().toString() === "current") {
												    					var date = new Date(dashDate + " " + time + " UTC");
												    					return moment(date).format("h:mm:ss a");
												    				} else {
												    					var timezone = $("#zone").val();
													    				var sunrise = moment.tz(splitDashDate + " " + time, "UTC");
													    				return sunrise.tz(timezone).format("h:mm:ss a");
													    				console.log(timezone);
												    				}
												    			}

												    		$("#sunrises").append("<tr class='day day" + i + "'><td class='date date" + i + "'>" + "</td><td>" + toTimeZone(data.results.sunrise) + "</td><td>" + toTimeZone(data.results.sunset) + "</td><td>" + data.results.day_length + "</td><td><button class='btn btn-default' data-toggle='modal' data-target='#modal" + i + "'>More Info</button></td></tr>");
											    			$(".modals").append('<div class="modal fade" id="modal' + i + '"tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + splitDate + '</h4></div><div class="modal-body">' + '<div class="modal-details">Astronomical twilight Begins: ' + toTimeZone(data.results.astronomical_twilight_begin) + '</div>' + '<div class="modal-details">Astronomical Twilight Ends: ' + toTimeZone(data.results.astronomical_twilight_end) + '</div><div class="modal-details">Civil Twilight Begins: ' + toTimeZone(data.results.civil_twilight_begin) + '</div><div class="modal-details">Civil Twilight Ends: ' + toTimeZone(data.results.civil_twilight_end) + '</div>' + '<div class="modal-details">Nautical Twilight Begins: ' + toTimeZone(data.results.nautical_twilight_begin) + '</div><div class="modal-details">Nautical Twilight Ends: ' + toTimeZone(data.results.nautical_twilight_end) + '</div><div class="modal-details">Solar Noon: ' + toTimeZone(data.results.solar_noon) + '</div><div class="modal-footer"></div></div></div></div>');
										    			  i += 1;
											    			return data;
											    		}
														}).done(function() {
															for (var i = 0; i <= dates.length; i++){
																$(".date" + i).text(dates[i]);
															}
														}); //end of api call
						startDateMilli += 86400000;
			   	} //end of while loop
  			}
			}); //endof geocoder

		$scope.address = '';
		$scope.city = '';
		$scope.state = '';
	}; //end of getTimes();

	function init() {
		var oneWeekAgo = new Date();
		$scope.startDate = oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		$scope.endDate = moment(new Date).format();
		$("#zone").append("<option value='current'>My Current Time Zone</option>");
		for (var i = 0; i < moment.tz.names().length; i++) {
			$("#zone").append("<option value='" + moment.tz.names()[i] + "'>"+ moment.tz.names()[i].split("_").join(" ") + "</option>");
		}
	}

	init();
}]);