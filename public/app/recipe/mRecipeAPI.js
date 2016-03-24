angular.module('app').factory('mRecipeAPI', function($http, $q, mRecipe) {
    return {
        createRecipe: function(newRecipeData) {
            var newRecipe = new mRecipe(newRecipeData);
            var dfd = $q.defer();
            newRecipe.$save().then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        getRecipe: function(recipeID) {
            var dfd = $q.defer();
            $http.post('/viewrecipe', { _id: recipeID}).then(function(response) {
                if (response.status) {
                    dfd.resolve(response.data);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        getRecipes: function() {
            var dfd = $q.defer();
            $http.get('/api/recipes').then(function(response) {
                if (response.status) {
                    dfd.resolve(response.data);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        deleteRecipe: function(recipeID) {
            var dfd = $q.defer();

            $http.delete('/api/recipes/' + recipeID).then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});
