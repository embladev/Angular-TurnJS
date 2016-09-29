(function(){
	var pageDir = function () {
		return {
            restrict: 'E',
            templateUrl: function (element,attrs) {
                return attrs.ngbTemplate;
            },
			link: function(scope, element, attrs) {
				
			},
            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
						
                    },
                    post: function (scope, element, attrs) {
						
                    }
                }
            }
        }
	}	
	angular.module("angularTurn").directive('page', pageDir);
})();