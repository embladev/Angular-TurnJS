/**
 * by malithJKMT,Chandimal
 */
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */

    var bookDir = function ($timeout, $compile) {

        var bookCtrl = function ($scope, $element, $attrs) {
            console.log('BookCtrl:Init-Start');
            var ctrl = this;
            ctrl.loader;
            ctrl.pageDirCtrls   = [];
            ctrl.height         = $attrs.ngbHeight;
            ctrl.width          = $attrs.ngbWidth;
            ctrl.autoCenter     = $attrs.ngbAutocenter;
            ctrl.loaderElem     = {};

            /******************Book controller functions***********************/
            // store page dir instances
            ctrl.addPage = function (pageDirCtrl) {

                // handover the token to first page directive
                if (ctrl.isFirstDir) {
                    ctrl.isFirstDir = false;
                    pageDirCtrl.hasToken = true;
                }                
                ctrl.pageDirCtrls.push(pageDirCtrl);
            }
            ctrl.addLoader = function (loaderCtrl) {
                
                ctrl.loaderElem = angular.element('<div id="'+loaderCtrl.id+'" class="'+loaderCtrl.class+'">' + loaderCtrl.element.html() + '<div>'); 
                ctrl.loaderElem.css("position", 'absolute');
                ctrl.loaderElem.css("height",  ctrl.height);
                ctrl.loaderElem.css("width",   ctrl.width); 
                ctrl.loaderElem.css("border-style", "solid"); // TODO: Remove : For testing purpose only
                $element.parent().append(ctrl.loaderElem);
            }

            ctrl.turnPageForward = function () {

            }
            ctrl.loadNextPages = function () {

            };
            ctrl.hideLoader = function () {
                if (ctrl.loaderElem) {
                    ctrl.loaderElem.hide();
                }
            }
            
            console.log('BookCtrl:Init-End');
        }

        function linkFn(scope, element, attrs) {
            console.log('BookCtrl:Link-Start');
            $timeout(   // just to demo the loading page
                function () {

                    // get pages
                    var innerBook = '';
                    scope.ctrl.pageDirCtrls.forEach(function (pageDir) {
                        innerBook += pageDir.innerHTML;
                    });


                    scope.ctrl.hideLoader();
                    var elem = angular.element('<div>' + innerBook + '<div>');
                   // $compile(elem)(scope);
                    element.append(elem);

                    // initialize turnJS book
                    elem.turn({
                        width: scope.ctrl.width,
                        height: scope.ctrl.height,
                        autoCenter: scope.ctrl.autoCenter
                    });
                }
                , 2000
            );
            console.log('BookCtrl:Link-End');
        }
        

        return {
            restrict: 'E',
            scope: {}, // isolate book component's scope from user's app
            controller: bookCtrl,
            controllerAs: 'ctrl',
            link: linkFn,
           // replace: true, // replace <book> tag with <div> tag (turnJS reads only divs)
            transclude: true,
            template: '<div ng-transclude></div>'
        };
    };
    angular.module("angularTurn").directive('book', bookDir);
})();