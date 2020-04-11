'use strict'

angular.
    module('recipeApp').
    config(['$routeProvider',
           function config($routerProvider) {
               $routerProvider.
                when('/recipes', {
                   template: '<recipe-list></recipe-list>'
               }).
                when('/recipes/:recipeId', {
                   template: '<recipe-detail></recipe-detail>'
               }).
               when('/add', {
                   template: "<add-recipe></add-recipe>"
//                   resolve: {
//                       auth: function(AuthService) {AuthService.authenticate();}
//                   }
               }).
               when('/edit/:recipeId', {
                   template: "<edit-recipe></edit-recipe>"
               }).
               when('/login', {
                   template: "<login-user></login-user>"
               }).
               when('/register', {
                   template: "<register-user></register-user>"
               }).
               otherwise('/recipes');
               
//               RestangularProvider.setBaseUrl('http://localhost:9000/');

           }
            
   ])
//    .run(function($rootScope, $location){
//    //If the route change failed due to authentication error, redirect them out
//    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
//        if(rejection === 'Not Authenticated'){
//            $location.path('/login');
//        }
//    })
//}).factory('AuthService', ['Authentication', function($q) {
//    return {
//        authenticate : function(){
//            //Authentication logic here
//            if(Authentication.isLogged()){
//                // If authenticated, return anything you want, probably a user object
//                console.log('something');
//                return true;
//            } else {
//                //Else send a rejection
//                return $q.reject('Not Authenticated');
//            }
//        }
//    }
//}]);;