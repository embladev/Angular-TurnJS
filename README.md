# AngularJS Wrapper for [TurnJS](http://www.turnjs.com/)

##Quick Developer start up

* Clone repository
git clone [url]

* Runtime
npm install  ( to install the all the gulp dependancies )
gulp test-server to start the local server

##Quick Start

- install Angular-TurnJS with npm

```
npm install --save angular-turnjs
```
- Include Angular-TurnJS library in your `index.html`

```
<script src="node_modules/angular-turnjs/dist/angular-turn.min.js"></script>
```
- Inject the `angular-turnJS` module into your app.js

```
angular.module('myApp', ['angular-turnJS']);
```

- Download and include [TurnJS](http://www.turnjs.com/) library in your `index.html`

- Include Jquery in your `index.html`

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```

## Requirements

- Angular
- jQuery 1.7 or later

## Example

```
<div ng-app="appMain" ng-controller="ctrlMain">
    <book ngb-height="300" ngb-width="400" ngb-autocenter="true">
        <page ngb-controller="externalCtrl1" ngb-template='template1.html'></page>
        <page ngb-controller="externalCtrl2" ngb-template='template2.html'></page>
    </book>
</div>
```

The controllers should be defined for your Angular app.

```
angular.module('appMain', ['angularTurn'])
    .controller('ctrlMain', function ($scope) {
    })
    // External controller 1
    .controller('externalCtrl1', function ($scope) {
        $scope.myName = 'John';     
    })
     // External controller 2
    .controller('externalCtrl2', function ($scope) {
        $scope.myName = 'Jane';
    });

```

Provide templates as html files.

template1.html
````
<div>My name is <br><strong>{{myName}}</strong></div>
````
template2.html
````
<div>My wife's name is <br><strong>{{myName}}</strong></div>
````
## Elements

- book - defines the book. ngb-height, ngb-width and ngb-autoCenter options can be added as attributes.
- page - defines a single page


## Attributes

- ngb-height - sets the height of the book
- ngb-width - sets the width of the book
- ngb-autoCenter - centers the book depending on how many pages are visible
- ngb-template - url of the html template for the page
- ngb-controller - controller name for the page
