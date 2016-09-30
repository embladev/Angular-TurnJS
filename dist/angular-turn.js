angular.module("angularTurn",[]);


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

        void 0;
    }
    
    var setBookContentFromTemplate = function ($filter) {
        void 0;
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
                        if("ngbTemplate" in attrs){
                            void 0;
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        }
                    },
                    post: function (scope, element, attrs) {
                        if("ngbTemplate" in attrs){
                            void 0;
                            void 0;
                            isTemplateGiven = true;
                            void 0;
                            void 0;
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        } else {
                            void 0;
                            void 0;
                            isTemplateGiven = false;
                            void 0;
                        }
                        void 0;
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                    return attrs.ngbTemplate;
            }
        }

        void 0;
        return dir;

	}	
	angular.module("angularTurn").directive('page', pageDir);
})();