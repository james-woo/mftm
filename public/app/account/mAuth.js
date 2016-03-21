angular.module('app').factory('mAuth', function($http, mIdentity, $q, mUser) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new mUser();
                    angular.extend(user, response.data.user);
                    mIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function(newUserData) {
            var newUser = new mUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                mIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        deleteUser: function(userID) {
            var dfd = $q.defer();

            $http.delete('/api/users/' + userID).then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(mIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                mIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(mIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticateUserForRoute: function() {
            if(mIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});