(function(){

    var isTemplateGiven = false;

    var coverDir = function () {
        var dir = {
            restrict: 'E',
            link: function(scope, element, attrs) {
            },
            scope: {},
            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                        if("ngbTemplate" in attrs){
                            dir.templateUrl = function (element, attrs) {
                                return attrs.ngbTemplate;
                            }
                        }
                    },
                    post: function (scope, element, attrs) {
                        isTemplateGiven = false;
                        if("ngbTemplate" in attrs){
                            isTemplateGiven = true;
                            dir.templateUrl = function (element, attrs) {
                                return attrs.ngbTemplate;
                            }
                        } else {
                            isTemplateGiven = false;
                        }
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                return attrs.ngbTemplate;
            }
        }

        return dir;

    }

    angular.module("angularTurn").directive('cover', coverDir);

})();