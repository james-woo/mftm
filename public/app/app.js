angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {

    var routeRoleChecks = {
        admin: {
            auth: function(mAuth) {
                return mAuth.authorizeCurrentUserForRoute('admin')
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainController'
        })

        .when('/admin/application', {
            templateUrl: '/partials/admin/admin',
            controller: 'mAdminCtrl',
            resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
});
