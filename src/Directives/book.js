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
    angular.module("angularTurn").directive('book', function ($timeout, $http, $q, $controller) {

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
                    this.cuurentPageNo      = 0;
                    
                    $scope.virtualPages     = [];
                    
                    $scope.isBookReady      = false;

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
                    }

                    
                    // Check if there are any new pages
                    $scope.$watchCollection( 'virtualPages', function(newValue, oldValue) {
                        console.log(" Page element add "+oldValue.length + "," + newValue.length);
                        if ( oldValue.length == newValue.length ) return;
                        for(var x = oldValue.length ;x < newValue.length; x++ ){
                            console.log(" page "+newValue[x].html);
                            $scope.bookInstance.bookElement.turn("addPage", newValue[x].html, x+1);                            
                        }
                    });

                    // watch for book element ready -- start processing pages
                    this.setBookReady = function(){
                        $scope.isBookReady = true;
                    }                    
                    $scope.$watch( 'isBookReady', function(newValue, oldValue) {
                        if ( newValue == true )                            
                            $scope.bookInstance.processPages($scope.bookInstance);
                    });

                    this.turnPageForward = function () {                        
                        
                    }
                    //this.turnPageForward();
                    this.stateNextPageCtrlIndex = 0;
                    this.processPages = function (bookCtrl, pageCtrl) {

                            // Exit condition
                            if ( bookCtrl.stateNextPageCtrlIndex >= bookCtrl.pageControllers.length ){
                                return;
                            }

                            if ( !pageCtrl ) pageCtrl = bookCtrl.pageControllers[bookCtrl.stateNextPageCtrlIndex];
                            
                            if ( pageCtrl.template ){
                                $http.get(pageCtrl.template).success(function(data){                                    
                                    add(data, $scope);
                                })
                            }else{
                                add(pageCtrl.baseElement.html(), $scope);
                            }
                            // Adding a page
                            function add(htmlBase, previousScope){                                                                
                                pageCtrl.setCompliedElement(htmlBase);                                
                                // TODO : get the virtual page from content
                                // add Pages // update buffer
                                $scope.virtualPages.push({"id":pageCtrl.id, "html" : pageCtrl.compliedElement });
                                
                                // if can fill more go to the same PageCtrl with different reference or different PageCtrl
                                bookCtrl.stateNextPageCtrlIndex++;
                                bookCtrl.processPages(bookCtrl);
                            }                       
                    };

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
                            element.parent().append(bookCtrl.bookElement);                            
                            bookCtrl.loaderController.hide();
                            
                            // initialize turnJS book
                            bookCtrl.bookElement.turn({
                                width: bookCtrl.width,
                                height: bookCtrl.height,
                                autoCenter: bookCtrl.autoCenter
                            });
                            
                            bookCtrl.setBookReady();
                            // Start process for Watch for changes !
                            // Start processing pages
                            /*
                            bookCtrl.pgCount = 1;
                            bookCtrl.pageControllers.forEach(function (pageCtrl) {
                                bookCtrl.bookElement.turn("addPage", pageCtrl.compliedElement, bookCtrl.pgCount);                                
                                bookCtrl.pgCount++;
                            });                    
                            */

                    }, 100); // end timeout
                    console.log('BookCtrl:Link-OK');
                 
                } // end link fn
        };
    }); // End directive
})();