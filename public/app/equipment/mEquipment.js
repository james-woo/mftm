angular.module('app').factory('mEquipment', function($resource) {
    var EquipmentResource = $resource('/api/equipment/:id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return EquipmentResource;
});