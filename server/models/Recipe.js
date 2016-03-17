var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    difficulty: String,
    equipment: [String],
    ingredients: [String],
    season: String,
    meal_type: String
});

var Recipe = mongoose.model('Recipe', recipeSchema);
function createDefaultRecipess() {
    Recipe.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Recipe.create({
                name: 'Cooked Mongoose',
                description: 'Deliciousness served to you',
                difficulty: 'Medium',
                equipment: ['Oven', 'Pan'],
                ingredients: ['Mongoose', 'Salt'],
                season: 'Winter',
                meal_type: 'Dinner'
            });
        }
    });
}

exports.createDefaultRecipess = createDefaultRecipess;