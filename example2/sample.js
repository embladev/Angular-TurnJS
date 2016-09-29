var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.test = 'test string from myCtrl';
});

function Book() {
    return function () {
        return {
            restrict: 'E',
            compile: function (elem, attr) {
                //var bookHTML = elem[0].innerHTML;
                //bookHTML = bookHTML.replace(new RegExp('page', 'g'), 'div');
                //console.log(bookHTML);
                return {
                    pre: function (scope, elem, attr) {
                        //console.log(name + ': pre link');
                    },
                    post: function (scope, elem, attr) {
                        var pages = elem[0].children;
                        console.log(elem[0].children);
                        var pageContent = [];
                        angular.forEach(pages, function (value, key) {
                            console.log(value.children);
                        });
                        //var e = $compile(elem)(scope);
                        //console.log(e);
                        var angularElement = angular.element(elem);

                        //console.log(angularElement.html());
                        //var bookHTML = elem[0].innerHTML;
                        //bookHTML = bookHTML.replace(new RegExp('page', 'g'), 'div');
                    }
                }
            }
        }
    }
}

function Page() {
    return function () {
        return {
            restrict: 'E',
            templateUrl: function (element,attributes) {
                return attributes.ngbTemplate;
            },
            compile: function (elem, attr) {
                //console.log(elem[0].innerHTML);
                return {
                    pre: function (scope, elem, attr) {
                        //console.log(elem[0]);
                    },
                    post: function (scope, elem, attr) {
                        //console.log(elem[0]);
                    }
                }
            }
        }
    }
}

app.directive('book', Book());
app.directive('page', Page());