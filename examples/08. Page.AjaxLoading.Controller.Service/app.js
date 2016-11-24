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
    .controller('ctrlReport', function ($scope, reportService) {
        // Test controller with its own scope / combine with a template
        $scope.title = reportService.next().title;
        $scope.img = reportService.next().img;
        $scope.description = reportService.next().description;        
    })

    .factory('reportService', function() {
        
        var index = -1 ;
        var dataSet = [
            { "title" : "Ronaldinho from Service 1", "img": "img/ronaldino.jpg", "description" : "Ronaldo de Assis Moreira (born 21 March 1980), commonly known as Ronaldinho, is a Brazilian professional footballer and current club ambassador for Spanish club FC" },
            { "title" : "Serena Williams from Service 2", "img": "img/Serena.jpg", "description" : "Serena Jameka Williams (born September 26, 1981) is an American professional tennis player. The Women's Tennis Association (WTA) has ranked her world No.1 in singles on six separate occasions" },
            { "title" : "Kumar Sangakkara from Service 3", "img": "img/sanga.jpg", "description" : "Kumar Sanga Chokshanada Sangakkara is a former Sri Lankan cricketer and captain of the Sri Lankan national team. Widely regarded as one of the world's most influential cricketers,Sangakkara rated as the second greatest ODI batsman of all time in a recent public  poll." }
            ];
 
        return {
            next: function(){
                return dataSet[index];
            },
            hasMore : function(){                
                index++;            
                if ( index >= dataSet.length ){
                    return false;
                }
                return true;              
            } 
        };
    });