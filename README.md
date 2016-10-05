# AngularJS Wrapper for [TurnJS](http://www.turnjs.com/)

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

## Example 1 - static content

```
<div ng-app="appMain" ng-controller="ctrlMain">

    <book ngb-width="1000" ngb-height="680" ngb-autocenter="true">
        <page> page1  </page>
        <page> page2  </page>
        <page> page3  </page>
        <page> page4  </page>
    </book>

</div>
```
## Example 2 - cover page

```
<div ng-app="appMain" ng-controller="ctrlMain">

    <book ngb-width="1000" ngb-height="680" ngb-autocenter="true">

        <cover ngb-title="Example Turn Book"> <h2>Sub Title</h2> </cover>
        <cover> </cover>

        <page>  page1  </page>
        <page>  page2  </page>
        <page>  page3  </page>
        <page>  page4  </page>

        <cover></cover>
        <cover></cover>
    </book>

</div>
```
## Example 3 - dynamic content

```
<div ng-app="appMain" ng-controller="ctrlMain">

    <book ngb-width="1000" ngb-height="680" ngb-autocenter="false">
        <cover>
            <h1>Example Turn Book<br> -Dynamic content-</h1>
        </cover>
        <cover></cover>
        
        <page> {{pageOneContent}}   </page>
        <page> {{pageTwoContent}}   </page>
        <page> {{pageThreeContent}} </page>
        <page> {{pageFourContent}}  </page>

        <cover></cover>
        <cover></cover>
    </book>

</div>
```
## Elements

- book - defines the book. ngb-height, ngb-width and ngb-autoCenter options can be added as attributes.
- page - defines a single page
- cover - defines a cover page

## Attributes

- ngb-height - sets the height of the book
- ngb-width - sets the width of the book
- ngb-autoCenter - centers the book depending on how many pages are visible
- ngb-template - url of the html template for the page
- ngb-title - title for the front cover page

## License

[MIT License](https://github.com/embladev/Angular-TurnJS/blob/dev/LICENSE)