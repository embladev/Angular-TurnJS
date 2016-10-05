/**
 * @ngdoc module
 * @name  angularTurn
 * @description  Angular wrapper for TurnJS
 */
angular.module("angularTurn",[]);


(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */

    var controller;
 /*   var virtualPages = [];
    var cacheArray = [];
    var dataArray = [];

    var initialize = function(){};
    var addPages = function(n){};*/

    var bookDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude> </div>',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        controller = iAttrs.ngbController;
                        iElem.turn({
                            width: iAttrs.ngbWidth,
                            height: iAttrs.ngbHeight,
                            autoCenter: iAttrs.ngbAutocenter,
                            display: iAttrs.ngbDisplay,
                            duration: iAttrs.ngbDuration,
                      });
                    }
                }
            }
        }
    };
    angular.module("angularTurn").directive('book', bookDir);
})();

// TODO:-   cover make HARD, template URL(asynchronous load --- promise???), virtual pages[has processed HTML content?, 6 or?]( how to load virtual pages, call turn on virtual pages)

 

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.cover
     * @description  cover directive for Angular-TurnJS wrapper
     */

    var coverDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(iElem, iAttrs){
                var title = iAttrs.ngbTitle;
                if (title){
                    return '<div  class="hard"><h1>'+ title+'</h1><div ng-transclude></div></div>';
                }else{
                    return '<div  class="hard"><div ng-transclude></div></div>';
                }
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        scope.title = iAttrs.ngbTitle;
                    }
                }
            }
        }
    }
    angular.module("angularTurn").directive('cover', coverDir);
})();
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.page
     * @description  page directive for Angular-TurnJS wrapper
     */

   /* var getHtmlPage = function () {};*/
    var pageDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude> </div>',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {

                    },
                    post: function (scope, iElem, iAttrs) {
                        /*scope.data = iAttrs.ngbData;
                        var templateUrl = iAttrs.ngbTemplateUrl;
                        var controller = iAttrs.ngbController;*/
                    }
                }
            }
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();