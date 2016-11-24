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
    angular.module("angularTurn").directive('page', function ($compile, $injector) {
        return {
            restrict: 'E',            
            scope: false,            
            controller:   
                /**
                 * @ngdoc controller
                 * @name  angularTurn.Page
                 * @description Page controller function
                 */            
                function ($scope, $element, $attrs, $http, $compile, $timeout, $injector) {
            
                    //page properties
                    this.id                 = $attrs.id;
                    this.baseElement        = $element;
                    this.baseHtml           = $element.html();

                    this.compliedElement    = null;
                    this.template           = $attrs.template;
                    this.serviceName        = $attrs.service;                    
                    if ( this.serviceName ){
                        this.service        = $injector.get(this.serviceName);                        
                    }
                    this.hasMoreData        = false;
                    this.wrapperElement     = '<div id="'+this.id+'" class="ngTurn-Page">{0}</div>';

                    console.log('PageCtrl:Init-Start,'+this.id);
                    
                    //if($attrs.ngbCover != undefined){
                    //    $element.addClass('hard');
                    //}

                    // Set the base html
                    this.setBaseHtml = function(html){                        
                        this.baseHtml = html;                        
                    }

                    // Check more elements // move to next element
                    this.hasMore = function(){
                        // if there is a service, move to the next page
                        // if not simple boolean variable to turn off at the next reqeust       
                        if ( this.service  ){
                            this.hasMoreData = this.service.hasMore();
                        }else{
                            this.hasMoreData = !this.hasMoreData;
                        }
                        return this.hasMoreData;
                    }                    
                    
                    // Get wrapped element
                    this.setCompliedElement = function(){
                        this.compliedElement = angular.element( this.wrapperElement.replace("{0}",this.baseHtml) );                    
                        this.compliedElement = $compile(this.compliedElement)($scope);
                        //$scope.$apply();
                    }

                    // Get wrapped element
                    this.getCompliedElement = function(){
                        var compliedElement = angular.element( this.wrapperElement.replace("{0}",this.baseHtml) );                    
                        return $compile(compliedElement)($scope);                        
                    }
                    // load template at 'pageTemplatePath' and store in 'pageTemplate'
                    this.loadTemplate = function ( callbackFn, index ) {
                        if ( this.template){                                
                            $http.get(this.template).success(function(data){
                                this.setBaseHtml(data);
                                if ( callbackFn ) callbackFn(index);
                            })
                        }else{
                            this.setBaseHtml();
                            if ( callbackFn ) callbackFn(index);
                        }
                    }

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
                    //pageCtrl.compliedElement = angular.element('<div id="'+pageCtrl.id+'" class="ngTurn-Page">' + pageCtrl.baseElement.html() + '</div>');                    
                    //$compile(pageCtrl.compliedElement)(scope).html();
                    // send page directive's controller instance to book directive's controller
                    
                    bookCtrl.addPage(pageCtrl);
                    console.log('PageCtrl:Link-End');
                },                        
        }
    });
})();