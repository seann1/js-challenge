var app = angular.module("sunrise-times", []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.times = [];
		$scope.getTimes = function() {
			var address = $scope.address + ", " + $scope.city + ", " + $scope.state;
			address = address.toString();

			var startDate = $scope.startDate;
			var startDateMilli = new Date($scope.startDate).getTime();
			var endDateMilli = new Date($scope.endDate).getTime();



			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': address}, function(results, status) {
  			if (status == google.maps.GeocoderStatus.OK)
  			{

   		//make api call inside of call to google maps api
   			var i = 0;
	   			while (startDateMilli <= endDateMilli) {

	   				var currentDate = new Date(startDateMilli);
	 					var sunriseurl = "http://api.sunrise-sunset.org/json?lat=" + results[0].geometry.location.lng() + "&lng=" + results[0].geometry.location.lat() + "&date=" + currentDate + "&callback=mycallback";
			   		var response = $.ajax({
											    		url: sunriseurl,
											    		dataType: "JSONP",
											    		success: function(data) {
											    			$("#sunrises").append("<div class='sunrise sunrise" + i + "'>" + data.results.sunrise + "</div>");
											    			// $scope.sunrise = data.results.sunrise;
											    			$scope.times.push({sunrise: data.results.sunrise});
;											    			i += 1;
											    			return data;
											    		}
														}); //end of api call
			   		console.log(response);
						startDateMilli += 86400000;
			   	} //end of while loop
  			}
			});

			$scope.address = '';
			$scope.city = '';
			$scope.state = '';
			$scope.startDate = '';
			$scope.endDate = '';

		}; //end of getTimes();
	}]);