angular.module('app').controller('mLoginCtrl', function($scope, $http, mIdentity, mNotifier, mAuth, $location, mCookies) {

    $scope.identity = mIdentity;

    $scope.signin = function(username, password) {
        mAuth.authenticateUser(username, password).then(function(success) {
            if(success) {
                mNotifier.notify('You have successfully signed in!');
            } else {
                mNotifier.error('Username/Password combination incorrect');
            }
        });
    };

    $scope.signout = function() {
        mAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mNotifier.notify('You have successfully signed out!');
            $location.path('/');
        })
    };

    $scope.resetCookies = function() {
        mCookies.resetAll();
        mNotifier.notify('Cookies reset!');
    }
});