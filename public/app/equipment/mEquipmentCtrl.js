var equipmentCtrl = angular.module('app');

equipmentCtrl.controller('mEquipmentCtrl', function($scope, mEquipmentAPI, mEquipment, $location, mNotifier) {

    $scope.create = function() {
        var newEquipmentData = {
            name: $scope.name
        };

        mEquipmentAPI.createEquipment(newEquipmentData).then(function() {
            mNotifier.notify('Equipment created!');
            $location.path('/');
        }, function(reason) {
            mNotifier.error(reason);
        })
    };
});