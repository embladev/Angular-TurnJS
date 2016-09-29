(function () {
    var pageDir = function ($compile) {
        return {
            replace : true,
            scope: {
                member: '='
            },
            restrict: 'E',
            link: function ($scope, $element, attrs) {

                console.log($scope);
                $scope.templt = attrs.ngbTemplate;
                var DOM = angular.element("<div  ng-include='templt'> </div>");

                var $e = $compile(DOM)($scope);
                $element.replaceWith($e);

            }
        }
    };
    angular.module("angularTurn").directive('page', pageDir);
})();