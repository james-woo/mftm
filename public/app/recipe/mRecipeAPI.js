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
        }
    }
});