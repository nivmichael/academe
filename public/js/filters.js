






//$scope.showIterableGroup = function(paramKey, docParamName, index, paramName) {
//	paramKey = paramKey.toString();
//	if($scope.user[docParamName][index][paramKey]['paramValue'] && typeof $scope.groups[paramName] != 'undefined') {
//		//var selected = $filter('filter')($scope.groups[paramName], {value: $scope.user[docParamName][index][paramKey]['paramValue']});
//		var selected = $filter('filter')($scope.groups[paramName], {id: $scope.user[docParamName][index][paramKey]['paramValue']});
//
//		return selected.length ? selected[0].text : 'Not set';
//	} else {
//		return $scope.user[docParamName][index][paramKey]['paramValue'] || '';
//	}
//};





angular.module('acadb.filters', [])

.filter('labeled', function(Account, $stateParams, $rootScope) {
	return function(input, label, scope) {

		var labeledPosts = scope.labeledPosts;


		if(!$stateParams.labeled){
			label = 'index';

		}
		labeledPosts['index'] = [];
		var output    = [];


		if(typeof (label) === 'undefined' || label == '' || label == 'index'){
			angular.forEach(input, function(value, key) {
				if(!angular.isDefined(value.label) ){
					labeledPosts['index'].push( value.postInfo.id )
					output.push(value);
				}
			});
		}else{

			angular.forEach(input, function(value, key) {

				if(_.contains(labeledPosts[label], value.postInfo.id) ){
					output.push(value);
				}else{
					labeledPosts['index'].push( value.postInfo.id )
				}
			});
		}

		$rootScope.$broadcast('updateBadges', labeledPosts);
		
		return output;
	}
})
.filter('ordinal', function() {

	// Create the return function
	// set the required parameter name to **number**
	return function(number) {

		// Ensure that the passed in data is a number
		if(isNaN(number) || number < 1) {

			// If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
			return number;

		} else {

			// If the data we are applying the filter to is a number, perform the actions to check it's ordinal suffix and apply it.

			var lastDigit = number % 10;

			if(lastDigit === 1) {
				return number + 'st'
			} else if(lastDigit === 2) {
				return number + 'nd'
			} else if (lastDigit === 3) {
				return number + 'rd'
			} else if (lastDigit > 3) {
				return number + 'th'
			}

		}
	}
})
.filter('checkDate', [function() {
    return function(input) {
    	//console.log('The input from the user is :'+input);
    	function getYesterday(){
    		var date = new Date();
    		return new Date(date.setDate(date.getDate() - 1));
    	}
    	
    	function getMonths(date1,date2){
    		var a = moment([date1.getFullYear(),date1.getMonth(),date1.getDate()]);
    		var b = moment([date2.getFullYear(),date2.getMonth(),date2.getDate()]);
    		return a.diff(b,'months',true);
    	}
    	
    	var returnedInput = input;
    	var today = new Date();
    	var lastBuyDate = new Date(input);
    	
    	if(today.toDateString() == lastBuyDate.toDateString()){
    		returnedInput = 'today';
    	} else if(getYesterday().toDateString() == lastBuyDate.toDateString()){	
    		returnedInput = 'yesterday';
    	} else if(getMonths(today,lastBuyDate) >= 6){
    		returnedInput = 'long time ago...';
    	}
    	return returnedInput;
    };
}])
	//.filter('customFilter', ['$parse', function($parse) {
	//	return function(items, filters) {
	//		var itemsLeft = items.slice();
    //
	//		Object.keys(filters).forEach(function(model) {
	//			var value = filters[model],
	//				getter = $parse(model);
    //
	//			itemsLeft = itemsLeft.filter(function(item) {
	//				return getter(item) === value;
	//			});
	//		});
    //
	//		return itemsLeft;
	//	};
	//}])
.filter("positioning", function() {
	return _.memoize(function(collection, field) {
		return _.sortBy(collection, function(item) {
			return item.position;
			console.log(collection);
		});
	}, function resolver(collection, field) {
		return collection.length + field;
	})
})

.filter('checkmark', [function() {
    return function(input) {
        // This is V or X characters
        return input ? '\u2713' : '\u2718';
    };
}])
.filter('capitalize', function() {
	return function(input, all) {
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
})

.filter('underscoreless', function () {
	return function (input) {
		return input.replace(/_/g, ' ');
	};
})
.filter('underscoreless2', function () {
	return function (input) {
		return input.replace(/_/g, '');
	};
})
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  }
  .filter('range', function() {
	  return function(input, min, max) {
		  min = parseInt(min); //Make string input int
		  max = parseInt(max);
		  for (var i=min; i<max; i++)
			  input.push(i);
		  return input;
	  };
  });



});