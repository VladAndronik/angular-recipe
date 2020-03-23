'use strict'

angular.module("editRecipe").
    component("editRecipe", {
        templateUrl: "edit-recipe/edit-recipe.template.html",
        controller: ['$routeParams', 'Restangular', "$scope", "$location",
             function EditRecipeController($routerParams, Restangular, $scope, $location) {
                 var self = this;
                 self.recipe = Restangular.one('recipesShort', $routerParams.recipeId).get().$object;
                 self.recipeMethod = Restangular.one('recipesLong', $routerParams.recipeId).get().$object;
                 
                 $scope.save = function() {
                     self.recipeMethod['method'] = self.recipeMethod['method'].split('\n');
                     Restangular.all('recipesShort/' + $routerParams.recipeId)
                         .customPUT(self.recipe);
                     
                     Restangular.all('recipesLong/' + $routerParams.recipeId)
                         .customPUT(self.recipeMethod)
                         .then(function(data) {
                            $location.path('/recipes');
                     });
                 }
                 
                 $scope.destroy = function() {
                    Restangular.one('recipesShort', $routerParams.recipeId).remove();
                    Restangular.one('recipesLong', $routerParams.recipeId).remove().then(function() {
                        $location.path('/recipes');
                    });

            }
             }]
    }
);
    