'use strict'

angular.module('addRecipe').
    component('addRecipe', {
        templateUrl: 'add-recipe/add-recipe.template.html',
        controller: ['$location', 'Restangular', "$scope", "$http", 
             function AddRecipeController($location, Restangular, $scope, $http) {
                var getDate = function() {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    return date;
                }
                 
                var recipeShort = {};
                var recipeLong = {};
                var recipe = {};
                $scope.save = function() {
                    angular.copy($scope.recipe, recipe);
                    recipe['date'] = getDate();
                    recipe['description_long'] = recipe['description_long'].split('\n');
//                   
//                    console.log(recipe);
                    $http.post('http://127.0.0.1:9000/api/recipes', JSON.stringify(recipe)).then(function(res, status){
                        console.log("added " + recipe['name']);
//                        console.log(res);
                        $location.path('/recipes/' + res['data']['_id']);
                    });
                }
                
            }
        ]
});