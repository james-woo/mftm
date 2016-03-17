angular.module('app').factory('mIdentity', function() {
    return  {
        currentUser: undefined,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
});