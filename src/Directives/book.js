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

	