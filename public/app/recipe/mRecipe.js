angular.module('app').factory('mRecipe', function($resource) {
    var RecipeResource = $resource('/api/recipes/:id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false}
    });

    return RecipeResource;
});