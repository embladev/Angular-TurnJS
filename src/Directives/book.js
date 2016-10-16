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
            ctrl.currentPage = 1;
            ctrl.virtualPages = [];
            ctrl.noOfActualPages = 0;
            ctrl.virtualPagesBuffer = [];
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
                 if(ctrl.virtualPagesBuffer.length < 6){
                 ctrl.loadNextPages();
                 }
                // if turn book hasn't got enough pages(not in the safe range...), add turn add 2 pages
                var page = ctrl.virtualPagesBuffer[0].shift();
                console.log(page, ctrl.noOfActualPages+1);
                $element.turn("addPage", page, ++ctrl.noOfActualPages);



                page = ctrl.virtualPagesBuffer[0].shift();
                console.log(page, ctrl.noOfActualPages+1);
                $element.turn("addPage", page, ++ctrl.noOfActualPages);
                ctrl.noOfActualPages++;


            }
            ctrl.loadNextPages = function () {
                return new Promise(function (resolve, reject) {

                    ctrl.pageDirCtrls.forEach(function (pageDir) {

                        if (pageDir.hasToken == true) { // (only one page directive has the token at a time)
                            // this prevents other page directives loop while one is already inside the loop
                            // (waiting for asynchronous request to be completed)

                            // if template for pageDir hasn't loaded before load it
                            if (pageDir.pageTemplate == null) {
                                pageDir.loadTemplate()
                                    .then(function (response) {
                                        console.log(response);
                                        //  if there's enough content, request new virtual pages
                                        if (pageDir.hasMoreContent) {

                                            // save received virtual pages
                                            ctrl.virtualPagesBuffer.push(pageDir.makeVirtualPages(6));

                                            // pageDir.getHtml();
                                            //   resolve('Success!'); // move these to right position
                                            // if sufficient virtual pages has received stop requesting new virtual pages
                                            if (ctrl.virtualPagesBuffer[0].length >= 6) {

                                                console.log(ctrl.virtualPagesBuffer);
                                                ctrl.virtualPages = ctrl.virtualPages.concat(ctrl.virtualPagesBuffer);
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
                                    ctrl.virtualPagesBuffer.push(pageDir.makeVirtualPages(6));
                                    // pageDir.getHtml();
                                    //  resolve('Success!');

                                    // if sufficient virtual pages has received, stop requesting new virtual pages
                                    if (ctrl.virtualPagesBuffer[0].length >= 6) {
                                        console.log(ctrl.virtualPagesBuffer);
                                        ctrl.virtualPages = ctrl.virtualPages.concat(ctrl.virtualPagesBuffer);
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
                // this 'page' is the left side page
                scope.ctrl.currentPage = page;
                if (scope.ctrl.isPageLoadEnabled && page >= scope.ctrl.noOfActualPages -4) {
                    console.log('loading next pages set....');
                    scope.ctrl.turnPageForward();
                }

            });

            // load initial page set
            scope.ctrl.loadNextPages()
                .then(function (response) {
                    console.log(response);
                    // remove the "loading..." view
                    document.getElementById('frontView').remove();
                    // initialize turnJS book
                    element.turn({
                        width: scope.ctrl.width,
                        height: scope.ctrl.height,
                        autoCenter: scope.ctrl.autoCenter
                    });

                    // add first set of virtual pages (4 pages)
                    var newPage;
                    for (var i = 0; i < 4; i++) {
                        newPage = scope.ctrl.virtualPagesBuffer[0].shift();
                        console.log(newPage, scope.ctrl.noOfActualPages);
                        element.turn("addPage", newPage, scope.ctrl.noOfActualPages++);


                    }
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