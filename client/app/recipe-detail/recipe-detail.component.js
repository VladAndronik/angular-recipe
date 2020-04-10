'use strict'

angular.module('recipeDetail').
    component('recipeDetail', {
    templateUrl: 'recipe-detail/recipe-detail.template.html',
    controller: ["$routeParams", "Restangular", "$scope", "$location","$http",
                 function RecipeDetailController($routerParams, Restangular, $scope, $location, $http) {
                     var self = this;
                    $http.get('http://127.0.0.1:9000/api/recipes/'+$routerParams.recipeId.toString()).then(function(response){
                       self.recipe = response.data; 
                       console.log(self.recipe);
                    });
                     
                     $scope.destroy = function() {
                         var id = $routerParams.recipeId.toString();
                         $http.delete('http://127.0.0.1:9000/api/recipes/'+id).then(function(response) {
                            $location.path('/recipes');
                        });
                    }
        
        }]
});
