'use strict'

angular.
    module('recipeList').
    component('recipeList', {
        templateUrl: 'recipe-list/recipe-list.template.html',
        controller: ['$http', function RecipeeListController($http) {
            var self = this;
            self.orderProp = 'category';
            $http.get('recipes/recipes.json').then(function(response){
               self.recipes = response.data; 
            });
        }]
    
    });