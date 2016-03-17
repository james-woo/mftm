angular.module('app').controller('mainController', function($http, $scope, mRecipe) {

    $scope.recipes = mRecipe.query();

    $scope.sortOptions = [
        {value:"includeIngredients", text: "Included Ingredients"},
        {value:"omitIngredients", text: "Omitted Ingredients"}
    ];

    $scope.includeIngredients = $scope.sortOptions[0].value;
});