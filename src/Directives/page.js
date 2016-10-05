var pageDir = function () {
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function (tElem, tAttrs) {
            console.log('page: compile => ');

            return {
                pre: function (scope, iElem, iAttrs) {
                    console.log('page: pre link => ');
                },
                post: function (scope, iElem, iAttrs) {
                    console.log('page: post link => ');
                }
            }
        }
    }
}
angular.module("angularTurn").directive('page', pageDir);