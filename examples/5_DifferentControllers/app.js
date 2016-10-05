var moduleMain = angular.module('appMain',['angularTurn']); //defines ng-app division as a angular application

moduleMain.controller('ctrlMain',['$http', '$scope', function($http, $scope){

    $scope.pageOneContent = "page 1";
    $scope.pageTwoContent = "page 2";
    $scope.pageThreeContent = "page 3";
    $scope.pageFourContent = "page 4";

}]);


