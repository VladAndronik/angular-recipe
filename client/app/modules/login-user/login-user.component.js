'use strict'

angular.module('loginUser')
    .component('loginUser', {
        templateUrl: "modules/login-user/login-user.template.html",
        controller: ["$http", "$location", "$scope", "$window","Authentication",
                    function LoginUserController($http, $location, $scope, $window, Authentication){
                        var self = this;
                        $scope.login = function() {
                            $http.post('http://127.0.0.1:9000/auth/login', JSON.stringify($scope.user)).then(
                                function(response){
                                    console.log('success');
                                    console.log(response);
//                                    $window.localStorage.setItem("token", response.data.token);
                                    Authentication.setToken(response.data.token);
                                    $location.path('/recipes');
                                },
                                function(err) {
                                    console.log(err);
                                    alert(err.data.message);
                                }
                            );
                        }
                    }]
    
});