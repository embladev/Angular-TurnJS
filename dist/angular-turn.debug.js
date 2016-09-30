angular.module("angularTurn",[]);


(function(){
	var bookDir = function($filter){
		return {
            restrict: 'E',
			link: function(scope, element, attrs) {
			},
            compile: function (element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function (scope, $element, attrs) {

                        var pageContents = [];
                        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
                            angular.forEach(value.childNodes, function (innerElement,key) {
                                if( innerElement.nodeName!="#text"){
                                    pageContents.push(innerElement);
                                }
                            })
                        });

                        $("book").replaceWith($('<div id="flipbook"></div>'));
                        var bookdiv = $(document.getElementById("flipbook"));
                        angular.forEach(pageContents,function(value,key){
                            bookdiv.append(value);
                        });

                        //console.log(document.getElementById("flipbook"));

                        $("#flipbook").turn({
                            width: attrs.ngbWidth,
                            height: attrs.ngbHeight,
                            autoCenter: attrs.ngbAutocenter
                        });
                    }
                }
            }
        }
	}
	angular.module("angularTurn").directive('book', bookDir);
})();

	
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