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
                void 0;
                $element.parent().append('<div id="frontView"><h1>Loading book...</h1></div>');

            }

            // store page dir instances
            ctrl.register = function (pageDirCtrl) {
                if (ctrl.isFirstDir) {
                    ctrl.isFirstDir = false;
                    pageDirCtrl.hasToken = true;
                }
                void 0;
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
                                        void 0;
                                        //  if there's enough content, request new virtual pages
                                        if (pageDir.hasMoreContent) {

                                            // save received virtual pages
                                            ctrl.virtualPages.push(pageDir.makeVirtualPages(5));

                                            // pageDir.getHtml();
                                            //   resolve('Success!'); // move these to right position
                                            // if sufficient virtual pages has received stop requesting new virtual pages
                                            if (ctrl.virtualPages[0].length > ctrl.minVirtualPages + 5) {
                                                ctrl.minVirtualPages += 5;
                                                void 0;
                                                //add new virtual pages to turn BOOK
                                                resolve('Success!');
                                            }

                                        }

                                    }, function (error) {
                                        void 0;
                                        //add new virtual pages to turn BOOK
                                        reject('Failure!');
                                    });
                            }
                            else {
                                // process pageDIR
                                void 0;
                                //  if there's content request new virtual pages
                                if (pageDir.hasMoreContent) {

                                    // save received virtual pages
                                    ctrl.virtualPages.push(pageDir.makeVirtualPages());
                                    // pageDir.getHtml();
                                    //  resolve('Success!');

                                    // if sufficient virtual pages has received stop requesting new virtual pages
                                    if (ctrl.virtualPages[0].length > ctrl.minVirtualPages + 6) {
                                        ctrl.minVirtualPages += 6;
                                        void 0;
                                        resolve('Success!');
                                    }
                                }
                            }
                        }
                    });

                });
            };

            void 0;
            ctrl.initializeFrontView();

        }

        function linkFn(scope, element, attrs, ctrls) {
            void 0;

            //
            element.bind('turned', function (event, page, view) {
                void 0;
                if (scope.ctrl.isPageLoadEnabled) {
                    void 0;
                    scope.ctrl.loadNextPages();
                }

            });

            // load initial page set
            scope.ctrl.loadNextPages()
                .then(function (response) {
                    void 0;
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
                    void 0;
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
/**
 * by malithJKMT
 */
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.cover
     * @description  cover directive for Angular-TurnJS wrapper
     */

    var coverDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(iElem, iAttrs){
                var title = iAttrs.ngbTitle;
                if (title){
                    return '<div  class="hard"><h1>'+ title+'</h1><div ng-transclude></div></div>';
                }else{
                    return '<div  class="hard"><div ng-transclude></div></div>';
                }
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {

                    }
                }
            }
        }
    }
    angular.module("angularTurn").directive('cover', coverDir);
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
        function internalCtrl($scope, $element, $attrs, $http, $compile, $timeout) {
            var ctrl = this;

            //page properties
            ctrl.id = pageDirId;
            ctrl.pageTemplatePath = $attrs.templt;
            ctrl.pageTemplate = null;
            ctrl.brokenPagesBuffer = [];
            ctrl.overflowHtmlContent = '';
            ctrl.hasMoreContent = true;
            ctrl.hasToken = false;


            // load template at 'pageTemplatePath' and store in 'pageTemplate'
            ctrl.loadTemplate = function () {

                return new Promise(function (resolve, reject) {

                    void 0;
                    $timeout(function () {                                      //************** timeout is to simulate Ajax request delay (only for demo)
                        $http.get(ctrl.pageTemplatePath).then(function (data) {
                            void 0;
                            ctrl.pageTemplate = data.data;
                            resolve('Success!');

                        }, function () {
                            void 0;
                            reject('Failure!');
                        });
                    }, 3000);
                });
            }

            // returns virtual pages >= noOfVirtualPages (precession depends on k, can also send exact number of pages requested by merging the excess pages as overflow html)
            ctrl.makeVirtualPages = function (noOfVirtualPages) {
                //clear buffers
                var brokenPagesBuffer = ['sdf','asdf'];
                var breakResults = {};
                var buffer = {};
                buffer.overflowHtmlContent = '';
                var htmlContent = '';

                while (brokenPagesBuffer.length < noOfVirtualPages) {
                    //  TODO:- determine k ....... how many data points to request k?   (eg:- data points = family members) determine this by a algorithm..?
                    var k = 10;

                    htmlContent = ctrl.getHtml(k);
                    breakResults = ctrl.breakPages(htmlContent + buffer.overflowHtmlContent);

                    // fill the buffer
                    brokenPagesBuffer = brokenPagesBuffer.concat(breakResults.brokenPages);
                    // save the overflow htmlContent for next iteration
                    buffer.overflowHtmlContent = breakResults.overflowHtmlContent;
                }
                // save the overflow htmlContent for next virtual pages request
                ctrl.overflowHtmlContent = breakResults.overflowHtmlContent;
                return brokenPagesBuffer;
            }

            // page template + $scope => compiled HTML content
            ctrl.getHtml = function (noOfDataPoints) {
                var template = ctrl.pageTemplate;

                // compile  (pageTemplate + $scope)

                // if(there is no more content)
                //          set ctrl.hasMoreContent = false;


                // below is for DEMO only (without breaking html pages and without virtual pages, just set the page content)
                var templateElement = angular.element(template);

                var compiledHtmlContent;


                // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                $scope.$apply(function () {
                   compiledHtmlContent= $compile(templateElement)($scope);

                });
              /*  var clonedElement = $compile(templateElement)($scope, function(clonedElement, $scope) {
                    //attach the clone to DOM document at the right place
                });
                */
                void 0;
                $element.append(compiledHtmlContent);
                return compiledHtmlContent.html();

            }

            // breaks HTML content in to pages,  move this to  common - util
            ctrl.breakPages = function (html) {
                // Draw invisible page
                // add tag <break>

                //break based on tag

                // this should return an object, {brokenPages:pages[], overflowHtmlContent:  }

                // dummy value (return 2 pages with no overFlowHtmlContent)
                return {brokenPages:[html, html], overflowHtmlContent:''};
            }

        }

        function linkFn(scope, element, attrs, ctrls) {
            void 0;
            pageDirId++;
            // create a controller instance of page directive with controller sent from user + isolate scope of page element
            $controller(attrs.ctrl, {
                $scope: scope
            });

            bookCtrl = ctrls[0];

            // send page directive's controller instance to book directive's controller
            bookCtrl.register(ctrls[1]);
        }

        return {
            restrict: 'E',
            require: ["^book", "page"],
            link: linkFn,
            scope: {}, // isolate page instance's scope from user's angular app
            controller: internalCtrl,
            replace: true, // replace <page> tag with <div> tag (turnJS reads only divs)
            transclude: true,
            template: '<div ng-transclude></div>'
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();