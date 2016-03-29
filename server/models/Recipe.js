var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: {type:String, required:'{PATH} is required!'},
    summary: {type:String, required: '{PATH} is required!'},
    description: {type:String, required:'{PATH} is required!'},
    difficulty: {type:String, required:'{PATH} is required!'},
    equipment: {type:String, required:'{PATH} is required!'},
    ingredients: {type:String, required:'{PATH} is required!'},
    meal_type: {type:String, required:'{PATH} is required!'},
    img_url: {type:String, required:'{PATH} is required!'}
});

var Recipe = mongoose.model('Recipe', recipeSchema);
function createDefaultRecipes() {
    Recipe.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            Recipe.create({
                name: 'Cooked Mongoose',
                summary: 'Crispy goodness',
                description: 'Deliciousness served to you, 1. Get a mongoose, 2. Put in pan, 3. Cook',
                difficulty: 'Medium',
                equipment: 'Oven, Pan',
                ingredients: 'Mongoose, Salt',
                meal_type: 'Dinner',
                img_url: 'http://i.livescience.com/images/i/000/041/113/iFF/boo-zoo-album-10-mongoose-101028.jpg?1320190518'
            });
            Recipe.create({
                name: 'Watery Soup',
                summary: 'Extremely watery soup',
                description: 'Put water in pot and simmer',
                difficulty: 'Easy',
                equipment: 'Oven, Pan',
                ingredients: 'Water',
                meal_type: 'Breakfast',
                img_url: 'http://www.e-health101.com/wp-content/uploads/2013/01/Glass-of-Water.jpg'
            });
        }
    });
}

exports.createDefaultRecipes = createDefaultRecipes;