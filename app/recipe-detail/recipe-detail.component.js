'use strict'

angular.module('recipeDetail').
    component('recipeDetail', {
    templateUrl: 'recipe-detail/recipe-detail.template.html',
    controller: ["$routeParams", "$http", 
     function RecipeDetailController($routeParams, $http)
        {
            var self = this;
            $http.get('recipes/' + $routeParams.recipeId + '.json').then(function(response){
               self.recipe = response.data; 
            });
        }
    ]
});
