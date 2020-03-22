'use strict'

angular.module('recipeDetail').
    component('recipeDetail', {
    templateUrl: 'recipe-detail/recipe-detail.template.html',
    controller: ["$routeParams", "Restangular", "$scope", "$location",
                 function RecipeDetailController($routerParams, Restangular, $scope, $location) {
                     var self = this;
                     self.recipe = Restangular.one('recipesLong', $routerParams.recipeId).get().$object;
                     
                     $scope.destroy = function() {
                         var id = $routerParams.recipeId;
                        Restangular.one('recipesShort', id).remove().then(function() {
                            $location.path('/recipes');
                        });

                        Restangular.one('recipesLong', id).remove().then(function () {
                            $location.path('/recipes');
                        });

                    }
        
        }]
    
//    controller: ["$routeParams", "$http", 
//     function RecipeDetailController($routeParams, $http)
//        {
//            var self = this;
//            $http.get('recipes/' + $routeParams.recipeId + '.json').then(function(response){
//               self.recipe = response.data; 
//            });
//        }
//    ]
});
