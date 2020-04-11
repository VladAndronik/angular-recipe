'use strict'

//var module = angular.module('serviceAuth');

var module = angular.module('serviceAuth', []);

module.service('Authentication', ['$window', '$location', '$http', function($window, $location, $http) {
   this.token = '';
    
   this.setToken = function(token) {
       this.token=token;
       $window.localStorage.setItem('token', this.token);
   }
   
   this.getToken = function() {
       if (!this.token) {
           this.token = $window.localStorage.getItem('token');
       }
       return this.token;
   }
   
   this.logout = function() {
       this.token = '';
       $window.localStorage.removeItem('token');
       $location.path('/');
   }
   
   this.getUserDetails = function() {
       const token = this.getToken();
       if (token) {
           var payload = token.split('.')[1];
           payload = $window.atob(payload);
           return JSON.parse(payload);
       }
       return null;
   }
   
   this.isLogged = function() {
       const user = this.getUserDetails();
       if (user) {
           return user.exp > Date.now() / 1000;
       }
       return false;
   }
   
}]);

//module.factory('Authentication', ['$http', '$window', function($http, $window) {
//    this.check = function(){console.log('Auth service is here');}
//}]);