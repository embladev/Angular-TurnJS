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