'use strict'

angular.module('addRecipe').
    component('addRecipe', {
        templateUrl: 'add-recipe/add-recipe.template.html',
        controller: ['$location', 'Restangular', "$scope", 
             function AddRecipeController($location, Restangular, $scope) {
                
                 
                var getId = function(s) {
                    return s.toLowerCase().replace(' ', '-');
                }
                
                var getDate = function() {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    return date;
                }
                 
                var recipeShort = {};
                var recipeLong = {};
                $scope.save = function() {
                    angular.copy($scope.recipe, recipeShort);
                    
                    recipeShort['id'] = getId(recipeShort['name']);;
                    recipeShort['date'] = getDate();
                    
                    recipeLong['id'] = recipeShort['id'];
                    recipeLong['name'] = recipeShort['name'];
                    recipeLong['method'] = [recipeShort['method']];
                    delete recipeShort['method'];
                    
                    Restangular.all('recipesShort')
                      .post(recipeShort);
                            
                    Restangular.all('recipesLong')
                      .post(recipeLong)
                      .then(function(issue) {
                        $location.path('/recipes/' + recipeShort['id']);
                       });
                }
                
            }
        ]
});