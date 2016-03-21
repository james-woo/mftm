angular.module('app').factory('mEquipmentAPI', function($http, $q, mEquipment) {
    return {
        createEquipment: function(newEquipmentData) {
            var newEquipment = new mEquipment(newEquipmentData);
            var dfd = $q.defer();
            newEquipment.$save().then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        deleteEquipment: function(equipmentID) {
            var dfd = $q.defer();

            $http.delete('/api/equipment/' + equipmentID).then(function() {
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }
});
