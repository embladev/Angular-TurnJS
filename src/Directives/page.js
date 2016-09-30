(function(){
	var pageDir = function () {
		return {
            restrict: 'E',
            /*templateUrl: function (element,attrs) {
                return attrs.ngbTemplate;
            },*/
			link: function(scope, element, attrs) {
				
			},
            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                       /* $("page").replaceWith( $( '<div><div id="page" style="background-color:red "> attrs.ts</div></div>'));
                        console.log("Inpage");
                        scope.bookpages = $("#page")*/
                    },
                    post: function (scope, element, attrs) {

                    }
                }
            }
        }
	}	
	angular.module("angularTurn").directive('page', pageDir);
})();