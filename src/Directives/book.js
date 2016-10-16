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
            ctrl.isFirstDir = true;
            ctrl.isPageLoadEnabled = false;
            ctrl.pageDirCtrls = [];
            ctrl.currentPage;
            ctrl.virtualPages = [];
            ctrl.minVirtualPages = 0;

            ctrl.height = $attrs.ngbHeight;
            ctrl.width = $attrs.ngbWidth;
            ctrl.autoCenter = $attrs.ngbAutocenter;


            /******************Book controller functions***********************/

            // show initial book loading view
            ctrl.initializeFrontView = function () {
                // show loading gif or Loading text...
                console.log('initialize front view');
                $element.parent().append('<div id="frontView"><h1>Loading book...</h1></div>');

            }

            // store page dir instances
            ctrl.register = function (pageDirCtrl) {
                if (ctrl.isFirstDir) {
                    ctrl.isFirstDir = false;
                    pageDirCtrl.hasToken = true;
                }
                console.log(pageDirCtrl);
                ctrl.pageDirCtrls.push(pageDirCtrl);

            }
            ctrl.turnPageForward = function () {
                ctrl.loadNextPages();
            }
            ctrl.loadNextPages = function () {
                return new Promise(function (resolve, reject) {
                    ctrl.pageDirCtrls.forEach(function (pageDir) {
                        if (pageDir.hasToken==true) {
                            // if template for pageDir hasn't loaded before
                            if (pageDir.pageTemplate == null) {
                                pageDir.loadTemplate()
                                    .then(function (response) {
                                        console.log(response);
                                        //  if there's enough content, request new virtual pages
                                        if (pageDir.hasMoreContent) {

                                            // save received virtual pages
                                            ctrl.virtualPages.push(pageDir.makeVirtualPages(5));

                                            // pageDir.getHtml();
                                            //   resolve('Success!'); // move these to right position
                                            // if sufficient virtual pages has received stop requesting new virtual pages
                                            if (ctrl.virtualPages[0].length > ctrl.minVirtualPages + 5) {
                                                ctrl.minVirtualPages += 5;
                                                console.log(ctrl.virtualPages);
                                                //add new virtual pages to turn BOOK
                                                resolve('Success!');
                                            }

                                        }

                                    }, function (error) {
                                        console.error(error);
                                        //add new virtual pages to turn BOOK
                                        reject('Failure!');
                                    });
                            }
                            else {
                                // process pageDIR
                                console.log('template has already loaded');
                                //  if there's content request new virtual pages
                                if (pageDir.hasMoreContent) {

                                    // save received virtual pages
                                    ctrl.virtualPages.push(pageDir.makeVirtualPages());
                                    // pageDir.getHtml();
                                    //  resolve('Success!');

                                    // if sufficient virtual pages has received stop requesting new virtual pages
                                    if (ctrl.virtualPages[0].length > ctrl.minVirtualPages + 6) {
                                        ctrl.minVirtualPages += 6;
                                        console.log(ctrl.virtualPages);
                                        resolve('Success!');
                                    }
                                }
                            }
                        }
                    });

                });
            };

            console.log('initializing the book.....');
            ctrl.initializeFrontView();

        }

        function linkFn(scope, element, attrs, ctrls) {
            console.log('BOOKs LINK FUNCTION');

            //
            element.bind('turned', function (event, page, view) {
                console.log("Page: " + page);
                if (scope.ctrl.isPageLoadEnabled) {
                    console.log('loading next pages set....');
                    scope.ctrl.loadNextPages();
                }

            });

            // load initial page set
            scope.ctrl.loadNextPages()
                .then(function (response) {
                    console.log(response);
                    // remove the "loading..." view
                    document.getElementById('frontView').remove();
                    // initialize turnJS book
                   /* element.turn({
                        width: scope.ctrl.width,
                        height: scope.ctrl.height,
                        autoCenter: scope.ctrl.autoCenter
                    });*/
                    scope.ctrl.isPageLoadEnabled = true;

                }, function (error) {
                    console.error(error);
                });

        }


        return {
            restrict: 'E',
            scope: {}, // isolate book component's scope from user's app
            controller: bookCtrl,
            controllerAs: 'ctrl',
            link: linkFn,
            replace: true, // replace <book> tag with <div> tag (turnJS reads only divs)
            transclude: true,
            template: '<div ng-transclude></div>'
        };

    };
    angular.module("angularTurn").directive('book', bookDir);
})();


//<div ng-show="true"><h1>Front View</h1></div>