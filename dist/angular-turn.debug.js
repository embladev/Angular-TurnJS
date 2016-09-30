angular.module("angularTurn",[]);


(function(){

    var pageContents = [];
    
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

                        //setBookContentFromInnerHTML($filter);
                        //applyTurnStyles(attrs);

                    }
                }
            }
        }
	}
	angular.module("angularTurn").directive('book', bookDir);
})();

	
(function(){

    var isTemplateGiven = true;



	var pageDir = function () {
		var dir = {
            restrict: 'E',
            /*templateUrl: function (element,attrs) {
                return attrs.ngbTemplate;
            },*/
			link: function(scope, element, attrs) {
				
			},
            /*templateUrl: function(element, attrs){
			    var isTemplateGiven = false;
			    if(isTemplateGiven){
                    return attrs.ngbTemplate;
                } else {
                    return null;
                }
            },*/
            scope: {},
            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                       /* $("page").replaceWith( $( '<div><div id="page" style="background-color:red "> attrs.ts</div></div>'));
                        console.log("Inpage");
                        scope.bookpages = $("#page")*/
                    },
                    post: function (scope, element, attrs) {
                        if("ngbTemplate" in attrs){
                            console.log("template available");
                            console.log("main variable vaule before: " + isTemplateGiven);
                            isTemplateGiven = true;
                            console.log("main variable vaule after: " + isTemplateGiven);
                        } else {
                            console.log("no template");
                            console.log("main variable vaule before: " + isTemplateGiven);
                            isTemplateGiven = false;
                            console.log("main variable vaule after: " + isTemplateGiven);
                        }
                        console.log(" " );
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                    return attrs.ngbTemplate;
            }
        }

        console.log(dir);
        return dir;

	}	
	angular.module("angularTurn").directive('page', pageDir);
})();