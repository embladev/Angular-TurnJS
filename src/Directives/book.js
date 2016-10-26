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
            ctrl.noOfActualPages = -1; // no of actual ages in the turn book
            ctrl.virtualPagesBuffer = [];  // contains the virtual pages that hasn't been added to the turn book yet
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

                // handover the token to first page directive
                if (ctrl.isFirstDir) {
                    ctrl.isFirstDir = false;
                    pageDirCtrl.hasToken = true;
                }
                console.log(pageDirCtrl);
                ctrl.pageDirCtrls.push(pageDirCtrl);

            }
            ctrl.turnPageForward = function () {
                if (ctrl.virtualPagesBuffer.length <= 2) {
                    console.log('need more virtual pages.....');
                    ctrl.loadNextPages().then(function (response) {
                            // console.log(response);
                            //  console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);

                            ////////////////////////////////////////////////////////////////////////////////////////
                            // if turn book hasn't got enough pages(not in the safe range...), add turn add 2 pages
                            var page = ctrl.virtualPagesBuffer.shift();
                            console.log('new turn page added, page No:- ', ctrl.noOfActualPages + 1);
                            $element.turn("addPage", page, ++ctrl.noOfActualPages);


                            page = ctrl.virtualPagesBuffer.shift();
                            console.log('new turn page added, page No:- ', ctrl.noOfActualPages + 1);
                            $element.turn("addPage", page, ++ctrl.noOfActualPages);

                            console.log('new status:-');
                            console.log('No of actual turn pages in the book:- ' + ctrl.noOfActualPages);
                            console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);
                            console.log('----------------------------');
                            ////////////////////////////////////////////////////////////////////////////////////////

                            // Async call to load new virtual pages, if not enough  --- refactor (if user turn another page before this call finishes.....)
                            if (ctrl.virtualPagesBuffer.length < 6) {
                                console.log('backing up more virtual pages.....');
                                ctrl.loadNextPages();
                            }
                        },
                        function (error) {
                            console.log(error);
                        });
                }
                else {
                    //  console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);
                    ////////////////////////////////////////////////////////////////////////////////////////
                    // if turn book hasn't got enough pages(not in the safe range...), add turn add 2 pages
                    var page = ctrl.virtualPagesBuffer.shift();
                    console.log('new turn page added, page No:-  ', ctrl.noOfActualPages + 1);
                    $element.turn("addPage", page, ++ctrl.noOfActualPages);

                    page = ctrl.virtualPagesBuffer.shift();
                    console.log('new turn page added, page No:- ', ctrl.noOfActualPages + 1);
                    $element.turn("addPage", page, ++ctrl.noOfActualPages);

                    console.log('new status:-');
                    console.log('No of actual turn pages in the book:- ' + ctrl.noOfActualPages);
                    console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);
                    console.log('----------------------------');
                    ////////////////////////////////////////////////////////////////////////////////////////

                    // Async call to load new virtual pages, if not enough  --- refactor (if user turn another page before this call finishes.....)
                    if (ctrl.virtualPagesBuffer.length < 6) {
                        console.log('backing up more virtual pages.....');
                        ctrl.loadNextPages();
                    }
                }
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
                                        //console.log(response);
                                        //////////////////////////////////////////////////////////////////////////////////
                                        //  if there's enough content, request new virtual pages
                                        if (pageDir.hasMoreContent) {

                                            // save received virtual pages
                                            ctrl.virtualPagesBuffer = ctrl.virtualPagesBuffer.concat(pageDir.makeVirtualPages(6));
                                            //  console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);

                                            // if sufficient virtual pages has received stop requesting new virtual pages
                                            if (ctrl.virtualPagesBuffer[0].length >= 6) {
                                                resolve('Success!');
                                            }
                                        }
                                        else {
                                            // handover the token to next page directive
                                            pageDir.hasToken = false;
                                            ctrl.pageDirCtrls[pageDir.id + 1].hasToken = true;
                                        }
                                        /////////////////////////////////////////////////////////////////////////////////////

                                    }, function (error) {
                                        console.error(error);
                                        //add new virtual pages to turn BOOK
                                        reject('Failure!');
                                    });
                            }
                            else {
                                // process pageDIR
                                console.log('template has already loaded');

                                /////////////////////////////////////////////////////////////////////////////////////
                                //  if there's enough content, request new virtual pages
                                if (pageDir.hasMoreContent) {

                                    // save received virtual pages
                                    ctrl.virtualPagesBuffer = ctrl.virtualPagesBuffer.concat(pageDir.makeVirtualPages(6));
                                    // console.log('virtualPagesBuffer size is ', ctrl.virtualPagesBuffer.length);

                                    // if sufficient virtual pages has received stop requesting new virtual pages
                                    if (ctrl.virtualPagesBuffer[0].length >= 6) {
                                        resolve('Success!');
                                    }
                                }
                                else {
                                    // handover the token to next page directive
                                    pageDir.hasToken = false;
                                    ctrl.pageDirCtrls[pageDir.id + 1].hasToken = true;
                                }
                                /////////////////////////////////////////////////////////////////////////////////////
                            }
                        }
                    });

                });
            };

            console.log('initializing the book.....');
            ctrl.initializeFrontView();
        }

        function linkFn(scope, element, attrs, ctrls) {
            element.bind('turned', function (event, page, view) {
                console.log('#########################################################');
                console.log('current status:- ');
                console.log('No of actual turn pages in the book:- ', scope.ctrl.noOfActualPages);
                console.log('virtual pages buffer size:- ', scope.ctrl.virtualPagesBuffer.length);
                console.log('----------------------------');
                console.log("Turned to a new page: " + page);
                // this 'page' is the left side page
                scope.ctrl.currentPage = page;
                if (scope.ctrl.isPageLoadEnabled && page >= scope.ctrl.noOfActualPages - 4) {
                    scope.ctrl.turnPageForward();
                }
            });

            // load initial page set
            scope.ctrl.loadNextPages()
                .then(function (response) {
                    // console.log(response);
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
                        newPage = scope.ctrl.virtualPagesBuffer.shift();
                        console.log('new turn page added, page No:- ', scope.ctrl.noOfActualPages + 1);
                        element.turn("addPage", newPage, ++scope.ctrl.noOfActualPages);
                    }
                    console.log('virtualPagesBuffer size is ', scope.ctrl.virtualPagesBuffer.length);
                    scope.ctrl.isPageLoadEnabled = true;

                    // Async call to load new virtual pages, if not enough  --- refactor (if user turn another page before this call finishes.....)
                    if (scope.ctrl.virtualPagesBuffer.length < 6) {
                        console.log('backing up more virtual pages.....');
                        scope.ctrl.loadNextPages();
                    }

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