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
                console.log(pageDirCtrl);
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
                                console.log(response);
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
                                console.error(error);
                            });
                    }
                    else {
                        // process pageDIR
                        console.log('template has already loaded');
                        if (pageDir.hasMoreContent) {
                            ctrl.virtualPages.push(pageDir.makeVirtualPages());
                            //pageDir.getHtml();
                        }
                    }

                });
            };

        }


        function linkFn(scope, element, attrs, ctrls) {
            console.log('BOOKs LINK FUNCTION');


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
