/**
 * by malithJKMT
 */
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */

    var bookDir = function ($timeout, $compile) {

        var bookCtrl = function ($scope, $element, $attrs) {
            var ctrl = this;
            ctrl.loader;
            ctrl.pageDirCtrls = [];
            ctrl.height = $attrs.ngbHeight;
            ctrl.width = $attrs.ngbWidth;
            ctrl.autoCenter = $attrs.ngbAutocenter;

            /******************Book controller functions***********************/
            // store page dir instances
            ctrl.register = function (pageDirCtrl) {

                // handover the token to first page directive
                if (ctrl.isFirstDir) {
                    ctrl.isFirstDir = false;
                    pageDirCtrl.hasToken = true;
                }
                console.log(pageDirCtrl);
                ctrl.pageDirCtrls.push(pageDirCtrl);

            }
            ctrl.turnPageForward = function () {

            }
            ctrl.loadNextPages = function () {

            };
            ctrl.hideLoader = function () {
                if (ctrl.loader) {
                    ctrl.loader[0].style.display = 'none';
                }
            }
            ctrl.setLoader = function (elem) {
                elem.css("position", 'absolute');
                elem.css("height", ctrl.height);
                elem.css("width", ctrl.width);
                ctrl.loader = elem;
            }

            console.log('initializing the book.....');

        }

        function linkFn(scope, element, attrs) {

            $timeout(   // just to demo the loading page
                function () {

                    // get pages
                    var innerBook = '';
                    scope.ctrl.pageDirCtrls.forEach(function (pageDir) {
                        innerBook += pageDir.innerHTML;
                    });


                    scope.ctrl.hideLoader();
                    var elem = angular.element('<div>' + innerBook + '<div>');
                   // $compile(elem)(scope);
                    element.append(elem);

                    // initialize turnJS book
                    elem.turn({
                        width: scope.ctrl.width,
                        height: scope.ctrl.height,
                        autoCenter: scope.ctrl.autoCenter
                    });
                }
                , 2000
            );


        }

        return {
            restrict: 'E',
            scope: {}, // isolate book component's scope from user's app
            controller: bookCtrl,
            controllerAs: 'ctrl',
            link: linkFn,
           // replace: true, // replace <book> tag with <div> tag (turnJS reads only divs)
            transclude: true,
            template: '<div ng-transclude></div>'
        };
    };
    angular.module("angularTurn").directive('book', bookDir);
})();