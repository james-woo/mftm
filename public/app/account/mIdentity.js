angular.module('app').factory('mIdentity', function($window, mUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return  {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});