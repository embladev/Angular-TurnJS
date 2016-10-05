
//commentd?
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

	