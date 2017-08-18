angular.module('appMain', ['angularTurn'])
    .controller('ctrlMain', function ($scope, $compile) {       
        // $scope.title = "Report title";

        // $scope.page1Title = "Ronaldinho1";
        // $scope.page2Title = "Kumar Sangakkara";

        // Test adding page
        $scope.addPage = function(){
            // add virtual page1Title
            var content = '<div class="pageContainer"><div class="content"><strong>{{page1Title}}</strong></div></div>';
            content = $compile(content)($scope);
            $scope.bookInstance.addVPage({"id":1, "html" : content });
            $scope.page1Title = "xxxxxxxxxxxxxx";
        }
    })    
    .controller('ctrlReport', function ($scope, reportService) {
        // Test controller with its own scope / combine with a template       
        reportService.next().then(function(titleData){            
            $scope.title = titleData.title;
        });
        reportService.next().then(function(imgData){
            $scope.img = imgData.img;
        });
        reportService.next().then(function(descData){
            $scope.description = descData.description;
        });        
    })

    .factory('reportService', function(dataManagement, $q) {
        
        var index = -1;      
        return {
            next: function(){

                var deferred = $q.defer();
                dataManagement.getBookData().then(function(dataSet){                   
                    deferred.resolve(dataSet[index]);
                });
                return deferred.promise;                
            },
            hasMore : function(){

                var deferred = $q.defer();
                dataManagement.getBookData().then(function(dataSet){
                    console.log(index);
                    index++;                  
                    if ( index >= dataSet.length ){
                        deferred.resolve(false);                        
                    }
                    else{
                        deferred.resolve(true);
                    }
                });               
                return deferred.promise;                           
            } 
        };
    }).factory('dataManagement', function($http, $q){

        return {
            getBookData: function(){

                var deferred = $q.defer(); 
                $http.get('data.json').
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function(msg, status, headers, config) {
                    deferred.reject(msg);
                });
                return deferred.promise; 
            }
        }
    });