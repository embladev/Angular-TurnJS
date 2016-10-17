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
            ctrl.pageTemplatePath = $attrs.ngbTemplate;
            ctrl.pageTemplate = null;
            ctrl.pageTemplateElement = null;
            ctrl.brokenPagesBuffer = [];
            ctrl.overflowHtmlContent = '';
            ctrl.hasMoreContent = true;
            ctrl.hasToken = false;

            // load template at 'pageTemplatePath' and store in 'pageTemplate'
            ctrl.loadTemplate = function () {

                return new Promise(function (resolve, reject) {

                    console.log('load template:- ', ctrl.pageTemplatePath);
                    $timeout(function () {                                      //************** timeout is to simulate Ajax request delay (only for demo)
                        $http.get(ctrl.pageTemplatePath).then(function (data) {
                            console.log('done loading template!', data.data);
                            ctrl.pageTemplate = '<div>' + data.data + '</div>';
                            ctrl.pageTemplateElement = angular.element(ctrl.pageTemplate);
                            resolve('Success!');

                        }, function () {
                            console.log('error loading template');
                            reject('Failure!');
                        });
                    }, 3000);
                });
            }

            // returns virtual pages >= noOfVirtualPages (precession depends on k, can also send exact number of pages requested by merging the excess pages as overflow html)
            ctrl.makeVirtualPages = function (noOfVirtualPages) {
                //clear buffers
                var brokenPagesBuffer = [];
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

            // TODO:-  get different data for the template, from user
            // page template + $scope => compiled HTML content
            ctrl.getHtml = function (noOfDataPoints) {

                // if(there is no more content)
                //          set ctrl.hasMoreContent = false;
                //          now the next page directive can process...

                // below is for DEMO only (without breaking html pages and without virtual pages, just set the page content)
                var compiledHtmlContent;
                // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                $scope.$apply(function () {
                   compiledHtmlContent= $compile(ctrl.pageTemplateElement)($scope);

                });

               // console.log('new compiled html content for new data point is:-');
               // console.log(compiledHtmlContent.html());
                console.log('**********new HTML compiled!!************');
                return compiledHtmlContent.html();
            }

            // TODO:- break compiled HTML content in to pages
            // breaks HTML content in to pages,  move this to  common - util
            ctrl.breakPages = function (html) {
                // Draw invisible page
                // add tag <break>

                //break based on tag

                // this should return an object, {brokenPages:['html1', 'html2', ......], overflowHtmlContent:  }

                // dummy value (return 2 pages with no overFlowHtmlContent)
                return {brokenPages:[html, html], overflowHtmlContent:''};
            }
        }

        function linkFn(scope, element, attrs, ctrls) {
            pageDirId++;
            // create a controller instance of page directive with controller sent from user + isolate scope of page element
            $controller(attrs.ngbController, {
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