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
    angular.module("angularTurn").directive('book', function ($timeout, $http) {

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
                   
                    this.bookElement        = angular.element('<div id="'+this.id+'" class="ngTurn-book"><div>');
                    this.pgCount            = 1;

                    $scope.virtualPages     = [];
                    
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

                    this.addVPage = function (virtualPage) {                        
                        console.log("BookCtrl:AddVPage=>"+virtualPage);
                        $scope.virtualPages.push(virtualPage);
                        console.log("PG count " + this.pgCount);
                        this.pgCount++;
                    }

                    
                    // Check if there are any new pages
                    $scope.$watchCollection( 'virtualPages', function(newValue, oldValue) {
                        //this.bookElement.turn("addPage",htmlCompiledContent, this.pgCount);
                        console.log("virtual pages changed" + newValue + ","+ oldValue);
                        $scope.bookInstance.bookElement.turn("addPage", '<div class="pageContainer"><div class="content">Test</div></div>', $scope.bookInstance.pgCount-1);
                    });
                    

                    this.turnPageForward = function () {                        
                        
                    }
                    //this.turnPageForward();
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
                    // just to demo the loading page
                    $timeout( function () {

                            //bookCtrl.bookElement = angular.element('<div id="'+bookCtrl.id+'" class="ngTurn-book"><div>');
                            element.parent().append(bookCtrl.bookElement);                            
                            bookCtrl.loaderController.hide();
                            
                            // initialize turnJS book
                            bookCtrl.bookElement.turn({
                                width: bookCtrl.width,
                                height: bookCtrl.height,
                                autoCenter: bookCtrl.autoCenter
                            });
                            
                            // Start process for Watch for changes !
                            // Start processing pages
                            bookCtrl.pgCount = 1;
                            bookCtrl.pageControllers.forEach(function (pageCtrl) {
                                bookCtrl.bookElement.turn("addPage", pageCtrl.compliedElement.html(), bookCtrl.pgCount);
                                bookCtrl.pgCount++;
                            });                    
                    }, 500); // end timeout
                    console.log('BookCtrl:Link-OK');
                } // end link fn
        };
    }); // End directive
})();