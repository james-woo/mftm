angular.module('app').controller('mRecipeCtrl', function($scope, mRecipeAPI, mRecipe, $location, mNotifier) {

    $scope.create = function() {
        var seasons = $scope.season.winter + ',' + $scope.season.spring + ',' + $scope.season.summer + ',' + $scope.season.fall;
        var mealtype = $scope.mealtype.breakfast + ',' + $scope.mealtype.lunch + ',' + $scope.mealtype.dinner + ',' + $scope.mealtype.snacks;
        var newRecipeData = {
            name: $scope.name,
            description: $scope.description,
            difficulty: $scope.difficulty.value,
            ingredients: $scope.ingredients,
            equipment: $scope.equipment,
            season: seasons,
            meal_type: mealtype
        };

        mRecipeAPI.createRecipe(newRecipeData).then(function() {
            mNotifier.notify('Recipe created!');
            $location.path('/');
        }, function(reason) {
            mNotifier.error(reason);
        })
    }
});