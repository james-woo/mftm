angular.module('app').controller('mAdminCtrl',function($scope, mUser, mRecipe, mIngredient) {
    $scope.users = mUser.query();
    $scope.recipes = mRecipe.query();
    $scope.ingredients = mIngredient.query();
});