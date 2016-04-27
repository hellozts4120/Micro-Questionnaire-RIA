'use strict';

angular.module('questionnaireApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the data page
            .state('app.data', {
                url:'data',
                views: {
                    'content@': {
                        templateUrl : 'views/data.html',
                        controller  : 'DataController'                  
                    }
                }
            })
        
            // route for the edit page
            .state('app.edit', {
                url:'edit',
                views: {
                    'content@': {
                        templateUrl : 'views/edit.html',
                        controller  : 'EditController'                  
                    }
                }
            })
    
        $urlRouterProvider.otherwise('/');
    })
;