/**
 * by malithJKMT,Chandimal
 */
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     * facts : 
     * Book has the same scope as the parent ( to compile inline page content )
     */
    angular.module("angularTurn").directive('book', function ($timeout, $compile) {

        return {
            restrict: 'E',            
            controller: 
                function ($scope, $element, $attrs) {
                    // Set properties
                    this.id                 = $attrs.id;
                    this.height             = $attrs.ngbHeight;
                    this.width              = $attrs.ngbWidth;
                    this.autoCenter         = $attrs.ngbAutocenter;
                    
                    this.pageControllers    = [];
                    this.loaderController   = null;
                    this.loaderElement      = null;

                    console.log('BookCtrl:Init-Start-'+this.id);
                    
                    /**
                     * 
                     *              Page functions
                     * 
                     */
                    // Add a new page controller to the list            
                    this.addPage = function (pageCtrl) {
                        console.log("BookCtrl:AddPage-"+ pageCtrl.id);
                        this.pageControllers.push(pageCtrl);
                    }

                    this.turnPageForward = function () {}
                    this.loadNextPages = function () {};

                    /**
                     * 
                     *              Loader functions
                     * 
                     */
                    // Add a loader ( will be replaces if there are two ) - Only one loader for book
                    this.setLoader = function (loaderCtrl) {                        
                        this.loaderController = loaderCtrl;
                        // Add to the DOM
                        $element.parent().append(loaderCtrl.compliedElement);// TODO: Not so good coding
                        console.log('BookCtrl:AddLoader-OK');
                    }           
                    console.log('BookCtrl:Init-OK-'+this.id);
                }, // end controller function
            controllerAs: 'bookInstance',
            require: 'book',
            link:
                function(scope, element, attrs, bookCtrl) {
                    console.log('BookCtrl:Link-Start');
                    $timeout(   // just to demo the loading page
                        function () {
                            var bookElement = angular.element('<div id="'+bookCtrl.id+'" class="ngTurn-book"><div>');
                            element.parent().append(bookElement);                            
                            bookCtrl.loaderController.hide();
                            
                            // initialize turnJS book
                            bookElement.turn({
                                width: bookCtrl.width,
                                height: bookCtrl.height,
                                autoCenter: bookCtrl.autoCenter
                            });

                            // Start processing pages
                            var pgCount = 1;
                            bookCtrl.pageControllers.forEach(function (pageCtrl) { 
                                //var content = $compile(pageCtrl.baseElement.html())(scope);                       
                                bookElement.turn("addPage", pageCtrl.compliedElement.html(), pgCount);
                                pgCount++;
                            });                    
                        }, 100);
                    console.log('BookCtrl:Link-OK');
                } // end link fn
        };
    }); // End directive
})();