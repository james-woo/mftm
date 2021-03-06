var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    recipeModel = require('../models/Recipe'),
    ingredientModel = require('../models/Ingredient'),
    equipmentModel = require('../models/Equipment');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log("connected to db");
    });

    userModel.createDefaultUsers();
    recipeModel.createDefaultRecipes();
    ingredientModel.createDefaultIngredients();
    equipmentModel.createDefaultEquipment();
};