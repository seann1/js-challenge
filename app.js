var app = angular.module("sunrise-times", []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.getTimes = function() {
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

   		//make api call inside of call to google maps api
   			var i = 0;
	   			while (startDateMilli <= endDateMilli) {

	   				var currentDate = new Date(startDateMilli);
	   				var splitDate = currentDate.toString().split(" ").slice(1, 4).join(" ");
	   				dates.push(splitDate);
	 					var sunriseurl = "http://api.sunrise-sunset.org/json?lat=" + results[0].geometry.location.lng() + "&lng=" + results[0].geometry.location.lat() + "&date=" + currentDate + "&callback=mycallback";
			   		var response = $.ajax({
											    		url: sunriseurl,
											    		dataType: "JSONP",
											    		success: function(data) {
											    			$("#sunrises").append("<tr class='day day" + i + "'><td class='date date" + i + "'>" + "</td><td>" + data.results.sunrise + "</td><td>" + data.results.sunset + "</td><td>" + data.results.day_length + "</td></tr>");
											    			// $scope.sunrise = data.results.sunrise;
										    			i += 1;
											    			return data;
											    		}
														}).done(function() {
															for (var i = 0; i <= dates.length; i++){
																$(".date" + i).text(dates[i]);
															}
														}); //end of api call
			   		console.log(response);
						startDateMilli += 86400000;
						console.log(dates);
			   	} //end of while loop
  			}
			}); //endof geocoder

			$scope.address = '';
			$scope.city = '';
			$scope.state = '';
			$scope.startDate = '';
			$scope.endDate = '';

		}; //end of getTimes();
	}]);