angular.module('appMain', ['angularTurn'])
    .controller('ctrlMain', function ($scope) {       
        $scope.title = "Report title";

        $scope.page1Title = "Ronaldinho1";
        $scope.page2Title = "Kumar Sangakkara";

        // Test adding page
        $scope.addPage = function(){
            // add virtual page1Title
            $scope.bookInstance.addVPage({"id":1, "html" : '<div class="pageContainer"><div class="content">Test</div></div>' });
        }
    })
