'use strict'

angular.module('recipeDetail').
    component('recipeDetail', {
    templateUrl: 'modules/recipe-detail/recipe-detail.template.html',
    controller: ["Authentication", "$routeParams", "$scope", "$location","$http","$window",
                 function RecipeDetailController(Authentication, $routerParams, $scope, $location, $http,$window) {
                     var self = this;
                   
                     console.log($window.localStorage.getItem('orderProp'));
                     
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
                     $scope.isLogged = function() {
                        return Authentication.isLogged();
                    }
        
        }]
});
