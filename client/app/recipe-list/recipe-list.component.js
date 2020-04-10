'use strict'

angular.
    module('recipeList').
    component('recipeList', {
        templateUrl: 'recipe-list/recipe-list.template.html',
        controller: ['Restangular', '$scope', '$location',"$window","$http",
         function RecipeListController(Restangular, $scope, $location, $window, $http) {
            var self = this;
            if (!$window.localStorage.getItem('orderProp'))
                $window.localStorage.setItem("orderProp", 'category');
            self.orderProp = $window.localStorage.getItem('orderProp');
             
             
             $http.get('http://127.0.0.1:9000/api/recipes').then(function(response){
               self.recipes = response.data; 
               console.log(self.recipes);
            });
            
            $scope.destroy = function(id) {
                $http.delete('http://127.0.0.1:9000/api/recipes/'+id).then(function(response) {
                    var index = self.recipes.findIndex(x => x._id === id);
                    if (index > -1) self.recipes.splice(index, 1);
                });
            }
            
            $scope.changed = function() {
                $window.localStorage.setItem("orderProp", self.orderProp);
            }

        }]
    });
