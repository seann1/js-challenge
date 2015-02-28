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
	   				var splitDashDate = moment(currentDate).format('YYYY-MM-DD');
	   				dates.push(splitDate);
	   				console.log(splitDashDate);

	   				var latitude = results[0].geometry.location.lat();
	   				var longitude = results[0].geometry.location.lng();
	 					var sunriseurl = "http://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" + splitDashDate + "&callback=mycallback";
	 					console.log(sunriseurl);
			   		var response = $.ajax({
											    		url: sunriseurl,
											    		dataType: "JSONP",
											    		success: function(data) {
											    			$("#sunrises").append("<tr class='day day" + i + "'><td class='date date" + i + "'>" + "</td><td>" + data.results.sunrise + "</td><td>" + data.results.sunset + "</td><td>" + data.results.day_length + "</td><td><button class='btn btn-default' data-toggle='modal' data-target='#modal" + i + "'>More Info</button></td></tr>");
											    			$(".modals").append('<div class="modal fade" id="modal' + i + '"tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div class="modal-body">...</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>');
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