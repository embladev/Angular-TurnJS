var coverDir = function () {
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude class="hard"></div>',
        compile: function (tElem, tAttrs) {
            console.log('cover: compile => ');
            return {
                pre: function (scope, iElem, iAttrs) {
                    console.log('cover: pre link => ');
                },
                post: function (scope, iElem, iAttrs) {
                    console.log('cover: post link => ');
                }
            }
        }
    }
}
angular.module("angularTurn").directive('cover', coverDir);