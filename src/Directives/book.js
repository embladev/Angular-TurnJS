/**
 * by malithJKMT,Chandimal
 */
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name  angularTurn.book
     * @description  book directive for Angular-TurnJS wrapper
     * facts : 
     * Book has the same scope as the parent ( to compile inline page content )
     * 
     * TODO:
     *  style needs to be applied to the book not outside// offscreen buffer dont have it
     *  var level2 = child.firstElementChild.firstElementChild; need to be configurable
     */
    angular.module("angularTurn").directive('book', function ($timeout, $http, $q, $controller) {

        return {
            restrict: 'E',    
            controller: 
                function ($scope, $element, $attrs) { 
                    // Set properties
                    this.id                 = $attrs.id;
                    this.height             = $attrs.ngbHeight;
                    this.width              = $attrs.ngbWidth;
                    this.autoCenter         = $attrs.ngbAutocenter;
                    
                    this.pageControllers    = [];
                    this.loaderController   = null;
                   
                    this.bookElement        = angular.element('<div id="'+this.id+'" class="ngTurn-book"><div>');
                    this.currentPageNo      = 0;
                    this.htmlBuffer         = "";
                    
                    $scope.virtualPages     = [];
                    
                    $scope.isBookReady      = false;

                    this.offScreenBuffer    = angular.element('<div id="offscreenBuffer" style="width:300px">');
                    this.offScreenPage      = angular.element('<div id="offscreenPage" style="width:300px">'); //;visibility:hidden
                    this.isProcess          = true;

                    console.log('BookCtrl:Init-Start-'+this.id);
                    
                    /**
                     * 
                     *              Page functions
                     * 
                     */
                    // Add a new page controller to the list            
                    this.addPage = function (pageCtrl) {
                        console.log("BookCtrl:AddPage-"+ pageCtrl.id);
                        this.pageControllers.push(pageCtrl);
                    }

                    this.addVPage = function (virtualPage) {                        
                        console.log("BookCtrl:AddVPage=>"+virtualPage);
                        $scope.virtualPages.push(virtualPage);                        
                    }

                    
                    // Check if there are any new pages
                    $scope.$watchCollection( 'virtualPages', function(newValue, oldValue) {
                        console.log(" Page element add "+oldValue.length + "," + newValue.length);
                        if ( oldValue.length == newValue.length ) return;
                        for(var x = oldValue.length ;x < newValue.length; x++ ){
                            console.log(" page "+newValue[x].html);                            
                            $scope.bookInstance.bookElement.turn("addPage", newValue[x].html, x+1);                            
                        }
                    });

                    // watch for book element ready -- start processing pages
                    this.setBookReady = function(){
                        $scope.isBookReady = true;
                    }   

                    $scope.$watch( 'isBookReady', function(newValue, oldValue) {
                        if ( newValue == true )                            
                            $scope.bookInstance.processPages($scope.bookInstance);
                    });

                    this.turnPageForward = function () {
                    }

                    //this.turnPageForward();
                    this.stateNextPageCtrlIndex = 0;

                    this.getChild = function(  element, level ){
                        if ( level == 0 ) return element;
                        this.getChild( angular.element( element.children , level - 1 ) );
                    }

                    this.processPages = function (bookCtrl, pageCtrl) {

                            // Stop processing more pages
                            if ( ! bookCtrl.isProcess ){

                                var previousPageLevel1   = null;
                                var previousPageLevel2   = null;
                                var children             = null;
                             
                                angular.forEach( bookCtrl.offScreenBuffer.children(), function( child ){
                                    
                                    // Get the children of each page ( Might be more for the flipbook page or less for the flipbookpage )
                                    children   = child.firstElementChild.firstElementChild.children;                                   
                                    
                                    do{
                                        if ( previousPageLevel1 == null ||
                                                 previousPageLevel1.attributes["pageId"] != child.id ||
                                                (previousPageLevel2.offsetHeight + ( children.length> 0 ? children[0].offsetHeight: 0) ) >= 400  ){
                                            
                                            //overflow add content
                                            if ( ( previousPageLevel1 && previousPageLevel1.attributes["pageId"] != child.id) || 
                                                 (previousPageLevel2 && 
                                                 (previousPageLevel2.offsetHeight + ( children.length> 0 ? children[0].offsetHeight: 0) ) >= 400) ){
                                                                                                   
                                                bookCtrl.currentPageNo++;
                                                bookCtrl.bookElement.turn("addPage", bookCtrl.offScreenPage.children()[0] , bookCtrl.currentPageNo);                                                
                                            }

                                            // a new page create 
                                            previousPageLevel1 = child.firstElementChild.cloneNode(); 
                                            previousPageLevel1.attributes["pageId"] = child.id;                                        
                                            previousPageLevel2 = child.firstElementChild.firstElementChild.cloneNode(); 
                                            previousPageLevel1.appendChild(previousPageLevel2);
                                            bookCtrl.offScreenPage.append(previousPageLevel1);
                                        }    
                                        
                                        //if ( children.length <= 0 ) break;
                                        previousPageLevel2.appendChild( children[0] );
                                        
                                        //if height of the description section is grater than page size, content will devide
                                        bookCtrl.breakPageContent(bookCtrl, previousPageLevel2, child);

                                    }while( children.length > 0 )                                  
                                    
                                });
                               
                                // Keep remaining content in PageBuffer 
                                bookCtrl.currentPageNo++;
                                bookCtrl.bookElement.turn("addPage", bookCtrl.offScreenPage.children()[0] , bookCtrl.currentPageNo);
                                
                                // Clear offscreen buffer                                
                                while (bookCtrl.offScreenBuffer.children()[0]) {
                                    bookCtrl.offScreenBuffer.children()[0].remove();
                                }
                                return;
                            }
                            // Exit condition
                            if ( bookCtrl.stateNextPageCtrlIndex >= bookCtrl.pageControllers.length ){
                                return;
                            }

                            if ( !pageCtrl ) pageCtrl = bookCtrl.pageControllers[bookCtrl.stateNextPageCtrlIndex];
                 
                            if ( !pageCtrl.hasMore() ){
                                bookCtrl.stateNextPageCtrlIndex++;
                                bookCtrl.processPages(bookCtrl);
                                return;
                            }

                            pageCtrl.setCompliedElement();
                                
                            bookCtrl.offScreenBuffer.append(pageCtrl.getCompliedElement());
                            console.log("Before >> " + bookCtrl.offScreenBuffer.height());
                            
                            // Call back and wait for the content
                            $timeout(function() {
                                    // This code runs after the DOM renders is it ???
                                    console.log("rendered !!!!!!!!!!!!! after >> " + bookCtrl.offScreenBuffer.height());
                                    // More than two pages then stop
                                    if ( bookCtrl.offScreenBuffer.height() > 2800 ){
                                        bookCtrl.isProcess = false;
                                    }
                                    
                                    // Add page breaks
                                    //var retObj = bookCtrl.breakContent(pageCtrl.compliedElement, bookCtrl.width, bookCtrl.height);
                                    
                                    // add Pages // update buffer
                                    // for(var x = 0 ;x < retObj.htmlPages.length; x++ ){
                                    //     $scope.virtualPages.push({"id":pageCtrl.id, "html" : retObj.htmlPages[x] });
                                    // }
                                    
                                    // if can fill more go to the same PageCtrl with different reference or different PageCtrl
                                    bookCtrl.processPages(bookCtrl);
                            });
                                                   
                    };

                    this.breakPageContent = function(bookCtrl, previousPageLevel, child ){
                        if(previousPageLevel.offsetHeight >= 400){
                            
                            var elementLevel1 = null;
                            var elementLevel2 = null;
                            var contentArray = [];

                             var innerContent = previousPageLevel.firstElementChild.innerHTML; 
                            
                             contentArray = innerContent.match(/.{0,1224}/g).filter(Boolean)                            
                             angular.forEach(contentArray, function(devidedContent){
                                var descriptionNode = previousPageLevel.firstElementChild.cloneNode();
                                
                                elementLevel1 = child.firstElementChild.cloneNode(); 
                                elementLevel1.attributes["pageId"] = child.id;                                        
                                elementLevel2 = child.firstElementChild.firstElementChild.cloneNode(); 
                                elementLevel1.appendChild(elementLevel2);

                                descriptionNode.append(devidedContent);
                                elementLevel2.appendChild(descriptionNode)

                                bookCtrl.currentPageNo++;                                               
                                bookCtrl.bookElement.turn("addPage", elementLevel1, bookCtrl.currentPageNo);
                             })                             
                             bookCtrl.offScreenPage.children()[0].firstElementChild.firstElementChild.remove()                                            
                        }
                    }
                    
                    this.loadAllPageTemplate = function( callBackFn ){
                        var pageCtrlWithTemplates = []
                        angular.forEach(this.pageControllers , function(pageCtrl) {
                            if ( pageCtrl.template ) pageCtrlWithTemplates.push(pageCtrl);
                        });

                        var promises = pageCtrlWithTemplates.map(function(pageCtrl) {
                            return $http.get(pageCtrl.template);
                        });
                        
                        $q.all(promises).then( function(datas) {
                            for( var x=0;x < datas.length;x++ ){
                                pageCtrlWithTemplates[x].setBaseHtml( datas[x].data );
                                callBackFn();
                            }                            
                        });

                    }

                    this.breakContent = function (html, w, h){
                        var retObj = {};
                        retObj.htmlPages = [html];
                        retObj.buffer = "";                        
                        
                        return retObj;
                    }

                    /**
                     * 
                     *              Loader functions
                     * 
                     */
                    // Add a loader ( will be replaces if there are two ) - Only one loader for book
                    this.setLoader = function (loaderCtrl) {                        
                        this.loaderController = loaderCtrl;
                        // Add to the DOM
                        $element.parent().append(loaderCtrl.compliedElement);// TODO: Not so good coding
                        console.log('BookCtrl:AddLoader-OK');
                    }
                    console.log('BookCtrl:Init-OK-'+this.id);
                }, // end controller function
            controllerAs: 'bookInstance',
            require: 'book',
            link:
                function(scope, element, attrs, bookCtrl) {
                    console.log('BookCtrl:Link-Start');

                    bookCtrl.loadAllPageTemplate( function(){

                        element.parent().append(bookCtrl.bookElement);

                                                    
                            //bookCtrl.offScreenBuffer.height = 300;
                            //bookCtrl.offScreenBuffer.append("<h1>Hello</h1>");
                            element.parent().append( bookCtrl.offScreenBuffer );
                            //bookCtrl.offScreenBuffer.width = 300;
                            element.parent().append( bookCtrl.offScreenPage );


                            bookCtrl.loaderController.hide();

                            // initialize turnJS book
                            bookCtrl.bookElement.turn({
                                width: bookCtrl.width,
                                height: bookCtrl.height,
                                autoCenter: bookCtrl.autoCenter
                            });
                            
                            //bookCtrl.setBookReady();
                            bookCtrl.processPages(bookCtrl);                        
                    });                  
                    console.log('BookCtrl:Link-OK');
                    
                } // end link fn
        };
    }); // End directive
})();