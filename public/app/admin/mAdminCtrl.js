angular.module('app').controller('mAdminCtrl',function($scope, mUser, mRecipe) {
    $scope.users = mUser.query();
    $scope.recipes = mRecipe.query();
});