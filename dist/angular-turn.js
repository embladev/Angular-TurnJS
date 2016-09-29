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
                        void 0;
                        void 0;
                        //console.log($(document.getElementsByTagName("page"))[0].childNodes);
                        var pageContents = [];
                        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
                            //console.log($filter('filter')(value.childNodes,"div"));
                            pageContents.push($filter('filter')(value.childNodes,"div")[0]);
                        });

                        $("book").remove();
                        var bookdiv = angular.element("div");
                        bookdiv.attr("id","flipbook");

                        void 0;

                        angular.forEach(pageContents,function(value,key){
                            bookdiv.append(value)
                           void 0;
                        });
                        //console.log(document.getElementById("qwe").childNodes[1]);
                        //$element.replaceWith($('<div id="flipbook"><div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div></div>'))
                        //$("#flipbook").appendChild($('<div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div>'))
                        //element.outerHTML += '<div id="flipbook"><div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div></div>';
                        void 0;

                        /*$("#flipbook").turn({
                            width: attrs.ngbWidth,
                            height: attrs.ngbHeight,
                            autoCenter: attrs.ngbAutocenter
                        });*/
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