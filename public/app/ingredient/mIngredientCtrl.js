var ingredientCtrl = angular.module('app');

ingredientCtrl.controller('mIngredientCtrl', function($scope, mIngredientAPI, mIngredient, $location, mNotifier) {
    $scope.difficulty = {
        value: 'easy'
    };
    $scope.create = function() {
        var seasons = [$scope.season.winter, $scope.season.spring, $scope.season.summer, $scope.season.fall];
        seasons = seasons.filter(function(n){ return n != undefined });
        var newIngredientData = {
            name: $scope.name,
            local: $scope.local,
            season: seasons
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