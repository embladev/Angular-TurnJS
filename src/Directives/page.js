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

    var pageDir = function ($controller) {
        var bookCtrl;
        var pageDirId = 0;
        // page directive controller (a instance of this is sent and sored in book dir controller)
        function pageCtrl($scope, $element, $attrs, $http, $compile, $timeout) {
            console.log('PageCtrl:Init-Start');
            var ctrl = this;

            //page properties
            ctrl.id = pageDirId;
            ctrl.innerHTML;
            ctrl.classList;


            if($attrs.ngbCover != undefined){
                $element.addClass('hard');
            }


            // load template at 'pageTemplatePath' and store in 'pageTemplate'
            ctrl.loadTemplate = function () {

            }

            // returns virtual pages >= noOfVirtualPages (precession depends on k, can also send exact number of pages requested by merging the excess pages as overflow html)
            ctrl.makeVirtualPages = function (noOfVirtualPages) {
            }

            // page template + $scope => compiled HTML content
            ctrl.getHtml = function (noOfDataPoints) {

            }

            // breaks HTML content in to pages,  move this to  common - util
            ctrl.breakPages = function (html) {
            }

            console.log('PageCtrl:Init-End');
        }

        function linkFn(scope, element, attrs, ctrls) {
            console.log('PageCtrl:Link-Start');
            element[0].style.display = 'none';
            pageDirId++;

            scope.ctrl.innerHTML = element.html();
            // add classes, ids, 'hard' style to the new element

            bookCtrl = ctrls[0];

            // send page directive's controller instance to book directive's controller
            bookCtrl.addPage(ctrls[1]);
            console.log('PageCtrl:Link-End');
        }

        return {
            restrict: 'E',
            require: ["^book", "page"],
            link: linkFn,
            scope: {}, // isolate page instance's scope from user's angular app
            controller: pageCtrl,
            controllerAs: 'ctrl',
           // replace: true, // replace <page> tag with <div> tag (turnJS reads only divs)
            transclude: true,
            template: '<div ng-transclude></div>'
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();