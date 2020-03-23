'use strict'

angular.
    module('recipeApp').
    config(['$routeProvider','RestangularProvider',
           function config($routerProvider, RestangularProvider) {
               $routerProvider.
                when('/recipes', {
                   template: '<recipe-list></recipe-list>'
               }).
                when('/recipes/:recipeId', {
                   template: '<recipe-detail></recipe-detail>'
               }).
               when('/add', {
                   template: "<add-recipe></add-recipe>"
               }).
               when('/edit/:recipeId', {
                   template: "<edit-recipe></edit-recipe>"
               }).
               otherwise('/recipes');
               
               RestangularProvider.setBaseUrl('http://localhost:3000/');

           }
            
   ]);