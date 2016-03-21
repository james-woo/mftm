angular.module('app').factory('mIngredient', function($resource) {
    var IngredientResource = $resource('/api/ingredients/:id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return IngredientResource;
});