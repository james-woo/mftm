var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var recipeSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required!'},
    description: {type:String, required:'{PATH} is required!'},
    difficulty: {type:String, required:'{PATH} is required!'},
    equipment: {type:String, required:'{PATH} is required!'},
    ingredients: {type:String, required:'{PATH} is required!'},
    season: {type:String, required:'{PATH} is required!'},
    meal_type: {type:String, required:'{PATH} is required!'},
});

var Recipe = mongoose.model('Recipe', recipeSchema);
function createDefaultRecipess() {
    Recipe.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Recipe.create({
                name: 'Cooked Mongoose',
                description: 'Deliciousness served to you',
                difficulty: 'Medium',
                equipment: 'Oven, Pan',
                ingredients: 'Mongoose, Salt',
                season: 'Winter',
                meal_type: 'Dinner'
            });
        }
    });
}

exports.createDefaultRecipess = createDefaultRecipess;