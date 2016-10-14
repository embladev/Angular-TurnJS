/**
 * @ngdoc module
 * @name  angularTurn
 * @description  Angular wrapper for TurnJS
 */
angular.module("angularTurn",[]);


(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */



    var bookDir = function ($timeout,$compile) {


        var bookCtrl = function ($scope, $element, $attrs) {
            var ctrl = this;
            ctrl.isPageLoadEnabled = false;
            ctrl.pageDirCtrls = [];
            ctrl.lastProcessedPageDir = 0;
            ctrl.currentPage;
            ctrl.virtualPages = [];
            ctrl.minVirtualPages = 6;

            ctrl.height = $attrs.ngbHeight;
            ctrl.width = $attrs.ngbWidth;
            ctrl.autoCenter = $attrs.ngbAutocenter;


            /******************Book controller functions***********************/

            // show initial book loading view
            ctrl.initializeFrontView = function () {
                // show loading gif or something...
                console.log('initialize front view');
                $element.parent().append('<div id="frontView"><h1>Loading book...</h1></div>');

            }

            // store page dir instances
            ctrl.register = function (pageDirCtrl) {
                console.log(pageDirCtrl);
                ctrl.pageDirCtrls.push(pageDirCtrl);
            }
            ctrl.turnPageForward = function () {
                ctrl.loadNextPages();
            }
            ctrl.loadNextPages = function () {
                return new Promise(function (resolve, reject) {
                    ctrl.pageDirCtrls.forEach(function (pageDir) {
                        // if template for pageDir hasn't loaded before
                        if (pageDir.pageTemplate == null) {
                            pageDir.loadTemplate()
                                .then(function (response) {
                                    console.log(response);
                                    //  if there's enough content, request new virtual pages
                                    if (pageDir.hasMoreContent) {

                                        // save received virtual pages
                                        //  ctrl.virtualPages.push(pageDir.makeVirtualPages());
                                        pageDir.getHtml();
                                        resolve('Success!'); // move these to right position
                                        // if sufficient virtual pages has received stop requesting new virtual pages
                                     /*   if (ctrl.virtualPages.length > ctrl.minVirtualPages + 6) {
                                            ctrl.minVirtualPages += 6;
                                            //add new virtual pages to turn BOOK
                                            resolve('Success!');
                                        }*/

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
                               // ctrl.virtualPages.push(pageDir.makeVirtualPages());
                                pageDir.getHtml();
                                resolve('Success!');

                                // if sufficient virtual pages has received stop requesting new virtual pages
                               /* if (ctrl.virtualPages.length > ctrl.minVirtualPages + 6) {
                                    ctrl.minVirtualPages += 6;
                                    resolve('Success!');
                                }*/
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

            element.bind("turned", function(event, page, view) {
                console.log("Page: "+page);
                if(scope.ctrl.isPageLoadEnabled){
                   console.log('loading next pages set....');
                    scope.ctrl.loadNextPages();
                }

            });

            // load initial page set
            scope.ctrl.loadNextPages()
                .then(function (response) {
                    document.getElementById('frontView').remove();
                    element.turn({
                        width: scope.ctrl.width,
                        height: scope.ctrl.height,
                        autoCenter: scope.ctrl.autoCenter
                    });
                    scope.ctrl.isPageLoadEnabled = true;

                }, function (error) {
                    console.error(error);

                });

        }


        return {
            restrict: 'E',
            scope: {},
            controller: bookCtrl,
            controllerAs: 'ctrl',
            link: linkFn,
            replace: true,
            transclude: true,
            template: '<div id="angularTurnBook" ng-transclude></div>'
        };

    };
    angular.module("angularTurn").directive('book', bookDir);
})();


//<div ng-show="true"><h1>Front View</h1></div>
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
            ctrl.htmlContent;
            ctrl.brokenPagesBuffer = [];
            ctrl.overflowHtmlContent = '';
            ctrl.hasMoreContent = true;


            // load template at 'pageTemplatePath' and store in 'pageTemplate'
            ctrl.loadTemplate = function () {

                return new Promise(function (resolve, reject) {

                    console.log('load template:- ', ctrl.pageTemplatePath);
                    $timeout(function () {                                      //************** timeout is to simulate Ajax request delay (only for demo)
                        $http.get(ctrl.pageTemplatePath).then(function (data) {
                            console.log('done loading template!', data.data);
                            ctrl.pageTemplate = data.data;
                            resolve('Success!');

                        }, function () {
                            console.log('error loading template');
                            reject('Failure!');
                        });
                    }, 3000);
                });
            }

            // returns virtual pages
            ctrl.makeVirtualPages = function (noOfVirtualPages) {
                //clear buffers
                ctrl.brokenPagesBuffer = [];
                var buffer = {};
                buffer.overflowHtmlContent = '';

                while(ctrl.brokenPagesBuffer.length < noOfVirtualPages) {
                    ctrl.htmlContent += getHtml(10);    // how many data points to request 10?   (eg:- data points = family members) determine this by a algorithm..?
                    var temp = ctrl.breakPages(ctrl.htmlContent,  buffer.overflowHtmlContent);

                    // fill the buffer
                    ctrl.brokenPagesBuffer.concat(temp.brokenPages);
                    // save the overflow htmlContent for next iteration
                    buffer.overflowHtmlContent =temp.overflowHtmlContent;
                }
                // save the overflow htmlContent for next virtual pages request
                ctrl.overflowHtmlContent =temp.overflowHtmlContent;
                return ctrl.brokenPagesBuffer;
            }

            // page template + $scope => compiled HTML content
            ctrl.getHtml = function (noOfDataPoints) {
                var html = ctrl.pageTemplate;

                // compile  (pageTemplate + $scope)

                // if(there is no more content)
                //          set ctrl.hasMoreContent = false;


                // below is for DEMO only (without breaking html pages and without virtual pages, just set the page content)
               var angularElement = angular.element(html);
               /* $element.append(angularElement);     // also replaceWith
                console.log($scope);
                $compile(angularElement)($scope);
*/
                /*
                 $compile('<fieldset>...</fieldset>')(scope, function(clone) {
                 $element.append(clone)
                 });*/

                $scope.$apply(function () {
                    $element.append($compile(angularElement)($scope));
                });

            }

            // breaks HTML content in to pages,  move this to  common - util
            ctrl.breakPages = function (html, overflowContent) {
                // Draw invisible page
                // add tag <break>

                //break based on tag

                // this should return an object, {overflowHtmlContent:'', brokenPages:pages[]}
            }

        }

        function linkFn(scope, element, attrs, ctrls) {
            console.log('run link function');
            pageDirId++;
            $controller(attrs.ctrl, {
                $scope: scope
            });

            bookCtrl = ctrls[0];
            bookCtrl.register(ctrls[1]);
        }

        return {
            restrict: 'E',
            // controller: ['$scope', ctrlWrapper],
            // template: '<div>this value is received from external controller:- {{myName}}</div>',
            require: ["^book", "page"],
            link: linkFn,
            scope: {},
            controller: internalCtrl,
            replace: true,
            transclude: true,
            template: '<div ng-transclude> </div>'
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();