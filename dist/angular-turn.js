/**
 * @ngdoc module
 * @name  angularTurn
 * @description  Angular wrapper for TurnJS
 */
angular.module("angularTurn",[]);


(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     */

    var controller;
    var lastPage = 4;
    /*   var virtualPages = [];
     var cacheArray = [];
     var dataArray = [];

     var initialize = function(){};
     var addPages = function(n){};*/

    var bookDir = function ($compile, $timeout) {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude> </div>',
            controller: function ($http, $scope, $attrs, $element) {

                void 0;
                $http.get($attrs.ngbTemplate).success(function (data) {
                    void 0;
                    // $scope.pageTemplate = data;

                    $timeout(function () { // timeout is to simulate Ajax request delay

                        $http.get('members.json').success(function (members) {
                            void 0;
                            $scope.members = members;
                            $scope.dynaContent = 'initialvalue';

                            /*    var templateElement = angular.element(data);
                             console.log(templateElement);*/

                            var compiledMemberArray = []; // contained the compiled member details (before dividing in to pages)
                            var innerCoverPage = $compile('<cover>inner cover page</cover>')($scope);
                            var outerCoverPage = $compile('<cover>outer cover page</cover>')($scope);

                            var temp;
                            for (var i = 0; i < members.length; i++) {
                                temp = '<div>page Content:- {{members['+i+'].name}} <br>{{dynaContent}} <input type="text" ng-model="dynaContent"></div>';
                                compiledMemberArray.push($compile(temp)($scope));
                            }
                            void 0;

                            // here the compiled content inside compiledMemberArray should be divided among pages -- call page breaker method [returns pages array]
                            var breakedPagesArray = pageBreaker(compiledMemberArray);


                            breakedPagesArray.forEach(function(page){
                                $element.turn("addPage", page, ++lastPage);
                            });
                            $element.turn("addPage", innerCoverPage, ++lastPage);
                            $element.turn("addPage", outerCoverPage, ++lastPage);

                        });

                    }, 7000);


                });


                void 0;

                function pageBreaker(compiledMemberArray){
                    // do the page breaking process
                    return compiledMemberArray;
                }
            },
            compile: function (tElem, tAttrs) {

                return {
                    pre: function (scope, iElem, iAttrs) {

                    },
                    post: function (scope, iElem, iAttrs) {
                        controller = iAttrs.ngbController;
                        iElem.turn({
                            width: iAttrs.ngbWidth,
                            height: iAttrs.ngbHeight,
                            autoCenter: iAttrs.ngbAutocenter,
                            display: iAttrs.ngbDisplay,
                            duration: iAttrs.ngbDuration,
                        });
                        /*var element = angular.element('<div>Malith Thilakarathne</div>');
                         iElem.turn("removePage", 3);
                         iElem.turn("addPage", element, 8);*/

                    }
                }
            }
        }
    };
    angular.module("angularTurn").directive('book', bookDir);
})();

// TODO:-   cover make HARD, template URL(asynchronous load --- promise???), virtual pages[has processed HTML content?, 6 or?]( how to load virtual pages, call turn on virtual pages)

 

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.cover
     * @description  cover directive for Angular-TurnJS wrapper
     */

    var coverDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(iElem, iAttrs){
                var title = iAttrs.ngbTitle;
                if (title){
                    return '<div  class="hard"><h1>'+ title+'</h1><div ng-transclude></div></div>';
                }else{
                    return '<div  class="hard"><div ng-transclude></div></div>';
                }
            },
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        scope.title = iAttrs.ngbTitle;
                    }
                }
            }
        }
    }
    angular.module("angularTurn").directive('cover', coverDir);
})();
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.page
     * @description  page directive for Angular-TurnJS wrapper
     */

   /* var getHtmlPage = function () {};*/
    var pageDir = function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude> </div>',
            compile: function (tElem, tAttrs) {
                return {
                    pre: function (scope, iElem, iAttrs) {

                    },
                    post: function (scope, iElem, iAttrs) {
                        /*scope.data = iAttrs.ngbData;
                        var templateUrl = iAttrs.ngbTemplateUrl;
                        var controller = iAttrs.ngbController;*/
                    }
                }
            }
        }
    }
    angular.module("angularTurn").directive('page', pageDir);
})();