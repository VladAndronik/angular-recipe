'use strict'

angular.
module('authorRecipe').
component('authorRecipe', {
    templateUrl: 'modules/author-recipe/author-recipe.template.html',
    controller: ['Authentication', '$scope', '$location', "$window", "$http",
         function RecipeListController(Authentication, $scope, $location, $window, $http) {

            var self = this;
            if (!$window.localStorage.getItem('orderProp'))
                $window.localStorage.setItem("orderProp", 'category');
            
             var author_id = Authentication.getUserDetails()['_id'];
             console.log(Authentication.getToken());
            $http.get('http://127.0.0.1:9000/api/recipes').then(function (response) {
                self.recipes = response.data;
                console.log(self.recipes);
                console.log(author_id);
                self.recipes = self.recipes.filter(recipe => recipe.author_id == author_id);
            });
            //             $http.post('http://127.0.0.1:9000/auth/register', JSON.stringify({name:"some", email:"a@a.com", password:"pass"})).then(function(response){
            //                console.log(response);
            //             });
            //             $http.post('http://127.0.0.1:9000/auth/login', JSON.stringify({email:"a@a.com", password:"pass"})).then(function(response){
            //                console.log(response);
            //             });

            $scope.destroy = function (id) {
                $http.delete('http://127.0.0.1:9000/api/recipes/' + id).then(function (response) {
                    var index = self.recipes.findIndex(x => x._id === id);
                    if (index > -1) self.recipes.splice(index, 1);
                });
            }
        }]
});