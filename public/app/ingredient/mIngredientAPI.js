angular.module('app').factory('mIngredientAPI', function($http, $q, mIngredient) {
    return {
        createIngredient: function(newIngredientData) {
            var newIngredient = new mIngredient(newIngredientData);
            var dfd = $q.defer();
            newIngredient.$save().then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});
