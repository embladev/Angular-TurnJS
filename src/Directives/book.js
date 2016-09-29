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
                        console.log($("book").contents());
                        console.log($(document.getElementsByTagName("page")));
                        //console.log($(document.getElementsByTagName("page"))[0].childNodes);
                        var pageContents = [];
                        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
                            //console.log($filter('filter')(value.childNodes,"div"));
                            pageContents.push($filter('filter')(value.childNodes,"div")[0]);
                        });

                        //$("book").remove();
                        //var bookdiv = angular.element("book");
                        $("book").replaceWith($('<div id="flipbook"></div>'));
                        //bookdiv.attr("id","flipbook");
                        var bookdiv = $(document.getElementById("flipbook"));
                        //console.log();
                        console.log(bookdiv);

                        angular.forEach(pageContents,function(value,key){
                            bookdiv.append(value)
                           console.log(value);
                        });
                        console.log(bookdiv);
                        //console.log(document.getElementById("qwe").childNodes[1]);
                        //$element.replaceWith($('<div id="flipbook"><div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div></div>'))
                        //$("#flipbook").appendChild($('<div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div>'))
                        //element.outerHTML += '<div id="flipbook"><div style="background-color:aqua"> Page 1</div><div style="background-color:aqua"> Page 2</div><div style="background-color:aqua"> Page 3</div><div style="background-color:aqua"> Page 4</div></div>';
                        console.log(document.getElementById("flipbook"));

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

	