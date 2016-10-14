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
            controller: internalCtrl
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();