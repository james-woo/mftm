var ingredientCtrl = angular.module('app');

ingredientCtrl.controller('mIngredientCtrl', function($scope, mIngredientAPI, mIngredient, $location, mNotifier) {
    $scope.difficulty = {
        value: 'easy'
    };
    $scope.create = function() {
        var newIngredientData = {
            name: $scope.name,
            local: $scope.local
        };

        mIngredientAPI.createIngredient(newIngredientData).then(function() {
            $('#ingredientCreationForm').trigger("reset");
            mNotifier.notify('Ingredient created!');
            //$location.path('/');
        }, function(reason) {
            mNotifier.error(reason);
        })
    }
});