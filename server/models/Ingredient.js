var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required!'},
    local: {type:String, required:'{PATH} is required!'},
    season: {type:String, required:'{PATH} is required!'}
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);
function createDefaultIngredients() {
    Ingredient.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Ingredient.create({
                name: 'Mongoose',
                local: 'Western Canada',
                season: 'Winter'
            });
            Ingredient.create({
                name: 'Salt',
                local: 'Western Canada',
                season: 'Winter, Spring, Summer, Fall'
            });
            Ingredient.create({
                name: 'Chicken',
                local: 'Eastern Canada',
                season: 'Winter, Spring, Summer, Fall'
            });
            Ingredient.create({
                name: 'Butter',
                local: 'Eastern Canada',
                season: 'Winter, Spring, Summer, Fall'
            });
            Ingredient.create({
                name: 'Lemon',
                local: 'Western Canada',
                season: 'Spring, Summer'
            });
        }
    });
}

exports.createDefaultIngredients = createDefaultIngredients;