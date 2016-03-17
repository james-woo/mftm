angular.module('app').controller('mSignupCtrl', function($scope, mUser, mNotifier, $location, mAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        };

        mAuth.createUser(newUserData).then(function() {
            mNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mNotifier.error(reason);
        })
    }
});
