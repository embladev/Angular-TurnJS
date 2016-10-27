/**
 * by malithJKMT
 * @ngdoc module
 * @name  angularTurn
 * @description  Angular wrapper for TurnJS
 */
angular.module("angularTurn",[]);


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
            void 0;
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
                void 0;
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

            void 0;

        }

        function linkFn(scope, element, attrs) {
            void 0;
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
            void 0;
        }

        function linkFn(scope, element, attrs, ctrl) {
            //element.css("border-style", "solid");
            void 0;
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
            void 0;
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
        }

        function linkFn(scope, element, attrs, ctrls) {
            void 0;
            element[0].style.display = 'none';
            pageDirId++;

            scope.ctrl.innerHTML = element.html();
            // add classes, ids, 'hard' style to the new element


            bookCtrl = ctrls[0];

            // send page directive's controller instance to book directive's controller
            bookCtrl.register(ctrls[1]);
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