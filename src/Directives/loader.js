/**
 * @author malithJKMT,chandimal@embla.asia
 * @description
 * Loader configuration directive
 * @copyright 2016 Embla Software Innovation (Pvt) Ltd All rights reserved.
 */

(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name  angularTurn.page
     * @description  page directive for Angular-TurnJS wrapper
     */   
    angular.module("angularTurn").directive('loader', function ($compile) {
        
        return {             
            restrict: 'E',   
            scope:false,
            controller:
                /**
                 * @ngdoc controller
                 * @name  angularTurn.loader
                 * @description Loader controller
                */
                function ($scope, $element, $attrs, $compile) {
                    console.log('LoaderCtrl:Init-Start');           
                    this.id             = $attrs.id;
                    this.class          = $attrs.class;
                    this.baseElement    = $element;
                    this.compliedElement= null;
                    console.log('LoaderCtrl:Init-End');

                    this.hide = function(){
                        if (this.compliedElement) {
                            this.compliedElement.hide();
                            this.compliedElement.remove();    
                        }
                    }
                } // end controller function
            ,
            require: ['^book','loader'],
            link: 
               /**
                 * @ngdoc linkFn
                 * @name  angularTurn.loader
                 * @description Loader link function
                 */  
                function (scope, element, attrs, ctrls) {
                    var bookCtrl    = ctrls[0];
                    var loaderCtrl  = ctrls[1];
                    // Hide config element
                    element.hide();
                    console.log('LoaderCtrl:Link-Start');
                    // Create new loader element and compile
                    loaderCtrl.compliedElement = angular.element('<div id="'+loaderCtrl.id+'" class="ngTurn-loader">' + loaderCtrl.baseElement.html() + '<div>');                    
                    var content = $compile(loaderCtrl.compliedElement)(scope);
                    // Add to the book ( if two loader elements one will be overriden )
                    bookCtrl.setLoader(loaderCtrl);         
                    console.log('LoaderCtrl:Link-Ok');
                }
        } // end return
    }); // end directive
})();