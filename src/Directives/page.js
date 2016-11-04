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
    angular.module("angularTurn").directive('page', function ($compile) {
        return {
            restrict: 'E',            
            scope: false,            
            controller:   
                /**
                 * @ngdoc controller
                 * @name  angularTurn.Page
                 * @description Page controller function
                 */            
                function ($scope, $element, $attrs, $http, $compile, $timeout) {
            
                    //page properties
                    this.id                 = $attrs.id;
                    this.baseElement        = $element;
                    this.compliedElement    = null;

                    console.log('PageCtrl:Init-Start,'+this.id);
                    
                    if($attrs.ngbCover != undefined){
                        $element.addClass('hard');
                    }

                    // load template at 'pageTemplatePath' and store in 'pageTemplate'
                    this.loadTemplate = function () {}

                    // returns virtual pages >= noOfVirtualPages (precession depends on k, can also send exact number of pages requested by merging the excess pages as overflow html)
                    this.makeVirtualPages = function (noOfVirtualPages) {}

                    // page template + $scope => compiled HTML content
                    this.getHtml = function (noOfDataPoints) {}

                    // breaks HTML content in to pages,  move this to  common - util
                    this.breakPages = function (html) {}

                    console.log('PageCtrl:Init-Ok');
                },
            require: ["^book", "page"],
            link:
                /**
                 * @ngdoc linkFn
                 * @name  angularTurn.Page
                 * @description Page link function
                 */  
                function linkFn(scope, element, attrs, ctrls) {
                    console.log('PageCtrl:Link-Start');
                    element.hide();

                    // Book controller
                    var bookCtrl = ctrls[0];
                    var pageCtrl = ctrls[1];
                    
                    // compile on page content if there are any
                    pageCtrl.compliedElement = angular.element('<div id="'+pageCtrl.id+'" class="ngTurn-loader">' + pageCtrl.baseElement.html() + '<div>');                    
                    $compile(pageCtrl.compliedElement)(scope);
                    // send page directive's controller instance to book directive's controller
                    
                    bookCtrl.addPage(pageCtrl);
                    console.log('PageCtrl:Link-End');
                },                        
        }
    });
})();