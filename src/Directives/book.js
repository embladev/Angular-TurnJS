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

    var bookDir = function ($timeout, $compile) {

        var bookCtrl = function ($scope, $element, $attrs) {
            // Set properties
            this.id             = $attrs.id;
            this.pageControllers= [];
            this.loaderElement  = null;

            console.log('BookCtrl:Init-Start');
             
            var ctrl = this;
            ctrl.loader;
            
            ctrl.height         = $attrs.ngbHeight;
            ctrl.width          = $attrs.ngbWidth;
            ctrl.autoCenter     = $attrs.ngbAutocenter;
            
           

            /**
             * 
             *              Page functions
             * 
             */
            // Add a new page controller to the list            
            ctrl.addPage = function (pageCtrl) {
                console.log("BookCtrl:AddPage-"+ pageCtrl.id);
                this.pageControllers.push(pageCtrl);
            }

            ctrl.turnPageForward = function () {

            }
            ctrl.loadNextPages = function () {

            };

            /**
             * 
             *              Loader functions
             * 
             */
            // Add a loader ( will be replaces if there are two ) - Only one loader for book
            ctrl.addLoader = function (loaderCtrl) {
                // Create a new HTML element
                this.loaderElement = angular.element('<div id="'+loaderCtrl.id+'" class="ngTurn-loader">' + loaderCtrl.element.html() + '<div>');
                // Complie the HTML element and connect the parent scope 
                var content = $compile(this.loaderElement)($scope);                
                $element.parent().append(this.loaderElement);
                console.log('BookCtrl:AddLoader-OK');
            }
            // Hide and remove the loader HTML element 
            ctrl.hideLoader = function () {
                if (ctrl.loaderElement) {
                    ctrl.loaderElement.hide();
                    ctrl.loaderElement.remove();    
                }
            }
            
            console.log('BookCtrl:Init-OK');
        }

        function linkFn(scope, element, attrs) {
            console.log('BookCtrl:Link-Start');
            $timeout(   // just to demo the loading page
                function () {

                    var bookElement = angular.element('<div id="'+scope.bookInstance.id+'" class="ngTurn-book"><div>');
                    // $compile(elem)(scope);
                    element.parent().append(bookElement);
                    
                    scope.bookInstance.hideLoader();
                    // initialize turnJS book
                    bookElement.turn({
                        width: scope.bookInstance.width,
                        height: scope.bookInstance.height,
                        autoCenter: scope.bookInstance.autoCenter
                    });

                    // Start processing pages
                    var pgCount = 1;
                    scope.bookInstance.pageControllers.forEach(function (pageCtrl) {                        
                        bookElement.turn("addPage", pageCtrl.element.html(), pgCount);
                        pgCount++;
                    });                    
                }
                , 1000
            );
            console.log('BookCtrl:Link-OK');
        }
        

        return {
            restrict: 'E',            
            controller: bookCtrl,
            controllerAs: 'bookInstance',
            link: linkFn
        };
    };
    angular.module("angularTurn").directive('book', bookDir);
})();