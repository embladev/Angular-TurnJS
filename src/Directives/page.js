(function(){

    var isTemplateGiven = false;



	var pageDir = function () {
		var dir = {
            restrict: 'E',
            /*templateUrl: function (element,attrs) {
                return attrs.ngbTemplate;
            },*/
			link: function(scope, element, attrs) {
				
			},
            /*templateUrl: function(element, attrs){
			    var isTemplateGiven = false;
			    if(isTemplateGiven){
                    return attrs.ngbTemplate;
                } else {
                    return null;
                }
            },*/
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
                            /*console.log("template available");
                            console.log("main variable vaule before: " + isTemplateGiven);*/
                            isTemplateGiven = true;
                            /*console.log(attrs.ngbTemplate);
                            console.log("main variable vaule after: " + isTemplateGiven);*/
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        } else {
                            /*console.log("no template");
                            console.log("main variable vaule before: " + isTemplateGiven);*/
                            isTemplateGiven = false;
                            /*console.log("main variable vaule after: " + isTemplateGiven);*/
                        }
                        console.log(" ");
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                    return attrs.ngbTemplate;
            }
        }

        console.log(dir);
        return dir;

	}	
	angular.module("angularTurn").directive('page', pageDir);
})();