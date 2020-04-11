'use strict'

angular.module('addRecipe').
    component('addRecipe', {
        templateUrl: 'modules/add-recipe/add-recipe.template.html',
        controller: ['$rootScope', '$location', 'Authentication', "$scope", "$http",
             function AddRecipeController($rootScope, $location, Authentication, $scope, $http) {
                 if (!Authentication.isLogged()){
                     window.alert("You are not authorized user. Login or create account to proceed.");
                     $location.path('/login');
                 }
                var getDate = function() {
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    return date;
                }
                
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