angular.module('app').controller('mAdminCtrl',function($scope, mUser, mRecipe, mRecipeAPI, mIngredient, mIngredientAPI,
                                                       mEquipment,mEquipmentAPI, mAuth, mNotifier) {
    $scope.users = mUser.query();
    $scope.recipes = mRecipe.query();
    $scope.ingredients = mIngredient.query();
    $scope.equipment = mEquipment.query();

    $scope.deleteuser = function(id) {
        mAuth.deleteUser(id).then(function() {
            mNotifier.notify('User account deleted');
            $scope.users = mUser.query();
        }, function(reason) {
            mNotifier.error(reason);
        });
    };

    $scope.deleteequipment = function(id) {
        mEquipmentAPI.deleteEquipment(id).then(function() {
            mNotifier.notify('Equipment deleted');
            $scope.equipment = mEquipment.query();
        }, function(reason) {
            mNotifier.error(reason);
        });
    };

    $scope.deleterecipe = function(id) {
        mRecipeAPI.deleteRecipe(id).then(function() {
            mNotifier.notify('Recipe deleted');
            $scope.recipes = mRecipe.query();
        }, function(reason) {
            mNotifier.error(reason);
        });
    };

    $scope.deleteingredient = function(id) {
        mIngredientAPI.deleteIngredient(id).then(function() {
            mNotifier.notify('Ingredient deleted');
            $scope.ingredients = mIngredient.query();
        }, function(reason) {
            mNotifier.error(reason);
        });
    };
});