/**
 * by malithJKMT
 */
(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name  angularTurn.page
     * @description  page directive for Angular-TurnJS wrapper
     */

    var dir = function ($controller) {



        var loaderCtrl = function ($scope, $element, $attrs) {

        }

        function linkFn(scope, element, attrs, ctrl) {
            //element.css("border-style", "solid");
            ctrl.setLoader(element);

        }

        return {
            restrict: 'E',
            require: '^book',
            replace:true,
            link: linkFn,
           //scope: {}, // isolate page instance's scope from user's angular app
            transclude: true,
            template: '<div ng-transclude></div>',
            controller:loaderCtrl
        }
    }
    angular.module("angularTurn").directive('loader', dir);
})();