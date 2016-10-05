angular.module("angularTurn",[]);


var bookDir = function(){
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function(tElem, tAttrs){
            void 0;
            return {
                pre: function(scope, iElem, iAttrs){
                    void 0;
                },
                post: function(scope, iElem, iAttrs){
                    void 0;
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
            void 0;
            return {
                pre: function (scope, iElem, iAttrs) {
                    void 0;
                },
                post: function (scope, iElem, iAttrs) {
                    void 0;
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
            void 0;

            return {
                pre: function (scope, iElem, iAttrs) {
                    void 0;
                },
                post: function (scope, iElem, iAttrs) {
                    void 0;
                }
            }
        }
    }
}
angular.module("angularTurn").directive('page', pageDir);