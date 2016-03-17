angular.module('app').controller('loginController', function($scope, $http, mIdentity, mNotifier, mAuth) {

    $scope.identity = mIdentity;
    $scope.signin = function(username, password) {
        mAuth.authenticateUser(username, password).then(function(success) {
            if(success) {
                mNotifier.notify('You have successfully signed in!');
            } else {
                mNotifier.notify('Username/Password combination incorrect');
            }
        });
    }
});