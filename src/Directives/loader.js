/**
 * @author malithJKMT,chandimal@embla.asia
 * @description
 * Loader configuration directive
 * @copyright 2016 Embla Software Innovation (Pvt) Ltd All rights reserved.
 */

(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name  angularTurn.page
     * @description  page directive for Angular-TurnJS wrapper
     */
    var dir = function ($controller) {

        /**
         * @ngdoc controller
         * @name  angularTurn.loader
         * @description Loader controller
         */
        var loaderCtrl = function ($scope, $element, $attrs) {
            console.log('LoaderCtrl:Init-Start');           
            this.id             = $attrs.id;
            this.class          = $attrs.class;
            this.element        = $element;
            console.log('LoaderCtrl:Init-End');
        }

        /**
         * @ngdoc linkFn
         * @name  angularTurn.loader
         * @description Loader link function
         */
        function linkFn(scope, element, attrs, bookCtrl) {           
            element.hide();
            console.log('LoaderCtrl:Link-Start');
            bookCtrl.addLoader(scope.ctrl);
            console.log('LoaderCtrl:Link-End');
        }

        return {
            restrict: 'E',
            require: '^book',
            replace:true,
            link: linkFn, 
            controllerAs: 'ctrl',           
           //scope: {}, // isolate page instance's scope from user's angular app
            //transclude: true,
            //template: '<div ng-transclude></div>',
            controller:loaderCtrl
        }
    }
    angular.module("angularTurn").directive('loader', dir);
})();