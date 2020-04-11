'use strict'

angular.module('registerUser')
    .component('registerUser', {
        templateUrl: "modules/register-user/register-user.template.html",
        controller: ["$http", "$location", "$scope", 
                    function RegisterUserController($http, $location, $scope){
                        var self = this;
                        $scope.register = function() {
                            $http.post('http://127.0.0.1:9000/auth/register', JSON.stringify($scope.user)).then(
                                function(response){
                                    console.log('success signup');
                                    console.log(response);
                                    $location.path('/login')
                                },
                                function(err) {
                                    console.log(err);
                                    alert(err.data.message);
                                }
                            );
                        }
                    }]
    
});