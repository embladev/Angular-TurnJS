(function(){
	"use strict";
	
	angular.module("angularTurn").directive("page", function () {
    var directive = {};
    directive.restrict = 'E';
    directive.transclude = true;
    //directive.require = '^book';
    directive.templateUrl = function (element, attributes) {
        return attributes.ngbTemplate;
    }
    return directive;
	});
})();





