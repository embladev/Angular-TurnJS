angular.module("angularTurn",[]);


(function(){

    var coverContents =[];
    var pageContents = [];
    var isTemplateGiven = false;

    var setBookContentFromInnerHTML = function () {
        angular.forEach($(document.getElementsByTagName("cover")), function (value,key) {
            angular.forEach(value.childNodes, function (innerElement,key) {
                if( innerElement.nodeName!="#text"){
                    coverContents.push(innerElement);
                }
            });
        })

        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
            angular.forEach(value.childNodes, function (innerElement,key) {
                if( innerElement.nodeName!="#text"){
                    pageContents.push(innerElement);
                }
            });
        });

        $("book").replaceWith($('<div id="flipbook"></div>'));

        var bookdiv = $(document.getElementById("flipbook"));

        if (coverContents.length!=0){
            bookdiv.append($('<div class="hard"></div>').append(coverContents[0]));
            bookdiv.append($('<div class="hard"></div>').append(coverContents[1]));
            angular.forEach(pageContents,function(value,key){
                bookdiv.append(value);
            });
            bookdiv.append($('<div class="hard"></div>').append(coverContents[2]));
            bookdiv.append($('<div class="hard"></div>').append(coverContents[3]));
        }

        else{

            angular.forEach(pageContents,function(value,key){
                bookdiv.append(value);
            });
        }
    }

    var setBookContentFromTemplate = function () {

    };

    var applyTurnStyles = function (attrs) {
        $("#flipbook").turn({
            width: attrs.ngbWidth,
            height: attrs.ngbHeight,
            autoCenter: attrs.ngbAutocenter
        });
    }

    var bookDir = function(){
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
                            //setBookContentFromTemplate()
                        } else {
                            setBookContentFromInnerHTML();
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

    var coverDir = function () {
        var dir = {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
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
                            isTemplateGiven = true;
                            dir.templateUrl = function (element, attrs) {
                                return attrs.ngbTemplate;
                            }
                        } else {
                            isTemplateGiven = false;
                        }
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                return attrs.ngbTemplate;
            }
        }

        return dir;

    }

    angular.module("angularTurn").directive('cover', coverDir);

})();
(function(){

    var isTemplateGiven = false;



	var pageDir = function () {
		var dir = {
            restrict: 'E',
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
                            isTemplateGiven = true;
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        } else {
                            isTemplateGiven = false;
                        }
                        console.log(" ");
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