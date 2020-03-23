'use strict'

angular.
    module('recipeList').
    component('recipeList', {
        templateUrl: 'recipe-list/recipe-list.template.html',
        controller: ['Restangular', '$scope', '$location',"$window",
         function RecipeListController(Restangular, $scope, $location, $window) {
            var self = this;
            if (!$window.localStorage.getItem('orderProp'))
                $window.localStorage.setItem("orderProp", 'category');
            self.orderProp = $window.localStorage.getItem('orderProp');
             
            
            self.recipes = Restangular.all("recipesShort").getList().$object;
            
            $scope.destroy = function(id) {
                Restangular.one('recipesShort', id).remove().then(function() {
                    // Restangular removes element from DB, so we change also the internal collection
                    var index = self.recipes.findIndex(x => x.id === id);
                    if (index > -1) self.recipes.splice(index, 1);
                });
                
                Restangular.one('recipesLong', id).remove();

            }
            
            $scope.changed = function() {
                $window.localStorage.setItem("orderProp", self.orderProp);
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
