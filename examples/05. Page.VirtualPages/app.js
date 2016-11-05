angular.module('appMain', ['angularTurn'])
    .controller('ctrlMain', function ($scope, $compile) {       
        $scope.title = "Report title";

        $scope.page1Title = "Ronaldinho1";
        $scope.page2Title = "Kumar Sangakkara";

        // Test adding page
        $scope.addPage = function(){
            // add virtual page1Title
            var content = '<div class="pageContainer"><div class="content">{{page1Title}}</div></div>';
            content = $compile(content)($scope);
            $scope.bookInstance.addVPage({"id":1, "html" : content });
            $scope.page1Title = "xxxxxxxxxxxxxx";
        }
    })
