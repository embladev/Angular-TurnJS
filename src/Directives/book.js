(function(){

    var pageContents = [];
    var isTemplateGiven = true;
    
    var setBookContentFromInnerHTML = function ($filter) {
        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
            pageContents.push($filter('filter')(value.childNodes,"div")[0]); //retriving main div wrapper of each page html content
        });

        $("book").replaceWith($('<div id="flipbook"></div>'));

        var bookdiv = $(document.getElementById("flipbook"));

        angular.forEach(pageContents,function(value,key){
            bookdiv.append(value);
        });

        console.log(bookdiv);
    }
    
    var setBookContentFromTemplate = function ($filter) {
        console.log($(document.getElementsByTagName("page"))[0]);
    }

    var applyTurnStyles = function (attrs) {
        $("#flipbook").turn({
            width: attrs.ngbWidth,
            height: attrs.ngbHeight,
            autoCenter: attrs.ngbAutocenter
        });
    }

	var bookDir = function($filter){
		return {
            restrict: 'E',
			link: function(scope, element, attrs) {
			},

            compile: function (element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function (scope, element, attrs) {

                        if(isTemplateGiven){
                            setBookContentFromTemplate($filter)
                        } else {
                            setBookContentFromInnerHTML($filter);
                        }

                        //applyTurnStyles(attrs);

                    }
                }
            }
        }
	}
	angular.module("angularTurn").directive('book', bookDir);
})();

	