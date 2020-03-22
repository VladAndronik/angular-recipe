'use strict'

angular.
    module('recipeList').
    component('recipeList', {
        templateUrl: 'recipe-list/recipe-list.template.html',
        controller: ['Restangular', '$scope', '$location', function RecipeListController(Restangular, $scope, $location) {
            var self = this;
            self.orderProp = 'category';
            self.recipes = Restangular.all("recipesShort").getList().$object;
            
            $scope.destroy = function(id) {
                Restangular.one('recipesShort', id).remove().then(function() {
                    // Restangular removes element from DB, so we change also the internal collection
                    var index = self.recipes.findIndex(x => x.id === id);
                    if (index > -1) self.recipes.splice(index, 1);
                });
                
                Restangular.one('recipesLong', id).remove();

            }

        }]
//        controller: ['$http', function RecipeeListController($http) {
//            var self = this;
//            self.orderProp = 'category';
//            $http.get('recipes/recipes.json').then(function(response){
//               self.recipes = response.data; 
//            });
//        }]
    
    });