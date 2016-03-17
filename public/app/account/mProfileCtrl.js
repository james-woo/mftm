angular.module('app').controller('mProfileCtrl', function($scope, mIdentity, mNotifier, mAuth) {
    $scope.email = mIdentity.currentUser.username;
    $scope.firstname = mIdentity.currentUser.firstname;
    $scope.lastname = mIdentity.currentUser.lastName;

    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        };
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        mAuth.updateCurrentUser(newUserData).then(function() {
            mNotifier.notify('Your user account has been updated');
        }, function(reason) {
            mNotifier.error(reason);
        })
    }
});