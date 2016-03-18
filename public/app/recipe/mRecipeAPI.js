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
                if (response.status == 200) {
                    dfd.resolve(response.data);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }
    }
});
