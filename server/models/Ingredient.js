var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required!'},
    local: {type:String, required:'{PATH} is required!'}
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);
function createDefaultIngredients() {
    Ingredient.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Ingredient.create({
                name: 'Mongoose',
                local: 'Western Canada'
            });
            Ingredient.create({
                name: 'Salt',
                local: 'Western Canada'
            });
            Ingredient.create({
                name: 'Chicken',
                local: 'Eastern Canada'
            });
            Ingredient.create({
                name: 'Butter',
                local: 'Eastern Canada'
            });
            Ingredient.create({
                name: 'Lemon',
                local: 'Western Canada'
            });
        }
    });
}

exports.createDefaultIngredients = createDefaultIngredients;