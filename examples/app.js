var moduleMain = angular.module('appMain',['angularTurn']); //defines ng-app division as a angular application

moduleMain.controller('ctrlMain',['$http', '$scope', function($http, $scope){

    $scope.members;
    $http.get('members.json').success(function(data) {
        $scope.members = data;
    });

}]);


