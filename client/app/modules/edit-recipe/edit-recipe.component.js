'use strict'

angular.module("editRecipe").
    component("editRecipe", {
        templateUrl: "modules/edit-recipe/edit-recipe.template.html",
        controller: ['$routeParams', 'Authentication', "$scope", "$location","$http",
             function EditRecipeController($routerParams, Authentication, $scope, $location, $http) {
                 
                 if (!Authentication.isLogged()){
                     window.alert("You are not authorized user. Login or create account to proceed.");
                     $location.path('/login');
                 }
                 
                 
                 var self = this;
                 $http.get('http://127.0.0.1:9000/api/recipes/'+$routerParams.recipeId.toString()).then(function(response){
                       self.recipe = response.data;
                       var author_id = self.recipe['author_id'];
                       console.log(self.recipe);
                        if (Authentication.getUserDetails()['_id'] != author_id) {
                             window.alert('You are not the author of this recipe. Try to sign up under different account.');
                             $location.path('/recipes');
                        }
                       
                 });
                 console.log(self.author_id);
                 
                 
                 
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
    