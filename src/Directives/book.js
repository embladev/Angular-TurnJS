(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */

    var virtualPages = [];
    var cacheArray = [];
    var dataArray = [];
    var controller;

    var initialize = function(){};
    var addPages = function(n){};

    var bookDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        controller = iAttrs.ngbController;
                        iElem.turn({
                            width: iAttrs.ngbWidth,
                            height: iAttrs.ngbHeight,
                            autoCenter: iAttrs.ngbAutocenter
                        });
                    }
                }
            }
        }
    };
    angular.module("angularTurn").directive('book', bookDir);
})();
