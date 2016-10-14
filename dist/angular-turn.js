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



    var bookDir = function ($timeout) {


        var bookCtrl = function ($scope) {
            var ctrl = this;
            ctrl.pageDirCtrls = [];
            ctrl.lastProcessedPageDir = 0;
            ctrl.currentPage;
            ctrl.virtualPages = [];
            ctrl.minVirtualPages = 6;

            ctrl.register = function (pageDirCtrl) {
                void 0;
                ctrl.pageDirCtrls.push(pageDirCtrl);
            }
            ctrl.turnPageForward = function () {
                ctrl.loadNextPages(2);
            }
            ctrl.loadNextPages = function () {
                ctrl.pageDirCtrls.forEach(function (pageDir) {
                    // if template for pageDir hasn't loaded before
                    if (pageDir.pageTemplate == null) {
                        pageDir.loadTemplate()
                            .then(function (response) {
                                void 0;
                                //  if there's content request new virtual pages
                                if (pageDir.hasMoreContent) {

                                    // save received virtual pages
                                    ctrl.virtualPages.push(pageDir.makeVirtualPages());

                                    // if sufficient virtual pages has received stop requesting new virtual pages
                                    if (ctrl.virtualPages.length > ctrl.minVirtualPages) {
                                        return;
                                    }
                                    // pageDir.getHtml();
                                }


                            }, function (error) {
                                void 0;
                            });
                    }
                    else {
                        // process pageDIR
                        void 0;
                        if (pageDir.hasMoreContent) {
                            ctrl.virtualPages.push(pageDir.makeVirtualPages());
                            //pageDir.getHtml();
                        }
                    }

                });
            };

        }


        function linkFn(scope, element, attrs, ctrls) {
            void 0;


            // bind this function to event (when a page turned) like below....
            // element.bind('click', function() {
            //     scope.ctrl.loadNextPages();
            // });
            var turnNextpage = function () {
                scope.ctrl.loadNextPages();
            }

        }


        return {
            restrict: 'E',
            scope: {},
            controller: bookCtrl,
            controllerAs: 'ctrl',
            link: linkFn
        };

    };
    angular.module("angularTurn").directive('book', bookDir);
})();

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
            ctrl.h = $attrs.h;
            ctrl.w = $attrs.w;
            ctrl.pageTemplatePath = $attrs.templt;
            ctrl.pageTemplate = null;
            ctrl.htmlContent;
            ctrl.brokenPagesBuffer = [];
            ctrl.overflowHtmlContent = '';
            ctrl.hasMoreContent = true;


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
                    }, 250);
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
                $element.append(angularElement);     // also replaceWith
                $compile(angularElement)($scope);

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
            void 0;
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
            controller: internalCtrl
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();