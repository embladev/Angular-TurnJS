angular.module("angularTurn",[]);


(function(){

    var pageContents = [];
    var isTemplateGiven = false;
    
    var setBookContentFromInnerHTML = function ($filter) {
        void 0;
        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
           //pageContents.push($filter('filter')(value.childNodes,"div")[0]); //retriving main div wrapper of each page html content
            angular.forEach(value.childNodes, function (innerElement,key) {
                if( innerElement.nodeName!="#text"){
                    pageContents.push(innerElement);
                }
            });
        });

        $("book").replaceWith($('<div id="flipbook"></div>'));

        var bookdiv = $(document.getElementById("flipbook"));
        void 0;
        angular.forEach(pageContents,function(value,key){
            bookdiv.append(value);
        });

        void 0;
    }
    
    var setBookContentFromTemplate = function ($filter) {
        void 0;
        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
            pageContents.push($filter('filter')(value.childNodes,"div")[0]); //retriving main div wrapper of each page html content
        });
        $("book").replaceWith($('<div id="flipbook"></div>'));
        var bookdiv = $(document.getElementById("flipbook"));
        void 0;
        angular.forEach(pageContents,function(value,key){
            bookdiv.append(value);
        });
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
                            //setBookContentFromTemplate($filter)
                            void 0;
                        } else {
                            setBookContentFromInnerHTML($filter);
                        }

                        applyTurnStyles(attrs);

                    }
                }
            }
        }
	}
	angular.module("angularTurn").directive('book', bookDir);
})();

	
(function(){

    var isTemplateGiven = false;



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
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        }
                    },
                    post: function (scope, element, attrs) {
                        isTemplateGiven = false;
                        if("ngbTemplate" in attrs){
                            /*console.log("template available");
                            console.log("main variable vaule before: " + isTemplateGiven);*/
                            isTemplateGiven = true;
                            /*console.log(attrs.ngbTemplate);
                            console.log("main variable vaule after: " + isTemplateGiven);*/
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        } else {
                            /*console.log("no template");
                            console.log("main variable vaule before: " + isTemplateGiven);*/
                            isTemplateGiven = false;
                            /*console.log("main variable vaule after: " + isTemplateGiven);*/
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