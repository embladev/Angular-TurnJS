angular.module("angularTurn",[]);


var bookDir = function(){
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function(tElem, tAttrs){
            console.log('book: compile => ');
            return {
                pre: function(scope, iElem, iAttrs){
                    console.log('book: pre link => ');
                },
                post: function(scope, iElem, iAttrs){
                    console.log('book: post link => ');
                    iElem.turn({
                        width: iAttrs.ngbWidth,
                        height: iAttrs.ngbHeight,
                        autoCenter: iAttrs.ngbAutocenter
                    });
                }
            }
        }
    }
}
angular.module("angularTurn").directive('book', bookDir);

var coverDir = function () {
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude class="hard"></div>',
        compile: function (tElem, tAttrs) {
            console.log('cover: compile => ');
            return {
                pre: function (scope, iElem, iAttrs) {
                    console.log('cover: pre link => ');
                },
                post: function (scope, iElem, iAttrs) {
                    console.log('cover: post link => ');
                }
            }
        }
    }
}
angular.module("angularTurn").directive('cover', coverDir);
var pageDir = function () {
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function (tElem, tAttrs) {
            console.log('page: compile => ');

            return {
                pre: function (scope, iElem, iAttrs) {
                    console.log('page: pre link => ');
                },
                post: function (scope, iElem, iAttrs) {
                    console.log('page: post link => ');
                }
            }
        }
    }
}
angular.module("angularTurn").directive('page', pageDir);