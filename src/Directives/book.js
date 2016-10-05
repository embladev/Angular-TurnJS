var bookDir = function(){
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function(tElem, tAttrs){
            console.log('book: compile => ');
            return {
                pre: function(scope, iElem, iAttrs){
                    console.log('book: pre link => ');
                },
                post: function(scope, iElem, iAttrs){
                    console.log('book: post link => ');
                    iElem.turn({
                        width: iAttrs.ngbWidth,
                        height: iAttrs.ngbHeight,
                        autoCenter: iAttrs.ngbAutocenter
                    });
                }
            }
        }
    }
}
angular.module("angularTurn").directive('book', bookDir);
