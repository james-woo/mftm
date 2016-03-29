var recipeCtrl = angular.module('app');

recipeCtrl.controller('mRecipeCtrl', function($scope, mRecipeAPI, mRecipe, $location, mNotifier) {
    $scope.difficulty = {
        value: 'easy'
    };
    $scope.create = function() {
        var mealtype= [$scope.mealtype.breakfast, $scope.mealtype.lunch, $scope.mealtype.dinner, $scope.mealtype.snacks];
        mealtype = mealtype.filter(function(n){ return n != undefined });
        var newRecipeData = {
            name: $scope.name,
            summary: $scope.summary,
            description: $scope.description,
            difficulty: $scope.difficulty.value,
            ingredients: $scope.ingredients,
            equipment: $scope.equipment,
            meal_type: mealtype,
            img_url: $scope.img_url
        };

        mRecipeAPI.createRecipe(newRecipeData).then(function() {
            $('#recipeCreationForm').trigger("reset");
            mNotifier.notify('Recipe created!');
            //$location.path('/');
        }, function(reason) {
            mNotifier.error(reason);
        })
    }
});

recipeCtrl.controller('mRecipeShowCtrl', function($scope, $http, $routeParams, $location, mRecipeAPI) {
    var recipeID = $routeParams.recipeID;
    $scope.recipe = {};

    mRecipeAPI.getRecipe(recipeID).then(function(recipe) {
        $scope.recipe = {
            name: recipe.name,
            summary: recipe.summary,
            description: recipe.description,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            equipment: recipe.equipment,
            meal_type: recipe.meal_type,
            img_url: recipe.img_url
        };
    }, function(reason) {
        $location.path('/');
        mNotifier.error(reason);
    })
});