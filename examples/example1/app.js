angular.module('appMain', ['angularTurn'])
    .controller('ctrlMain', function ($scope) {

    })
    // External controller 1
    .controller('externalCtrl1', function ($scope) {
        $scope.myName = 'value from EXTERNAL controller 1';
        this.childExternalCtrlMethod = function () {
            console.log("parent just called child's excternal  ctrl 1 Method");
        }
    })
    // External controller 2
    .controller('externalCtrl2', function ($scope) {
        $scope.myName = 'value from EXTERNAL controller 2';
        this.childExternalCtrlMethod = function () {
            console.log("parent just called child's excternal ctrl 2 Method");
        }
    });