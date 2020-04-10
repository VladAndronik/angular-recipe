'use strict'

angular.module("editRecipe").
    component("editRecipe", {
        templateUrl: "edit-recipe/edit-recipe.template.html",
        controller: ['$routeParams', 'Restangular', "$scope", "$location","$http",
             function EditRecipeController($routerParams, Restangular, $scope, $location, $http) {
                 var self = this;
                 $http.get('http://127.0.0.1:9000/api/recipes/'+$routerParams.recipeId.toString()).then(function(response){
                       self.recipe = response.data; 
                       console.log(self.recipe);
                 });
                 
                 $scope.save = function() {
//                     self.recipe['description_long'] = self.recipe['description_long'].split('\n');
                     self.recipe['description_long'] = self.recipe['description_long'];
                     $http.patch('http://127.0.0.1:9000/api/recipes/'+$routerParams.recipeId.toString(), JSON.stringify(self.recipe)).then(function(response) {
                        console.log(response);
                        $location.path('/recipes');
                    });
                 }
                 
                 $scope.destroy = function(id) {
                    $http.delete('http://127.0.0.1:9000/api/recipes/'+$routerParams.recipeId.toString()).then(function(response) {
                        console.log(response);
                        $location.path('/recipes');
                    });
                 }

             }
         ]
    }
);
    