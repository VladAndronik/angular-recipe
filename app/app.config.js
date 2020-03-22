'use strict'

angular.
    module('recipeApp').
    config(['$routeProvider',
           function config($routerProvider) {
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
               otherwise('/recipes');
           }
   ]);