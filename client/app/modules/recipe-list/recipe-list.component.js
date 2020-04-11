'use strict'


angular.
    module('recipeList').
    component('recipeList', {
        templateUrl: 'modules/recipe-list/recipe-list.template.html',
        controller: ['Authentication','$scope', '$location',"$window","$http",
         function RecipeListController(Authentication, $scope, $location, $window, $http) {
             
            var self = this;
            if (!$window.localStorage.getItem('orderProp'))
                $window.localStorage.setItem("orderProp", 'category');
             
            console.log(Authentication.isLogged());
             
            self.orderProp = $window.localStorage.getItem('orderProp');
            console.log($window.localStorage.getItem('orderProp'));
             $http.get('http://127.0.0.1:9000/api/recipes').then(function(response){
               self.recipes = response.data; 
            });
//             $http.post('http://127.0.0.1:9000/auth/register', JSON.stringify({name:"some", email:"a@a.com", password:"pass"})).then(function(response){
//                console.log(response);
//             });
//             $http.post('http://127.0.0.1:9000/auth/login', JSON.stringify({email:"a@a.com", password:"pass"})).then(function(response){
//                console.log(response);
//             });
            
            $scope.destroy = function(id) {
                $http.delete('http://127.0.0.1:9000/api/recipes/'+id).then(function(response) {
                    var index = self.recipes.findIndex(x => x._id === id);
                    if (index > -1) self.recipes.splice(index, 1);
                });
            }
            
            $scope.changed = function() {
                $window.localStorage.setItem("orderProp", self.orderProp);
            }
            
            $scope.logout = function() {
                Authentication.logout();
            }
            $scope.isLogged = function() {
                return Authentication.isLogged();
            }
        }]
    });
